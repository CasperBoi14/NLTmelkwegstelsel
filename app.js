const bodies = [
  {
    name: 'Zon',
    type: 'Ster',
    summary: 'De ster in het midden van het zonnestelsel.',
    description: 'De zon levert licht en warmte en houdt alle planeten door zwaartekracht in hun baan.',
    diameter: 1392700,
    distance: 150000000,
    diameterLabel: '1.392.700 km',
    distanceLabel: '150 miljoen km',
    color: '#f8c94d',
    modelPath: 'model/sun.glb',
  },
  {
    name: 'Mercurius',
    type: 'Planeet',
    summary: 'De kleinste en snelste planeet.',
    description: 'Mercurius draait het dichtst om de zon en heeft extreme temperatuurverschillen tussen dag en nacht.',
    diameter: 4879,
    distance: 77000000,
    diameterLabel: '4.879 km',
    distanceLabel: '± 77 miljoen km',
    color: '#b8a898',
    modelPath: 'model/mercury.glb',
  },
  {
    name: 'Venus',
    type: 'Planeet',
    summary: 'Heet, dik en giftig.',
    description: 'Venus heeft een zeer dichte atmosfeer en is daardoor de heetste planeet in het zonnestelsel.',
    diameter: 12104,
    distance: 41000000,
    diameterLabel: '12.104 km',
    distanceLabel: '± 41 miljoen km',
    color: '#e8c880',
    modelPath: 'model/venus.glb',
  },
  {
    name: 'Aarde',
    type: 'Planeet',
    summary: 'Onze leefwereld.',
    description: 'De aarde is de enige bekende planeet met vloeibaar water aan het oppervlak en een atmosfeer rijk aan zuurstof.',
    diameter: 12742,
    distance: 0,
    diameterLabel: '12.742 km',
    distanceLabel: '0 km',
    color: '#5d9dff',
    modelPath: 'model/earth.glb',
  },
  {
    name: 'Mars',
    type: 'Planeet',
    summary: 'De rode planeet.',
    description: 'Mars staat bekend om zijn rode oppervlak, vulkanen, ijskappen en de zoektocht naar vroeg leven.',
    diameter: 6779,
    distance: 225000000,
    diameterLabel: '6.779 km',
    distanceLabel: '± 225 miljoen km',
    color: '#cc5533',
    modelPath: 'model/planet_mars_-_nasa_mars_landing_2021.glb',
  },
  {
    name: 'Jupiter',
    type: 'Planeet',
    summary: 'De grootste gasreus.',
    description: 'Jupiter is de grootste planeet en heeft een beroemde storm, de Grote Rode Vlek.',
    diameter: 139820,
    distance: 588000000,
    diameterLabel: '139.820 km',
    distanceLabel: '± 588 miljoen km',
    color: '#c8a870',
    modelPath: 'model/jupiter.glb',
  },
  {
    name: 'Saturnus',
    type: 'Planeet',
    summary: 'Beroemd om de ringen.',
    description: 'Saturnus heeft spectaculaire ringen van ijs en steen en is een elegante gasplaneet.',
    diameter: 116460,
    distance: 1200000000,
    diameterLabel: '116.460 km',
    distanceLabel: '± 1,2 miljard km',
    color: '#e8d8a0',
    modelPath: 'model/saturn.glb',
  },
  {
    name: 'Uranus',
    type: 'Planeet',
    summary: 'De gekantelde ijsreus.',
    description: 'Uranus draait bijna op zijn zij en lijkt blauwgroen door methaan in de atmosfeer.',
    diameter: 50724,
    distance: 2600000000,
    diameterLabel: '50.724 km',
    distanceLabel: '± 2,6 miljard km',
    color: '#88e8e8',
    modelPath: 'model/uranus.glb',
  },
  {
    name: 'Neptunus',
    type: 'Planeet',
    summary: 'Winderig en diepblauw.',
    description: 'Neptunus is de verste grote planeet en staat bekend om hevige stormen en sterke winden.',
    diameter: 49244,
    distance: 4300000000,
    diameterLabel: '49.244 km',
    distanceLabel: '± 4,3 miljard km',
    color: '#3050e8',
    modelPath: 'model/neptune.glb',
  },
];

const quizQuestions = [
  {
    question: 'Welke planeet heeft de ringen?',
    answers: ['Mars', 'Saturnus', 'Venus'],
    correct: 'Saturnus',
  },
  {
    question: 'Welke planeet staat het dichtst bij de zon?',
    answers: ['Mercurius', 'Aarde', 'Neptunus'],
    correct: 'Mercurius',
  },
  {
    question: 'Welke planeet heeft de sterkste winden?',
    answers: ['Uranus', 'Neptunus', 'Jupiter'],
    correct: 'Neptunus',
  },
];

const selectedName = document.getElementById('selected-name');
const selectedSummary = document.getElementById('selected-summary');
const selectedDescription = document.getElementById('selected-description');
const selectedDiameter = document.getElementById('selected-diameter');
const selectedDistance = document.getElementById('selected-distance');
const selectedType = document.getElementById('selected-type');
const selectedModel = document.getElementById('selected-model');
const picker = document.getElementById('planet-picker');
const overviewChart = document.getElementById('overview-chart');
const overviewToggle = document.getElementById('overview-toggle');
const overviewModeLabel = document.getElementById('overview-mode-label');
const modelGrid = document.getElementById('model-grid');
const quiz = document.getElementById('quiz');

