const messageDisplay = document.getElementById('messageDisplay');
const tabButtons = Array.from(document.querySelectorAll('.tab-button'));
const boards = Array.from(document.querySelectorAll('.board'));

const customModal = document.getElementById('customModal');
const customForm = document.getElementById('customCardForm');
const customTitle = document.getElementById('cardTitle');
const methodButtons = Array.from(document.querySelectorAll('.method-buttons button'));
const methodPanels = Array.from(document.querySelectorAll('.method-panel'));
const imageUpload = document.getElementById('imageUpload');
const drawingCanvas = document.getElementById('drawingCanvas');
const brushSize = document.getElementById('brushSize');
const brushColor = document.getElementById('brushColor');
const clearCanvasBtn = document.getElementById('clearCanvas');
const aiPrompt = document.getElementById('aiPrompt');
const generateAIBtn = document.getElementById('generateAI');
const cardPreview = document.getElementById('cardPreview');
const openGlobalCreator = document.getElementById('openGlobalCreator');

const pickerModal = document.getElementById('pickerModal');
const pickerGrid = document.getElementById('pickerGrid');

const storyModal = document.getElementById('storyModal');
const storyForm = document.getElementById('storyForm');
const storyList = document.getElementById('story-list');

const rewardModal = document.getElementById('rewardModal');
const rewardForm = document.getElementById('rewardForm');
const rewardsGrid = document.getElementById('rewards-grid');

const scheduleList = document.getElementById('schedule-list');

let activeBoardTarget = 'feelings';
let currentMethod = 'upload';
let currentImageData = '';
let nowNextTargetSlot = null;
let drawingCtx;
let drawingActive = false;
let drawingInitialised = false;

const boardConfigs = {
  feelings: {
    element: document.getElementById('feelings-grid'),
    cards: [
      makeCardData('Happy', makeFaceSVG('#ffe8b5', '#ffd58f', '#ffaf87', 'smile')),
      makeCardData('Sad', makeFaceSVG('#d9ecff', '#aaccff', '#6b87d6', 'frown')),
      makeCardData('Tired', makeFaceSVG('#ece4ff', '#cbbdff', '#8d82ff', 'sleepy')),
      makeCardData('Bored', makeFaceSVG('#ffe0d2', '#ffbfa5', '#f49f85', 'flat')),
      makeCardData('Hurt', makeFaceSVG('#ffdbe8', '#ffb3cd', '#f284b6', 'band'))
    ]
  },
  needs: {
    element: document.getElementById('needs-grid'),
    cards: [
      makeCardData('Outside Play', makeSceneSVG('play')),
      makeCardData('Snack', makeSceneSVG('snack')),
      makeCardData('Meal Time', makeSceneSVG('meal')),
      makeCardData('Home', makeSceneSVG('home')),
      makeCardData('Toilet', makeSceneSVG('toilet'))
    ]
  },
  schedule: {
    element: scheduleList,
    cards: []
  },
  stories: {
    element: storyList,
    cards: []
  },
  rewards: {
    element: rewardsGrid,
    cards: []
  }
};

const libraryBoards = ['feelings', 'needs'];

const nowNextSlots = {
  now: null,
  next: null
};

document.addEventListener('DOMContentLoaded', initialise);

function initialise() {
  renderAllBoards();
  attachGlobalEvents();
  updateNowNextDisplay();
}

