/* iOS / Android platform toggle
   - On the home page (data-page-platform="both"), switches which set of
     cards is visible via the html[data-platform] attribute.
   - On every other page (data-page-platform="ios" or "android"), the
     inactive button navigates to that page's platform counterpart.
   - The chosen platform is remembered in localStorage so the home page
     opens to the right card set next time. */
(function () {
  var KEY = "clicktrack-platform";

  function getStored() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function setStored(value) {
    try { localStorage.setItem(KEY, value); } catch (e) {}
  }

  function applyActive(toggle, platform) {
    var buttons = toggle.querySelectorAll(".platform-btn");
    for (var i = 0; i < buttons.length; i++) {
      var btn = buttons[i];
      if (btn.getAttribute("data-platform") === platform) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    var toggles = document.querySelectorAll(".platform-toggle");

    for (var t = 0; t < toggles.length; t++) {
      (function (toggle) {
        var pagePlatform = toggle.getAttribute("data-page-platform");

        if (pagePlatform === "both") {
          var current = getStored() || "ios";
          document.documentElement.setAttribute("data-platform", current);
          applyActive(toggle, current);
        } else {
          setStored(pagePlatform);
          applyActive(toggle, pagePlatform);
        }

        var buttons = toggle.querySelectorAll(".platform-btn");
        for (var i = 0; i < buttons.length; i++) {
          buttons[i].addEventListener("click", function () {
            var target = this.getAttribute("data-platform");

            if (pagePlatform === "both") {
              document.documentElement.setAttribute("data-platform", target);
              setStored(target);
              applyActive(toggle, target);
            } else if (target !== pagePlatform) {
              setStored(target);
              var href = this.getAttribute("data-href");
              if (href) { window.location.href = href; }
            }
          });
        }
      })(toggles[t]);
    }
  });
})();
