/* ==========================================================================
   Study Planner — client-side deterministic timetable generator
   Allocation rule (documented on-page):
     weight = priority (High 3 / Medium 2 / Low 1) + 1 if exam within 14 days.
   Sessions are distributed with smooth weighted round-robin across the time
   slots that fit inside each selected day's window. No server, no overlap.
   ========================================================================== */
(function () {
  "use strict";

  var DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  var PRIORITY = { High: 3, Medium: 2, Low: 1 };
  var STORE_KEY = "sk_planner_v1";

  var form = document.getElementById("plannerForm");
  if (!form) return;

  var subjectList = document.getElementById("subjectList");
  var addSubject = document.getElementById("addSubject");
  var subjectError = document.getElementById("subjectError");
  var dayGroup = document.getElementById("dayGroup");
  var dayError = document.getElementById("dayError");
  var startTime = document.getElementById("startTime");
  var endTime = document.getElementById("endTime");
  var timeErr = document.getElementById("timeErr");
  var sessionLen = document.getElementById("sessionLen");
  var breakLen = document.getElementById("breakLen");
  var resetBtn = document.getElementById("resetBtn");
  var clearSavedBtn = document.getElementById("clearSavedBtn");
  var saveNote = document.getElementById("saveNote");
  var emptyState = document.getElementById("scheduleEmpty");
  var panel = document.getElementById("schedulePanel");
  var output = document.getElementById("scheduleOutput");
  var summary = document.getElementById("scheduleSummary");
  var printDate = document.getElementById("printDate");
  var regenBtn = document.getElementById("regenBtn");
  var printBtn = document.getElementById("printBtn");
  var editBtn = document.getElementById("editBtn");

  var subId = 0;
  var rotation = 0;
  var lastInputs = null;

  // Build day checkboxes
  DAYS.forEach(function (d, i) {
    var id = "day" + i;
    var label = document.createElement("label");
    label.className = "checkbox-item";
    label.innerHTML = '<input type="checkbox" id="' + id + '" value="' + i + '"' +
      (i < 5 ? " checked" : "") + "> " + d.slice(0, 3);
    label.setAttribute("for", id);
    dayGroup.appendChild(label);
  });

  function makeSubject(data) {
    subId++;
    var id = subId;
    var li = document.createElement("li");
    li.className = "entry-row";
    li.setAttribute("data-row", "");
    li.innerHTML =
      '<div class="entry-row__grid" style="grid-template-columns:2fr 1fr 1fr auto">' +
        '<div class="field" style="margin-bottom:0"><label for="s' + id + '">Subject / topic <span class="req" aria-hidden="true">*</span></label>' +
          '<input type="text" id="s' + id + '" data-name maxlength="60" aria-describedby="sErr' + id + '"><p class="field-error" data-err id="sErr' + id + '"></p></div>' +
        '<div class="field" style="margin-bottom:0"><label for="p' + id + '">Priority</label>' +
          '<select id="p' + id + '" data-priority><option>High</option><option selected>Medium</option><option>Low</option></select></div>' +
        '<div class="field" style="margin-bottom:0"><label for="e' + id + '">Exam date <span class="text-muted">(optional)</span></label>' +
          '<input type="date" id="e' + id + '" data-exam></div>' +
        '<div class="entry-row__remove"><button type="button" class="icon-btn" data-remove aria-label="Remove this subject"><svg viewBox="0 0 24 24" aria-hidden="true" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div>' +
      "</div>";
    if (data) {
      li.querySelector("[data-name]").value = data.name || "";
      if (data.priority) li.querySelector("[data-priority]").value = data.priority;
      if (data.exam) li.querySelector("[data-exam]").value = data.exam;
    }
    li.querySelector("[data-remove]").addEventListener("click", function () {
      li.remove();
      if (!subjectList.querySelector("[data-row]")) makeSubject();
    });
    subjectList.appendChild(li);
    return li;
  }

  function toMin(t) { var p = (t || "").split(":"); return p.length === 2 ? (+p[0]) * 60 + (+p[1]) : NaN; }
  function fmt(min) {
    var h = Math.floor(min / 60), m = min % 60;
    var ap = h < 12 ? "am" : "pm";
    var h12 = h % 12; if (h12 === 0) h12 = 12;
    return h12 + ":" + (m < 10 ? "0" + m : m) + ap;
  }

  function collect() {
    var ok = true;
    subjectError.classList.remove("is-shown"); subjectError.textContent = "";
    dayError.classList.remove("is-shown"); dayError.textContent = "";
    SK.clearError(startTime, timeErr); SK.clearError(endTime, timeErr);

    var subjects = [];
    subjectList.querySelectorAll("[data-row]").forEach(function (li) {
      var nameEl = li.querySelector("[data-name]");
      var err = li.querySelector("[data-err]");
      SK.clearError(nameEl, err);
      var name = nameEl.value.trim();
      if (!name) { return; } // skip blank rows silently; validated below
      subjects.push({
        name: name,
        priority: li.querySelector("[data-priority]").value,
        exam: li.querySelector("[data-exam]").value
      });
    });
    if (subjects.length === 0) {
      subjectError.textContent = "Add at least one subject with a name.";
      subjectError.classList.add("is-shown"); ok = false;
    }

    var days = [];
    dayGroup.querySelectorAll("input:checked").forEach(function (c) { days.push(+c.value); });
    days.sort(function (a, b) { return a - b; });
    if (days.length === 0) {
      dayError.textContent = "Choose at least one study day.";
      dayError.classList.add("is-shown"); ok = false;
    }

    var s = toMin(startTime.value), e = toMin(endTime.value);
    if (isNaN(s) || isNaN(e) || e <= s) {
      SK.setError(endTime, timeErr, "End time must be after start time.");
      ok = false;
    }

    if (!ok) return null;
    return { subjects: subjects, days: days, start: s, end: e,
             session: +sessionLen.value, brk: +breakLen.value };
  }

  function slotsForWindow(inp) {
    // How many sessions fit: n*session + (n-1)*break <= window
    var win = inp.end - inp.start;
    if (win < inp.session) return [];
    var n = Math.floor((win + inp.brk) / (inp.session + inp.brk));
    var slots = [];
    var cursor = inp.start;
    for (var i = 0; i < n; i++) {
      slots.push([cursor, cursor + inp.session]);
      cursor += inp.session + inp.brk;
    }
    return slots;
  }

  function weightOf(sub) {
    var w = PRIORITY[sub.priority] || 2;
    if (sub.exam) {
      var today = new Date(); today.setHours(0, 0, 0, 0);
      var ex = new Date(sub.exam + "T00:00:00");
      if (!isNaN(ex.getTime())) {
        var days = Math.round((ex - today) / 86400000);
        if (days >= 0 && days <= 14) w += 1;
      }
    }
    return w;
  }

  // Smooth weighted round-robin order of length `count`
  function sequence(subjects, count, rotateBy) {
    var items = subjects.map(function (s, i) {
      return { i: i, name: s.name, w: weightOf(s), cw: 0 };
    });
    // apply rotation to break ties differently for "another arrangement"
    var total = items.reduce(function (a, b) { return a + b.w; }, 0);
    var seq = [];
    for (var k = 0; k < count; k++) {
      var best = null;
      items.forEach(function (it) { it.cw += it.w; if (!best || it.cw > best.cw) best = it; });
      best.cw -= total;
      seq.push(best.i);
    }
    if (rotateBy) {
      // rotate subject identities deterministically for a different valid plan
      var map = subjects.map(function (_, i) { return (i + rotateBy) % subjects.length; });
      seq = seq.map(function (idx) { return map[idx]; });
    }
    return seq;
  }

  function generate(inp, rotateBy) {
    var slots = slotsForWindow(inp);
    if (slots.length === 0) {
      showCannot("Your available time (" + fmt(inp.start) + "–" + fmt(inp.end) +
        ") is shorter than one " + inp.session + "-minute session. Reduce the session length, remove the break, or add more time.");
      return;
    }
    var totalSlots = slots.length * inp.days.length;
    var seq = sequence(inp.subjects, totalSlots, rotateBy || 0);

    var html = "";
    var idx = 0;
    inp.days.forEach(function (dIndex) {
      html += '<div class="timetable-day" style="margin-bottom:var(--space-4)">';
      html += "<h3>" + DAYS[dIndex] + "</h3>";
      html += '<div class="data-table-wrap"><table class="data"><thead><tr><th scope="col">Time</th><th scope="col">Subject</th></tr></thead><tbody>';
      slots.forEach(function (sl) {
        var sub = inp.subjects[seq[idx++]];
        html += "<tr><td class=\"num\">" + fmt(sl[0]) + " – " + fmt(sl[1]) + "</td><td>" + SK.esc(sub.name) + "</td></tr>";
      });
      html += "</tbody></table></div></div>";
    });
    output.innerHTML = html;

    // count sessions per subject
    var counts = {};
    seq.forEach(function (i) { counts[inp.subjects[i].name] = (counts[inp.subjects[i].name] || 0) + 1; });
    var parts = Object.keys(counts).map(function (n) { return SK.esc(n) + " (" + counts[n] + ")"; });
    summary.innerHTML = totalSlots + " sessions across " + inp.days.length + " day(s), " +
      slots.length + " per day. Sessions per subject: " + parts.join(", ") + ".";

    printDate.textContent = "Generated " + SK.printDate();
    emptyState.hidden = true;
    panel.hidden = false;
    SK.announce("liveRegion", "Timetable generated: " + totalSlots + " sessions across " + inp.days.length + " days.");
    panel.scrollIntoView({ block: "nearest" });
  }

  function showCannot(msg) {
    emptyState.hidden = true;
    panel.hidden = false;
    summary.textContent = "";
    output.innerHTML = '<div class="notice notice--warning"><svg viewBox="0 0 24 24" aria-hidden="true" stroke-width="1.75"><path d="M12 3l9 16H3z"/><path d="M12 10v4M12 17v.5"/></svg><div><h3>Can\'t build a timetable yet</h3><p>' + SK.esc(msg) + "</p></div></div>";
    SK.announce("liveRegion", "Timetable could not be generated. " + msg);
  }

  function save(inp) {
    var ok = SK.store.set(STORE_KEY, {
      subjects: inp.subjects, days: inp.days,
      start: startTime.value, end: endTime.value,
      session: sessionLen.value, brk: breakLen.value
    });
    if (ok) { clearSavedBtn.hidden = false; saveNote.hidden = false; }
  }

  function load() {
    var d = SK.store.get(STORE_KEY);
    if (!d) { makeSubject(); return; }
    (d.subjects && d.subjects.length ? d.subjects : [null]).forEach(function (s) { makeSubject(s); });
    if (d.start) startTime.value = d.start;
    if (d.end) endTime.value = d.end;
    if (d.session) sessionLen.value = d.session;
    if (d.brk != null) breakLen.value = d.brk;
    if (d.days) {
      dayGroup.querySelectorAll("input").forEach(function (c) { c.checked = d.days.indexOf(+c.value) !== -1; });
    }
    clearSavedBtn.hidden = false; saveNote.hidden = false;
  }

  addSubject.addEventListener("click", function () {
    var li = makeSubject(); var f = li.querySelector("[data-name]"); if (f) f.focus();
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var inp = collect();
    if (!inp) { panel.hidden = true; emptyState.hidden = false; return; }
    lastInputs = inp; rotation = 0;
    generate(inp, 0);
    save(inp);
  });

  regenBtn.addEventListener("click", function () {
    if (!lastInputs) return;
    rotation = (rotation + 1) % Math.max(1, lastInputs.subjects.length);
    generate(lastInputs, rotation);
  });

  resetBtn.addEventListener("click", function () {
    var hasData = Array.prototype.some.call(subjectList.querySelectorAll("[data-name]"), function (i) { return i.value.trim() !== ""; });
    if (hasData && !window.confirm("Clear all subjects and the timetable?")) return;
    subjectList.innerHTML = ""; makeSubject();
    dayGroup.querySelectorAll("input").forEach(function (c, i) { c.checked = i < 5; });
    startTime.value = "16:00"; endTime.value = "20:00";
    sessionLen.value = "60"; breakLen.value = "10";
    panel.hidden = true; emptyState.hidden = false;
    lastInputs = null;
  });

  clearSavedBtn.addEventListener("click", function () {
    SK.store.remove(STORE_KEY);
    clearSavedBtn.hidden = true; saveNote.hidden = true;
    SK.announce("liveRegion", "Saved plan cleared from this device.");
  });

  printBtn.addEventListener("click", function () { window.print(); });
  editBtn.addEventListener("click", function () { form.scrollIntoView({ block: "start" }); });

  load();
})();
