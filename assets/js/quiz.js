/* ==========================================================================
   Practice Quiz — client-side logic.
   - Only offers subjects/topics/difficulties/counts that have real questions.
   - Does not reveal answers before submission.
   - Unanswered questions are never counted as correct; no double submission.
   ========================================================================== */
(function () {
  "use strict";

  var DATA = window.SK_QUIZ;
  if (!DATA) return;

  var subjectSel = document.getElementById("subjectSel");
  var topicSel = document.getElementById("topicSel");
  var difficultySel = document.getElementById("difficultySel");
  var countSel = document.getElementById("countSel");
  var availNote = document.getElementById("availNote");
  var startBtn = document.getElementById("startBtn");

  var setup = document.getElementById("quizSetup");
  var play = document.getElementById("quizPlay");
  var results = document.getElementById("quizResults");

  var progressText = document.getElementById("progressText");
  var answeredText = document.getElementById("answeredText");
  var progressBar = document.getElementById("progressBar");
  var questionText = document.getElementById("questionText");
  var optionList = document.getElementById("optionList");
  var prevBtn = document.getElementById("prevBtn");
  var nextBtn = document.getElementById("nextBtn");
  var submitBtn = document.getElementById("submitBtn");

  var scoreTiles = document.getElementById("scoreTiles");
  var retryBtn = document.getElementById("retryBtn");
  var newQuizBtn = document.getElementById("newQuizBtn");
  var incorrectOnly = document.getElementById("incorrectOnly");
  var reviewList = document.getElementById("reviewList");

  var ICON_OK = '<svg viewBox="0 0 24 24" aria-hidden="true" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:18px;height:18px;color:var(--color-success)"><path d="M5 12l5 5L20 6"/></svg>';
  var ICON_NO = '<svg viewBox="0 0 24 24" aria-hidden="true" stroke-width="2" stroke-linecap="round" style="width:18px;height:18px;color:var(--color-error)"><path d="M6 6l12 12M18 6L6 18"/></svg>';

  var state = null;

  function filtered() {
    var s = subjectSel.value, t = topicSel.value, d = difficultySel.value;
    return DATA.questions.filter(function (q) {
      return q.subject === s &&
        (t === "all" || q.topic === t) &&
        (d === "any" || q.difficulty === d);
    });
  }

  function subjectQuestions(s) { return DATA.questions.filter(function (q) { return q.subject === s; }); }

  function populateSubjects() {
    DATA.subjects.forEach(function (s) {
      if (subjectQuestions(s.id).length === 0) return; // only subjects with content
      var o = document.createElement("option");
      o.value = s.id; o.textContent = s.name;
      subjectSel.appendChild(o);
    });
  }

  function populateTopics() {
    var s = subjectSel.value;
    var subj = DATA.subjects.filter(function (x) { return x.id === s; })[0];
    topicSel.innerHTML = '<option value="all">All topics</option>';
    if (subj) {
      subj.topics.forEach(function (t) {
        if (DATA.questions.some(function (q) { return q.subject === s && q.topic === t.id; })) {
          var o = document.createElement("option");
          o.value = t.id; o.textContent = t.name;
          topicSel.appendChild(o);
        }
      });
    }
  }

  function populateDifficulty() {
    var s = subjectSel.value, t = topicSel.value;
    var present = [];
    DATA.questions.forEach(function (q) {
      if (q.subject === s && (t === "all" || q.topic === t) && present.indexOf(q.difficulty) === -1) present.push(q.difficulty);
    });
    var order = ["Easy", "Medium", "Hard"];
    present.sort(function (a, b) { return order.indexOf(a) - order.indexOf(b); });
    difficultySel.innerHTML = '<option value="any">Any difficulty</option>';
    present.forEach(function (d) {
      var o = document.createElement("option"); o.value = d; o.textContent = d;
      difficultySel.appendChild(o);
    });
  }

  function populateCount() {
    var avail = filtered().length;
    countSel.innerHTML = "";
    if (avail === 0) {
      availNote.textContent = "No questions match this combination yet. Try another subject, topic, or difficulty.";
      startBtn.disabled = true;
      var o = document.createElement("option"); o.textContent = "—"; countSel.appendChild(o);
      countSel.disabled = true;
      return;
    }
    startBtn.disabled = false; countSel.disabled = false;
    var candidates = [5, 10, 15, 20].filter(function (n) { return n < avail; });
    candidates.push(avail); // "all available"
    candidates = candidates.filter(function (v, i, a) { return a.indexOf(v) === i; });
    candidates.forEach(function (n) {
      var o = document.createElement("option");
      o.value = n; o.textContent = (n === avail ? "All (" + n + ")" : n);
      countSel.appendChild(o);
    });
    // sensible default
    var def = Math.min(10, avail);
    countSel.value = String(candidates.indexOf(def) !== -1 ? def : avail);
    availNote.textContent = avail + " question" + (avail === 1 ? "" : "s") + " available for this choice.";
  }

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }

  function startQuiz(keepQuestions) {
    var qs;
    if (keepQuestions && state) { qs = state.questions; }
    else {
      var pool = shuffle(filtered());
      qs = pool.slice(0, parseInt(countSel.value, 10));
      if (qs.length === 0) return;
    }
    state = { questions: qs, answers: qs.map(function () { return null; }), index: 0, submitted: false };
    setup.hidden = true; results.hidden = true; play.hidden = false;
    renderQuestion();
    play.scrollIntoView({ block: "nearest" });
  }

  function renderQuestion() {
    var i = state.index, n = state.questions.length, q = state.questions[i];
    progressText.textContent = "Question " + (i + 1) + " of " + n;
    var answered = state.answers.filter(function (a) { return a !== null; }).length;
    answeredText.textContent = answered + " of " + n + " answered";
    progressBar.style.width = ((i + 1) / n * 100) + "%";
    questionText.textContent = q.q;

    optionList.innerHTML = "";
    q.options.forEach(function (opt, idx) {
      var label = document.createElement("label");
      label.className = "radio-item";
      label.style.display = "flex";
      label.innerHTML = '<input type="radio" name="opt" value="' + idx + '"' +
        (state.answers[i] === idx ? " checked" : "") + "> <span>" + SK.esc(opt) + "</span>";
      label.querySelector("input").addEventListener("change", function () {
        state.answers[i] = idx;
        answeredText.textContent = state.answers.filter(function (a) { return a !== null; }).length + " of " + n + " answered";
      });
      optionList.appendChild(label);
    });

    prevBtn.disabled = i === 0;
    var last = i === n - 1;
    nextBtn.hidden = last;
    submitBtn.hidden = !last;
  }

  function doSubmit() {
    if (state.submitted) return;
    var unanswered = state.answers.filter(function (a) { return a === null; }).length;
    if (unanswered > 0) {
      var go = window.confirm(unanswered + " question(s) are unanswered. Submit anyway? (Unanswered questions are marked incorrect.)");
      if (!go) {
        var firstUn = state.answers.indexOf(null);
        if (firstUn !== -1) { state.index = firstUn; renderQuestion(); }
        return;
      }
    }
    state.submitted = true;
    var correct = 0;
    state.questions.forEach(function (q, idx) { if (state.answers[idx] === q.answer) correct++; });
    var n = state.questions.length;
    var incorrect = n - correct;

    scoreTiles.innerHTML =
      tile("Score", correct + " / " + n, true) +
      tile("Correct", String(correct), false) +
      tile("Incorrect", String(incorrect), false);

    renderReview();
    play.hidden = true; results.hidden = false;
    SK.announce("liveRegion", "Quiz submitted. You scored " + correct + " out of " + n + ".");
    results.scrollIntoView({ block: "nearest" });
  }

  function tile(label, value, primary) {
    return '<div class="tile' + (primary ? " tile--primary" : "") + '"><p class="tile__label">' +
      SK.esc(label) + '</p><p class="tile__value num">' + SK.esc(value) + "</p></div>";
  }

  function renderReview() {
    var onlyWrong = incorrectOnly.checked;
    var html = "";
    state.questions.forEach(function (q, idx) {
      var chosen = state.answers[idx];
      var isCorrect = chosen === q.answer;
      if (onlyWrong && isCorrect) return;
      html += '<div class="card">';
      html += '<p style="font-weight:600;margin-bottom:var(--space-2)">' + (idx + 1) + ". " + SK.esc(q.q) + "</p>";
      q.options.forEach(function (opt, oi) {
        var marker = "", note = "";
        if (oi === q.answer) { marker = ICON_OK; note = ' <span class="text-small" style="color:var(--color-success)">Correct answer</span>'; }
        if (oi === chosen && chosen !== q.answer) { marker = ICON_NO; note = ' <span class="text-small" style="color:var(--color-error)">Your answer</span>'; }
        html += '<div style="display:flex;align-items:center;gap:var(--space-2);padding:2px 0">' +
          (marker || '<span style="width:18px;display:inline-block"></span>') +
          "<span>" + SK.esc(opt) + "</span>" + note + "</div>";
      });
      if (chosen === null) html += '<p class="text-small" style="color:var(--color-warning);margin:var(--space-2) 0 0">You did not answer this question.</p>';
      if (q.explain) html += '<p class="text-small text-muted" style="margin:var(--space-2) 0 0"><strong>Why:</strong> ' + SK.esc(q.explain) + "</p>";
      html += "</div>";
    });
    if (html === "") html = '<div class="empty-state"><p>No incorrect answers to review — well done!</p></div>';
    reviewList.innerHTML = html;
  }

  /* Events */
  subjectSel.addEventListener("change", function () { populateTopics(); populateDifficulty(); populateCount(); });
  topicSel.addEventListener("change", function () { populateDifficulty(); populateCount(); });
  difficultySel.addEventListener("change", populateCount);
  startBtn.addEventListener("click", function () { startQuiz(false); });
  prevBtn.addEventListener("click", function () { if (state.index > 0) { state.index--; renderQuestion(); } });
  nextBtn.addEventListener("click", function () { if (state.index < state.questions.length - 1) { state.index++; renderQuestion(); } });
  submitBtn.addEventListener("click", doSubmit);
  retryBtn.addEventListener("click", function () { startQuiz(true); });
  newQuizBtn.addEventListener("click", function () { results.hidden = true; play.hidden = true; setup.hidden = false; setup.scrollIntoView({ block: "nearest" }); });
  incorrectOnly.addEventListener("change", renderReview);

  /* Init */
  populateSubjects();
  if (subjectSel.options.length === 0) {
    setup.innerHTML = '<div class="empty-state"><p>No quiz questions are available yet. Please check back soon.</p></div>';
  } else {
    populateTopics(); populateDifficulty(); populateCount();
  }
})();
