const STORAGE_KEYS = {
  stories: 'senStoriesV2',
  rewards: 'senRewardsV1'
};

const symbolLibrary = [
  {
    id: 'toilet',
    keywords: ['toilet', 'bathroom', 'pee', 'loo', 'wc'],
    svg: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true"><rect width="128" height="128" rx="22" fill="#f3f6ff"/><rect x="36" y="20" width="56" height="44" rx="10" fill="#9cb7ff"/><rect x="44" y="28" width="40" height="12" rx="6" fill="#fff"/><rect x="52" y="76" width="24" height="36" rx="10" fill="#6c7bff"/><rect x="40" y="64" width="48" height="12" rx="6" fill="#6c7bff"/></svg>`
  },
  {
    id: 'wash-hands',
    keywords: ['wash', 'soap', 'clean', 'hands'],
    svg: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true"><rect width="128" height="128" rx="22" fill="#f3f6ff"/><rect x="20" y="36" width="88" height="56" rx="20" fill="#9be2ff"/><circle cx="88" cy="48" r="18" fill="#6c7bff"/><path d="M40 60c12-18 32-18 44 0" stroke="#6c7bff" stroke-width="8" stroke-linecap="round" fill="none"/><path d="M36 78h56" stroke="#fff" stroke-width="10" stroke-linecap="round"/><circle cx="44" cy="78" r="6" fill="#fff"/><circle cx="64" cy="78" r="6" fill="#fff"/><circle cx="84" cy="78" r="6" fill="#fff"/></svg>`
  },
  {
    id: 'sit',
    keywords: ['sit', 'chair', 'seat'],
    svg: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true"><rect width="128" height="128" rx="22" fill="#f3f6ff"/><rect x="36" y="24" width="24" height="56" rx="12" fill="#ffba6b"/><rect x="32" y="64" width="64" height="18" rx="9" fill="#6c7bff"/><rect x="64" y="34" width="30" height="48" rx="12" fill="#ffd88a"/><rect x="44" y="82" width="12" height="28" rx="6" fill="#6c7bff"/><rect x="84" y="82" width="12" height="28" rx="6" fill="#6c7bff"/></svg>`
  },
  {
    id: 'flush',
    keywords: ['flush', 'button', 'handle'],
    svg: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true"><rect width="128" height="128" rx="22" fill="#f3f6ff"/><rect x="30" y="24" width="68" height="80" rx="18" fill="#d7ddff"/><rect x="46" y="38" width="36" height="20" rx="8" fill="#6c7bff"/><circle cx="64" cy="86" r="16" fill="#6c7bff"/><circle cx="64" cy="86" r="7" fill="#fff"/></svg>`
  },
  {
    id: 'food',
    keywords: ['eat', 'food', 'meal', 'dinner', 'lunch', 'breakfast', 'hungry'],
    svg: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true"><rect width="128" height="128" rx="22" fill="#fef5f0"/><path d="M30 80c0-20 18-36 34-36s34 16 34 36" fill="#ffbf7f"/><path d="M30 84h68" stroke="#6c7bff" stroke-width="8" stroke-linecap="round"/><rect x="58" y="24" width="12" height="40" rx="6" fill="#6c7bff"/><rect x="46" y="24" width="12" height="28" rx="6" fill="#6c7bff"/><rect x="70" y="24" width="12" height="28" rx="6" fill="#6c7bff"/></svg>`
  },
  {
    id: 'snack',
    keywords: ['snack', 'treat', 'biscuits', 'cookie'],
    svg: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true"><rect width="128" height="128" rx="22" fill="#fff6f2"/><circle cx="64" cy="64" r="34" fill="#ffcf88"/><circle cx="48" cy="54" r="6" fill="#6c7bff"/><circle cx="80" cy="50" r="6" fill="#6c7bff"/><circle cx="64" cy="76" r="6" fill="#6c7bff"/><circle cx="52" cy="72" r="5" fill="#6c7bff"/><circle cx="76" cy="66" r="5" fill="#6c7bff"/></svg>`
  },
  {
    id: 'drink',
    keywords: ['drink', 'cup', 'water', 'thirsty'],
    svg: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true"><rect width="128" height="128" rx="22" fill="#eef7ff"/><rect x="32" y="24" width="64" height="80" rx="20" fill="#9be2ff"/><rect x="48" y="40" width="32" height="32" rx="12" fill="#6c7bff"/><path d="M32 60h64" stroke="#6c7bff" stroke-width="10" stroke-linecap="round"/></svg>`
  },
  {
    id: 'play-outside',
    keywords: ['play', 'outside', 'park', 'swing', 'slide'],
    svg: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true"><rect width="128" height="128" rx="22" fill="#eefcf7"/><circle cx="38" cy="46" r="18" fill="#ffbf7f"/><rect x="28" y="64" width="20" height="40" rx="8" fill="#6c7bff"/><rect x="80" y="36" width="12" height="64" rx="6" fill="#6c7bff"/><path d="M40 84c18-16 36-16 54 0" stroke="#41c188" stroke-width="10" stroke-linecap="round"/></svg>`
  },
  {
    id: 'calm',
    keywords: ['calm', 'breathe', 'relax', 'quiet'],
    svg: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true"><rect width="128" height="128" rx="22" fill="#eefcff"/><path d="M30 80c12-22 56-22 68 0" stroke="#6c7bff" stroke-width="10" stroke-linecap="round" fill="none"/><circle cx="48" cy="56" r="10" fill="#6c7bff"/><circle cx="80" cy="56" r="10" fill="#6c7bff"/><path d="M44 46c6-6 34-6 40 0" stroke="#9cb7ff" stroke-width="8" stroke-linecap="round"/></svg>`
  },
  {
    id: 'all-done',
    keywords: ['finish', 'done', 'end', 'complete'],
    svg: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true"><rect width="128" height="128" rx="22" fill="#ecfff3"/><path d="M40 68l16 16 32-36" stroke="#41c188" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" fill="none"/><circle cx="64" cy="64" r="48" stroke="#9be2ff" stroke-width="8" fill="none"/></svg>`
  },
  {
    id: 'ask-help',
    keywords: ['help', 'ask', 'adult', 'teacher', 'parent'],
    svg: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true"><rect width="128" height="128" rx="22" fill="#f6f0ff"/><circle cx="44" cy="52" r="18" fill="#ffbf7f"/><circle cx="86" cy="44" r="18" fill="#9cb7ff"/><path d="M24 96c8-24 48-24 56 0" fill="#6c7bff"/><path d="M60 80c14-18 42-18 56 0" fill="#d7ddff"/></svg>`
  },
  {
    id: 'brush-teeth',
    keywords: ['brush', 'teeth', 'toothbrush'],
    svg: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true"><rect width="128" height="128" rx="22" fill="#eff8ff"/><rect x="26" y="36" width="76" height="24" rx="12" fill="#6c7bff"/><rect x="26" y="64" width="62" height="12" rx="6" fill="#9cb7ff"/><rect x="32" y="28" width="18" height="8" rx="4" fill="#9cb7ff"/></svg>`
  },
  {
    id: 'bedtime',
    keywords: ['sleep', 'bed', 'night', 'bedtime'],
    svg: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true"><rect width="128" height="128" rx="22" fill="#eef1ff"/><rect x="20" y="60" width="88" height="36" rx="14" fill="#6c7bff"/><rect x="20" y="44" width="52" height="16" rx="8" fill="#9cb7ff"/><circle cx="88" cy="44" r="12" fill="#ffd88a"/></svg>`
  },
  {
    id: 'travel',
    keywords: ['bus', 'car', 'travel', 'go'],
    svg: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true"><rect width="128" height="128" rx="22" fill="#f0fff8"/><rect x="22" y="44" width="84" height="44" rx="14" fill="#6c7bff"/><rect x="26" y="48" width="32" height="24" rx="8" fill="#9be2ff"/><rect x="70" y="48" width="32" height="24" rx="8" fill="#9be2ff"/><circle cx="42" cy="96" r="10" fill="#283044"/><circle cx="86" cy="96" r="10" fill="#283044"/></svg>`
  },
  {
    id: 'school',
    keywords: ['school', 'class', 'teacher', 'learn'],
    svg: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true"><rect width="128" height="128" rx="22" fill="#f0f6ff"/><path d="M24 60l40-24 40 24-40 24-40-24z" fill="#6c7bff"/><path d="M40 70v26h16V80h16v16h16V70" fill="#9cb7ff"/></svg>`
  }
];

