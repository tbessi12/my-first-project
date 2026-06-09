/* ══════════════════════════════════════════════
   USPS 955 EXAM PREP – App Logic
══════════════════════════════════════════════ */

// ── Storage helpers ──────────────────────────
const store = {
  get: k => { try { return JSON.parse(localStorage.getItem(k)); } catch { return null; } },
  set: (k, v) => localStorage.setItem(k, JSON.stringify(v)),
};

// ── State ────────────────────────────────────
let state = {
  quiz: {
    questions: [],
    current: 0,
    answers: {},        // { qId: chosenIndex }
    marked: new Set(),
    mode: 'practice',
    started: false,
    done: false,
  },
  fc: {
    deck: [],
    index: 0,
    known: new Set(),
  },
  scores: [],           // [{ date, correct, total, pct }]
};

// ── Navigation ───────────────────────────────
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('screen-' + id).classList.add('active');
  document.querySelector(`.nav-btn[data-screen="${id}"]`).classList.add('active');
  if (id === 'home')       renderHome();
  if (id === 'scores')     renderScores();
  if (id === 'flashcards') renderFlashcard();
}

document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => showScreen(btn.dataset.screen));
});

// ══════════════════════════════════════════════
// HOME
// ══════════════════════════════════════════════
function renderHome() {
  const scores = store.get('scores') || [];
  state.scores = scores;

  // Stats bar
  const avgPct = scores.length
    ? Math.round(scores.reduce((a, b) => a + b.pct, 0) / scores.length)
    : 0;
  const best = scores.length ? Math.max(...scores.map(s => s.pct)) : 0;

  document.getElementById('home-stats').innerHTML = `
    <div class="stat-chip"><div class="val">${scores.length}</div><div class="lbl">Quizzes Taken</div></div>
    <div class="stat-chip"><div class="val">${scores.length ? avgPct + '%' : '—'}</div><div class="lbl">Average Score</div></div>
    <div class="stat-chip"><div class="val">${scores.length ? best + '%' : '—'}</div><div class="lbl">Best Score</div></div>
    <div class="stat-chip"><div class="val">${QUESTIONS.length}</div><div class="lbl">Total Questions</div></div>
  `;

  // Topic breakdown
  const topicMap = {};
  QUESTIONS.forEach(q => {
    if (!topicMap[q.topic]) topicMap[q.topic] = { total: 0, correct: 0 };
    topicMap[q.topic].total++;
  });

  // Inject per-question history
  const wrongIds = store.get('wrongIds') || [];
  const rightIds = store.get('rightIds') || [];

  const grid = document.getElementById('topic-grid');
  grid.innerHTML = Object.entries(topicMap).map(([topic, d]) => {
    const topicQs = QUESTIONS.filter(q => q.topic === topic);
    const answered = topicQs.filter(q => rightIds.includes(q.id) || wrongIds.includes(q.id));
    const correct  = topicQs.filter(q => rightIds.includes(q.id));
    const pct = answered.length ? Math.round(correct.length / answered.length * 100) : 0;
    const label = answered.length ? pct + '%' : 'Not started';
    return `
      <div class="topic-card" data-topic="${topic}">
        <div class="t-name">${topic}</div>
        <div class="t-bar"><div class="t-fill" style="width:${pct}%"></div></div>
        <div class="t-pct">${label} · ${d.total} questions</div>
      </div>`;
  }).join('');

  // Topic card → start quiz filtered by topic
  grid.querySelectorAll('.topic-card').forEach(card => {
    card.addEventListener('click', () => {
      showScreen('quiz');
      document.getElementById('quiz-set').value = 'all';
      startQuizWithFilter(card.dataset.topic);
    });
  });
}

document.getElementById('start-full-quiz').addEventListener('click', () => {
  showScreen('quiz');
  document.getElementById('quiz-mode').value = 'practice';
  document.getElementById('quiz-set').value = 'all';
});

