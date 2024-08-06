import Leaf_Background , {DEFAULT_VALUES} from './Window_Background'
import {App, PluginSettingTab, Setting} from "obsidian";

// Object defining levels of blur
const ExBlur = {
	'0px': 'No',
	'7px': 'No & Yes',
	'17px': 'Yes & Yes',
	'40px': 'Blind',
};

export class URL_SettingsTab extends PluginSettingTab {
	plugin: Leaf_Background;
	
	constructor(app: App, plugin: Leaf_Background) { //'constructor' is a method used to initialise object with specific properties. I still don't understand it.
		super(app, plugin); //Calling constructor of parent class. Ensures parent class is initialised before adding additional functionality.
		this.plugin = plugin; //Property to allow access to settings and methods throughout the rest of the class.
	}
	
	display(): void { //'void' cause the 'display()' method doesn't return anything.
		//const {containerEL} = this; //destructuring assignment 'container' property from 'this'.
		this.containerEl.empty(); //Clear any existing content.
		this.containerEl.createEl('p', { text: "Yo, tis me. For now the plugin does not support local files. URL needs to be a remote resource. Nemi will try fix that later. . . . hopefully." });
		this.containerEl.createEl('a', { href: "https://github.com/MidoriNoHoshi", text: "My GitHub page. . ." });

		/*
		const dimub = this.containerEl.createDiv(); //Creates a <div> element
		dimub.createDiv('p', {text: 'For now, plugin does not support local files. URL Needs to be a remote resource'});
		*/
		
		new Setting(this.containerEl)
		/*.setName('Reset to Default')
		.setDesc('Resets all settings back to default.')*/
		.addButton((button) => {
			button
				.setButtonText('Reset to defaults.')
				.setCta() //To make button more prominent.
				.setTooltip("Resets all the settings back to their default values. What else did you expect?")
				.onClick(async() => {
					await this.plugin.ResetSettings(); //Reset settings to default values.
					
					this.display(); //Recall display method to refresh UI.
				});
		});

		new Setting(this.containerEl)
			.setName('Image URL')
			.setDesc('Copy + paste image to load.')
			.addText((text) =>
				text
					.setPlaceholder('https://example.com/image.png')
					.setValue(this.plugin.settings.ImageURL)
					.onChange(async (value) => {
						this.plugin.settings.ImageURL = value;
						await this.plugin.SaveSettings();
					})
			);

		new Setting(this.containerEl)
			.setName('Image Opacity')
			.setDesc('Values range (0 - 100)%')
			.addText(
				(text) => text.setPlaceholder(`${(DEFAULT_VALUES.Opacity || 1) * 100}`)
					.setValue(`${this.FloatPercent(this.plugin.settings.Opacity)}`)
					.onChange(async (value) => {
						this.plugin.settings.Opacity = this.PercentFloat(Number(value));
						await this.plugin.SaveSettings();
					})
			);

		new Setting(this.containerEl)
			.setName('Image Blur')
			.setDesc('Increase blur to decrease destraction')
			.addDropdown((dropdown) => {
				dropdown
					.addOptions(ExBlur) //Use object ExBlur for options.
					.setValue(this.plugin.settings.Bluriness)
					.onChange(async(value) => {
						this.plugin.settings.Bluriness = value;
						await this.plugin.SaveSettings();
					});
			});

		new Setting(this.containerEl)
			.setName('Increased Image Contrast Overlay')
			.setDesc('Adds a translucent increased contrast overlay for the input area.')
			.addToggle((toggle) => {
				toggle
					.setTooltip('BOO! Enable to increase contrast of input area.')
					.setValue(this.plugin.settings.ContrastInput)
					.onChange(async(value) => {
						this.plugin.settings.ContrastInput = value;
						await this.plugin.SaveSettings();
					});
			});

		new Setting(this.containerEl)
			.setName('Darkness Overlay')
			.setDesc('Adds a translucent dark overlay for the input area.')
			.addSlider((slider) => {
				slider
					.setValue(this.plugin.settings.DarknessOverlay)
					.setLimits(0, 100, 5) //Minimum value: 0, Maximum value: 100, Step size: 5
					.setDynamicTooltip()
					.onChange(async(value) => {
						this.plugin.settings.DarknessOverlay = value;
						await this.plugin.SaveSettings();
					});
			});
		
		new Setting(this.containerEl)
		.setName('File-nav background opacity')
		.setDesc('Values range (0 - 100)%')
		.addText(
			(text) => text.setPlaceholder(`${(DEFAULT_VALUES.posOpacity || 1) * 100}`)
			.setValue(`${this.FloatPercent(this.plugin.settings.posOpacity)}`)
			.onChange(async(value) => {
				this.plugin.settings.posOpacity = this.PercentFloat(Number(value));
				await this.plugin.SaveSettings();
			})
		);
		
		new Setting(this.containerEl)
		.setName('File-nav background blur')
		.setDesc('Blurs the background of the file navigator to reduce visual strain')
		.addDropdown((dropdown) => dropdown
		.addOptions(ExBlur) //Using ExBlur again for bluriness values.
		.setValue(this.plugin.settings.Posblur)
		.onChange(async(value) => {
			this.plugin.settings.Posblur = value;
			await this.plugin.SaveSettings();
		}))
		new Setting(this.containerEl)
			.setName('Image URL for file-nav')
			.setDesc('Copy + pase image to load.')
			.addText((text) => {
				text
					.setPlaceholder('https://example.com/image.png')
					.setValue(this.plugin.settings.pos)
					.onChange(async(value) => {
						this.plugin.settings.pos = value;
						await this.plugin.SaveSettings();
					});
			});
		
	}
	FloatPercent(value: number){
		return Math.max(0, Math.min(1, value)) * 100;
	}
	PercentFloat(value:number){
		return Math.max(0, Math.min(100, value)) / 100;
	}
}
