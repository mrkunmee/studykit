/* ==========================================================================
   CGPA Calculator — client-side logic
   Scales offered as selectable options (never labelled "official").
   GPA = Σ(grade point × credit units) ÷ Σ(credit units).
   Cumulative CGPA = (prevCGPA×prevUnits + semester quality points)
                     ÷ (prevUnits + semester units).
   Persistence: localStorage on the user's own device only (approved).
   ========================================================================== */
(function () {
  "use strict";

  var SCALES = {
    "5": { max: 5, grades: [["A", 5], ["B", 4], ["C", 3], ["D", 2], ["E", 1], ["F", 0]] },
    "4": { max: 4, grades: [["A", 4], ["B", 3], ["C", 2], ["D", 1], ["F", 0]] }
  };
  var STORE_KEY = "sk_cgpa_v1";

  var form = document.getElementById("cgpaForm");
  if (!form) return;

  var scaleSel = document.getElementById("scale");
  var scaleExplain = document.getElementById("scaleExplain");
  var courseList = document.getElementById("courseList");
  var addBtn = document.getElementById("addCourse");
  var summaryErr = document.getElementById("courseSummaryError");
  var modeSem = document.getElementById("modeSemester");
  var modeCum = document.getElementById("modeCumulative");
  var cumFields = document.getElementById("cumulativeFields");
  var prevUnits = document.getElementById("prevUnits");
  var prevCGPA = document.getElementById("prevCGPA");
  var prevUnitsErr = document.getElementById("prevUnitsErr");
  var prevCGPAErr = document.getElementById("prevCGPAErr");
  var resetBtn = document.getElementById("resetBtn");
  var clearSavedBtn = document.getElementById("clearSavedBtn");
  var saveNote = document.getElementById("saveNote");
  var result = document.getElementById("result");
  var resultTiles = document.getElementById("resultTiles");
  var breakdownTable = document.getElementById("breakdownTable");
  var resultExplain = document.getElementById("resultExplain");
  var printBtn = document.getElementById("printBtn");
  var recalcBtn = document.getElementById("recalcBtn");
  var printDate = document.getElementById("printDate");

  var rowId = 0;
  var cumulative = false;

  function gradeOptions() {
    var s = SCALES[scaleSel.value];
    var opts = '<option value="">Select grade</option>';
    s.grades.forEach(function (g) { opts += '<option value="' + g[0] + '">' + g[0] + " (" + g[1] + ")</option>"; });
    return opts;
  }

  function updateScaleExplain() {
    var s = SCALES[scaleSel.value];
    var parts = s.grades.map(function (g) { return g[0] + "=" + g[1]; });
    scaleExplain.textContent = "Selected scale (not an official standard — confirm with your school): " +
      parts.join(", ") + ". Maximum point: " + s.max + ".";
  }

  function makeRow(data) {
    rowId++;
    var id = rowId;
    var li = document.createElement("li");
    li.className = "entry-row";
    li.setAttribute("data-row", "");
    li.innerHTML =
      '<div class="entry-row__grid">' +
        '<div class="field" style="margin-bottom:0">' +
          '<label for="name' + id + '">Course name or code <span class="text-muted">(optional)</span></label>' +
          '<input type="text" id="name' + id + '" data-name maxlength="60">' +
        "</div>" +
        '<div class="field" style="margin-bottom:0">' +
          '<label for="units' + id + '">Credit units <span class="req" aria-hidden="true">*</span></label>' +
          '<input type="number" id="units' + id + '" data-units inputmode="numeric" min="0" step="1" aria-describedby="unitsErr' + id + '">' +
          '<p class="field-error" id="unitsErr' + id + '" data-err-units></p>' +
        "</div>" +
        '<div class="field" style="margin-bottom:0">' +
          '<label for="grade' + id + '">Grade <span class="req" aria-hidden="true">*</span></label>' +
          '<select id="grade' + id + '" data-grade aria-describedby="gradeErr' + id + '">' + gradeOptions() + "</select>" +
          '<p class="field-error" id="gradeErr' + id + '" data-err-grade></p>' +
        "</div>" +
        '<div class="entry-row__remove">' +
          '<button type="button" class="icon-btn" data-remove aria-label="Remove this course">' +
            '<svg viewBox="0 0 24 24" aria-hidden="true" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>' +
          "</button>" +
        "</div>" +
      "</div>";
    if (data) {
      li.querySelector("[data-name]").value = data.name || "";
      li.querySelector("[data-units]").value = data.units != null ? data.units : "";
      var sel = li.querySelector("[data-grade]");
      if (data.grade && SCALES[scaleSel.value].grades.some(function (g) { return g[0] === data.grade; })) {
        sel.value = data.grade;
      }
    }
    li.querySelector("[data-remove]").addEventListener("click", function () { removeRow(li); });
    courseList.appendChild(li);
    return li;
  }

  function removeRow(li) {
    li.remove();
    if (!courseList.querySelector("[data-row]")) makeRow();
  }

  function refreshGradeSelects() {
    // When the scale changes, rebuild grade options, keeping valid selections.
    var rows = courseList.querySelectorAll("[data-row]");
    rows.forEach(function (li) {
      var sel = li.querySelector("[data-grade]");
      var prev = sel.value;
      sel.innerHTML = gradeOptions();
      if (prev && SCALES[scaleSel.value].grades.some(function (g) { return g[0] === prev; })) sel.value = prev;
    });
  }

  function setMode(isCum) {
    cumulative = isCum;
    modeCum.setAttribute("aria-checked", String(isCum));
    modeSem.setAttribute("aria-checked", String(!isCum));
    modeCum.classList.toggle("is-active", isCum);
    modeSem.classList.toggle("is-active", !isCum);
    cumFields.hidden = !isCum;
  }

  function num(v) { return v === "" || v == null ? NaN : Number(v); }

  function validateAndCollect() {
    var ok = true;
    SK.clearError(null, summaryErr);
    summaryErr.classList.remove("is-shown");
    var rows = courseList.querySelectorAll("[data-row]");
    var courses = [];
    var invalidCount = 0;

    rows.forEach(function (li) {
      var nameEl = li.querySelector("[data-name]");
      var unitsEl = li.querySelector("[data-units]");
      var gradeEl = li.querySelector("[data-grade]");
      var unitsErr = li.querySelector("[data-err-units]");
      var gradeErr = li.querySelector("[data-err-grade]");
      SK.clearError(unitsEl, unitsErr);
      SK.clearError(gradeEl, gradeErr);

      var u = num(unitsEl.value);
      var g = gradeEl.value;
      var rowInvalid = false;

      if (isNaN(u) || u <= 0) { SK.setError(unitsEl, unitsErr, "Enter credit units greater than 0."); rowInvalid = true; }
      if (!g) { SK.setError(gradeEl, gradeErr, "Choose a grade."); rowInvalid = true; }

      if (rowInvalid) { invalidCount++; ok = false; return; }

      var point = 0;
      SCALES[scaleSel.value].grades.forEach(function (gr) { if (gr[0] === g) point = gr[1]; });
      courses.push({ name: nameEl.value.trim(), units: u, grade: g, point: point, qp: u * point });
    });

    if (courses.length === 0 && invalidCount === 0) {
      summaryErr.textContent = "Add at least one course with its credit units and grade.";
      summaryErr.classList.add("is-shown");
      ok = false;
    } else if (invalidCount > 0) {
      summaryErr.textContent = invalidCount + (invalidCount === 1 ? " course needs" : " courses need") + " a valid credit unit and grade.";
      summaryErr.classList.add("is-shown");
    }

    var prev = null;
    if (cumulative) {
      SK.clearError(prevUnits, prevUnitsErr);
      SK.clearError(prevCGPA, prevCGPAErr);
      var pu = num(prevUnits.value);
      var pc = num(prevCGPA.value);
      var max = SCALES[scaleSel.value].max;
      if (isNaN(pu) || pu <= 0) { SK.setError(prevUnits, prevUnitsErr, "Enter previous credit units greater than 0."); ok = false; }
      if (isNaN(pc) || pc < 0 || pc > max) { SK.setError(prevCGPA, prevCGPAErr, "Enter a previous CGPA between 0 and " + max + "."); ok = false; }
      if (ok) prev = { units: pu, cgpa: pc, qp: pu * pc };
    }

    return ok ? { courses: courses, prev: prev } : null;
  }

  function render(data) {
    var semUnits = 0, semQP = 0;
    data.courses.forEach(function (c) { semUnits += c.units; semQP += c.qp; });

    if (semUnits <= 0) {
      summaryErr.textContent = "Total credit units must be greater than 0 to calculate a GPA.";
      summaryErr.classList.add("is-shown");
      return;
    }

    var gpa = semQP / semUnits;
    var tiles = "";
    tiles += tile("Semester GPA", SK.round(gpa, 2).toFixed(2), true);

    var cgpaVal = null, totalUnits = semUnits, totalQP = semQP;
    if (data.prev) {
      totalUnits = data.prev.units + semUnits;
      totalQP = data.prev.qp + semQP;
      cgpaVal = totalQP / totalUnits;
      tiles += tile("Cumulative CGPA", SK.round(cgpaVal, 2).toFixed(2), true);
    }
    tiles += tile(data.prev ? "Total credit units (all)" : "Total credit units", String(totalUnits), false);
    tiles += tile("Total quality points", String(SK.round(totalQP, 2)), false);
    resultTiles.innerHTML = tiles;

    // Breakdown table
    var rows = '<thead><tr><th scope="col">Course</th><th scope="col" class="num">Units</th><th scope="col">Grade</th><th scope="col" class="num">Points</th><th scope="col" class="num">Quality points</th></tr></thead><tbody>';
    data.courses.forEach(function (c, i) {
      rows += "<tr><td>" + SK.esc(c.name || ("Course " + (i + 1))) + '</td><td class="num">' + c.units +
        "</td><td>" + c.grade + '</td><td class="num">' + c.point + '</td><td class="num">' + SK.round(c.qp, 2) + "</td></tr>";
    });
    rows += '<tr><td><strong>Semester total</strong></td><td class="num"><strong>' + semUnits +
      '</strong></td><td></td><td></td><td class="num"><strong>' + SK.round(semQP, 2) + "</strong></td></tr>";
    if (data.prev) {
      rows += '<tr><td>Previous record</td><td class="num">' + data.prev.units + '</td><td colspan="2">CGPA ' +
        data.prev.cgpa + '</td><td class="num">' + SK.round(data.prev.qp, 2) + "</td></tr>";
      rows += '<tr><td><strong>Cumulative total</strong></td><td class="num"><strong>' + totalUnits +
        '</strong></td><td></td><td></td><td class="num"><strong>' + SK.round(totalQP, 2) + "</strong></td></tr>";
    }
    rows += "</tbody>";
    breakdownTable.innerHTML = rows;

    resultExplain.textContent = data.prev
      ? "Semester GPA = " + SK.round(semQP, 2) + " ÷ " + semUnits + " = " + SK.round(gpa, 2).toFixed(2) +
        ". Cumulative CGPA = " + SK.round(totalQP, 2) + " ÷ " + totalUnits + " = " + SK.round(cgpaVal, 2).toFixed(2) + "."
      : "GPA = total quality points ÷ total credit units = " + SK.round(semQP, 2) + " ÷ " + semUnits +
        " = " + SK.round(gpa, 2).toFixed(2) + ".";

    printDate.textContent = "Generated " + SK.printDate();
    result.hidden = false;
    SK.announce("liveRegion", data.prev
      ? "Semester GPA " + SK.round(gpa, 2).toFixed(2) + ", cumulative CGPA " + SK.round(cgpaVal, 2).toFixed(2) + "."
      : "Semester GPA " + SK.round(gpa, 2).toFixed(2) + ".");
    result.scrollIntoView({ block: "nearest" });
  }

  function tile(label, value, primary) {
    return '<div class="tile' + (primary ? " tile--primary" : "") + '"><p class="tile__label">' +
      SK.esc(label) + '</p><p class="tile__value num">' + SK.esc(value) + "</p></div>";
  }

  /* ---------- Persistence ---------- */
  function save() {
    var rows = [];
    courseList.querySelectorAll("[data-row]").forEach(function (li) {
      rows.push({
        name: li.querySelector("[data-name]").value,
        units: li.querySelector("[data-units]").value,
        grade: li.querySelector("[data-grade]").value
      });
    });
    var ok = SK.store.set(STORE_KEY, {
      scale: scaleSel.value, cumulative: cumulative,
      prevUnits: prevUnits.value, prevCGPA: prevCGPA.value, rows: rows
    });
    if (ok) { clearSavedBtn.hidden = false; saveNote.hidden = false; }
  }

  function load() {
    var d = SK.store.get(STORE_KEY);
    if (!d) { makeRow(); updateScaleExplain(); return; }
    if (d.scale && SCALES[d.scale]) scaleSel.value = d.scale;
    updateScaleExplain();
    (d.rows && d.rows.length ? d.rows : [null]).forEach(function (r) { makeRow(r); });
    if (d.cumulative) { setMode(true); prevUnits.value = d.prevUnits || ""; prevCGPA.value = d.prevCGPA || ""; }
    clearSavedBtn.hidden = false; saveNote.hidden = false;
  }

  /* ---------- Events ---------- */
  scaleSel.addEventListener("change", function () { updateScaleExplain(); refreshGradeSelects(); });
  addBtn.addEventListener("click", function () {
    var li = makeRow();
    var f = li.querySelector("[data-name]"); if (f) f.focus();
  });
  modeSem.addEventListener("click", function () { setMode(false); });
  modeCum.addEventListener("click", function () { setMode(true); });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var data = validateAndCollect();
    if (!data) { result.hidden = true; return; }
    render(data);
    save();
  });

  resetBtn.addEventListener("click", function () {
    var hasData = Array.prototype.some.call(courseList.querySelectorAll("[data-units],[data-name]"), function (i) { return i.value.trim() !== ""; });
    if (hasData && !window.confirm("Clear all courses and results?")) return;
    courseList.innerHTML = "";
    makeRow();
    setMode(false);
    prevUnits.value = ""; prevCGPA.value = "";
    result.hidden = true;
    summaryErr.classList.remove("is-shown"); summaryErr.textContent = "";
  });

  clearSavedBtn.addEventListener("click", function () {
    SK.store.remove(STORE_KEY);
    clearSavedBtn.hidden = true; saveNote.hidden = true;
    SK.announce("liveRegion", "Saved data cleared from this device.");
  });

  printBtn.addEventListener("click", function () { window.print(); });
  recalcBtn.addEventListener("click", function () {
    result.hidden = true;
    form.scrollIntoView({ block: "start" });
  });

  load();
})();
