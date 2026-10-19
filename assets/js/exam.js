/* ==========================================================================
   Exam Score Planner — client-side logic.
   Model (documented on-page): components each have a weight (%) that should
   sum to 100. A completed component has a mark (% of that component).
   currentWeighted = Σ(weight/100 × mark) over completed components.
   required average on remaining = (target − currentWeighted) ÷ (remainingWeight/100).
   ========================================================================== */
(function () {
  "use strict";

  var form = document.getElementById("examForm");
  if (!form) return;

  var list = document.getElementById("componentList");
  var addBtn = document.getElementById("addComponent");
  var weightSumNote = document.getElementById("weightSumNote");
  var target = document.getElementById("target");
  var targetErr = document.getElementById("targetErr");
  var resetBtn = document.getElementById("resetBtn");
  var result = document.getElementById("result");
  var resultTiles = document.getElementById("resultTiles");
  var plain = document.getElementById("plainLanguage");
  var resultNotice = document.getElementById("resultNotice");

  var rid = 0;

  function makeRow(data) {
    rid++;
    var id = rid;
    var li = document.createElement("li");
    li.className = "entry-row";
    li.setAttribute("data-row", "");
    li.innerHTML =
      '<div class="entry-row__grid" style="grid-template-columns:2fr 1fr 1fr auto">' +
        '<div class="field" style="margin-bottom:0"><label for="cn' + id + '">Component <span class="text-muted">(optional)</span></label>' +
          '<input type="text" id="cn' + id + '" data-name maxlength="40"></div>' +
        '<div class="field" style="margin-bottom:0"><label for="cw' + id + '">Weight % <span class="req" aria-hidden="true">*</span></label>' +
          '<input type="number" id="cw' + id + '" data-weight inputmode="decimal" min="0" max="100" step="0.1" aria-describedby="cwErr' + id + '"><p class="field-error" data-err-weight id="cwErr' + id + '"></p></div>' +
        '<div class="field" style="margin-bottom:0"><label for="cm' + id + '">Mark % <span class="text-muted">(blank if not taken)</span></label>' +
          '<input type="number" id="cm' + id + '" data-mark inputmode="decimal" min="0" max="100" step="0.1" aria-describedby="cmErr' + id + '"><p class="field-error" data-err-mark id="cmErr' + id + '"></p></div>' +
        '<div class="entry-row__remove"><button type="button" class="icon-btn" data-remove aria-label="Remove this component"><svg viewBox="0 0 24 24" aria-hidden="true" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div>' +
      "</div>";
    if (data) {
      li.querySelector("[data-name]").value = data.name || "";
      li.querySelector("[data-weight]").value = data.weight != null ? data.weight : "";
      li.querySelector("[data-mark]").value = data.mark != null ? data.mark : "";
    }
    li.querySelector("[data-remove]").addEventListener("click", function () {
      li.remove();
      if (!list.querySelector("[data-row]")) makeRow();
    });
    list.appendChild(li);
    return li;
  }

  function num(v) { return v === "" || v == null ? NaN : Number(v); }

  function compute() {
    var ok = true;
    weightSumNote.classList.remove("is-shown"); weightSumNote.textContent = "";
    SK.clearError(target, targetErr);

    var totalWeight = 0, currentWeighted = 0, remainingWeight = 0, completedCount = 0;

    list.querySelectorAll("[data-row]").forEach(function (li) {
      var wEl = li.querySelector("[data-weight]");
      var mEl = li.querySelector("[data-mark]");
      var wErr = li.querySelector("[data-err-weight]");
      var mErr = li.querySelector("[data-err-mark]");
      SK.clearError(wEl, wErr); SK.clearError(mEl, mErr);

      var w = num(wEl.value);
      if (isNaN(w) || w <= 0 || w > 100) { SK.setError(wEl, wErr, "Enter a weight between 0 and 100."); ok = false; return; }
      totalWeight += w;

      if (mEl.value !== "") {
        var m = num(mEl.value);
        if (isNaN(m) || m < 0 || m > 100) { SK.setError(mEl, mErr, "Mark must be between 0 and 100."); ok = false; return; }
        currentWeighted += (w / 100) * m;
        completedCount++;
      } else {
        remainingWeight += w;
      }
    });

    var t = num(target.value);
    if (isNaN(t) || t < 0 || t > 100) { SK.setError(target, targetErr, "Enter a target between 0 and 100."); ok = false; }

    if (!ok) return null;

    if (Math.abs(totalWeight - 100) > 0.01) {
      weightSumNote.textContent = "Note: your weights add up to " + SK.round(totalWeight, 2) +
        "%. For a meaningful result they should total 100%.";
      weightSumNote.classList.add("is-shown");
    }

    return {
      totalWeight: totalWeight, currentWeighted: currentWeighted,
      remainingWeight: remainingWeight, target: t, completedCount: completedCount
    };
  }

  function render(r) {
    var tiles = "";
    tiles += tile("Target overall", SK.round(r.target, 1) + "%", true);
    tiles += tile("Current weighted total", SK.round(r.currentWeighted, 1) + "%", false);
    tiles += tile("Remaining weight", SK.round(r.remainingWeight, 1) + "%", false);

    var noticeHtml = "";
    var say = "";

    if (r.remainingWeight <= 0) {
      // Everything completed
      var finalScore = r.currentWeighted;
      tiles += tile("Final overall", SK.round(finalScore, 1) + "%", false);
      if (finalScore + 0.0001 >= r.target) {
        say = "All components are complete. Your overall is " + SK.round(finalScore, 1) + "%, which meets your target of " + SK.round(r.target, 1) + "%.";
        noticeHtml = notice("success", "Target met", "There are no remaining components, and your overall already meets the target.");
      } else {
        say = "All components are complete. Your overall is " + SK.round(finalScore, 1) + "%, which is below your target of " + SK.round(r.target, 1) + "%.";
        noticeHtml = notice("warning", "Target not reached", "There are no remaining components to improve the overall score.");
      }
    } else {
      var required = (r.target - r.currentWeighted) / (r.remainingWeight / 100);
      var maxReachable = r.currentWeighted + r.remainingWeight; // if 100% on all remaining
      if (required <= 0) {
        tiles += tile("Needed on remaining", "0%", false);
        say = "You have already reached your target. Even 0% on the remaining " + SK.round(r.remainingWeight, 1) + "% keeps you at or above " + SK.round(r.target, 1) + "%.";
        noticeHtml = notice("success", "Already achieved", "Your current marks already secure the target.");
      } else if (required > 100) {
        tiles += tile("Needed on remaining", "Not possible", false);
        say = "Reaching " + SK.round(r.target, 1) + "% is not achievable — even 100% on the remaining " +
          SK.round(r.remainingWeight, 1) + "% reaches only " + SK.round(maxReachable, 1) + "% overall.";
        noticeHtml = notice("warning", "Target not achievable", "The highest overall score still possible is " + SK.round(maxReachable, 1) + "%.");
      } else {
        tiles += tile("Needed on remaining", SK.round(required, 1) + "%", false);
        say = "To reach " + SK.round(r.target, 1) + "% overall, you need about " + SK.round(required, 1) +
          "% on the remaining " + SK.round(r.remainingWeight, 1) + "%.";
        noticeHtml = notice("info", "Achievable", "Aim for about " + SK.round(required, 1) + "% on your remaining assessment(s).");
      }
    }

    resultTiles.innerHTML = tiles;
    plain.textContent = say;
    resultNotice.innerHTML = noticeHtml;
    result.hidden = false;
    SK.announce("liveRegion", say);
    result.scrollIntoView({ block: "nearest" });
  }

  function tile(label, value, primary) {
    return '<div class="tile' + (primary ? " tile--primary" : "") + '"><p class="tile__label">' +
      SK.esc(label) + '</p><p class="tile__value num">' + SK.esc(value) + "</p></div>";
  }
  function notice(kind, title, body) {
    var icon = kind === "success"
      ? '<svg viewBox="0 0 24 24" aria-hidden="true" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5L20 6"/></svg>'
      : '<svg viewBox="0 0 24 24" aria-hidden="true" stroke-width="1.75"><path d="M12 3l9 16H3z"/><path d="M12 10v4M12 17v.5"/></svg>';
    return '<div class="notice notice--' + kind + '">' + icon + "<div><h3>" + SK.esc(title) + "</h3><p class=\"mb-0\">" + SK.esc(body) + "</p></div></div>";
  }

  addBtn.addEventListener("click", function () {
    var li = makeRow(); var f = li.querySelector("[data-name]"); if (f) f.focus();
  });
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var r = compute();
    if (!r) { result.hidden = true; return; }
    render(r);
  });
  resetBtn.addEventListener("click", function () {
    list.innerHTML = "";
    makeRow({ name: "Continuous assessment", weight: 30 });
    makeRow({ name: "Exam", weight: 70 });
    target.value = "";
    result.hidden = true;
    weightSumNote.classList.remove("is-shown");
  });

  // Initial default components
  makeRow({ name: "Continuous assessment", weight: 30 });
  makeRow({ name: "Exam", weight: 70 });
})();