document.getElementById('start-timed-quiz').addEventListener('click', () => {
  showScreen('quiz');
  document.getElementById('quiz-mode').value = 'timed';
  document.getElementById('quiz-set').value = 'all';
});

document.getElementById('start-flashcards-home').addEventListener('click', () => {
  showScreen('flashcards');
});

// ══════════════════════════════════════════════
// QUIZ
// ══════════════════════════════════════════════
let timerInterval = null;
let secondsLeft   = 0;

function getPool(setVal) {
  if (setVal === 'wrong') {
    const wrongIds = store.get('wrongIds') || [];
    return QUESTIONS.filter(q => wrongIds.includes(q.id));
  }
  if (setVal === 'all') return [...QUESTIONS];
  const t = parseInt(setVal);
  return QUESTIONS.filter(q => q.test === t);
}

function startQuizWithFilter(topic) {
  const pool = QUESTIONS.filter(q => q.topic === topic);
  initQuiz(pool, 'practice', true);
}

function initQuiz(pool, mode, shuffle) {
  if (!pool.length) { alert('No questions available for this selection.'); return; }
  let questions = shuffle ? [...pool].sort(() => Math.random() - .5) : [...pool];

  state.quiz = {
    questions,
    current: 0,
    answers: {},
    marked: new Set(),
    mode,
    started: true,
    done: false,
  };

  clearInterval(timerInterval);
  document.getElementById('quiz-setup').classList.add('hidden');
  document.getElementById('quiz-results').classList.add('hidden');
  document.getElementById('quiz-active').classList.remove('hidden');

  const timerEl = document.getElementById('timer-display');
  if (mode === 'timed') {
    secondsLeft = 60 * 60;
    timerEl.classList.remove('hidden');
    timerInterval = setInterval(tickTimer, 1000);
    updateTimerDisplay();
  } else {
    timerEl.classList.add('hidden');
  }

  renderQuestion();
}

function tickTimer() {
  secondsLeft--;
  updateTimerDisplay();
  if (secondsLeft <= 0) {
    clearInterval(timerInterval);
    showResults();
  }
  if (secondsLeft <= 300) {
    document.getElementById('timer-display').classList.add('warn');
  }
}

function updateTimerDisplay() {
  const m = Math.floor(secondsLeft / 60).toString().padStart(2,'0');
  const s = (secondsLeft % 60).toString().padStart(2,'0');
  document.getElementById('timer-display').textContent = m + ':' + s;
}

function renderQuestion() {
  const q   = state.quiz.questions[state.quiz.current];
  const idx = state.quiz.current;
  const tot = state.quiz.questions.length;

  document.getElementById('q-counter').textContent = `Q ${idx+1} / ${tot}`;
  document.getElementById('q-progress-fill').style.width = ((idx / tot) * 100) + '%';
  document.getElementById('q-topic').textContent = q.topic;
  document.getElementById('q-text').textContent = q.question;

  const optionsEl = document.getElementById('q-options');
  const letters = ['A','B','C','D','E','F'];
  optionsEl.innerHTML = q.options.map((o, i) => `
    <button class="option-btn ${state.quiz.answers[q.id] === i ? 'selected' : ''}" data-i="${i}">
      <span class="opt-letter">${letters[i]}.</span> ${o}
    </button>
  `).join('');

  optionsEl.querySelectorAll('.option-btn').forEach(btn => {
    btn.addEventListener('click', () => selectOption(parseInt(btn.dataset.i)));
  });

  const feedback = document.getElementById('q-feedback');
  feedback.classList.add('hidden');
  feedback.className = 'feedback hidden';

  // Show feedback if already answered in practice mode
  if (state.quiz.mode === 'practice' && state.quiz.answers[q.id] !== undefined) {
    showFeedback(q, state.quiz.answers[q.id]);
  }

  const markBtn = document.getElementById('q-mark');
  markBtn.textContent = state.quiz.marked.has(q.id) ? '🔖 Marked' : '🔖 Mark for Review';

  const nextBtn = document.getElementById('q-next');
  const isLast = idx === tot - 1;
  nextBtn.textContent = isLast ? 'Finish →' : 'Next →';
}

