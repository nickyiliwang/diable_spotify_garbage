// ==UserScript==
// @name         Disable Spotify Now playing view
// @namespace    http://tampermonkey.net/
// @version      2023-12-26
// @description  Disable Now playing view
// @author       Nick Wang
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
        // Assuming 'button' is the variable holding your selected button element
        const isPressed = button.getAttribute("aria-pressed");

        if (isPressed === "true") {
          button.click();
        }
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
