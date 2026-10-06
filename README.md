# YouTube History & Non-Blocker Auto-Skipper

[![Manifest V3](https://img.shields.io/badge/Manifest-V3-success.svg)](https://developer.chrome.com/docs/extensions/mv3/intro/)
[![Release](https://img.shields.io/github/v/release/rudhrahas-dev/YouTube-History-AutoSkipper?color=blue)](https://github.com/rudhrahas-dev/YouTube-History-AutoSkipper/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A lightweight, undetectable Chrome Extension for YouTube that combines instant history navigation with an HTML5 DOM-based pre-roll and mid-roll ad fast-forwarder/skipper.

Designed specifically to bypass YouTube's aggressive anti-adblock detection mechanisms by operating entirely **without** network request blocking.

---

## ⚡ Key Features

### 1. 🚀 Zero-Detection Ad Skipper (Pre-Roll & Mid-Roll)
Traditional ad blockers intercept network requests and block Google ad domains, triggering YouTube's *"Ad blockers violate YouTube's Terms of Service"* warning screens and video lockouts.

This extension takes a completely different, undetectable approach:
- **Zero Network Blocking**: All Google ad scripts load naturally without resistance. YouTube never flags the browser as using an ad blocker.
- **HTML5 Player DOM Acceleration**:
  - Automatically detects ad playback via the HTML5 player state and DOM mutations.
  - **Mutes ad audio** immediately so you never hear loud or jarring advertisements.
  - **Accelerates ad playback to 16x** (the maximum rate supported by the HTML5 video engine).
  - **Auto-seeks to the ad's end** (`video.currentTime = duration - 0.05`).
  - **Auto-clicks modern skip buttons** (`.ytp-ad-skip-button`, `.ytp-skip-ad-button`, etc.) within milliseconds.
  - **Restores user volume and playback speed** instantly when your actual video starts playing.

### 2. 🕒 Instant YouTube History Shortcut (`Ctrl + Shift + H`)
- Press **`Ctrl + Shift + H`** (or **`Command + Shift + H`** on macOS) at any time to instantly redirect your current tab to YouTube History (`https://www.youtube.com/feed/history`).
- Extremely handy for jumping back to recently watched videos or resetting playback state on interrupted streams.

---

## 📥 Download & Installation

### Option A: Download Pre-Packaged Release (Recommended)

1. Head to the **[Releases](https://github.com/rudhrahas-dev/YouTube-History-AutoSkipper/releases)** page.
2. Download `historypop.zip` from the latest release.
3. Extract the `.zip` archive to a folder on your computer.
4. Open your Chromium-based browser (Google Chrome, Brave, Microsoft Edge, Opera, Vivaldi).
5. Navigate to `chrome://extensions` in the address bar.
6. Enable **Developer mode** using the toggle switch in the top-right corner.
7. Click the **Load unpacked** button in the top-left corner.
8. Select the folder where you extracted `historypop`.
9. The extension is now active and ready to use!

---

### Option B: Clone via Git

```bash
git clone https://github.com/rudhrahas-dev/YouTube-History-AutoSkipper.git
cd YouTube-History-AutoSkipper
```

Then load the cloned directory via `chrome://extensions` -> **Load unpacked**.

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action | Scope |
| :--- | :--- | :--- |
| **`Ctrl + Shift + H`** (Windows / Linux) | Open YouTube History in current tab | In-browser |
| **`Command + Shift + H`** (macOS) | Open YouTube History in current tab | In-browser |

*You can customize this shortcut at any time by visiting `chrome://extensions/shortcuts`.*

---

## 📁 Project Structure

```
├── manifest.json      # Manifest V3 extension configuration & permission definitions
├── content.js         # Non-blocking HTML5 DOM fast-forward & skip engine
├── background.js      # Service worker handling global keyboard shortcuts
└── README.md          # Documentation and setup instructions
```

---

## 🛡️ Permissions & Privacy

- **`tabs`**: Used strictly by the background service worker to navigate the active tab to `https://www.youtube.com/feed/history` when `Ctrl+Shift+H` is pressed.
- **Host Permissions**: Restricted exclusively to `*://*.youtube.com/*`.
- **Zero Telemetry**: No user data, analytics, tracking, or network requests are collected or sent anywhere.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
