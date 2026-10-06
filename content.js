/**
 * YouTube Non-Blocker Pre-Roll & Mid-Roll Instant Ad Skipper.
 *
 * Enhanced with comprehensive mid-roll ad skip button detection,
 * full pointer/mouse event simulation, and robust state management.
 *
 * How it works without triggering anti-adblock detection:
 * 1. Does not block network packets or Google ad scripts (zero ad-blocker signatures).
 * 2. Directly clicks skip buttons instantly using synthetic pointer and mouse events.
 * 3. Mutes ad audio, accelerates playback to 16x, and jumps to ad stream completion.
 * 4. Automatically restores volume and user's original playback speed when video plays.
 */

(() => {
  let wasMutedByScript = false;
  let userPlaybackRate = 1.0;

  // Simulate complete user interaction across pointer and mouse events
  function simulateClick(el) {
    if (!el) return;

    // Target the element itself, its button container, and child buttons
    const targets = [];
    const parentButton = el.closest('button, [role="button"]');
    if (parentButton) targets.push(parentButton);
    if (!targets.includes(el)) targets.push(el);
    const childButton = el.querySelector('button, [role="button"]');
    if (childButton && !targets.includes(childButton)) targets.push(childButton);

    const eventNames = ['pointerdown', 'mousedown', 'pointerup', 'mouseup', 'click'];
    for (const target of targets) {
      for (const evtName of eventNames) {
        try {
          const evt = evtName.startsWith('pointer')
            ? new PointerEvent(evtName, { bubbles: true, cancelable: true, view: window })
            : new MouseEvent(evtName, { bubbles: true, cancelable: true, view: window });
          target.dispatchEvent(evt);
        } catch (_) {}
      }
      try {
        target.click();
      } catch (_) {}
    }
  }

  // Check if an element is interactable / visible
  function isClickable(el) {
    if (!el) return false;
    if (el.disabled || el.getAttribute('aria-disabled') === 'true') return false;
    const style = window.getComputedStyle(el);
    if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') {
      return false;
    }
    return true;
  }

  // Scan and click any skip buttons or overlay close buttons
  function triggerSkipButtons() {
    const skipSelectors = [
      // Modern & legacy skip buttons
      '.ytp-ad-skip-button-modern',
      '.ytp-skip-ad-button',
      '.ytp-ad-skip-button',
      'button.ytp-ad-skip-button-modern',
      'button.ytp-skip-ad-button',
      // Slot and container wrappers (crucial for mid-rolls)
      '.ytp-ad-skip-button-slot button',
      '.ytp-ad-skip-button-container button',
      '.ytp-ad-skip-button-slot',
      '.ytp-ad-skip-button-container',
      '.ytp-ad-player-overlay-skip-or-preview button',
      // Generic pattern matching for YouTube UI updates
      'button[class*="skip-ad"]',
      'button[class*="ad-skip"]',
      'button[class*="skip-button"]',
      '[class*="ytp-skip-ad-button"]',
      '[class*="ytp-ad-skip-button"]',
      'button[id^="skip-button"]',
      '[id^="skip-button"] button',
      // Close overlay buttons (banners)
      '.ytp-ad-overlay-close-button',
      '.ytp-ad-overlay-close-container button'
    ];

    let clicked = false;
    for (const selector of skipSelectors) {
      const elements = document.querySelectorAll(selector);
      for (const el of elements) {
        if (isClickable(el)) {
          simulateClick(el);
          clicked = true;
        }
      }
    }

    // Secondary scan: check any button inside ad modules with skip text/aria
    const adModules = document.querySelectorAll('.video-ads, .ytp-ad-module, .ytp-ad-player-overlay');
    for (const mod of adModules) {
      const buttons = mod.querySelectorAll('button, [role="button"], div[class*="skip"]');
      for (const btn of buttons) {
        if (isClickable(btn)) {
          const text = (btn.textContent || btn.getAttribute('aria-label') || '').toLowerCase();
          if (text.includes('skip')) {
            simulateClick(btn);
            clicked = true;
          }
        }
      }
    }

    return clicked;
  }

  function handleAds() {
    // 1. Always attempt to click skip buttons first (independent of video state)
    triggerSkipButtons();

    const player = document.querySelector('#movie_player, .html5-video-player');
    const video = document.querySelector('video.html5-main-video') || document.querySelector('video');

    if (!player || !video) return;

    // Detect if an ad is currently playing (pre-roll or mid-roll)
    const isAd = player.classList.contains('ad-showing') ||
                 player.classList.contains('ad-interrupting') ||
                 Boolean(document.querySelector('.ytp-ad-player-overlay, .ytp-ad-preview-container, .ytp-ad-text'));

    if (isAd) {
      // 1. Mute ad audio so user doesn't hear jarring noise
      try {
        if (!video.muted) {
          video.muted = true;
          wasMutedByScript = true;
        }
      } catch (_) {}

      // 2. Maximize playback speed to 16x (highest supported HTML5 rate)
      try {
        if (video.playbackRate < 16.0) {
          video.playbackRate = 16.0;
        }
      } catch (_) {}

      // 3. Fast-forward immediately to the end of the ad stream safely
      try {
        if (Number.isFinite(video.duration) && video.duration > 0) {
          video.currentTime = Math.max(0, video.duration - 0.05);
        }
      } catch (_) {}

      // 4. Trigger skip buttons again after fast-forwarding
      triggerSkipButtons();
    } else {
      // Main video playback: restore volume and user's chosen playback speed
      try {
        if (wasMutedByScript) {
          video.muted = false;
          wasMutedByScript = false;
        }

        if (video.playbackRate > 2.0) {
          video.playbackRate = userPlaybackRate;
        } else {
          userPlaybackRate = video.playbackRate || 1.0;
        }
      } catch (_) {}
    }
  }

  // Fast polling loop to catch ads and mid-rolls immediately (every 50ms)
  setInterval(handleAds, 50);

  // MutationObserver for instantaneous zero-latency reaction on DOM changes
  const observer = new MutationObserver(() => {
    handleAds();
  });

  function initObserver() {
    observer.observe(document.body || document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'style'],
      childList: true,
      subtree: true
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initObserver);
  } else {
    initObserver();
  }
})();