function attachGlobalEvents() {
  tabButtons.forEach(button => {
    button.addEventListener('click', () => setActiveBoard(button.dataset.target));
  });

  document.querySelectorAll('.add-card').forEach(button => {
    button.addEventListener('click', () => {
      const board = button.dataset.board;
      if (board === 'stories') {
        openStoryModal();
        return;
      }
      if (board === 'rewards') {
        openRewardModal();
        return;
      }
      activeBoardTarget = board;
      openCustomModal();
    });
  });

  document.querySelector('.close-modal').addEventListener('click', closeCustomModal);
  customModal.addEventListener('click', event => {
    if (event.target === customModal) closeCustomModal();
  });

  customForm.addEventListener('submit', handleCustomSubmit);
  imageUpload.addEventListener('change', handleFileUpload);
  methodButtons.forEach(button => {
    button.addEventListener('click', () => switchMethod(button.dataset.method));
  });
  clearCanvasBtn.addEventListener('click', clearCanvas);
  generateAIBtn.addEventListener('click', () => {
    const prompt = aiPrompt.value.trim();
    if (!prompt) {
      aiPrompt.focus();
      return;
    }
    currentImageData = generateAIPlaceholder(prompt);
    updatePreview();
  });
  openGlobalCreator.addEventListener('click', () => {
    activeBoardTarget = document.querySelector('.board.active').dataset.board;
    openCustomModal();
  });

  document.querySelectorAll('.set-slot').forEach(button => {
    button.addEventListener('click', () => {
      nowNextTargetSlot = button.dataset.slot;
      openPicker();
    });
  });

  document.querySelector('.clear-slots').addEventListener('click', () => {
    nowNextSlots.now = null;
    nowNextSlots.next = null;
    updateNowNextDisplay();
  });

  document.querySelectorAll('.now-next-card').forEach(card => {
    card.addEventListener('click', () => {
      nowNextTargetSlot = card.dataset.slot;
      openPicker();
    });
  });

  document.querySelector('.close-picker').addEventListener('click', closePicker);
  pickerModal.addEventListener('click', event => {
    if (event.target === pickerModal) closePicker();
  });

  document.querySelector('.close-story').addEventListener('click', closeStoryModal);
  storyModal.addEventListener('click', event => {
    if (event.target === storyModal) closeStoryModal();
  });
  storyForm.addEventListener('submit', handleStorySubmit);

  document.querySelector('.close-reward').addEventListener('click', closeRewardModal);
  rewardModal.addEventListener('click', event => {
    if (event.target === rewardModal) closeRewardModal();
  });
  rewardForm.addEventListener('submit', handleRewardSubmit);
}

function setActiveBoard(target) {
  boards.forEach(board => {
    board.classList.toggle('active', board.dataset.board === target);
  });
  tabButtons.forEach(button => {
    button.classList.toggle('active', button.dataset.target === target);
  });
}

function renderAllBoards() {
  Object.entries(boardConfigs).forEach(([key, config]) => {
    if (key === 'schedule') {
      renderSchedule();
      return;
    }
    if (key === 'stories') {
      renderStories();
      return;
    }
    if (key === 'rewards') {
      renderRewards();
      return;
    }
    config.element.innerHTML = '';
    config.cards.forEach(card => {
      config.element.appendChild(createCardElement(card, key));
    });
  });
}

function createCardElement(card, boardKey, options = {}) {
  const button = document.createElement('button');
  button.className = 'card';
  button.type = 'button';
  button.dataset.cardId = card.id;
  button.dataset.board = boardKey;
  const message = buildCardSentence(boardKey, card.label);
  button.innerHTML = `
    <img src="${card.image}" alt="${card.label}" />
    <span>${card.label}</span>
  `;
  if (options.onClick) {
    button.addEventListener('click', () => options.onClick(card));
  } else {
    button.addEventListener('click', () => {
      speakCard(message);
      if (nowNextTargetSlot) {
        setNowNextSlot(nowNextTargetSlot, card);
        closePicker();
      }
    });
  }
  return button;
}

function buildCardSentence(boardKey, label) {
  if (boardKey === 'feelings') {
    return `I am ${label}`;
  }
  if (boardKey === 'needs') {
    return `I want ${label}`;
  }
  return label;
}

function speakCard(text) {
  messageDisplay.textContent = text;
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-GB';
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }
}

function openCustomModal() {
  customForm.reset();
  currentImageData = '';
  switchMethod('upload');
  updatePreview();
  customModal.classList.remove('hidden');
  customTitle.focus();
  if (currentMethod === 'draw') setupDrawing();
}