const supportiveSteps = [
  { text: 'Ask for help if you need it.', symbolId: 'ask-help' },
  { text: 'Take a calm breath.', symbolId: 'calm' },
  { text: 'All done! Great job.', symbolId: 'all-done' }
];

const rewardPresets = [
  { id: 'star', svg: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><rect width="128" height="128" rx="24" fill="#fff4d6"/><path d="M64 18l14 30 33 4-24 24 6 34-29-16-29 16 6-34-24-24 33-4z" fill="#ffbf3c" stroke="#f39a00" stroke-width="6" stroke-linejoin="round"/></svg>` },
  { id: 'treat', svg: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><rect width="128" height="128" rx="24" fill="#ffe9f4"/><circle cx="64" cy="64" r="34" fill="#ff7bb6"/><circle cx="64" cy="64" r="16" fill="#fff"/></svg>` },
  { id: 'game', svg: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><rect width="128" height="128" rx="24" fill="#eaf7ff"/><rect x="30" y="38" width="68" height="52" rx="16" fill="#6c7bff"/><circle cx="50" cy="64" r="8" fill="#fff"/><circle cx="78" cy="64" r="8" fill="#fff"/><rect x="60" y="52" width="8" height="24" rx="4" fill="#fff"/></svg>` },
  { id: 'book', svg: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><rect width="128" height="128" rx="24" fill="#f4f1ff"/><path d="M38 34h28c8 0 14 6 14 14v58c0-8-6-14-14-14H38z" fill="#6c7bff"/><path d="M90 34H62c-8 0-14 6-14 14v58c0-8 6-14 14-14h28z" fill="#9cb7ff"/></svg>` }
];

const state = {
  stories: [],
  rewards: [],
  currentStory: null,
  sliderIndex: 0,
  mode: 'preview',
  speaking: false,
  selectedRewardImage: null,
  recognition: null,
  dictating: false,
  editingIndex: null,
  selectedSymbolId: null,
  editMode: 'edit'
};

