var factor = 0.001;
var minDelta = 0.5;
var scrollSpeed = 10;
var scrollTimer;
var restartTimer;
var isScrolling = false;
var prevPos = 0;
var currentPos = 0;
var currentTime;
var prevTime;
var timeDiff;

/* You can scroll manually to break auto scroll */
handleScroll = () => {
  currentPos = window.scrollY;
  clearInterval(scrollTimer);
  if (restartTimer) {
    clearTimeout(restartTimer);
  }
};

/* Auto scroll */
autoScroll = newValue => {
    window.scrollTo(0, 0);
  if (newValue) scrollSpeed = factor * newValue;

  if (scrollTimer) clearInterval(scrollTimer);

  scrollTimer = setInterval(() => {
    currentTime = Date.now();
    if (prevTime && !isScrolling) {
        timeDiff = currentTime - prevTime;
        currentPos += scrollSpeed * timeDiff;
        if (Math.abs(currentPos - prevPos) >= minDelta) {
          isScrolling = true;
          window.scrollTo(0, currentPos);
          isScrolling = false;
          prevPos = currentPos;
          prevTime = currentTime;
        }
    } else {
      prevTime = currentTime;
    }
  }, 1000 / 120);
};

window.addEventListener("scroll", e => {
  currentPos = window.scrollY;
});

/* Listen for scroll */
window.addEventListener("wheel", handleScroll);

/* Escape key stops autoscroll */
document.addEventListener('keydown', (e) => {
  if (e.key === "Escape") {
    clearInterval(scrollTimer);
  }
})

/* Click to stop autoscroll */
document.addEventListener('click', (e) => {
  clearInterval(scrollTimer);
})

autoScroll(200);
