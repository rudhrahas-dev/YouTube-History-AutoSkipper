# YouTube History & Non-Blocker Auto-Skipper (with Background Play)

[![Manifest V3](https://img.shields.io/badge/Manifest-V3-success.svg)](https://developer.chrome.com/docs/extensions/mv3/intro/)
[![Release](https://img.shields.io/github/v/release/rudhrahas-dev/YouTube-History-AutoSkipper?color=blue)](https://github.com/rudhrahas-dev/YouTube-History-AutoSkipper/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A lightweight, undetectable Manifest V3 extension for YouTube that provides:
1. **Zero-Detection Ad Auto-Skipper** (Pre-roll and mid-roll ad acceleration and auto-skipping).
2. **Screen-Off & Background Playback** (YouTube Premium feature: play audio while the display is locked/off or while switching apps on Android mobile and desktop).
3. **Instant YouTube History Shortcut** (`Ctrl + Shift + H`).

Designed to run without blocking network requests, ensuring zero anti-adblock detection warnings.

---

## ⚡ Key Features

### 1. 📱 Background Play & Screen-Off Playback (YouTube Premium Feature)
On standard YouTube (both desktop and mobile web), locking the phone screen, turning the display off, or switching tabs immediately pauses the video unless you subscribe to YouTube Premium.

This extension unlocks native background play:
- **Display-Off Audio**: Lock your Android phone or turn the screen off; audio continues playing smoothly through phone speakers, Bluetooth, or headphones.
- **Android Lock Screen Media Controls**: Full integration with the Android MediaSession notification — view video title, channel, thumbnail, and control play/pause directly from your lock screen.
- **Page Visibility API Neutralization**: Seamlessly runs in the `MAIN` execution world to spoof `document.hidden` and intercept `visibilitychange` events, preventing YouTube's auto-pause handlers from firing.

### 2. 🚀 Zero-Detection Ad Auto-Skipper (Pre-Roll & Mid-Roll)
- **Zero Network Blocking**: Ad scripts load normally so YouTube never detects an ad blocker.
- **16x Playback Acceleration**: Fast-forwards ad streams at maximum HTML5 speed.
- **Auto-Mute**: Silences ad audio so you never hear loud advertisements.
- **Synthetic Pointer & Mouse Event Clicks**: Automatically triggers modern skip buttons (`.ytp-ad-skip-button-slot`, `.ytp-skip-ad-button`, etc.) using realistic event chains.
- **Auto-Restoration**: Restores your chosen volume and playback speed the millisecond your video begins.

### 3. 🕒 Instant YouTube History Shortcut (`Ctrl + Shift + H`)
- Press **`Ctrl + Shift + H`** (or **`Command + Shift + H`** on macOS) to instantly redirect the active tab to YouTube History.

---

## 📱 How to Use on Android (Screen-Off Playback)

### Recommended: Lemur Browser (Direct Play Store Install)

[**Lemur Browser**](https://play.google.com/store/apps/details?id=com.lemurbrowser.exts) is an actively maintained Chromium-based mobile browser that natively supports Chrome and Edge extensions, including local `.zip` loading:

1. Install **Lemur Browser** from the Google Play Store (developer: *STARLAB.QLY*).
2. Download **[`historypop.zip`](https://github.com/rudhrahas-dev/YouTube-History-AutoSkipper/releases/download/v3.0/historypop.zip)** onto your phone.
3. Open Lemur Browser and tap the **Extensions menu (puzzle icon 🧩)** at the bottom.
4. Select **"Load unpacked extension (.crx / .zip)"**.
5. Pick the downloaded `historypop.zip` file — the extension installs immediately!
6. Open **`m.youtube.com`**, start any video, and lock your screen — **audio continues playing seamlessly with lock-screen media controls!**

---

> [!WARNING]
> ### ⚠️ Security Warning Regarding "Kiwi Browser"
> The original Kiwi Browser (by Arnaud Granal / Geometry OU) was discontinued and archived in early 2025.
> 
> **Do NOT install unofficial Kiwi clones on app stores** (such as *"Kirton AppRes"* or *"Kiwi Browser - Fast & Quiet"*). These third-party repackages are unauthorized and often inject trackers or adware.
> 
> *If you specifically prefer Kiwi Browser, only download the original APK directly from the official [kiwibrowser/src GitHub Releases](https://github.com/kiwibrowser/src/releases).*

---

## 💻 How to Install on Desktop (Chrome / Brave / Edge / Opera)

1. Download **[`historypop.zip`](https://github.com/rudhrahas-dev/YouTube-History-AutoSkipper/releases/download/v3.0/historypop.zip)** from the latest release.
2. Extract the `.zip` archive to a folder.
3. Open your browser and go to `chrome://extensions`.
4. Enable **Developer mode** (top-right toggle).
5. Click **Load unpacked** and select the extracted folder.

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action | Scope |
| :--- | :--- | :--- |
| **`Ctrl + Shift + H`** (Windows / Linux) | Open YouTube History in current tab | Desktop |
| **`Command + Shift + H`** (macOS) | Open YouTube History in current tab | Desktop |

---

## 📁 Project Structure

```
├── manifest.json      # Manifest V3 extension configuration & world mappings
├── bgplay.js          # Main-world Page Visibility API spoof & background play engine
├── content.js         # Non-blocking HTML5 DOM ad fast-forward & skip engine
├── background.js      # Service worker handling global keyboard shortcuts
└── README.md          # Documentation and setup guide
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
