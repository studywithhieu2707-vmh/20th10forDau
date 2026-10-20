/**
 * Envelope + Letter — logic sau quả cầu ảnh (từ cricle)
 */
(function () {
  var envelopeOverlay = document.getElementById("envelope-overlay");
  var letterStage = document.getElementById("letter-stage");
  var letterTrigger = document.getElementById("letter-trigger");
  var letterForm = document.querySelector(".wrapperLetterForm");
  var letterCloseBtn = document.getElementById("letter-close-btn");
  var titleEl = document.querySelector(".textLetter h2");
  var contentEl = document.getElementById("letter-content-text");
  var titleTimer = null;
  var contentTimer = null;
  var openTimer = null;

  var fallbackTitle = "Gửi Dau !";
  var fallbackMessage =
    "Hôm nay là ngày 20/10 - ngày dành riêng cho những người con gái tuyệt vời nhất. Chúc em có một ngày lễ thật trọn vẹn. Hi vọng sau này anh sẽ có cơ hội cùng em đón thêm nhiều dịp lễ khác💗💗💗 Anh Thích Emmmm ><";

  window.showEnvelope = function () {
    if (envelopeOverlay) envelopeOverlay.classList.add("show");
    if (letterStage) {
      letterStage.classList.remove("opening");
      letterStage.classList.add("show");
      letterStage.setAttribute("aria-hidden", "false");
    }
  };

  window.hideEnvelope = function () {
    if (envelopeOverlay) envelopeOverlay.classList.remove("show");
    if (letterStage) {
      letterStage.classList.remove("show", "opening");
      letterStage.setAttribute("aria-hidden", "true");
    }
  };

  function openLetterForm() {
    if (!letterStage || !letterForm) return;
    letterStage.classList.add("opening");
    openTimer = setTimeout(function () {
      window.hideEnvelope();
      letterForm.classList.add("show");
      letterForm.setAttribute("aria-hidden", "false");
      startLetterText();
    }, 520);
  }

  function getLetterTitle() {
    if (window.Heartlove && window.Heartlove.data && window.Heartlove.data.titleMessage) {
      return window.Heartlove.data.titleMessage;
    }
    if (window.dataChristmasTree && window.dataChristmasTree.data && window.dataChristmasTree.data.title) {
      return window.dataChristmasTree.data.title;
    }
    return fallbackTitle;
  }

  function getLetterMessage() {
    if (window.Heartlove && window.Heartlove.data && window.Heartlove.data.popupMessage) {
      return window.Heartlove.data.popupMessage;
    }
    return fallbackMessage;
  }

  function clearTypewriterTimers() {
    if (titleTimer) clearTimeout(titleTimer);
    if (contentTimer) clearTimeout(contentTimer);
    if (openTimer) clearTimeout(openTimer);
    titleTimer = null;
    contentTimer = null;
    openTimer = null;
  }

  function typeText(el, value, speed, done) {
    var index = 0;
    function tick() {
      if (index < value.length) {
        el.textContent += value.charAt(index);
        index++;
        var timer = setTimeout(tick, speed);
        if (el === titleEl) titleTimer = timer;
        else contentTimer = timer;
      } else if (done) {
        done();
      }
    }
    tick();
  }

  function startLetterText() {
    if (!titleEl || !contentEl) return;
    clearTypewriterTimers();
    titleEl.textContent = "";
    contentEl.textContent = "";
    typeText(titleEl, getLetterTitle(), 75, function () {
      contentTimer = setTimeout(function () {
        typeText(contentEl, getLetterMessage(), 28);
      }, 250);
    });
  }

  function closeLetter() {
    clearTypewriterTimers();
    if (letterForm) {
      letterForm.classList.remove("show");
      letterForm.setAttribute("aria-hidden", "true");
    }
    if (window.resetToSphere) window.resetToSphere();
  }

  if (letterTrigger) {
    letterTrigger.addEventListener("click", function (e) {
      e.stopPropagation();
      openLetterForm();
    });
    letterTrigger.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLetterForm();
      }
    });
  }

  if (letterCloseBtn) {
    letterCloseBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      closeLetter();
    });
  }

  if (letterForm) {
    letterForm.addEventListener("click", function (e) {
      if (e.target === letterForm) closeLetter();
    });
  }
})();
