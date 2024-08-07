/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// main.ts
var main_exports = {};
__export(main_exports, {
  default: () => main_default
});
module.exports = __toCommonJS(main_exports);

// Window_Background.ts
var import_obsidian2 = require("obsidian");

// SettingsView.ts
var import_obsidian = require("obsidian");
var ExBlur = {
  "0px": "No",
  "7px": "No & Yes",
  "17px": "Yes & Yes",
  "40px": "Blind"
};
var URL_SettingsTab = class extends import_obsidian.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    this.containerEl.empty();
    this.containerEl.createEl("p", { text: "Yo, tis me. For now the plugin does not support local files. URL needs to be a remote resource. Nemi will try fix that later. . . . hopefully." });
    this.containerEl.createEl("a", { href: "https://github.com/MidoriNoHoshi", text: "My GitHub page. . ." });
    new import_obsidian.Setting(this.containerEl).addButton((button) => {
      button.setButtonText("Reset to defaults.").setCta().setTooltip("Resets all the settings back to their default values. What else did you expect?").onClick(async () => {
        await this.plugin.ResetSettings();
        this.display();
      });
    });
    new import_obsidian.Setting(this.containerEl).setName("Image URL").setDesc("Copy + paste image to load.").addText(
      (text) => text.setPlaceholder("https://example.com/image.png").setValue(this.plugin.settings.ImageURL).onChange(async (value) => {
        this.plugin.settings.ImageURL = value;
        await this.plugin.SaveSettings();
      })
    );
    new import_obsidian.Setting(this.containerEl).setName("Image Opacity").setDesc("Values range (0 - 100)%").addText(
      (text) => text.setPlaceholder(`${(DEFAULT_VALUES.Opacity || 1) * 100}`).setValue(`${this.FloatPercent(this.plugin.settings.Opacity)}`).onChange(async (value) => {
        this.plugin.settings.Opacity = this.PercentFloat(Number(value));
        await this.plugin.SaveSettings();
      })
    );
    new import_obsidian.Setting(this.containerEl).setName("Image Blur").setDesc("Increase blur to decrease destraction").addDropdown((dropdown) => {
      dropdown.addOptions(ExBlur).setValue(this.plugin.settings.Bluriness).onChange(async (value) => {
        this.plugin.settings.Bluriness = value;
        await this.plugin.SaveSettings();
      });
    });
    new import_obsidian.Setting(this.containerEl).setName("Increased Image Contrast Overlay").setDesc("Adds a translucent increased contrast overlay for the input area.").addToggle((toggle) => {
      toggle.setTooltip("BOO! Enable to increase contrast of input area.").setValue(this.plugin.settings.ContrastInput).onChange(async (value) => {
        this.plugin.settings.ContrastInput = value;
        await this.plugin.SaveSettings();
      });
    });
    new import_obsidian.Setting(this.containerEl).setName("Darkness Overlay").setDesc("Adds a translucent dark overlay for the input area.").addSlider((slider) => {
      slider.setValue(this.plugin.settings.DarknessOverlay).setLimits(0, 100, 5).setDynamicTooltip().onChange(async (value) => {
        this.plugin.settings.DarknessOverlay = value;
        await this.plugin.SaveSettings();
      });
    });
    new import_obsidian.Setting(this.containerEl).setName("File-nav background opacity").setDesc("Values range (0 - 100)%").addText(
      (text) => text.setPlaceholder(`${(DEFAULT_VALUES.posOpacity || 1) * 100}`).setValue(`${this.FloatPercent(this.plugin.settings.posOpacity)}`).onChange(async (value) => {
        this.plugin.settings.posOpacity = this.PercentFloat(Number(value));
        await this.plugin.SaveSettings();
      })
    );
    new import_obsidian.Setting(this.containerEl).setName("File-nav background blur").setDesc("Blurs the background of the file navigator to reduce visual strain").addDropdown((dropdown) => dropdown.addOptions(ExBlur).setValue(this.plugin.settings.Posblur).onChange(async (value) => {
      this.plugin.settings.Posblur = value;
      await this.plugin.SaveSettings();
    }));
    new import_obsidian.Setting(this.containerEl).setName("Image URL for file-nav").setDesc("Copy + pase image to load.").addText((text) => {
      text.setPlaceholder("https://example.com/image.png").setValue(this.plugin.settings.pos).onChange(async (value) => {
        this.plugin.settings.pos = value;
        await this.plugin.SaveSettings();
      });
    });
  }
  FloatPercent(value) {
    return Math.max(0, Math.min(1, value)) * 100;
  }
  PercentFloat(value) {
    return Math.max(0, Math.min(100, value)) / 100;
  }
};