const storyTrack = document.getElementById('storyTrack');
const cardIndicator = document.getElementById('cardIndicator');
const speakStoryButton = document.getElementById('speakStory');
const saveStoryButton = document.getElementById('saveStory');
const prevCardButton = document.getElementById('prevCard');
const nextCardButton = document.getElementById('nextCard');
const viewButtons = Array.from(document.querySelectorAll('.view-button'));
const modeButtons = Array.from(document.querySelectorAll('.mode-button'));
const storyLibrary = document.getElementById('storyLibrary');
const storySelect = document.getElementById('rewardStory');
const rewardList = document.getElementById('rewardList');
const presetImagesContainer = document.getElementById('presetImages');
const celebration = document.getElementById('celebration');
const celebrationImage = document.getElementById('celebrationImage');
const celebrationMessage = document.getElementById('celebrationMessage');
const addCardButton = document.getElementById('addCard');
const cardEditor = document.getElementById('cardEditor');
const cardEditorTitle = document.getElementById('cardEditorTitle');
const cardEditorText = document.getElementById('cardEditorText');
const cardEditorForm = document.getElementById('cardEditorForm');
const cardEditorError = document.getElementById('cardEditorError');
const removeCardButton = document.getElementById('removeCard');
const cardEditorCancel = document.getElementById('cardEditorCancel');
const cardEditorClose = document.getElementById('cardEditorClose');
const symbolOptionsContainer = document.getElementById('symbolOptions');

function init() {
  state.stories = normaliseStories(loadFromStorage(STORAGE_KEYS.stories));
  state.rewards = normaliseRewards(loadFromStorage(STORAGE_KEYS.rewards));
  saveToStorage(STORAGE_KEYS.stories, state.stories);
  saveToStorage(STORAGE_KEYS.rewards, state.rewards);
  renderStoryLibrary();
  populateStorySelect();
  renderRewards();
  renderPresetImages();
  attachEventHandlers();
  setupSpeechRecognition();
  renderSymbolOptions();
  if (cardEditor) {
    cardEditor.setAttribute('aria-hidden', 'true');
  }
}

document.addEventListener('DOMContentLoaded', init);

function attachEventHandlers() {
  document.getElementById('storyForm').addEventListener('submit', handleStorySubmit);
  document.getElementById('clearStory').addEventListener('click', clearStoryForm);
  viewButtons.forEach((button) =>
    button.addEventListener('click', () => switchStoryMode(button.dataset.mode))
  );
  prevCardButton.addEventListener('click', () => moveSlider(-1));
  nextCardButton.addEventListener('click', () => moveSlider(1));
  speakStoryButton.addEventListener('click', playStoryFromStart);
  saveStoryButton.addEventListener('click', saveCurrentStory);
  document.getElementById('dictateButton').addEventListener('click', toggleDictation);
  modeButtons.forEach((button) =>
    button.addEventListener('click', () => switchMainView(button.dataset.target, button))
  );
  document.getElementById('rewardForm').addEventListener('submit', handleRewardSubmit);
  document.getElementById('clearReward').addEventListener('click', clearRewardForm);
  document.getElementById('rewardList').addEventListener('click', handleRewardActions);
  document.getElementById('closeCelebration').addEventListener('click', hideCelebration);
  document.getElementById('rewardImageUpload').addEventListener('change', handleRewardUpload);
  if (addCardButton) {
    addCardButton.addEventListener('click', handleAddCard);
  }
  if (cardEditorForm) {
    cardEditorForm.addEventListener('submit', handleCardEditorSubmit);
  }
  if (removeCardButton) {
    removeCardButton.addEventListener('click', handleRemoveCard);
  }
  if (cardEditorCancel) {
    cardEditorCancel.addEventListener('click', closeCardEditor);
  }
  if (cardEditorClose) {
    cardEditorClose.addEventListener('click', closeCardEditor);
  }
  if (cardEditor) {
    cardEditor.addEventListener('click', (event) => {
      if (event.target === cardEditor) {
        closeCardEditor();
      }
    });
  }
  document.addEventListener('keydown', handleGlobalKeydown);
  updateStoryActions();
}

function loadFromStorage(key) {
  try {
    const data = localStorage.getItem(key);
    if (!data) return [];
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.warn('Unable to read storage', error);
    return [];
  }
}

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function normaliseStories(stories) {
  if (!Array.isArray(stories)) return [];
  return stories
    .map((story) => normaliseStory(story))
    .filter((story) => story && story.cards.length);
}

function normaliseStory(story) {
  if (!story) return null;
  const title = (story.title || '').trim();
  const cards = Array.isArray(story.cards)
    ? story.cards.map((card) => normaliseCard(card)).filter(Boolean)
    : [];
  if (!cards.length || !title) return null;
  return { ...story, title, cards };
}

function normaliseCard(card) {
  if (!card) return null;
  const text = formatCardText(card.text || '');
  if (!text) return null;
  const guessedSymbolId = card.symbolId || findSymbolIdBySvg(card.svg) || pickSymbol(text).id;
  return {
    text,
    symbolId: guessedSymbolId,
    svg: getSymbolSvg(guessedSymbolId)
  };
}

function normaliseRewards(rewards) {
  if (!Array.isArray(rewards)) return [];
  return rewards
    .map((reward) => {
      if (!reward) return null;
      const target = clampNumber(Number(reward.target) || 1, 1, 10);
      const earned = clampNumber(Number(reward.earned) || 0, 0, target);
      return {
        ...reward,
        target,
        earned
      };
    })
    .filter(Boolean);
}