function selectOption(i) {
  const q = state.quiz.questions[state.quiz.current];
  if (state.quiz.mode === 'practice' && state.quiz.answers[q.id] !== undefined) return;

  state.quiz.answers[q.id] = i;

  // Update selected state
  document.querySelectorAll('.option-btn').forEach((btn, bi) => {
    btn.classList.toggle('selected', bi === i);
  });

  if (state.quiz.mode === 'practice') {
    showFeedback(q, i);
  }

  // Track right/wrong
  const wrongIds = new Set(store.get('wrongIds') || []);
  const rightIds = new Set(store.get('rightIds') || []);
  if (i === q.answer) {
    rightIds.add(q.id);
    wrongIds.delete(q.id);
  } else {
    wrongIds.add(q.id);
  }
  store.set('wrongIds', [...wrongIds]);
  store.set('rightIds', [...rightIds]);
}

function showFeedback(q, chosen) {
  const isCorrect = chosen === q.answer;
  const feedback  = document.getElementById('q-feedback');
  feedback.classList.remove('hidden', 'correct', 'wrong');
  feedback.classList.add(isCorrect ? 'correct' : 'wrong');

  const letters = ['A','B','C','D','E','F'];
  feedback.innerHTML = `
    <strong>${isCorrect ? '✓ Correct!' : '✗ Incorrect'}</strong>
    ${!isCorrect ? `<span>Correct answer: <b>${letters[q.answer]}. ${q.options[q.answer]}</b></span><br>` : ''}
    <span>${q.explanation}</span>
  `;

  // Color the buttons
  document.querySelectorAll('.option-btn').forEach((btn, bi) => {
    btn.disabled = true;
    if (bi === q.answer) btn.classList.add('correct');
    if (bi === chosen && chosen !== q.answer) btn.classList.add('wrong');
  });
}

document.getElementById('q-mark').addEventListener('click', () => {
  const q = state.quiz.questions[state.quiz.current];
  if (state.quiz.marked.has(q.id)) state.quiz.marked.delete(q.id);
  else state.quiz.marked.add(q.id);
  document.getElementById('q-mark').textContent =
    state.quiz.marked.has(q.id) ? '🔖 Marked' : '🔖 Mark for Review';
});

document.getElementById('q-next').addEventListener('click', () => {
  const isLast = state.quiz.current === state.quiz.questions.length - 1;
  if (isLast) {
    clearInterval(timerInterval);
    showResults();
  } else {
    state.quiz.current++;
    renderQuestion();
  }
});

document.getElementById('begin-quiz').addEventListener('click', () => {
  const setVal  = document.getElementById('quiz-set').value;
  const mode    = document.getElementById('quiz-mode').value;
  const shuffle = document.getElementById('quiz-shuffle').checked;
  const pool    = getPool(setVal);
  initQuiz(pool, mode, shuffle);
});

