/*
 * Loads /data/music.json and boots a fixed APlayer instance into #aplayer-bgm.
 * APlayer global comes from butterfly's aplayerInject (loads APlayer.min.js).
 */
(function () {
  function init() {
    if (typeof APlayer === 'undefined') {
      // APlayer.min.js still loading; retry shortly
      return setTimeout(init, 200);
    }
    var container = document.getElementById('aplayer-bgm');
    if (!container || container.dataset.inited === '1') return;
    container.dataset.inited = '1';

    fetch('/data/music.json', { cache: 'no-cache' })
      .then(function (r) {
        if (!r.ok) throw new Error('music.json HTTP ' + r.status);
        return r.json();
      })
      .then(function (tracks) {
        if (!Array.isArray(tracks) || tracks.length === 0) return;
        new APlayer({
          container: container,
          fixed: false,
          mini: false,
          autoplay: false,
          theme: '#5b8def',
          loop: 'all',
          order: 'list',
          preload: 'none',
          volume: 0.5,
          mutex: true,
          listFolded: true,
          listMaxHeight: '260px',
          lrcType: 0,
          audio: tracks,
        });
      })
      .catch(function (e) {
        console.warn('[aplayer-bgm] init failed:', e);
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
