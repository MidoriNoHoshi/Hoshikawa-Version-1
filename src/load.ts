import { Plugin, TFile, WorkspaceWindow } from "obsidian";
import { URL_SettingsTab } from "./settings";

export interface SettingsView {
  editorImage: string;
  editorOpacity: number;
  editorBlur: number;
  contrastInput: boolean;
  darknessOverlay: number;
  navImage: string;
  navOpacity: number;
  navBlur: number;
  navTextShadow: number;
}

export const DEFAULT_VALUES: SettingsView = {
  editorImage: "",
  editorOpacity: 0.4,
  editorBlur: 0,
  contrastInput: false,
  darknessOverlay: 0,
  navImage: "",
  navOpacity: 0.4,
  navBlur: 0,
  navTextShadow: 0,
};

export default class FeatherweightWallpaper extends Plugin {
  settings!: SettingsView;

  async onload() {
    await this.loadSettings();

    this.addSettingTab(new URL_SettingsTab(this.app, this));

    this.app.workspace.onLayoutReady(() => this.updateBackground());
    this.registerEvent(
      this.app.workspace.on("window-open", (win: WorkspaceWindow) =>
        this.updateBackground(win.doc),
      ),
    );
  }

  onunload() {
    this.clearBackground(document);
    this.app.workspace.iterateAllLeaves((leaf) => {
      const doc = leaf.view.containerEl.ownerDocument;
      if (doc && doc !== document) {
        this.clearBackground(doc);
      }
    });
  }

  async loadSettings() {
    const loadedData = (await this.loadData()) as Partial<SettingsView> | null;
    this.settings = Object.assign({}, DEFAULT_VALUES, loadedData ?? {});
  }

  async saveSettings() {
    await this.saveData(this.settings);
    this.updateBackground();
  }

  async resetSettings() {
    this.settings = Object.assign({}, DEFAULT_VALUES);
    await this.saveSettings();
  }

  resolveImagePath(rawPath: string): string {
    const trimmed = rawPath.trim();
    if (!trimmed) return "none";

    // Direct remote web address
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
      return `url('${trimmed}')`;
    }

    // Vault local path
    const file = this.app.vault.getAbstractFileByPath(trimmed);
    if (file instanceof TFile) {
      const resourcePath = this.app.vault.getResourcePath(file);
      return `url('${resourcePath}')`;
    }

    // Fallback: try raw string if user provided absolute path/local uri
    return `url('${trimmed}')`;
  }

  updateBackground(targetDoc?: Document) {
    const editorImg = this.resolveImagePath(this.settings.editorImage);
    const navImg = this.resolveImagePath(this.settings.navImage);
    const shadow = this.settings.navTextShadow;

    const applyToDoc = (doc: Document) => {
      if (!doc?.body) return;

      doc.body.style.setProperty(
        "--obsidian-editor-background-image",
        editorImg,
      );
      doc.body.style.setProperty(
        "--obsidian-editor-background-opacity",
        `${this.settings.editorOpacity}`,
      );
      doc.body.style.setProperty(
        "--obsidian-editor-background-bluriness",
        `${this.settings.editorBlur}px`,
      );
      doc.body.style.setProperty(
        "--obsidian-editor-background-input-contrast",
        this.settings.contrastInput ? "rgba(255, 255, 255, 0.08)" : "none",
      );
      doc.body.style.setProperty(
        "--obsidian-editor-background-darkness-overlay",
        `rgba(0, 0, 0, ${this.settings.darknessOverlay / 100})`,
      );

      doc.body.style.setProperty("--obsidian-nav-background-pos", navImg);
      doc.body.style.setProperty(
        "--obsidian-nav-background-posOpacity",
        `${this.settings.navOpacity}`,
      );
      doc.body.style.setProperty(
        "--obsidian-nav-background-Posblur",
        `${this.settings.navBlur}px`,
      );
      const shadowValue =
        shadow > 0
          ? `1px 1px ${shadow * 2}px rgba(0, 0, 0, ${Math.min(1, shadow * 0.15)})`
          : "none";
      doc.body.style.setProperty("--obsidian-nav-text-shadow", shadowValue);
    };

    if (targetDoc) {
      applyToDoc(targetDoc);
      return;
    }

    // Apply to main document
    applyToDoc(document);

    // Apply to any auxiliary popout windows
    this.app.workspace.iterateAllLeaves((leaf) => {
      const doc = leaf.view.containerEl.ownerDocument;
      if (doc && doc !== document) {
        applyToDoc(doc);
      }
    });
  }

  clearBackground(doc: Document = activeDocument) {
    doc.body.style.removeProperty("--obsidian-editor-background-image");
    doc.body.style.removeProperty("--obsidian-editor-background-opacity");
    doc.body.style.removeProperty("--obsidian-editor-background-bluriness");
    doc.body.style.removeProperty(
      "--obsidian-editor-background-input-contrast",
    );
    doc.body.style.removeProperty(
      "--obsidian-editor-background-darkness-overlay",
    );
    doc.body.style.removeProperty("--obsidian-nav-background-pos");
    doc.body.style.removeProperty("--obsidian-nav-background-posOpacity");
    doc.body.style.removeProperty("--obsidian-nav-background-Posblur");
    doc.body.style.removeProperty("--obsidian-nav-text-shadow");
  }
}
