/*
 * Hide APlayer lyrics by default — user can re-open via the lrc icon on the
 * player's control row. Without this, MetingJS-loaded lrc URLs cause lyrics
 * to show automatically.
 *
 * Runs once on first page load. With pjax enabled the fixed player survives
 * page navigations, so the user's choice persists naturally (no need for
 * data-pjax re-run).
 */
(function () {
  function init() {
    if (!window.aplayers || !window.aplayers.length) {
      return setTimeout(init, 150);
    }
    window.aplayers.forEach(function (ap) {
      try {
        if (ap.lrc && typeof ap.lrc.hide === 'function') ap.lrc.hide();
      } catch (e) {
        // older APlayer fork: simulate clicking the lrc icon
        var btn = ap.container && ap.container.querySelector('.aplayer-icon-lrc');
        if (btn) btn.click();
      }
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