function clampNumber(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function formatCardText(text) {
  const trimmed = (text || '').trim();
  if (!trimmed) return '';
  const capitalised = trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
  return capitalised.length > 120 ? `${capitalised.slice(0, 117)}…` : capitalised;
}

function pickSymbol(text) {
  const lower = (text || '').toLowerCase();
  const match = symbolLibrary.find((symbol) =>
    symbol.keywords.some((keyword) => lower.includes(keyword))
  );
  if (match) return match;
  return symbolLibrary.find((symbol) => symbol.id === 'calm') || symbolLibrary[0];
}

function createCard(text, symbolId) {
  const cleanText = formatCardText(text);
  if (!cleanText) return null;
  const chosenSymbolId = symbolId || pickSymbol(cleanText).id;
  return {
    text: cleanText,
    symbolId: chosenSymbolId,
    svg: getSymbolSvg(chosenSymbolId)
  };
}

function createCardFromText(text) {
  return createCard(text);
}

function findSymbolIdBySvg(svgMarkup) {
  if (!svgMarkup) return null;
  const target = svgMarkup.replace(/\s+/g, '');
  const match = symbolLibrary.find((symbol) => symbol.svg.replace(/\s+/g, '') === target);
  return match ? match.id : null;
}

function resolveCardSvg(card) {
  if (!card) return getSymbolSvg('calm');
  if (card.symbolId) {
    return getSymbolSvg(card.symbolId);
  }
  if (card.svg) {
    return card.svg;
  }
  return getSymbolSvg(pickSymbol(card.text || '').id);
}

function renderSymbolOptions() {
  if (!symbolOptionsContainer) return;
  symbolOptionsContainer.innerHTML = '';
  symbolLibrary.forEach((symbol) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'symbol-option';
    button.dataset.id = symbol.id;
    button.setAttribute('role', 'option');
    button.setAttribute('aria-label', formatSymbolLabel(symbol.id));
    button.setAttribute('aria-selected', 'false');
    button.innerHTML = `${symbol.svg}<span>${formatSymbolLabel(symbol.id)}</span>`;
    button.addEventListener('click', () => selectSymbolOption(symbol.id));
    button.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        selectSymbolOption(symbol.id);
      }
    });
    symbolOptionsContainer.appendChild(button);
  });
}

function selectSymbolOption(symbolId) {
  state.selectedSymbolId = symbolId;
  updateSymbolSelection();
}

function updateSymbolSelection() {
  if (!symbolOptionsContainer) return;
  const options = symbolOptionsContainer.querySelectorAll('.symbol-option');
  options.forEach((option) => {
    const selected = option.dataset.id === state.selectedSymbolId;
    option.classList.toggle('selected', selected);
    option.setAttribute('aria-selected', selected);
  });
}

function formatSymbolLabel(id) {
  return id
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function handleStorySubmit(event) {
  event.preventDefault();
  const title = document.getElementById('storyTitle').value.trim();
  const input = document.getElementById('storyInput').value.trim();
  if (!title || !input) {
    return;
  }
  const cards = buildStoryCards(input);
  if (!cards.length) {
    announce('Please add a little more detail so we can build the story.');
    return;
  }
  state.currentStory = normaliseStory({
    id: state.currentStory?.id ?? null,
    title,
    cards
  });
  if (!state.currentStory) {
    announce('Please include a title and at least three clear steps.');
    return;
  }
  state.sliderIndex = 0;
  renderStoryCards({ initialIndex: 0 });
}

function clearStoryForm() {
  document.getElementById('storyForm').reset();
  state.currentStory = null;
  state.sliderIndex = 0;
  state.editingIndex = null;
  state.selectedSymbolId = null;
  state.editMode = 'edit';
  storyTrack.innerHTML = '';
  storyTrack.style.transform = 'translateX(0)';
  cardIndicator.textContent = 'Create a story to begin.';
  speakStoryButton.disabled = true;
  saveStoryButton.disabled = true;
  prevCardButton.disabled = true;
  nextCardButton.disabled = true;
  if (addCardButton) {
    addCardButton.disabled = true;
  }
  stopSpeaking();
  closeCardEditor();
  updateStoryActions();
}

function buildStoryCards(input) {
  const cleaned = input.replace(/\s+/g, ' ').trim();
  if (!cleaned) return [];
  const rawSegments = cleaned
    .split(/(?<=[\.!\?])/)
    .map((segment) => segment.trim())
    .filter(Boolean);

  let clauses = [];
  rawSegments.forEach((segment) => {
    const parts = segment
      .split(/(?:,|;| and then | then | and | after )/i)
      .map((part) => part.replace(/[\.!?]/g, '').trim())
      .filter(Boolean);
    if (parts.length) {
      clauses.push(...parts);
    }
  });

  if (!clauses.length) {
    clauses = cleaned
      .split(/\bthen\b|\band\b|\bnext\b/i)
      .map((c) => c.trim())
      .filter(Boolean);
  }

  if (!clauses.length) {
    clauses = [cleaned];
  }

  clauses = clauses.map((clause) => simplifySentence(clause));

  if (clauses.length < 3) {
    const fillerPool = supportiveSteps.map((step) => step.text);
    while (clauses.length < 3 && fillerPool.length) {
      const extra = fillerPool.shift();
      if (extra) clauses.push(extra);
    }
  }

  if (clauses.length > 6) {
    clauses = clauses.slice(0, 6);
  }

  let cards = clauses
    .map((text) => createCardFromText(text))
    .filter(Boolean);

  if (cards.length < 3) {
    supportiveSteps.forEach((step) => {
      if (cards.length < 3) {
        const filler = createCard(step.text, step.symbolId);
        if (filler) {
          cards.push(filler);
        }
      }
    });
  }

  return cards.map((card) => normaliseCard(card)).filter(Boolean);
}

function simplifySentence(sentence) {
  const trimmed = sentence.trim();
  if (!trimmed) return '';
  const lower = trimmed.toLowerCase();
  const replacements = [
    { find: 'when you need to', replace: '' },
    { find: 'remember to', replace: '' },
    { find: 'make sure to', replace: '' },
    { find: 'please', replace: '' },
    { find: 'you should', replace: '' }
  ];
  let simplified = lower;
  replacements.forEach(({ find, replace }) => {
    simplified = simplified.replace(find, replace);
  });
  simplified = simplified.replace(/\bthen\b/g, '').replace(/\bfirst\b/g, '').replace(/\bnext\b/g, '');
  simplified = simplified.replace(/[^a-z0-9\s]/gi, ' ').replace(/\s+/g, ' ').trim();
  if (!simplified) {
    simplified = trimmed;
  }
  const capitalised = simplified.charAt(0).toUpperCase() + simplified.slice(1);
  return capitalised.length > 70 ? `${capitalised.slice(0, 67)}…` : capitalised;
}

function getSymbolSvg(id) {
  const match = symbolLibrary.find((symbol) => symbol.id === id);
  return match ? match.svg : symbolLibrary[0].svg;
}

function renderStoryCards({ initialIndex = 0 } = {}) {
  storyTrack.innerHTML = '';
  if (!state.currentStory || !state.currentStory.cards.length) {
    storyTrack.style.transform = 'translateX(0)';
    cardIndicator.textContent = 'Create a story to begin.';
    prevCardButton.disabled = true;
    nextCardButton.disabled = true;
    updateStoryActions();
    return;
  }

  const template = document.getElementById('storyCardTemplate');
  state.currentStory.cards.forEach((card, index) => {
    const node = template.content.firstElementChild.cloneNode(true);
    node.querySelector('.story-icon').innerHTML = resolveCardSvg(card);
    node.querySelector('.story-text').textContent = card.text;
    node.classList.add('editable');
    node.tabIndex = 0;
    node.addEventListener('click', () => openCardEditor(index));
    node.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openCardEditor(index);
      }
    });
    const slide = document.createElement('div');
    slide.className = 'story-slide';
    slide.appendChild(node);
    storyTrack.appendChild(slide);
  });
  const targetIndex = clampNumber(initialIndex, 0, state.currentStory.cards.length - 1);
  setSliderIndex(targetIndex, { speak: false });
  updateSliderButtons();
  updateIndicator();
  updateStoryActions();
}

