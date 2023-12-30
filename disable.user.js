// ==UserScript==
// @name         Disable stupid spotify garbage
// @namespace    http://tampermonkey.net/
// @version      2023-12-26
// @description  Hey spotify, how about stop making stupid features and forcing its users to use it when no one asked for it, and disabling it doesn't work consistenly leading to a maddening user experience ?
// @author       You
// @match        https://open.spotify.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=spotify.com
// @grant        none
// @run-at       document-idle
// ==/UserScript==
(function () {
  function selectButtonWithRetry(selector, maxRetries, delay) {
    let retries = 0;

    function attemptSelection() {
      const button = document.querySelector(selector);

      if (button) {
        const observer = new MutationObserver(function (mutations) {
          mutations.forEach(function (mutation) {
            const isPressed = mutation.target.getAttribute("aria-pressed");

            if (isPressed === "true") {
              mutation.target.click();
            }
          });
        });

        observer.observe(button, {
          attributes: true,
        });
      } else {
        retries++;
        if (retries < maxRetries) {
          console.log("Button not found. Retrying...");
          setTimeout(attemptSelection, delay);
        } else {
          console.log("Max retries reached. Button not found.");
        }
      }
    }

    attemptSelection();
  }

  selectButtonWithRetry('button[aria-label="Now playing view"]', 5, 1000);
})();
