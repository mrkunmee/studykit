/* ==========================================================================
   Percentage Calculator — three clearly separated modes.
   of:     result = (pct/100) × number
   xy:     result = (part/whole) × 100            (guard whole = 0)
   change: result = ((new − old)/old) × 100       (guard old = 0)
   ========================================================================== */
(function () {
  "use strict";

  var form = document.getElementById("pctForm");
  if (!form) return;

  var modeSwitch = document.getElementById("modeSwitch");
  var groups = {
    of: form.querySelector('[data-group="of"]'),
    xy: form.querySelector('[data-group="xy"]'),
    change: form.querySelector('[data-group="change"]')
  };
  var errs = {
    of: document.getElementById("ofErr"),
    xy: document.getElementById("xyErr"),
    change: document.getElementById("chErr")
  };
  var result = document.getElementById("result");
  var resultValue = document.getElementById("resultValue");
  var resultSentence = document.getElementById("resultSentence");
  var resetBtn = document.getElementById("resetBtn");

  var fields = {
    ofPct: document.getElementById("ofPct"), ofNum: document.getElementById("ofNum"),
    xyPart: document.getElementById("xyPart"), xyWhole: document.getElementById("xyWhole"),
    chOld: document.getElementById("chOld"), chNew: document.getElementById("chNew")
  };

  var mode = "of";

  function num(el) { return el.value === "" ? NaN : Number(el.value); }
  function showErr(kind, msg) { errs[kind].textContent = msg; errs[kind].classList.add("is-shown"); }
  function clearErrs() { Object.keys(errs).forEach(function (k) { errs[k].classList.remove("is-shown"); errs[k].textContent = ""; }); }
  function fmt(n) { return SK.round(n, 4); }

  function setMode(m) {
    mode = m;
    Object.keys(groups).forEach(function (k) { groups[k].hidden = k !== m; });
    Array.prototype.forEach.call(modeSwitch.querySelectorAll("button"), function (b) {
      var on = b.getAttribute("data-mode") === m;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-checked", String(on));
    });
    clearErrs();
    result.hidden = true;
  }

  function calc() {
    clearErrs();
    if (mode === "of") {
      var p = num(fields.ofPct), n = num(fields.ofNum);
      if (isNaN(p) || isNaN(n)) { showErr("of", "Enter both the percentage and the number."); return null; }
      var r = (p / 100) * n;
      return { value: fmt(r), sentence: fmt(p) + "% of " + fmt(n) + " = " + fmt(r) + "." };
    }
    if (mode === "xy") {
      var part = num(fields.xyPart), whole = num(fields.xyWhole);
      if (isNaN(part) || isNaN(whole)) { showErr("xy", "Enter both values."); return null; }
      if (whole === 0) { showErr("xy", "Can't divide by zero — the total (Y) must not be 0."); return null; }
      var pct = (part / whole) * 100;
      return { value: fmt(pct) + "%", sentence: fmt(part) + " is " + fmt(pct) + "% of " + fmt(whole) + "." };
    }
    // change
    var oldV = num(fields.chOld), newV = num(fields.chNew);
    if (isNaN(oldV) || isNaN(newV)) { showErr("change", "Enter both the original and new values."); return null; }
    if (oldV === 0) { showErr("change", "Can't divide by zero — the original value must not be 0."); return null; }
    var change = ((newV - oldV) / oldV) * 100;
    var dir = change > 0 ? "increase" : (change < 0 ? "decrease" : "change (no difference)");
    return {
      value: fmt(change) + "%",
      sentence: "From " + fmt(oldV) + " to " + fmt(newV) + " is a " + fmt(Math.abs(change)) + "% " + dir + "."
    };
  }

  modeSwitch.addEventListener("click", function (e) {
    var b = e.target.closest("button[data-mode]");
    if (b) setMode(b.getAttribute("data-mode"));
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var out = calc();
    if (!out) { result.hidden = true; return; }
    resultValue.textContent = out.value;
    resultSentence.textContent = out.sentence;
    result.hidden = false;
    SK.announce("liveRegion", out.sentence);
  });

  resetBtn.addEventListener("click", function () {
    Object.keys(fields).forEach(function (k) { fields[k].value = ""; });
    clearErrs();
    result.hidden = true;
  });
})();
