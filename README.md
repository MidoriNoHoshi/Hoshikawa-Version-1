# Featherweight Local Wallpaper

0-overhead background wallpaper plugin => Obsidian. Supports drag & drop to set local images without a local web-server (+ file-nav wallpaper).
Rendered directly via GPU-accelerated CSS variables.

---

## Features

- **Local & Remote Support:** Use local images on your system. (e.g., `~/Downloads/wallpaper.png`) or external web URLs (`https://...`).

- **Zero-Overhead Architecture:** Uses native Obsidian resource paths and pure CSS custom properties (`var(--...)`). Rendering, scaling, and opacity are offloaded directly to Chromium's GPU compositor.

- **Visual Fine-Tuning:**
  - Adjustable opacity ($0\text{–}100\%$)
  - Native Gaussian blur slider ($0\text{–}40\text{ px}$)
  - Translucent contrast overlay for text legibility
  - Darkness overlay slider for high-brightness images
  - (etc. Maybe add text-colour later)

---

## Usage

1. **Settings -> Featherweight Local Wallpaper**

2. Drag & drop your wallpaper into the box.

---

### Installation

#### From Community Plugins (Recommended)

1. Open Obsidian **Settings** → **Community plugins**.
2. Turn off **Restricted mode**.
3. Search for **Featherweight Local Wallpaper** and click **Install**, then **Enable**.

#### Manual Installation

1. Download `manifest.json`, `main.js`, and `styles.css` from the latest [GitHub Release](https://github.com/MidoriNoHoshi/featherweight-local-wallpaper/releases).

2. Create a folder named `featherweight-local-wallpaper` inside your vault's plugin folder:

   ```text
   <your-vault>/.obsidian/plugins/featherweight-local-wallpaper/
   ```

3. Move the three downloaded files into that folder (manifest.json, styles.css, main.js)

4. Reload Obsidian and enable the plugin in **Community plugins.**

---

## Personal Note

3yrs ago, this was my first "real" programming project. I called it "Hoshikawa Version 1" or something like that. Anyway, I never put it onto obsidian community plugins because I was frustrated that I couldn't get local images to work and because I wanted way more customization like a colour picker (struggling to make a colour picker is what drew me further into programming). . . And all the important parts were 100% vibe coded or stolen.

I greatly regret that I didn't just go a little harder and published it as is but oh well? I got my friends to use it anyway.