function setSliderIndex(index, { speak = true } = {}) {
  if (!state.currentStory) return;
  const total = state.currentStory.cards.length;
  state.sliderIndex = Math.min(Math.max(index, 0), total - 1);
  const offset = state.sliderIndex * 100;
  storyTrack.style.transform = `translateX(-${offset}%)`;
  updateSliderButtons();
  updateIndicator();
  highlightActiveCard();
  if (state.mode === 'play' && speak) {
    speakCard(state.sliderIndex);
  }
}

function updateSliderButtons() {
  if (!state.currentStory) {
    prevCardButton.disabled = true;
    nextCardButton.disabled = true;
    return;
  }
  prevCardButton.disabled = state.sliderIndex <= 0;
  nextCardButton.disabled = state.sliderIndex >= state.currentStory.cards.length - 1;
}

function updateIndicator() {
  if (!state.currentStory) {
    cardIndicator.textContent = 'Create a story to begin.';
    return;
  }
  cardIndicator.textContent = `Card ${state.sliderIndex + 1} of ${state.currentStory.cards.length}`;
}

function updateStoryActions() {
  const hasStory = Boolean(state.currentStory && state.currentStory.cards && state.currentStory.cards.length);
  speakStoryButton.disabled = !hasStory;
  saveStoryButton.disabled = !hasStory;
  if (addCardButton) {
    const atLimit = hasStory && state.currentStory.cards.length >= 6;
    addCardButton.disabled = !hasStory || atLimit;
  }
}

function openCardEditor(index, { mode = 'edit' } = {}) {
  if (!cardEditor || !state.currentStory || !Array.isArray(state.currentStory.cards)) {
    return;
  }
  const isAdd = mode === 'add' || index >= state.currentStory.cards.length;
  if (isAdd && state.currentStory.cards.length >= 6) {
    announce('Stories can include up to six cards. Remove one to add another.');
    return;
  }
  switchStoryMode('preview');
  stopSpeaking();
  state.editingIndex = index;
  state.editMode = isAdd ? 'add' : 'edit';
  const existingCard = state.currentStory.cards[index];
  cardEditorTitle.textContent = isAdd ? 'Add card' : `Edit card ${index + 1}`;
  const defaultText = isAdd ? '' : existingCard?.text || '';
  cardEditorText.value = defaultText;
  const fallbackSymbolId = existingCard?.symbolId || pickSymbol(defaultText).id;
  state.selectedSymbolId = fallbackSymbolId || symbolLibrary[0].id;
  updateSymbolSelection();
  if (removeCardButton) {
    const cannotRemove = isAdd || state.currentStory.cards.length <= 3;
    removeCardButton.hidden = cannotRemove;
    removeCardButton.disabled = cannotRemove;
  }
  cardEditorError.textContent = '';
  cardEditor.classList.remove('hidden');
  document.body.classList.add('modal-open');
  cardEditor.setAttribute('aria-hidden', 'false');
  if (!isAdd) {
    setSliderIndex(index, { speak: false });
  }
  setTimeout(() => cardEditorText.focus(), 60);
}

