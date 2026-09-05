import FeatherweightWallpaper from "./load";
import { App, PluginSettingTab, Setting, TFile, normalizePath } from "obsidian";

export class URL_SettingsTab extends PluginSettingTab {
  plugin: FeatherweightWallpaper;

  constructor(app: App, plugin: FeatherweightWallpaper) {
    super(app, plugin);
    this.plugin = plugin;
  }

  // getSettingDefinitions() {
  //   return [
  //     {
  //       name: "Reset to defaults",
  //       description:
  //         "Restore all background properties to default blank settings.",
  //     },
  //     {
  //       name: "Image source",
  //       description:
  //         "Vault relative path (e.g., 'attachments/bg.png'), remote URL, or drop below.",
  //     },
  //     {
  //       name: "Opacity",
  //       description: "Adjust transparency (0 to 100%)",
  //     },
  //     {
  //       name: "Blur",
  //       description: "Apply gaussian blur in pixels",
  //     },
  //     {
  //       name: "Contrast overlay",
  //       description:
  //         "Translucent contrast layer behind text to maintain legibility",
  //     },
  //     {
  //       name: "Darkness overlay",
  //       description: "Dim the background image (0 to 100%)",
  //     },
  //     {
  //       name: "File navigator image source",
  //       description: "Vault relative path, remote URL, or drop below.",
  //     },
  //     {
  //       name: "File navigator opacity",
  //       description: "Adjust transparency (0 to 100%)",
  //     },
  //     {
  //       name: "File navigator blur",
  //       description: "Apply gaussian blur in pixels",
  //     },
  //     {
  //       name: "File navigator text shadow",
  //       description:
  //         "Adjust text shadow intensity for legibility (0 to disable)",
  //     },
  //   ];
  // }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();

    new Setting(containerEl)
      .setName("Reset to defaults")
      .setDesc("Restore all background properties to default blank settings.")
      .addButton((button) => {
        button
          .setButtonText("Reset")
          .setDestructive()
          .onClick(() => {
            void (async () => {
              await this.plugin.resetSettings();
              this.display();
            })();
          });
      });

    new Setting(containerEl).setName("Editor Background").setHeading();

    new Setting(containerEl)
      .setName("Image source")
      .setDesc(
        "Vault relative path (e.g., 'attachments/bg.png'), remote URL, or drop below.",
      )
      .addText((text) =>
        text
          .setPlaceholder("attachments/wallpaper.png")
          .setValue(this.plugin.settings.editorImage)
          .onChange(async (val) => {
            this.plugin.settings.editorImage = val;
            await this.plugin.saveSettings();
          }),
      );

    this.renderDragDrop(containerEl, "editorImage");

    new Setting(containerEl)
      .setName("Opacity")
      .setDesc("Adjust transparency (0 to 100%)")
      .addSlider((slider) =>
        slider
          .setLimits(0, 100, 1)
          .setValue(Math.round(this.plugin.settings.editorOpacity * 100))
          .onChange(async (val) => {
            this.plugin.settings.editorOpacity = val / 100;
            await this.plugin.saveSettings();
          }),
      );

    new Setting(containerEl)
      .setName("Blur")
      .setDesc("Apply gaussian blur in pixels")
      .addSlider((slider) =>
        slider
          .setLimits(0, 40, 1)
          .setValue(this.plugin.settings.editorBlur)
          .onChange(async (val) => {
            this.plugin.settings.editorBlur = val;
            await this.plugin.saveSettings();
          }),
      );

    new Setting(containerEl)
      .setName("Contrast overlay")
      .setDesc("Translucent contrast layer behind text to maintain legibility")
      .addToggle((toggle) =>
        toggle
          .setValue(this.plugin.settings.contrastInput)
          .onChange(async (val) => {
            this.plugin.settings.contrastInput = val;
            await this.plugin.saveSettings();
          }),
      );

    new Setting(containerEl)
      .setName("Darkness overlay")
      .setDesc("Dim the background image (0 to 100%)")
      .addSlider((slider) =>
        slider
          .setLimits(0, 100, 5)
          .setValue(this.plugin.settings.darknessOverlay)
          .onChange(async (val) => {
            this.plugin.settings.darknessOverlay = val;
            await this.plugin.saveSettings();
          }),
      );

    new Setting(containerEl).setName("File Navigator Background").setHeading();

    new Setting(containerEl)
      .setName("File navigator image source")
      .setDesc("Vault relative path, remote URL, or drop below.")
      .addText((text) =>
        text
          .setPlaceholder("attachments/nav-wallpaper.png")
          .setValue(this.plugin.settings.navImage)
          .onChange(async (val) => {
            this.plugin.settings.navImage = val;
            await this.plugin.saveSettings();
          }),
      );

    this.renderDragDrop(containerEl, "navImage");