function closeCustomModal() {
  customModal.classList.add('hidden');
}

function switchMethod(method) {
  currentMethod = method;
  methodButtons.forEach(button => {
    const isActive = button.dataset.method === method;
    button.setAttribute('aria-selected', isActive);
    button.setAttribute('tabindex', isActive ? '0' : '-1');
  });
  methodPanels.forEach(panel => {
    panel.classList.toggle('hidden', panel.dataset.panel !== method);
  });
  if (method === 'draw') {
    setupDrawing();
    clearCanvas();
  }
  if (method === 'upload') {
    imageUpload.value = '';
  }
  if (method === 'ai') {
    aiPrompt.focus();
  }
}

function handleFileUpload(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    currentImageData = reader.result;
    updatePreview();
  };
  reader.readAsDataURL(file);
}

function setupDrawing() {
  if (!drawingCanvas || drawingInitialised) return;
  drawingCtx = drawingCanvas.getContext('2d');
  drawingCtx.lineCap = 'round';
  drawingCtx.lineJoin = 'round';
  drawingCtx.fillStyle = '#fff';
  drawingCtx.fillRect(0, 0, drawingCanvas.width, drawingCanvas.height);
  drawingCanvas.addEventListener('pointerdown', beginStroke);
  drawingCanvas.addEventListener('pointermove', drawStroke);
  drawingCanvas.addEventListener('pointerup', endStroke);
  drawingCanvas.addEventListener('pointerleave', endStroke);
  drawingInitialised = true;
  currentImageData = drawingCanvas.toDataURL('image/png');
  updatePreview();
}

function beginStroke(event) {
  drawingActive = true;
  drawingCtx.beginPath();
  drawingCtx.moveTo(event.offsetX, event.offsetY);
}

function drawStroke(event) {
  if (!drawingActive) return;
  drawingCtx.lineWidth = parseInt(brushSize.value, 10);
  drawingCtx.strokeStyle = brushColor.value;
  drawingCtx.lineTo(event.offsetX, event.offsetY);
  drawingCtx.stroke();
  currentImageData = drawingCanvas.toDataURL('image/png');
  updatePreview();
}

function endStroke() {
  drawingActive = false;
  drawingCtx.closePath();
}

function clearCanvas() {
  if (!drawingCtx) return;
  drawingCtx.fillStyle = '#fff';
  drawingCtx.fillRect(0, 0, drawingCanvas.width, drawingCanvas.height);
  drawingCtx.beginPath();
  currentImageData = drawingCanvas.toDataURL('image/png');
  updatePreview();
}

function generateAIPlaceholder(prompt) {
  const canvas = document.createElement('canvas');
  canvas.width = 480;
  canvas.height = 360;
  const context = canvas.getContext('2d');
  const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, '#f7e6ff');
  gradient.addColorStop(1, '#ffe7f1');
  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = 'rgba(255,255,255,0.86)';
  context.fillRect(24, 24, canvas.width - 48, canvas.height - 48);
  context.fillStyle = '#8f7bff';
  context.font = 'bold 52px "Nunito"';
  context.fillText('AI', 36, 80);
  context.fillStyle = '#5a5078';
  context.font = 'bold 32px "Nunito"';
  wrapText(context, prompt, 36, 140, canvas.width - 72, 42);
  return canvas.toDataURL('image/png');
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '';
  for (let i = 0; i < words.length; i += 1) {
    const testLine = `${line}${words[i]} `;
    if (ctx.measureText(testLine).width > maxWidth && i > 0) {
      ctx.fillText(line.trim(), x, y);
      line = `${words[i]} `;
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line.trim(), x, y);
}

function updatePreview() {
  if (!currentImageData) {
    cardPreview.textContent = 'Image preview will appear here.';
    return;
  }
  const img = document.createElement('img');
  img.src = currentImageData;
  img.alt = 'Card preview';
  cardPreview.innerHTML = '';
  cardPreview.appendChild(img);
}