function closeCardEditor() {
  if (!cardEditor || cardEditor.classList.contains('hidden')) {
    return;
  }
  cardEditor.classList.add('hidden');
  cardEditor.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  cardEditorText.value = '';
  cardEditorError.textContent = '';
  state.editingIndex = null;
  state.editMode = 'edit';
  state.selectedSymbolId = null;
  if (removeCardButton) {
    removeCardButton.hidden = false;
    removeCardButton.disabled = false;
  }
}

function handleAddCard() {
  if (!state.currentStory || !state.currentStory.cards) {
    return;
  }
  openCardEditor(state.currentStory.cards.length, { mode: 'add' });
}

function handleCardEditorSubmit(event) {
  event.preventDefault();
  if (!state.currentStory || !Array.isArray(state.currentStory.cards)) {
    return;
  }
  const text = cardEditorText.value;
  const cleanText = formatCardText(text);
  if (!cleanText) {
    cardEditorError.textContent = 'Please add a short sentence for this card.';
    cardEditorText.focus();
    return;
  }
  const symbolId = state.selectedSymbolId || pickSymbol(cleanText).id;
  const card = createCard(cleanText, symbolId);
  if (!card) {
    cardEditorError.textContent = 'Something went wrong. Try again.';
    return;
  }
  const isAdd = state.editMode === 'add' || state.editingIndex === state.currentStory.cards.length;
  if (isAdd) {
    if (state.currentStory.cards.length >= 6) {
      cardEditorError.textContent = 'Stories can include up to six cards.';
      return;
    }
    state.currentStory.cards.push(card);
    state.sliderIndex = state.currentStory.cards.length - 1;
    announce('Added a new card to your story.');
  } else if (typeof state.editingIndex === 'number' && state.editingIndex >= 0) {
    state.currentStory.cards[state.editingIndex] = card;
    state.sliderIndex = state.editingIndex;
    announce('Updated your card.');
  }
  closeCardEditor();
  renderStoryCards({ initialIndex: state.sliderIndex });
}

function handleRemoveCard() {
  if (!state.currentStory || !Array.isArray(state.currentStory.cards)) {
    return;
  }
  if (state.currentStory.cards.length <= 3) {
    cardEditorError.textContent = 'Stories need at least three cards.';
    return;
  }
  if (state.editingIndex == null || state.editingIndex >= state.currentStory.cards.length) {
    return;
  }
  state.currentStory.cards.splice(state.editingIndex, 1);
  if (state.sliderIndex >= state.currentStory.cards.length) {
    state.sliderIndex = Math.max(0, state.currentStory.cards.length - 1);
  }
  announce('Removed the card from your story.');
  closeCardEditor();
  renderStoryCards({ initialIndex: state.sliderIndex });
}

function handleGlobalKeydown(event) {
  if (event.key === 'Escape' && cardEditor && !cardEditor.classList.contains('hidden')) {
    closeCardEditor();
  }
}

function moveSlider(delta) {
  if (!state.currentStory) return;
  setSliderIndex(state.sliderIndex + delta);
}

function switchStoryMode(mode) {
  state.mode = mode;
  viewButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.mode === mode);
  });
  if (mode === 'preview') {
    stopSpeaking();
    removePlayingHighlight();
  } else if (state.currentStory) {
    speakCard(state.sliderIndex);
  }
}

function highlightActiveCard(index = state.sliderIndex) {
  const cards = storyTrack.querySelectorAll('.story-card');
  cards.forEach((card, idx) => {
    card.classList.toggle('playing', idx === index && state.mode === 'play' && state.speaking);
  });
}

function removePlayingHighlight() {
  const cards = storyTrack.querySelectorAll('.story-card');
  cards.forEach((card) => card.classList.remove('playing'));
}

function speakCard(index) {
  if (!('speechSynthesis' in window) || !state.currentStory) return;
  const card = state.currentStory.cards[index];
  if (!card) return;
  stopSpeaking();
  const utterance = new SpeechSynthesisUtterance(card.text);
  utterance.rate = 0.9;
  utterance.pitch = 1;
  state.speaking = true;
  highlightActiveCard(index);
  utterance.onend = () => {
    state.speaking = false;
    highlightActiveCard(index);
  };
  speechSynthesis.speak(utterance);
}

function playStoryFromStart() {
  if (!state.currentStory || !('speechSynthesis' in window)) return;
  stopSpeaking();
  state.speaking = true;
  setSliderIndex(0, { speak: false });
  playSequential(0);
}

function playSequential(index) {
  const cards = state.currentStory.cards;
  const card = cards[index];
  if (!card) {
    state.speaking = false;
    removePlayingHighlight();
    return;
  }
  stopSpeaking();
  state.speaking = true;
  const utterance = new SpeechSynthesisUtterance(card.text);
  utterance.rate = 0.9;
  utterance.pitch = 1;
  highlightActiveCard(index);
  utterance.onend = () => {
    if (!state.speaking) {
      removePlayingHighlight();
      return;
    }
    if (index + 1 < cards.length) {
      setSliderIndex(index + 1, { speak: false });
      playSequential(index + 1);
    } else {
      state.speaking = false;
      removePlayingHighlight();
    }
  };
  speechSynthesis.speak(utterance);
}

function stopSpeaking() {
  if ('speechSynthesis' in window) {
    speechSynthesis.cancel();
  }
  state.speaking = false;
  removePlayingHighlight();
}