// Window_Background.ts
var DEFAULT_VALUES = {
  //'Partial', just importing the structure of 'SettingsView'.
  ImageURL: "https://files.yande.re/image/9181f5782e29757f40a606e7bd40c466/yande.re%20620707%20landscape%20ying_yi.jpg",
  Opacity: 0.44,
  Bluriness: "No & Yes",
  ContrastInput: false,
  DarknessOverlay: 0,
  pos: "https://files.yande.re/image/1dbd529d3f26ad86486cb614bec2f9d3/yande.re%20987320%20cleavage%20thighhighs%20wet%20ying_yi.jpg",
  Posblur: "Yes & Yes",
  posOpacity: 0.44
};
var DEFAULT_VALUES_res = {
  ImageURL: "https://files.yande.re/image/9181f5782e29757f40a606e7bd40c466/yande.re%20620707%20landscape%20ying_yi.jpg",
  Opacity: 0.44,
  Bluriness: "No & Yes",
  ContrastInput: false,
  DarknessOverlay: 0,
  pos: "https://files.yande.re/image/1dbd529d3f26ad86486cb614bec2f9d3/yande.re%20987320%20cleavage%20thighhighs%20wet%20ying_yi.jpg",
  Posblur: "Yes & Yes",
  posOpacity: 0.44
};
var Leaf_Background2 = class extends import_obsidian2.Plugin {
  async onload() {
    await this.LoadSettings();
    this.addSettingTab(new URL_SettingsTab(this.app, this));
    this.app.workspace.onLayoutReady(() => this.UpdateBackground(document));
    this.app.workspace.on("window-open", (win) => this.UpdateBackground(win.doc));
  }
  async LoadSettings() {
    this.settings = Object.assign({}, DEFAULT_VALUES, await this.loadData());
  }
  async SaveSettings() {
    await this.saveData(this.settings);
    this.UpdateBackground();
  }
  async ResetSettings() {
    this.settings = Object.assign({}, DEFAULT_VALUES_res);
    await this.SaveSettings();
    window.location.reload();
  }
  UpdateBackground(doc = activeDocument) {
    doc.body.style.setProperty("--obsidian-editor-background-image", `url('${this.settings.ImageURL}')`);
    doc.body.style.setProperty("--obsidian-editor-background-opacity", `${this.settings.Opacity}`);
    doc.body.style.setProperty("--obsidian-editor-background-bluriness", `blur(${this.settings.Bluriness})`);
    doc.body.style.setProperty("--obsidian-editor-background-input-contrast", this.settings.ContrastInput ? "rgba(255, 255, 255, 0.1)" : "none");
    doc.body.style.setProperty("--obsidian-editor-background-darkness-overlay", `rgba(0, 0, 0, ${this.settings.DarknessOverlay / 100})`);
    doc.body.style.setProperty("--obsidian-nav-background-pos", `url('${this.settings.pos}')`);
    doc.body.style.setProperty("--obsidian-nav-background-Posblur", `blur(${this.settings.Posblur})`);
    doc.body.style.setProperty("--obsidian-nav-background-posOpacity", `${this.settings.posOpacity}`);
  }
};

// main.ts
var main_default = Leaf_Background2;