function handleCustomSubmit(event) {
  event.preventDefault();
  const label = customTitle.value.trim();
  if (!label) {
    customTitle.focus();
    return;
  }
  if (!currentImageData) {
    if (currentMethod === 'draw') {
      currentImageData = drawingCanvas.toDataURL('image/png');
    }
  }
  if (!currentImageData) {
    imageUpload.focus();
    return;
  }
  const card = makeCardData(label, currentImageData);
  if (activeBoardTarget === 'schedule') {
    const timeNote = prompt('Add a time or note (optional)')?.trim();
    card.time = timeNote || '';
    boardConfigs.schedule.cards.push(card);
    renderSchedule();
  } else {
    boardConfigs[activeBoardTarget].cards.push(card);
    renderAllBoards();
    if (libraryBoards.includes(activeBoardTarget)) {
      updatePickerLibrary();
    }
  }
  closeCustomModal();
}

function renderSchedule() {
  scheduleList.innerHTML = '';
  if (!boardConfigs.schedule.cards.length) {
    const empty = document.createElement('p');
    empty.className = 'schedule-empty';
    empty.textContent = "Add activities to build today's plan.";
    scheduleList.appendChild(empty);
    return;
  }
  boardConfigs.schedule.cards.forEach(item => {
    const card = document.createElement('article');
    card.className = 'schedule-card';
    if (item.image) {
      const img = document.createElement('img');
      img.src = item.image;
      img.alt = item.label;
      card.appendChild(img);
    }
    const info = document.createElement('div');
    info.className = 'info';
    const title = document.createElement('h3');
    title.textContent = item.label;
    info.appendChild(title);
    if (item.time) {
      const time = document.createElement('p');
      time.textContent = item.time;
      info.appendChild(time);
    }
    card.appendChild(info);
    card.addEventListener('click', () => speakCard(item.label));
    scheduleList.appendChild(card);
  });
}

function openPicker() {
  updatePickerLibrary();
  pickerModal.classList.remove('hidden');
}

function closePicker() {
  pickerModal.classList.add('hidden');
  nowNextTargetSlot = null;
}

function updatePickerLibrary() {
  pickerGrid.innerHTML = '';
  libraryBoards.forEach(boardKey => {
    boardConfigs[boardKey].cards.forEach(card => {
      const button = createCardElement(card, boardKey, {
        onClick: selected => {
          setNowNextSlot(nowNextTargetSlot, selected);
          closePicker();
        }
      });
      pickerGrid.appendChild(button);
    });
  });
}

function setNowNextSlot(slot, card) {
  if (!slot) return;
  nowNextSlots[slot] = card;
  updateNowNextDisplay();
}

function updateNowNextDisplay() {
  document.querySelectorAll('.now-next-card').forEach(panel => {
    const slot = panel.dataset.slot;
    const body = panel.querySelector('.now-next-body');
    const data = nowNextSlots[slot];
    if (!data) {
      body.innerHTML = 'Tap to set';
      body.classList.remove('filled');
      return;
    }
    body.classList.add('filled');
    body.innerHTML = `
      <img src="${data.image}" alt="${data.label}" />
      <span>${data.label}</span>
    `;
  });
}

function handleStorySubmit(event) {
  event.preventDefault();
  const title = document.getElementById('storyTitle').value.trim();
  const steps = document.getElementById('storySteps').value
    .split('\n')
    .map(step => step.trim())
    .filter(Boolean);
  if (!title || !steps.length) return;
  boardConfigs.stories.cards.push({ id: createId(), title, steps });
  renderStories();
  storyForm.reset();
  closeStoryModal();
}

