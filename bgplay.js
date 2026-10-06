/**
 * YouTube Background Play & Screen-Off Audio Engine.
 *
 * Runs in the MAIN execution world at document_start to neutralize
 * YouTube's anti-background playback restrictions.
 *
 * Features:
 * 1. Page Visibility API Spoofing: Keeps document.hidden = false and
 *    document.visibilityState = 'visible' at all times.
 * 2. Event Interception: Blocks visibilitychange and blur events from reaching
 *    YouTube's auto-pause listeners.
 * 3. Lock-Screen / Background Playback: Allows video audio to continue playing
 *    seamlessly when the display is powered off, screen is locked, or another app is opened.
 * 4. Preserves User Controls: Legitimate user interactions (pause buttons on player
 *    or Android lock-screen MediaSession notifications) function normally.
 */

(() => {
  'use strict';

  // 1. Force Page Visibility API to report the document is always visible & focused
  try {
    Object.defineProperty(document, 'hidden', {
      get: () => false,
      configurable: true
    });

    Object.defineProperty(document, 'visibilityState', {
      get: () => 'visible',
      configurable: true
    });

    Object.defineProperty(document, 'webkitHidden', {
      get: () => false,
      configurable: true
    });

    Object.defineProperty(document, 'webkitVisibilityState', {
      get: () => 'visible',
      configurable: true
    });

    // Mock document.hasFocus() to prevent idle/blur pausing
    document.hasFocus = () => true;
  } catch (_) {}

  // 2. Intercept and block visibility and blur events from reaching YouTube
  const blockedEvents = [
    'visibilitychange',
    'webkitvisibilitychange',
    'blur',
    'pagehide'
  ];

  for (const evtName of blockedEvents) {
    window.addEventListener(evtName, (e) => {
      e.stopImmediatePropagation();
    }, true);

    document.addEventListener(evtName, (e) => {
      e.stopImmediatePropagation();
    }, true);
  }

  // 3. Neutralize direct inline event properties (e.g. document.onvisibilitychange)
  try {
    Object.defineProperty(document, 'onvisibilitychange', {
      get: () => null,
      set: () => {},
      configurable: true
    });

    Object.defineProperty(window, 'onblur', {
      get: () => null,
      set: () => {},
      configurable: true
    });
  } catch (_) {}
})();