function showResults() {
  clearInterval(timerInterval);
  document.getElementById('quiz-active').classList.add('hidden');
  document.getElementById('quiz-results').classList.remove('hidden');

  const qs      = state.quiz.questions;
  const answers = state.quiz.answers;
  const correct = qs.filter(q => answers[q.id] === q.answer).length;
  const total   = qs.length;
  const pct     = Math.round(correct / total * 100);

  // Save score
  const scores = store.get('scores') || [];
  scores.unshift({ date: new Date().toLocaleString(), correct, total, pct });
  store.set('scores', scores.slice(0, 50));

  // Ring
  const ring = document.getElementById('score-ring');
  document.getElementById('score-pct').textContent = pct + '%';
  ring.className = 'score-ring ' + (pct >= 70 ? 'pass' : 'fail');

  document.getElementById('results-heading').textContent =
    pct >= 70 ? '🎉 Great Job!' : 'Keep Practicing';
  document.getElementById('results-subtext').textContent =
    `You scored ${correct} out of ${total} (${pct}%). Passing the 955 requires solid knowledge in all areas.`;

  // Breakdown
  const unanswered = total - Object.keys(answers).length;
  document.getElementById('result-breakdown').innerHTML = `
    <div class="rb-item good"><div class="rb-val">${correct}</div><div class="rb-lbl">Correct</div></div>
    <div class="rb-item bad"><div class="rb-val">${total - correct - unanswered}</div><div class="rb-lbl">Wrong</div></div>
    <div class="rb-item"><div class="rb-val">${unanswered}</div><div class="rb-lbl">Skipped</div></div>
  `;

  // Test mode: show all feedback now
  if (state.quiz.mode === 'test' || state.quiz.mode === 'timed') {
    renderReviewList(qs, answers, false);
  }
}

function renderReviewList(qs, answers, wrongOnly) {
  const list = document.getElementById('review-list');
  list.classList.remove('hidden');
  const letters = ['A','B','C','D','E','F'];
  const filtered = wrongOnly
    ? qs.filter(q => answers[q.id] !== q.answer)
    : qs;

  list.innerHTML = '<h3 style="margin-bottom:1rem">Question Review</h3>' +
    filtered.map(q => {
      const chosen = answers[q.id];
      const isRight = chosen === q.answer;
      return `
        <div class="review-item ${isRight ? 'right-item' : 'wrong-item'}">
          <div class="ri-q">${q.question}</div>
          ${chosen !== undefined && !isRight
            ? `<div class="ri-your">Your answer: ${letters[chosen]}. ${q.options[chosen]}</div>` : ''}
          <div class="ri-correct">${isRight ? '✓' : 'Correct:'} ${letters[q.answer]}. ${q.options[q.answer]}</div>
          <div class="ri-exp">${q.explanation}</div>
        </div>`;
    }).join('');
}

document.getElementById('review-wrong').addEventListener('click', () => {
  renderReviewList(state.quiz.questions, state.quiz.answers, true);
});

document.getElementById('retry-quiz').addEventListener('click', () => {
  document.getElementById('quiz-results').classList.add('hidden');
  document.getElementById('review-list').classList.add('hidden');
  const q = state.quiz.questions;
  initQuiz(q, state.quiz.mode || 'practice', true);
});

document.getElementById('back-to-setup').addEventListener('click', () => {
  clearInterval(timerInterval);
  document.getElementById('quiz-active').classList.add('hidden');
  document.getElementById('quiz-results').classList.add('hidden');
  document.getElementById('quiz-setup').classList.remove('hidden');
  document.getElementById('review-list').classList.add('hidden');
});

// ══════════════════════════════════════════════
// FLASHCARDS
// ══════════════════════════════════════════════
function initFlashcards(deck) {
  state.fc = { deck: [...deck], index: 0, known: new Set() };
  renderFlashcard();
}

function renderFlashcard() {
  const { deck, index } = state.fc;
  if (!deck.length) {
    document.querySelector('.flashcard-wrap').innerHTML =
      '<p style="text-align:center;padding:3rem;color:var(--muted)">No flashcards available.</p>';
    return;
  }

  const card = deck[index];
  document.getElementById('fc-counter').textContent = `${index + 1} / ${deck.length}`;
  document.getElementById('fc-progress-fill').style.width = ((index + 1) / deck.length * 100) + '%';
  document.getElementById('fc-front-text').textContent = card.front;
  document.getElementById('fc-back-text').textContent  = card.back;

  const fc = document.getElementById('flashcard');
  fc.classList.remove('flipped');
}

document.getElementById('flashcard').addEventListener('click', () => {
  document.getElementById('flashcard').classList.toggle('flipped');
});