function renderStories() {
  storyList.innerHTML = '';
  if (!boardConfigs.stories.cards.length) {
    const empty = document.createElement('p');
    empty.className = 'story-empty';
    empty.textContent = 'Create step-by-step stories to practise social skills.';
    storyList.appendChild(empty);
    return;
  }
  boardConfigs.stories.cards.forEach(story => {
    const article = document.createElement('article');
    article.className = 'story-card';
    const title = document.createElement('h3');
    title.textContent = story.title;
    const list = document.createElement('ol');
    story.steps.forEach(step => {
      const li = document.createElement('li');
      li.textContent = step;
      list.appendChild(li);
    });
    article.appendChild(title);
    article.appendChild(list);
    storyList.appendChild(article);
  });
}

function openStoryModal() {
  storyModal.classList.remove('hidden');
  document.getElementById('storyTitle').focus();
}

function closeStoryModal() {
  storyModal.classList.add('hidden');
}

function handleRewardSubmit(event) {
  event.preventDefault();
  const title = document.getElementById('rewardTitle').value.trim();
  if (!title) return;
  const notes = document.getElementById('rewardNotes').value.trim();
  boardConfigs.rewards.cards.push({ id: createId(), label: title, notes });
  renderRewards();
  rewardForm.reset();
  closeRewardModal();
}

function renderRewards() {
  rewardsGrid.innerHTML = '';
  if (!boardConfigs.rewards.cards.length) {
    const empty = document.createElement('p');
    empty.className = 'story-empty';
    empty.textContent = 'Add motivators and treats to celebrate progress.';
    rewardsGrid.appendChild(empty);
    return;
  }
  boardConfigs.rewards.cards.forEach(reward => {
    const article = document.createElement('article');
    article.className = 'reward-card';
    const title = document.createElement('h3');
    title.textContent = reward.label;
    const notes = document.createElement('p');
    notes.textContent = reward.notes || 'Tap to celebrate this reward!';
    article.appendChild(title);
    article.appendChild(notes);
    article.addEventListener('click', () => speakCard(reward.label));
    rewardsGrid.appendChild(article);
  });
}

function openRewardModal() {
  rewardModal.classList.remove('hidden');
  document.getElementById('rewardTitle').focus();
}

function closeRewardModal() {
  rewardModal.classList.add('hidden');
}

function makeCardData(label, image, extra = {}) {
  return { id: createId(), label, image, ...extra };
}

function makeFaceSVG(baseColour, borderColour, detailColour, type) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  svg.setAttribute('viewBox', '0 0 200 200');

  const face = document.createElementNS(svg.namespaceURI, 'circle');
  face.setAttribute('cx', '100');
  face.setAttribute('cy', '100');
  face.setAttribute('r', '88');
  face.setAttribute('fill', baseColour);
  face.setAttribute('stroke', borderColour);
  face.setAttribute('stroke-width', '12');
  svg.appendChild(face);

  const leftEye = document.createElementNS(svg.namespaceURI, 'circle');
  leftEye.setAttribute('cx', '70');
  leftEye.setAttribute('cy', '92');
  leftEye.setAttribute('r', '10');
  leftEye.setAttribute('fill', '#1a1a1a');
  const rightEye = leftEye.cloneNode();
  rightEye.setAttribute('cx', '130');
  svg.appendChild(leftEye);
  svg.appendChild(rightEye);

  const mouth = document.createElementNS(svg.namespaceURI, 'path');
  mouth.setAttribute('fill', 'none');
  mouth.setAttribute('stroke', detailColour);
  mouth.setAttribute('stroke-width', '12');
  mouth.setAttribute('stroke-linecap', 'round');

  if (type === 'smile') {
    mouth.setAttribute('d', 'M60 125 Q100 165 140 125');
  } else if (type === 'frown') {
    mouth.setAttribute('d', 'M60 150 Q100 110 140 150');
  } else if (type === 'flat') {
    mouth.setAttribute('d', 'M60 140 L140 140');
  } else if (type === 'sleepy') {
    const closedEyes = document.createElementNS(svg.namespaceURI, 'path');
    closedEyes.setAttribute('d', 'M55 105 Q70 85 85 105 M115 105 Q130 85 145 105');
    closedEyes.setAttribute('stroke', '#1a1a1a');
    closedEyes.setAttribute('stroke-width', '8');
    closedEyes.setAttribute('stroke-linecap', 'round');
    closedEyes.setAttribute('fill', 'none');
    svg.appendChild(closedEyes);
    mouth.setAttribute('d', 'M70 150 Q100 170 130 150');
  } else if (type === 'band') {
    const band = document.createElementNS(svg.namespaceURI, 'rect');
    band.setAttribute('x', '45');
    band.setAttribute('y', '82');
    band.setAttribute('width', '110');
    band.setAttribute('height', '36');
    band.setAttribute('rx', '18');
    band.setAttribute('fill', detailColour);
    svg.appendChild(band);
    const patch = document.createElementNS(svg.namespaceURI, 'rect');
    patch.setAttribute('x', '92');
    patch.setAttribute('y', '90');
    patch.setAttribute('width', '20');
    patch.setAttribute('height', '20');
    patch.setAttribute('fill', '#ffe4ea');
    svg.appendChild(patch);
    mouth.setAttribute('d', 'M65 150 Q100 180 135 150');
  }

  svg.appendChild(mouth);
  return svgToDataURL(svg);
}