function saveCurrentStory() {
  if (!state.currentStory) return;
  const id = state.currentStory.id ?? `story-${Date.now()}`;
  const titleInput = document.getElementById('storyTitle').value.trim();
  if (titleInput) {
    state.currentStory.title = titleInput;
  }
  const storyData = normaliseStory({ id, title: state.currentStory.title, cards: state.currentStory.cards });
  if (!storyData) {
    announce('Please include at least three cards before saving.');
    return;
  }
  const story = { ...storyData, savedAt: new Date().toISOString() };
  const existingIndex = state.stories.findIndex((item) => item.id === id);
  if (existingIndex > -1) {
    state.stories[existingIndex] = story;
  } else {
    state.stories.unshift(story);
  }
  state.currentStory = { ...story };
  saveToStorage(STORAGE_KEYS.stories, state.stories);
  renderStoryLibrary();
  populateStorySelect();
  announce(`Saved story ${story.title}`);
}

function renderStoryLibrary() {
  storyLibrary.innerHTML = '';
  if (!state.stories.length) {
    const empty = document.createElement('p');
    empty.className = 'empty';
    empty.textContent = 'No stories saved yet. Create one above to get started.';
    storyLibrary.appendChild(empty);
    return;
  }
  state.stories.forEach((story) => {
    const card = document.createElement('article');
    card.className = 'library-card';
    card.dataset.id = story.id;
    const icon = document.createElement('div');
    icon.className = 'library-icon';
    icon.innerHTML = resolveCardSvg(story.cards[0]);
    const content = document.createElement('div');
    const title = document.createElement('h4');
    title.textContent = story.title;
    const subtitle = document.createElement('p');
    const steps = story.cards.length;
    subtitle.textContent = `${steps} card${steps === 1 ? '' : 's'} • Tap to preview`;
    content.append(title, subtitle);
    card.append(icon, content);
    card.addEventListener('click', () => loadStoryFromLibrary(story.id));
    storyLibrary.appendChild(card);
  });
}

function loadStoryFromLibrary(id) {
  const story = state.stories.find((item) => item.id === id);
  if (!story) return;
  document.getElementById('storyTitle').value = story.title;
  document.getElementById('storyInput').value = story.cards.map((card) => card.text).join('. ');
  state.currentStory = normaliseStory(story);
  state.sliderIndex = 0;
  renderStoryCards({ initialIndex: 0 });
  switchMainView('story-view');
}

function populateStorySelect() {
  const currentValue = storySelect.value;
  storySelect.innerHTML = '';
  const defaultOption = document.createElement('option');
  defaultOption.value = '';
  defaultOption.textContent = state.stories.length
    ? 'Select a saved story'
    : 'Save a story to link a reward';
  defaultOption.disabled = true;
  if (!currentValue) {
    defaultOption.selected = true;
  }
  storySelect.appendChild(defaultOption);
  state.stories.forEach((story) => {
    const option = document.createElement('option');
    option.value = story.id;
    option.textContent = story.title;
    if (story.id === currentValue) {
      option.selected = true;
      defaultOption.selected = false;
    }
    storySelect.appendChild(option);
  });
  storySelect.disabled = !state.stories.length;
}

function renderPresetImages() {
  presetImagesContainer.innerHTML = '';
  rewardPresets.forEach((preset) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'preset';
    button.innerHTML = preset.svg;
    button.dataset.id = preset.id;
    button.addEventListener('click', () => selectPresetImage(preset));
    presetImagesContainer.appendChild(button);
  });
}

function selectPresetImage(preset) {
  state.selectedRewardImage = preset.svg;
  presetImagesContainer.querySelectorAll('button').forEach((button) => {
    button.classList.toggle('selected', button.dataset.id === preset.id);
  });
  document.getElementById('rewardImageUpload').value = '';
}

async function handleRewardUpload(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const dataUrl = await readFileAsDataURL(file);
  state.selectedRewardImage = `<img src="${dataUrl}" alt="Reward" />`;
  presetImagesContainer.querySelectorAll('button').forEach((button) => button.classList.remove('selected'));
}

async function handleRewardSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const title = document.getElementById('rewardTitle').value.trim();
  const storyId = storySelect.value;
  const target = Number(document.getElementById('rewardTarget').value) || 1;
  const timeframe = document.getElementById('rewardTimeframe').value;
  if (!title) {
    announce('Add a reward title to continue.');
    return;
  }
  if (!storyId) {
    announce('Please choose a story to link your reward.');
    return;
  }

  let imageMarkup = state.selectedRewardImage;
  if (!imageMarkup) {
    const upload = document.getElementById('rewardImageUpload');
    const file = upload.files?.[0];
    if (file) {
      const dataUrl = await readFileAsDataURL(file);
      imageMarkup = `<img src="${dataUrl}" alt="Reward" />`;
    } else {
      const fallback = rewardPresets[0];
      imageMarkup = fallback ? fallback.svg : getSymbolSvg('all-done');
    }
  }

  const reward = {
    id: `reward-${Date.now()}`,
    title,
    storyId,
    target,
    timeframe,
    earned: 0,
    imageMarkup
  };

  state.rewards.unshift(reward);
  saveToStorage(STORAGE_KEYS.rewards, state.rewards);
  renderRewards();
  form.reset();
  state.selectedRewardImage = null;
  document.getElementById('rewardImageUpload').value = '';
  presetImagesContainer.querySelectorAll('button').forEach((button) => button.classList.remove('selected'));
  announce(`Created reward ${title}`);
}

