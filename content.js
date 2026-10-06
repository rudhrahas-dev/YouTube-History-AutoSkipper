/**
 * YouTube Non-Blocker Pre-Roll & Mid-Roll Instant Ad Skipper.
 *
 * How it works without triggering anti-adblock detection:
 * 1. Does not block any network packets or Google ad scripts (zero ad-blocker signatures).
 * 2. Directly manipulates the standard HTML5 video player DOM when YouTube signals an ad.
 * 3. Mutes ad audio, accelerates playback to 16x, jumps to the end of the ad stream,
 *    and simulates a click on the skip button instantly.
 * 4. Smoothly restores user's normal volume and playback rate when main video begins.
 */

(() => {
  let wasMutedByScript = false;
  let userPlaybackRate = 1.0;

  function handleAds() {
    const player = document.querySelector('#movie_player, .html5-video-player');
    const video = document.querySelector('video.html5-main-video') || document.querySelector('video');

    if (!player || !video) return;

    // Detect if an ad is currently playing (pre-roll or mid-roll)
    const isAd = player.classList.contains('ad-showing') ||
                 player.classList.contains('ad-interrupting') ||
                 Boolean(document.querySelector('.ytp-ad-player-overlay, .ytp-ad-preview-container, .ytp-ad-text'));

    if (isAd) {
      // 1. Mute ad audio so user doesn't hear jarring noise
      if (!video.muted) {
        video.muted = true;
        wasMutedByScript = true;
      }

      // 2. Maximize playback speed to 16x (highest supported HTML5 rate)
      video.playbackRate = 16.0;

      // 3. Fast-forward immediately to the end of the ad stream
      if (Number.isFinite(video.duration) && video.duration > 0) {
        video.currentTime = Math.max(0, video.duration - 0.05);
      }

      // 4. Auto-click any skip button as soon as it renders
      const skipButtons = [
        '.ytp-ad-skip-button',
        '.ytp-ad-skip-button-modern',
        '.ytp-skip-ad-button',
        '.ytp-ad-skip-button-text',
        '.ytp-ad-overlay-close-button',
        'button.ytp-ad-skip-button-modern'
      ];

      for (const selector of skipButtons) {
        const btn = document.querySelector(selector);
        if (btn) {
          btn.click();
          break;
        }
      }
    } else {
      // Main video playback: restore volume and user's chosen playback speed
      if (wasMutedByScript) {
        video.muted = false;
        wasMutedByScript = false;
      }

      if (video.playbackRate > 2.0) {
        video.playbackRate = userPlaybackRate;
      } else {
        userPlaybackRate = video.playbackRate || 1.0;
      }
    }
  }

  // Fast polling loop to catch ads immediately (every 100ms)
  setInterval(handleAds, 100);

  // MutationObserver for instantaneous zero-latency reaction on DOM changes
  const observer = new MutationObserver(() => {
    handleAds();
  });

  function initObserver() {
    const target = document.querySelector('#movie_player') || document.body;
    if (target) {
      observer.observe(target, {
        attributes: true,
        attributeFilter: ['class'],
        childList: true,
        subtree: true
      });
    } else {
      setTimeout(initObserver, 300);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initObserver);
  } else {
    initObserver();
  }
})();