function makeSceneSVG(type) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  svg.setAttribute('viewBox', '0 0 200 200');

  const frame = document.createElementNS(svg.namespaceURI, 'rect');
  frame.setAttribute('width', '200');
  frame.setAttribute('height', '200');
  frame.setAttribute('rx', '26');
  frame.setAttribute('fill', '#ffffff');
  frame.setAttribute('stroke', '#8f7bff');
  frame.setAttribute('stroke-width', '8');
  svg.appendChild(frame);

  if (type === 'play') {
    addPlaygroundScene(svg);
  } else if (type === 'snack') {
    addSnackScene(svg);
  } else if (type === 'meal') {
    addMealScene(svg);
  } else if (type === 'home') {
    addHomeScene(svg);
  } else if (type === 'toilet') {
    addToiletScene(svg);
  }

  return svgToDataURL(svg);
}

function addPlaygroundScene(svg) {
  const ns = svg.namespaceURI;
  const sky = document.createElementNS(ns, 'rect');
  sky.setAttribute('x', '24');
  sky.setAttribute('y', '28');
  sky.setAttribute('width', '152');
  sky.setAttribute('height', '90');
  sky.setAttribute('fill', '#dceeff');
  svg.appendChild(sky);

  const ground = document.createElementNS(ns, 'rect');
  ground.setAttribute('x', '24');
  ground.setAttribute('y', '118');
  ground.setAttribute('width', '152');
  ground.setAttribute('height', '58');
  ground.setAttribute('fill', '#d8f2da');
  svg.appendChild(ground);

  const frame = document.createElementNS(ns, 'path');
  frame.setAttribute('d', 'M60 40 L40 180 M140 40 L160 180 M40 180 L160 180');
  frame.setAttribute('stroke', '#ffb7c5');
  frame.setAttribute('stroke-width', '10');
  frame.setAttribute('fill', 'none');
  svg.appendChild(frame);

  const seat = document.createElementNS(ns, 'rect');
  seat.setAttribute('x', '82');
  seat.setAttribute('y', '92');
  seat.setAttribute('width', '36');
  seat.setAttribute('height', '28');
  seat.setAttribute('fill', '#ff8fab');
  svg.appendChild(seat);

  const ropes = document.createElementNS(ns, 'path');
  ropes.setAttribute('d', 'M82 42 L82 102 M118 42 L118 102');
  ropes.setAttribute('stroke', '#b38b6d');
  ropes.setAttribute('stroke-width', '6');
  svg.appendChild(ropes);

  const sun = document.createElementNS(ns, 'circle');
  sun.setAttribute('cx', '48');
  sun.setAttribute('cy', '58');
  sun.setAttribute('r', '12');
  sun.setAttribute('fill', '#ffe29d');
  svg.appendChild(sun);
}