function renderRewards() {
  rewardList.innerHTML = '';
  if (!state.rewards.length) {
    const empty = document.createElement('p');
    empty.className = 'empty';
    empty.textContent = 'No rewards yet. Link a reward to a story to motivate success.';
    rewardList.appendChild(empty);
    return;
  }

  const template = document.getElementById('rewardCardTemplate');
  state.rewards.forEach((reward) => {
    const node = template.content.firstElementChild.cloneNode(true);
    node.dataset.id = reward.id;
    const story = state.stories.find((item) => item.id === reward.storyId);
    const storyIcon = resolveCardSvg(story?.cards?.[0]);
    const rewardIcon = node.querySelector('.reward-icon');
    rewardIcon.innerHTML = reward.imageMarkup;
    node.querySelector('.reward-title').textContent = reward.title;
    node.querySelector('.reward-story').textContent = story ? `For: ${story.title}` : 'Story not found';

    const progress = node.querySelector('.reward-progress');
    progress.innerHTML = '';
    for (let i = 0; i < reward.target; i += 1) {
      const star = document.createElement('div');
      star.className = 'star';
      if (i < reward.earned) {
        star.classList.add('filled');
        star.textContent = '★';
      } else {
        star.textContent = '☆';
      }
      progress.appendChild(star);
    }

    const addButton = node.querySelector('.add-sticker');
    addButton.dataset.id = reward.id;
    const resetButton = node.querySelector('.reset-reward');
    resetButton.dataset.id = reward.id;

    const storyBadge = document.createElement('div');
    storyBadge.className = 'reward-story-icon';
    storyBadge.innerHTML = storyIcon;
    storyBadge.setAttribute('aria-hidden', 'true');
    node.querySelector('.reward-card-header').insertBefore(storyBadge, node.querySelector('.reward-card-header').firstChild);

    rewardList.appendChild(node);
  });
  highlightRewardStoryIcons();
}

function handleRewardActions(event) {
  const button = event.target.closest('button');
  if (!button) return;
  const id = button.dataset.id;
  if (!id) return;
  const reward = state.rewards.find((item) => item.id === id);
  if (!reward) return;

  if (button.classList.contains('add-sticker')) {
    if (reward.earned < reward.target) {
      reward.earned += 1;
      if (reward.earned >= reward.target) {
        triggerCelebration(reward);
      }
      saveToStorage(STORAGE_KEYS.rewards, state.rewards);
      renderRewards();
    }
  } else if (button.classList.contains('reset-reward')) {
    reward.earned = 0;
    saveToStorage(STORAGE_KEYS.rewards, state.rewards);
    renderRewards();
  }
}

function triggerCelebration(reward) {
  const story = state.stories.find((item) => item.id === reward.storyId);
  celebrationMessage.textContent = story
    ? `${reward.title} unlocked for completing “${story.title}”!`
    : `${reward.title} unlocked!`;
  celebrationImage.alt = reward.title || 'Reward';
  if (reward.imageMarkup.includes('src=')) {
    celebrationImage.src = extractImageSrc(reward.imageMarkup);
  } else {
    const svgBlob = new Blob([reward.imageMarkup], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(svgBlob);
    celebrationImage.src = url;
    celebrationImage.onload = () => URL.revokeObjectURL(url);
  }
  celebration.classList.remove('hidden');
}

function extractImageSrc(markup) {
  const match = markup.match(/src=\"([^\"]+)\"/);
  return match ? match[1] : '';
}

function hideCelebration() {
  celebration.classList.add('hidden');
  celebrationImage.removeAttribute('src');
}

function clearRewardForm() {
  document.getElementById('rewardForm').reset();
  state.selectedRewardImage = null;
  document.getElementById('rewardImageUpload').value = '';
  presetImagesContainer.querySelectorAll('button').forEach((button) => button.classList.remove('selected'));
}

function switchMainView(targetId, activeButton) {
  document.querySelectorAll('.view').forEach((view) => {
    view.classList.toggle('active', view.id === targetId);
  });
  if (activeButton) {
    modeButtons.forEach((button) => button.classList.toggle('active', button === activeButton));
  } else {
    modeButtons.forEach((button) => button.classList.toggle('active', button.dataset.target === targetId));
  }
  if (targetId !== 'story-view') {
    stopSpeaking();
  }
}

function toggleDictation() {
  if (!state.recognition) {
    announce('Speech recognition is not supported on this browser.');
    return;
  }
  if (state.dictating) {
    state.recognition.stop();
  } else {
    state.recognition.start();
  }
}

function setupSpeechRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    document.getElementById('dictateStatus').textContent = 'Speech input not supported in this browser.';
    return;
  }
  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'en-GB';

  recognition.onstart = () => {
    state.dictating = true;
    document.getElementById('dictateStatus').textContent = 'Listening…';
  };
  recognition.onresult = (event) => {
    const transcript = Array.from(event.results)
      .map((result) => result[0].transcript)
      .join(' ');
    const textarea = document.getElementById('storyInput');
    textarea.value = `${textarea.value} ${transcript}`.trim();
  };
  recognition.onend = () => {
    state.dictating = false;
    document.getElementById('dictateStatus').textContent = 'Finished listening.';
  };
  recognition.onerror = (event) => {
    state.dictating = false;
    document.getElementById('dictateStatus').textContent = `Speech error: ${event.error}`;
  };

  state.recognition = recognition;
}

function announce(message) {
  const polite = document.getElementById('dictateStatus');
  if (polite) {
    polite.textContent = message;
    setTimeout(() => {
      if (polite.textContent === message) {
        polite.textContent = '';
      }
    }, 4000);
  }
}

function highlightRewardStoryIcons() {
  document.querySelectorAll('.reward-story-icon svg').forEach((svg) => {
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
  });
}

function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

window.addEventListener('beforeunload', () => {
  stopSpeaking();
});