let overviewMode = 'diameter';

function setSelectedBody(index) {
  const body = bodies[index];

  selectedName.textContent = body.name;
  selectedSummary.textContent = body.summary;
  selectedDescription.textContent = body.description;
  selectedDiameter.textContent = body.diameterLabel;
  selectedDistance.textContent = body.distanceLabel;
  selectedType.textContent = body.type;

  if (body.modelPath) {
    selectedModel.src = body.modelPath;
    selectedModel.setAttribute('alt', `3D model van ${body.name}`);
    selectedModel.style.display = 'block';
  } else {
    selectedModel.removeAttribute('src');
    selectedModel.style.display = 'none';
  }

  picker.querySelectorAll('.chip').forEach((chip, chipIndex) => {
    chip.classList.toggle('is-active', chipIndex === index);
  });
}

function updateOverview() {
  const maxDiameter = Math.max(...bodies.map((body) => body.diameter));
  const maxDistance = Math.max(...bodies.map((body) => body.distance));
  const metricKey = overviewMode === 'diameter' ? 'diameter' : 'distance';
  const metricLabel = overviewMode === 'diameter' ? 'Diameter' : 'Afstand';
  const metricMax = overviewMode === 'diameter' ? maxDiameter : maxDistance;

  overviewChart.innerHTML = bodies.map((body) => {
    const metricValue = body[metricKey];
    const metricWidth = metricValue === 0
      ? 4
      : Math.max(4, (metricValue / metricMax) * 100);
    const metricText = overviewMode === 'diameter' ? body.diameterLabel : body.distanceLabel;

    return `
      <div class="overview-row">
        <div class="overview-name">${body.name}</div>
        <div class="bar-wrap" aria-hidden="true">
          <div class="bar ${overviewMode === 'diameter' ? 'bar--diameter' : 'bar--distance'}" style="width:${Math.min(metricWidth, 100)}%"></div>
        </div>
        <div class="overview-metric"><span>${metricLabel}</span><strong>${metricText}</strong></div>
      </div>
    `;
  }).join('');
}

function buildPicker() {
  picker.innerHTML = bodies.map((body, index) => `
    <button class="chip" type="button" data-index="${index}">${body.name}</button>
  `).join('');

  picker.addEventListener('click', (event) => {
    const chip = event.target.closest('.chip');
    if (!chip) return;
    setSelectedBody(Number(chip.dataset.index));
  });
}

function buildModelGrid() {
  modelGrid.innerHTML = bodies.map((body) => {
    const viewer = body.modelPath
      ? `<model-viewer src="${body.modelPath}" alt="3D model van ${body.name}" auto-rotate camera-controls shadow-intensity="1" exposure="1.1" interaction-prompt="none" reveal="auto"></model-viewer>`
      : `<div class="model-fallback">Geen GLB beschikbaar</div>`;

    return `
      <article class="model-card">
        ${viewer}
        <h3>${body.name}</h3>
        <p>${body.summary}</p>
      </article>
    `;
  }).join('');
}

function buildQuiz() {
  quiz.innerHTML = quizQuestions.map((item, questionIndex) => `
    <article class="quiz-question" data-question-index="${questionIndex}">
      <h3>${item.question}</h3>
      <div class="answer-row">
        ${item.answers.map((answer) => `<button type="button" data-answer="${answer}">${answer}</button>`).join('')}
      </div>
      <p class="quiz-feedback" aria-live="polite"></p>
    </article>
  `).join('') + `<div class="quiz-score" id="quiz-score">Score: 0 / ${quizQuestions.length}</div>`;

  quiz.querySelectorAll('.quiz-question').forEach((questionEl, questionIndex) => {
    questionEl.addEventListener('click', (event) => {
      const button = event.target.closest('button[data-answer]');
      if (!button) return;

      const question = quizQuestions[questionIndex];
      const feedback = questionEl.querySelector('.quiz-feedback');
      const buttons = questionEl.querySelectorAll('button[data-answer]');
      const isCorrect = button.dataset.answer === question.correct;

      buttons.forEach((answerButton) => {
        answerButton.disabled = true;
        if (answerButton.dataset.answer === question.correct) {
          answerButton.classList.add('is-correct');
        }
      });

      if (!isCorrect) {
        button.classList.add('is-wrong');
      }

      feedback.textContent = isCorrect
        ? 'Goed antwoord.'
        : `Niet helemaal. Het juiste antwoord is ${question.correct}.`;

      updateQuizScore();
    });
  });
}

function updateQuizScore() {
  const answeredCorrectly = Array.from(quiz.querySelectorAll('.quiz-question')).filter((questionEl) => {
    const correctButton = questionEl.querySelector('button.is-correct');
    return correctButton && !questionEl.querySelector('button.is-wrong');
  }).length;

  const scoreEl = document.getElementById('quiz-score');
  if (scoreEl) {
    scoreEl.textContent = `Score: ${answeredCorrectly} / ${quizQuestions.length}`;
  }
}

buildPicker();
buildModelGrid();
buildQuiz();
updateOverview();
setSelectedBody(0);

overviewToggle.addEventListener('click', () => {
  overviewMode = overviewMode === 'diameter' ? 'distance' : 'diameter';
  overviewToggle.setAttribute('aria-pressed', String(overviewMode === 'distance'));
  overviewModeLabel.textContent = overviewMode === 'diameter' ? 'Diameter' : 'Afstand';
  updateOverview();
});