function addSnackScene(svg) {
  const ns = svg.namespaceURI;
  const plate = document.createElementNS(ns, 'ellipse');
  plate.setAttribute('cx', '100');
  plate.setAttribute('cy', '135');
  plate.setAttribute('rx', '74');
  plate.setAttribute('ry', '28');
  plate.setAttribute('fill', '#f7f4ff');
  plate.setAttribute('stroke', '#d2c2ff');
  plate.setAttribute('stroke-width', '6');
  svg.appendChild(plate);

  const apple = document.createElementNS(ns, 'path');
  apple.setAttribute('d', 'M82 88 C62 88 54 112 68 132 C74 140 96 150 106 140 C124 150 146 134 140 114 C136 94 114 78 98 86 Z');
  apple.setAttribute('fill', '#ff9fb2');
  svg.appendChild(apple);

  const leaf = document.createElementNS(ns, 'path');
  leaf.setAttribute('d', 'M108 72 C124 62 136 66 144 80 C126 80 118 76 108 72');
  leaf.setAttribute('fill', '#8fcaa9');
  svg.appendChild(leaf);

  const drink = document.createElementNS(ns, 'rect');
  drink.setAttribute('x', '128');
  drink.setAttribute('y', '64');
  drink.setAttribute('width', '32');
  drink.setAttribute('height', '70');
  drink.setAttribute('fill', '#c9ecff');
  drink.setAttribute('stroke', '#8db6f4');
  drink.setAttribute('stroke-width', '6');
  svg.appendChild(drink);

  const biscuit = document.createElementNS(ns, 'circle');
  biscuit.setAttribute('cx', '70');
  biscuit.setAttribute('cy', '118');
  biscuit.setAttribute('r', '16');
  biscuit.setAttribute('fill', '#ffe8cc');
  svg.appendChild(biscuit);
}

function addMealScene(svg) {
  const ns = svg.namespaceURI;
  const plate = document.createElementNS(ns, 'circle');
  plate.setAttribute('cx', '100');
  plate.setAttribute('cy', '108');
  plate.setAttribute('r', '68');
  plate.setAttribute('fill', '#fff5d6');
  plate.setAttribute('stroke', '#f7c26c');
  plate.setAttribute('stroke-width', '6');
  svg.appendChild(plate);

  const spoon = document.createElementNS(ns, 'path');
  spoon.setAttribute('d', 'M48 60 C62 50 82 52 82 72 C82 90 68 100 48 86 L48 148 Q48 156 38 156 Q28 156 28 148 L28 86');
  spoon.setAttribute('fill', '#dcd6f7');
  svg.appendChild(spoon);

  const fork = document.createElementNS(ns, 'path');
  fork.setAttribute('d', 'M150 52 L150 148 Q150 158 160 158 Q170 158 170 148 L170 52');
  fork.setAttribute('stroke', '#dcd6f7');
  fork.setAttribute('stroke-width', '12');
  fork.setAttribute('fill', 'none');
  svg.appendChild(fork);

  const meal = document.createElementNS(ns, 'path');
  meal.setAttribute('d', 'M74 110 Q100 136 126 110');
  meal.setAttribute('stroke', '#f4a259');
  meal.setAttribute('stroke-width', '10');
  meal.setAttribute('fill', 'none');
  svg.appendChild(meal);

  const steam = document.createElementNS(ns, 'path');
  steam.setAttribute('d', 'M94 74 Q100 60 108 72');
  steam.setAttribute('stroke', '#f4a259');
  steam.setAttribute('stroke-width', '6');
  steam.setAttribute('fill', 'none');
  steam.setAttribute('stroke-linecap', 'round');
  svg.appendChild(steam);
}