    new Setting(containerEl)
      .setName("File navigator opacity")
      .setDesc("Adjust transparency (0 to 100%)")
      .addSlider((slider) =>
        slider
          .setLimits(0, 100, 1)
          .setValue(Math.round(this.plugin.settings.navOpacity * 100))
          .onChange(async (val) => {
            this.plugin.settings.navOpacity = val / 100;
            await this.plugin.saveSettings();
          }),
      );

    new Setting(containerEl)
      .setName("File navigator blur")
      .setDesc("Apply gaussian blur in pixels")
      .addSlider((slider) =>
        slider
          .setLimits(0, 40, 1)
          .setValue(this.plugin.settings.navBlur)
          .onChange(async (val) => {
            this.plugin.settings.navBlur = val;
            await this.plugin.saveSettings();
          }),
      );

    new Setting(containerEl)
      .setName("File navigator text shadow")
      .setDesc("Adjust text shadow intensity for legibility (0 to disable)")
      .addSlider((slider) =>
        slider
          .setLimits(0, 5, 1)
          .setValue(this.plugin.settings.navTextShadow ?? 0)
          .onChange(async (val) => {
            this.plugin.settings.navTextShadow = val;
            await this.plugin.saveSettings();
          }),
      );
  }

  private renderDragDrop(
    parentEl: HTMLElement,
    targetKey: "editorImage" | "navImage",
  ) {
    const dropBox = parentEl.createDiv({ cls: "wallpaper-drop-zone" });

    dropBox.createSpan({
      cls: "wallpaper-drop-zone-plus",
      text: "+",
    });
    dropBox.createSpan({
      cls: "wallpaper-drop-zone-text",
      text: "Drag & drop image file",
    });

    const preventDefault = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    dropBox.addEventListener("dragenter", (e) => {
      preventDefault(e);
      dropBox.addClass("is-dragover");
    });

    dropBox.addEventListener("dragover", (e) => {
      preventDefault(e);
      if (e.dataTransfer) {
        e.dataTransfer.dropEffect = "copy";
      }
      dropBox.addClass("is-dragover");
    });

    dropBox.addEventListener("dragleave", (e) => {
      preventDefault(e);
      dropBox.removeClass("is-dragover");
    });

    dropBox.addEventListener("drop", (e: DragEvent) => {
      preventDefault(e);
      dropBox.removeClass("is-dragover");

      void (async () => {
        const files = e.dataTransfer?.files;
        if (files && files.length > 0) {
          const file = files[0];
          if (file && this.isImageFile(file.name)) {
            const buffer = await file.arrayBuffer();
            const folder = "_wallpapers";

            const folderExists = this.app.vault.getAbstractFileByPath(folder);
            if (!folderExists) {
              await this.app.vault.createFolder(folder);
            }

            const targetPath = normalizePath(`${folder}/${file.name}`);
            let targetFile = this.app.vault.getAbstractFileByPath(targetPath);

            if (targetFile instanceof TFile) {
              await this.app.vault.modifyBinary(targetFile, buffer);
            } else {
              targetFile = await this.app.vault.createBinary(
                targetPath,
                buffer,
              );
            }

            if (targetFile instanceof TFile) {
              this.plugin.settings[targetKey] = targetFile.path;
            } else {
              this.plugin.settings[targetKey] = targetPath;
            }

            await this.plugin.saveSettings();
            this.plugin.updateBackground();
            this.display();
            return;
          }
        }

        const rawData =
          e.dataTransfer?.getData("text/plain") ||
          e.dataTransfer?.getData("text/uri-list") ||
          "";

        if (rawData) {
          let candidatePath =
            rawData
              .replace(/^\[\[(.*?)\]\]$/, "$1")
              .split("\n")[0]
              ?.trim() ?? "";

          if (candidatePath.includes("?file=")) {
            try {
              const parsedUrl = new URL(candidatePath);
              const fileParam = parsedUrl.searchParams.get("file");
              if (fileParam) candidatePath = decodeURIComponent(fileParam);
            } catch {
              // Ignore URI parse failures on internal links
            }
          }

          let targetFile = this.app.vault.getAbstractFileByPath(candidatePath);
          if (!targetFile) {
            targetFile = this.app.metadataCache.getFirstLinkpathDest(
              candidatePath,
              "",
            );
          }

          if (
            targetFile instanceof TFile &&
            this.isImageFile(targetFile.name)
          ) {
            this.plugin.settings[targetKey] = targetFile.path;
            await this.plugin.saveSettings();
            this.plugin.updateBackground();
            this.display();
          }
        }
      })();
    });
  }

  private isImageFile(fileName: string): boolean {
    return /\.(png|jpe?g|webp|gif|svg|bmp)$/i.test(fileName);
  }
}
