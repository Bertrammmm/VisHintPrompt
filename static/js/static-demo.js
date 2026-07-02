(function () {
  const BASE_PATH = 'static/demo/static-preview/';
  const SOURCE_LABELS = {
    synthetic: 'Sy.Dataset',
    realworld: 'Final-RealDataset'
  };
  const SOURCE_ORDER = ['synthetic', 'realworld'];
  const DEFAULT_CATEGORY = 'bubble';
  const MAX_VISIBLE_SAMPLES = 12;

  const state = {
    manifest: null,
    source: 'synthetic',
    category: DEFAULT_CATEGORY,
    sample: null,
    view: 'standard',
    resultView: 'summary',
    evaluation: null
  };

  const elements = {};

  function $(id) {
    return document.getElementById(id);
  }

  function joinCachePath(path) {
    if (!path) return '';
    return BASE_PATH + String(path).replace(/^\/+/, '');
  }

  function text(value, fallback) {
    if (value === undefined || value === null || value === '') return fallback || '-';
    return String(value);
  }

  function escapeHtml(value) {
    return text(value).replace(/[&<>"']/g, (character) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[character]));
  }

  function numberText(value) {
    if (value === undefined || value === null || value === '') return '-';
    const numeric = Number(value);
    if (!Number.isFinite(numeric)) return String(value);
    return Number.isInteger(numeric) ? String(numeric) : String(Number(numeric.toFixed(6)));
  }

  function categoryLabel(category) {
    const map = {
      all: 'All',
      v_bar: 'Vertical Bar',
      h_bar: 'Horizontal Bar'
    };
    return map[category] || String(category || '').replace(/_/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());
  }

  function activeSource() {
    return state.manifest?.sources?.[state.source] || null;
  }

  function sourceSamples() {
    const source = activeSource();
    return Array.isArray(source?.samples) ? source.samples : [];
  }

  function filteredSamples() {
    return sourceSamples().filter((sample) => state.category === 'all' || sample.category === state.category);
  }

  function defaultCategoryForSource() {
    const categories = activeSource()?.categories || [];
    if (categories.some((category) => category.value === DEFAULT_CATEGORY)) return DEFAULT_CATEGORY;
    return categories[0]?.value || 'all';
  }

  function sampleImageUrl(sample) {
    return joinCachePath(sample?.image_url);
  }

  function activePreviewUrl() {
    const sample = state.sample;
    if (!sample) return '';
    if (state.view === 'original') return joinCachePath(sample.image_url);
    if (state.view === 'colored' && sample.colored_grid_url) return joinCachePath(sample.colored_grid_url);
    return joinCachePath(sample.standard_grid_url || sample.encrypted_image_url || sample.image_url);
  }

  function createButton(label, className, onClick) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = className || '';
    button.textContent = label;
    button.addEventListener('click', onClick);
    return button;
  }

  function renderSources() {
    elements.sources.innerHTML = '';
    const sourceKeys = Object.keys(state.manifest?.sources || {}).sort((a, b) => {
      const aIndex = SOURCE_ORDER.indexOf(a);
      const bIndex = SOURCE_ORDER.indexOf(b);
      if (aIndex === -1 && bIndex === -1) return a.localeCompare(b);
      if (aIndex === -1) return 1;
      if (bIndex === -1) return -1;
      return aIndex - bIndex;
    });

    sourceKeys.forEach((sourceKey) => {
      const button = createButton(SOURCE_LABELS[sourceKey] || sourceKey, state.source === sourceKey ? 'active' : '', () => {
        state.source = sourceKey;
        state.category = defaultCategoryForSource();
        state.sample = null;
        state.evaluation = null;
        renderAll();
        selectFirstSample();
      });
      elements.sources.appendChild(button);
    });
  }

  function renderCategories() {
    const source = activeSource();
    const categories = Array.isArray(source?.categories) ? source.categories : [];
    elements.categories.innerHTML = '';

    categories.forEach((category) => {
      const button = createButton('', state.category === category.value ? 'active' : '', () => {
        state.category = category.value;
        state.sample = null;
        state.evaluation = null;
        renderAll();
        selectFirstSample();
      });
      button.innerHTML = `<span>${categoryLabel(category.value || category.label)}</span><small>${category.count || 0}</small>`;
      elements.categories.appendChild(button);
    });
  }

  function renderStats() {
    const samples = filteredSamples();
    const cachedCount = samples.filter((sample) => sample.cached).length;
    const evaluatedCount = samples.filter((sample) => sample.evaluation_cached || sample.evaluated).length;
    elements.stats.innerHTML = [
      ['Chart family', categoryLabel(state.category)],
      ['Grid cache', `${cachedCount}/${samples.length}`],
      ['Eval cache', `${evaluatedCount}/${samples.length}`]
    ].map(([label, value]) => (
      `<div class="cached-demo-stat"><strong>${escapeHtml(value)}</strong><span>${escapeHtml(label)}</span></div>`
    )).join('');
  }

  function renderSamples() {
    const samples = filteredSamples();
    const visibleSamples = samples.slice(0, MAX_VISIBLE_SAMPLES);
    elements.samples.innerHTML = '';

    if (!samples.length) {
      elements.samples.innerHTML = '<div class="cached-demo-empty">No cached samples in this category.</div>';
      return;
    }

    visibleSamples.forEach((sample) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'cached-demo-sample' + (state.sample?.sample_id === sample.sample_id ? ' active' : '');
      button.title = sample.name || sample.sample_id;
      button.innerHTML = `
        <img loading="lazy" src="${sampleImageUrl(sample)}" alt="${escapeHtml(text(sample.name, 'Chart sample'))}">
        <span>${escapeHtml(text(sample.name, sample.sample_id))}</span>
      `;
      button.addEventListener('click', () => selectSample(sample));
      elements.samples.appendChild(button);
    });

    if (samples.length > visibleSamples.length) {
      const note = document.createElement('div');
      note.className = 'cached-demo-sample-note';
      note.textContent = `Showing ${visibleSamples.length} representative samples from ${samples.length} cached ${categoryLabel(state.category)} charts.`;
      elements.samples.appendChild(note);
    }
  }

  function renderViewButtons() {
    const sample = state.sample;
    const hasColored = Boolean(sample?.colored_grid_url);
    const hasStandard = Boolean(sample?.standard_grid_url || sample?.encrypted_image_url);

    elements.views.querySelectorAll('button').forEach((button) => {
      const view = button.dataset.view;
      button.classList.toggle('active', state.view === view);
      if (view === 'colored') button.disabled = !hasColored;
      if (view === 'standard') button.disabled = !hasStandard;
      if (view === 'original') button.disabled = !sample?.image_url;
    });
  }

  function renderResultViewButtons() {
    if (!elements.resultTabs) return;
    elements.resultTabs.querySelectorAll('button').forEach((button) => {
      button.classList.toggle('active', button.dataset.resultView === state.resultView);
    });
  }

  function renderFigure() {
    renderViewButtons();
    if (!state.sample) {
      elements.figure.innerHTML = '<div class="cached-demo-empty">Choose a cached sample to preview the original chart and grid.</div>';
      elements.caption.textContent = '';
      if (elements.title) elements.title.textContent = 'Cached sample';
      return;
    }

    const gridSrc = activePreviewUrl();
    const mainLabel = state.view === 'original'
      ? 'Original'
      : (state.view === 'colored' && state.sample.colored_grid_url ? 'Colored' : 'Grid');
    elements.figure.innerHTML = `
      <div class="cached-demo-focus">
        <div class="cached-demo-main-frame">
          <img src="${gridSrc}" alt="${escapeHtml(text(state.sample.name, mainLabel))}">
        </div>
      </div>
    `;
    if (elements.title) {
      elements.title.textContent = text(state.sample.name, state.sample.sample_id);
    }
    elements.caption.textContent = [
      text(state.sample.name, state.sample.sample_id),
      categoryLabel(state.sample.category),
      state.view === 'original' ? 'original chart' : (state.view === 'colored' && state.sample.colored_grid_url ? 'colored preview' : 'grid preview')
    ].join(' | ');
  }

  function predictionValue(item) {
    if (item?.value && typeof item.value === 'object') {
      const x = item.value.x ?? item.x;
      const y = item.value.y ?? item.y;
      if (x !== undefined || y !== undefined) return `x: ${numberText(x)}, y: ${numberText(y)}`;
    }
    if (item?.x !== undefined || item?.y !== undefined) return `x: ${numberText(item.x)}, y: ${numberText(item.y)}`;
    if (item?.percentage !== undefined) return `${numberText(item.percentage)}%`;
    if (item?.r !== undefined) return numberText(item.r);
    return numberText(item?.value);
  }

  function activeChartType(result) {
    return String(result?.chart_type || state.sample?.chart_type || '').toLowerCase();
  }

  function valueAt(item, keys) {
    for (const key of keys) {
      const value = key.split('.').reduce((current, part) => current?.[part], item);
      if (value !== undefined && value !== null && value !== '') return value;
    }
    return undefined;
  }

  function axisPriorRows(payload) {
    const rows = [];
    const addCount = (label, values) => {
      if (Array.isArray(values) && values.length) rows.push([label, values.length]);
    };

    addCount('X ticks', payload.x_ticks);
    addCount('Y ticks', payload.y_ticks);
    addCount('Dense X grid', payload.x_ticks_encrypted);
    addCount('Dense Y grid', payload.y_ticks_encrypted);
    addCount('R ticks', payload.r_ticks);
    addCount('Theta ticks', payload.theta_ticks);
    addCount('Dense R grid', payload.r_ticks_encrypted);
    addCount('Dense theta grid', payload.theta_ticks_encrypted);

    if (payload.x_axis_type || payload.y_axis_type) {
      rows.push(['Axis roles', [payload.x_axis_type, payload.y_axis_type].filter(Boolean).join(' / ')]);
    }
    if (state.sample?.coordinate_system) {
      rows.push(['Coordinate', state.sample.coordinate_system]);
    }
    return rows;
  }

  function predictionColumns(chartType, predictions) {
    if (['scatter', 'bubble'].includes(chartType)) {
      return [
        ['Object', (item, index) => valueAt(item, ['label', 'id']) ?? `#${index + 1}`],
        ['X', (item) => valueAt(item, ['x', 'value.x'])],
        ['Y', (item) => valueAt(item, ['y', 'value.y'])],
      ];
    }
    if (['pie', 'donut'].includes(chartType)) {
      return [
        ['Segment', (item, index) => valueAt(item, ['label', 'id']) ?? `#${index + 1}`],
        ['Percent', (item) => {
          const value = valueAt(item, ['percentage']);
          return value === undefined ? undefined : `${numberText(value)}%`;
        }],
        ['Start', (item) => valueAt(item, ['start_angle'])],
        ['End', (item) => valueAt(item, ['end_angle'])],
      ];
    }
    if (['radar', 'rose'].includes(chartType)) {
      const hasSeries = predictions.some((item) => text(item.series_name, '') !== '');
      const columns = [
        ['Object', (item, index) => valueAt(item, ['id', 'label']) ?? `#${index + 1}`],
        ['Axis', (item) => valueAt(item, ['theta_label', 'axis', 'label'])],
        ['R', (item) => valueAt(item, ['r', 'value'])],
      ];
      if (hasSeries) columns.splice(1, 0, ['Series', (item) => valueAt(item, ['series_name'])]);
      return columns;
    }

    const seriesNames = new Set(predictions.map((item) => text(item.series_name, '')).filter(Boolean));
    const columns = [
      ['Item', (item, index) => valueAt(item, ['label', 'id']) ?? `#${index + 1}`],
      ['Value', (item) => predictionValue(item)],
    ];
    if (seriesNames.size > 1) columns.push(['Series', (item) => valueAt(item, ['series_name'])]);
    return columns;
  }

  function renderPredictionTable(predictions, chartType) {
    const visiblePredictions = predictions.slice(0, 16);
    const columns = predictionColumns(chartType, predictions);
    const head = columns.map(([label]) => `<th>${escapeHtml(label)}</th>`).join('');
    const body = visiblePredictions.map((item, index) => `
      <tr>
        ${columns.map(([, getter]) => `<td>${escapeHtml(numberText(getter(item, index)))}</td>`).join('')}
      </tr>
    `).join('');
    const note = predictions.length > visiblePredictions.length
      ? `<p class="cached-demo-result-note">Showing the first ${visiblePredictions.length} of ${predictions.length} prediction objects.</p>`
      : '';

    return `
      <div class="cached-demo-table-wrap">
        <table class="cached-demo-table">
          <thead><tr>${head}</tr></thead>
          <tbody>${body || `<tr><td colspan="${columns.length}">No prediction objects in this cache.</td></tr>`}</tbody>
        </table>
      </div>
      ${note}
    `;
  }

  function renderEvaluation() {
    renderResultViewButtons();
    if (!state.sample) {
      elements.results.innerHTML = '<div class="cached-demo-empty">Cached prediction results will appear after selecting a sample.</div>';
      return;
    }

    if (!state.sample.results_url) {
      elements.results.innerHTML = '<div class="cached-demo-empty">This sample has cached images, but no cached evaluation JSON.</div>';
      return;
    }

    if (!state.evaluation) {
      elements.results.innerHTML = '<div class="cached-demo-empty">Loading cached evaluation JSON...</div>';
      return;
    }

    const result = state.evaluation;
    const summary = result.summary || {};
    const quality = result.quality || {};
    const payload = result.processed_json || result.source_payload || {};
    const chartType = activeChartType(result);
    const predictions = Array.isArray(result.predictions) ? result.predictions : [];
    const axisRows = axisPriorRows(payload);

    elements.results.innerHTML = `
      <div class="cached-demo-result-page ${state.resultView === 'summary' ? 'active' : ''}" data-result-page="summary">
        <div class="cached-demo-result-grid">
          <div class="cached-demo-kv"><span>Chart type</span><strong>${escapeHtml(categoryLabel(chartType))}</strong></div>
          <div class="cached-demo-kv"><span>Coordinate</span><strong>${escapeHtml(text(state.sample.coordinate_system))}</strong></div>
          <div class="cached-demo-kv"><span>Objects</span><strong>${escapeHtml(text(summary.object_count || predictions.length))}</strong></div>
          <div class="cached-demo-kv"><span>Cache</span><strong>${state.sample.evaluation_cached ? 'prediction + grid' : 'grid only'}</strong></div>
        </div>
        <div class="cached-demo-axis-card">
          <div>
            <strong>Axis prior summary</strong>
            <span>${quality.has_encrypted_grid === false ? 'Basic grid cache' : 'Geometry-aligned grid cache'}</span>
          </div>
          <dl>
            ${axisRows.map(([label, value]) => `<div><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>`).join('') || '<div><dt>Grid</dt><dd>Cached</dd></div>'}
          </dl>
        </div>
      </div>
      <div class="cached-demo-result-page ${state.resultView === 'objects' ? 'active' : ''}" data-result-page="objects">
        ${renderPredictionTable(predictions, chartType)}
      </div>
    `;
  }

  function renderAll() {
    renderSources();
    renderCategories();
    renderStats();
    renderSamples();
    renderFigure();
    renderEvaluation();
  }

  async function selectSample(sample) {
    state.sample = sample;
    state.view = sample.standard_grid_url || sample.encrypted_image_url ? 'standard' : (sample.colored_grid_url ? 'colored' : 'standard');
    state.resultView = 'summary';
    state.evaluation = null;
    renderAll();

    if (sample.results_url) {
      try {
        const response = await fetch(joinCachePath(sample.results_url));
        if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
        state.evaluation = await response.json();
      } catch (error) {
        state.evaluation = { predictions: [], summary: {}, load_error: error.message };
      }
      renderEvaluation();
    }
  }

  function selectFirstSample() {
    const [sample] = filteredSamples();
    if (sample) selectSample(sample);
  }

  async function init() {
    elements.sources = $('cached-demo-sources');
    elements.categories = $('cached-demo-categories');
    elements.stats = $('cached-demo-stats');
    elements.samples = $('cached-demo-samples');
    elements.views = $('cached-demo-views');
    elements.figure = $('cached-demo-figure');
    elements.caption = $('cached-demo-caption');
    elements.results = $('cached-demo-results');
    elements.title = $('cached-demo-title');
    elements.resultTabs = $('cached-demo-result-tabs');

    if (!elements.sources) return;

    elements.views.querySelectorAll('button').forEach((button) => {
      button.addEventListener('click', () => {
        state.view = button.dataset.view;
        renderFigure();
      });
    });

    elements.resultTabs?.querySelectorAll('button').forEach((button) => {
      button.addEventListener('click', () => {
        state.resultView = button.dataset.resultView;
        renderEvaluation();
      });
    });

    try {
      const response = await fetch(joinCachePath('manifest.json'));
      if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
      state.manifest = await response.json();
      if (!state.manifest.sources?.[state.source]) {
        state.source = Object.keys(state.manifest.sources || {})[0] || 'realworld';
      }
      state.category = defaultCategoryForSource();
      renderAll();
      selectFirstSample();
    } catch (error) {
      elements.results.innerHTML = `<div class="cached-demo-empty">Unable to load static cache: ${error.message}</div>`;
    }
  }

  document.addEventListener('DOMContentLoaded', init);
})();