function addHomeScene(svg) {
  const ns = svg.namespaceURI;
  const house = document.createElementNS(ns, 'rect');
  house.setAttribute('x', '52');
  house.setAttribute('y', '94');
  house.setAttribute('width', '96');
  house.setAttribute('height', '78');
  house.setAttribute('fill', '#ffeedd');
  house.setAttribute('stroke', '#f5b79d');
  house.setAttribute('stroke-width', '6');
  svg.appendChild(house);

  const roof = document.createElementNS(ns, 'path');
  roof.setAttribute('d', 'M40 100 L100 46 L160 100 Z');
  roof.setAttribute('fill', '#ff9aae');
  svg.appendChild(roof);

  const door = document.createElementNS(ns, 'rect');
  door.setAttribute('x', '90');
  door.setAttribute('y', '126');
  door.setAttribute('width', '28');
  door.setAttribute('height', '46');
  door.setAttribute('fill', '#c19988');
  svg.appendChild(door);

  const window = document.createElementNS(ns, 'rect');
  window.setAttribute('x', '64');
  window.setAttribute('y', '116');
  window.setAttribute('width', '24');
  window.setAttribute('height', '24');
  window.setAttribute('fill', '#d7ecff');
  svg.appendChild(window);

  const window2 = window.cloneNode();
  window2.setAttribute('x', '116');
  svg.appendChild(window2);

  const heart = document.createElementNS(ns, 'path');
  heart.setAttribute('d', 'M100 72 C88 60 66 64 66 86 C66 108 100 126 100 126 C100 126 134 108 134 86 C134 64 112 60 100 72 Z');
  heart.setAttribute('fill', 'rgba(255, 155, 170, 0.35)');
  svg.appendChild(heart);
}

function addToiletScene(svg) {
  const ns = svg.namespaceURI;
  const tank = document.createElementNS(ns, 'rect');
  tank.setAttribute('x', '68');
  tank.setAttribute('y', '60');
  tank.setAttribute('width', '64');
  tank.setAttribute('height', '32');
  tank.setAttribute('fill', '#d7f4f6');
  svg.appendChild(tank);

  const bowl = document.createElementNS(ns, 'rect');
  bowl.setAttribute('x', '68');
  bowl.setAttribute('y', '94');
  bowl.setAttribute('width', '64');
  bowl.setAttribute('height', '70');
  bowl.setAttribute('fill', '#eefbff');
  bowl.setAttribute('stroke', '#8ccfd6');
  bowl.setAttribute('stroke-width', '8');
  svg.appendChild(bowl);

  const flush = document.createElementNS(ns, 'circle');
  flush.setAttribute('cx', '134');
  flush.setAttribute('cy', '74');
  flush.setAttribute('r', '8');
  flush.setAttribute('fill', '#8ccfd6');
  svg.appendChild(flush);

  const base = document.createElementNS(ns, 'rect');
  base.setAttribute('x', '84');
  base.setAttribute('y', '162');
  base.setAttribute('width', '32');
  base.setAttribute('height', '18');
  base.setAttribute('fill', '#d7f4f6');
  svg.appendChild(base);

  const sparkle = document.createElementNS(ns, 'path');
  sparkle.setAttribute('d', 'M140 120 L146 132 L160 134 L148 142 L150 156 L140 148 L130 156 L132 142 L120 134 L134 132 Z');
  sparkle.setAttribute('fill', 'rgba(143, 123, 255, 0.25)');
  svg.appendChild(sparkle);
}

function svgToDataURL(svg) {
  const serializer = new XMLSerializer();
  const source = serializer.serializeToString(svg);
  return `data:image/svg+xml;base64,${btoa(source)}`;
}

function createId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `card-${Date.now().toString(36)}-${Math.random().toString(16).slice(2)}`;
}
const buttons = document.querySelectorAll('.icon-button');
const display = document.getElementById('selected-message');

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const message = button.dataset.message;
    display.textContent = message;
  });
});