document.getElementById('fc-prev').addEventListener('click', () => {
  if (state.fc.index > 0) { state.fc.index--; renderFlashcard(); }
});

document.getElementById('fc-next').addEventListener('click', () => {
  if (state.fc.index < state.fc.deck.length - 1) { state.fc.index++; renderFlashcard(); }
});

document.getElementById('fc-right').addEventListener('click', () => {
  state.fc.known.add(state.fc.index);
  if (state.fc.index < state.fc.deck.length - 1) { state.fc.index++; renderFlashcard(); }
});

document.getElementById('fc-wrong').addEventListener('click', () => {
  state.fc.known.delete(state.fc.index);
  if (state.fc.index < state.fc.deck.length - 1) { state.fc.index++; renderFlashcard(); }
});

document.getElementById('fc-shuffle').addEventListener('click', () => {
  state.fc.deck = [...state.fc.deck].sort(() => Math.random() - .5);
  state.fc.index = 0;
  renderFlashcard();
});

document.getElementById('fc-restart').addEventListener('click', () => {
  state.fc.index = 0;
  renderFlashcard();
});

// ══════════════════════════════════════════════
// SCORES
// ══════════════════════════════════════════════
function renderScores() {
  const scores = store.get('scores') || [];
  const wrongIds = store.get('wrongIds') || [];
  const rightIds = store.get('rightIds') || [];

  // Overview chips
  const avg = scores.length
    ? Math.round(scores.reduce((a,b) => a+b.pct,0) / scores.length) : 0;
  const best = scores.length ? Math.max(...scores.map(s=>s.pct)) : 0;

  // Topic accuracy
  const topicStats = {};
  QUESTIONS.forEach(q => {
    if (!topicStats[q.topic]) topicStats[q.topic] = { right:0, total:0 };
    if (rightIds.includes(q.id)) topicStats[q.topic].right++;
    if (rightIds.includes(q.id) || wrongIds.includes(q.id)) topicStats[q.topic].total++;
  });

  document.getElementById('scores-overview').innerHTML = `
    <div class="stat-chip"><div class="val">${scores.length}</div><div class="lbl">Quizzes Taken</div></div>
    <div class="stat-chip"><div class="val">${avg}%</div><div class="lbl">Average Score</div></div>
    <div class="stat-chip"><div class="val">${best}%</div><div class="lbl">Best Score</div></div>
    <div class="stat-chip"><div class="val">${wrongIds.length}</div><div class="lbl">Need Review</div></div>
    ${Object.entries(topicStats).filter(([,v])=>v.total>0).map(([topic, v]) => {
      const pct = Math.round(v.right/v.total*100);
      return `<div class="stat-chip" style="min-width:200px">
        <div class="val" style="font-size:1.1rem;color:${pct>=70?'var(--success)':'var(--danger)'}">${pct}%</div>
        <div class="lbl">${topic} (${v.total} answered)</div>
      </div>`;
    }).join('')}
  `;

  const history = document.getElementById('scores-history');
  if (!scores.length) {
    history.innerHTML = '<p style="color:var(--muted)">No quiz history yet. Take a quiz to see your scores here.</p>';
    return;
  }
  history.innerHTML = '<h3>Quiz History</h3>' + scores.slice(0,20).map(s => `
    <div class="score-row">
      <span class="sr-date">${s.date}</span>
      <span>${s.correct}/${s.total}</span>
      <span class="sr-score ${s.pct>=70?'pass':'fail'}">${s.pct}%</span>
    </div>
  `).join('');
}

document.getElementById('clear-scores').addEventListener('click', () => {
  if (confirm('Clear all score history and progress data?')) {
    localStorage.clear();
    renderScores();
    renderHome();
  }
});

// ══════════════════════════════════════════════
// BOOT
// ══════════════════════════════════════════════
initFlashcards(FLASHCARDS);
renderHome();
