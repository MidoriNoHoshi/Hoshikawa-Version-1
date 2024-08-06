import {Plugin, WorkspaceWindow} from 'obsidian'; //Importing classes from Obsidian API.
import {URL_SettingsTab} from './SettingsView';

interface SettingsView { //Defining SettingsView object.
	ImageURL: string;
	Opacity: number;
	Bluriness: string;
	ContrastInput: boolean;
	DarknessOverlay: number;
	pos: string;
	Posblur: string;
	posOpacity: number;
}

export const DEFAULT_VALUES: Partial<SettingsView> = { //'Partial', just importing the structure of 'SettingsView'.
	ImageURL: 'https://files.yande.re/image/9181f5782e29757f40a606e7bd40c466/yande.re%20620707%20landscape%20ying_yi.jpg',
	Opacity: 0.44,
	Bluriness: 'No & Yes',
	ContrastInput: false,
	DarknessOverlay: 0,
	pos: 'https://files.yande.re/image/1dbd529d3f26ad86486cb614bec2f9d3/yande.re%20987320%20cleavage%20thighhighs%20wet%20ying_yi.jpg',
	Posblur: 'Yes & Yes',
	posOpacity: 0.44
};

const DEFAULT_VALUES_res: SettingsView = {
	ImageURL: 'https://files.yande.re/image/9181f5782e29757f40a606e7bd40c466/yande.re%20620707%20landscape%20ying_yi.jpg',
	Opacity: 0.44,
	Bluriness: 'No & Yes',
	ContrastInput: false,
	DarknessOverlay: 0,
	pos: 'https://files.yande.re/image/1dbd529d3f26ad86486cb614bec2f9d3/yande.re%20987320%20cleavage%20thighhighs%20wet%20ying_yi.jpg',
	Posblur: 'Yes & Yes',
	posOpacity: 0.44
}

export default class Leaf_Background extends Plugin {
	settings: SettingsView;
	async onload() { //Kinda "when 'Plugin' is called, the following runs. (lifecycle method called when plugin is loaded).
		await this.LoadSettings(); //Pauses execution of 'onload' until 'loadsettings' method completes.

		this.addSettingTab(new URL_SettingsTab(this.app, this)); //Adds a new settings tab to Obsidian interface. 'this.app' provides access to Obsidian, 'this' refers to current instanc of  'Leaf_Background'.
		this.app.workspace.onLayoutReady(() => this.UpdateBackground(document)); //When the layout of Obsidian workspace is ready, 'UpdateBackground' method is called to apply. 
		this.app.workspace.on('window-open', (win: WorkspaceWindow) => this.UpdateBackground(win.doc)); //When a new leaf in the workspace is opened, 'UpdateBackground' method is called again.
	}

	async LoadSettings() { //Defines asynchronous method 'loadSettings'. Responsible for loading plugin settings.
		this.settings = Object.assign({}, DEFAULT_VALUES, await this.loadData());
	}

	async SaveSettings() { //Defines asynchronous method 'SaveSettings'. . . that saves the user settings. . . (kinda obvious no?)
		await this.saveData(this.settings); //'saveData' saves the data from the settings.
		this.UpdateBackground(); //'UpdateBackground()' method called to update the background after new settings are set.
	}
	
	async ResetSettings() {
		this.settings = Object.assign({}, DEFAULT_VALUES_res); //Reset to defaults. Using
		
		await this.SaveSettings(); //Save reset settings.
		window.location.reload(); //Just reload the whole fucking window. . . cause why not go for the nuclear option?
		/*
		const settingsTab = this.app.settingTabs.find(tab => tab instanceof URL_SettingsTab); //Searches through the list of setting tabs to find the 'URL_SettingsTab'.
		if (settingsTab) {
			settingsTab.refreshUI(); //Re-render the settings tab.
		}*/
	}
	UpdateBackground(doc: Document = activeDocument) { //A method of the 'Window_Background' class. Updates background of leaf. btw, the following code is CSS.
		doc.body.style.setProperty('--obsidian-editor-background-image', `url('${this.settings.ImageURL}')`);
		doc.body.style.setProperty('--obsidian-editor-background-opacity', `${this.settings.Opacity}`);
		doc.body.style.setProperty('--obsidian-editor-background-bluriness', `blur(${this.settings.Bluriness})`);
		doc.body.style.setProperty('--obsidian-editor-background-input-contrast', this.settings.ContrastInput ? 'rgba(255, 255, 255, 0.1)' : 'none'); //The value is conditionally set based on 'this.settings.ContrastInput'. If 'true', it sets colour to '#ffffff17', if 'false' it sets property to 'none'.
		doc.body.style.setProperty('--obsidian-editor-background-darkness-overlay', `rgba(0, 0, 0, ${this.settings.DarknessOverlay / 100})`); //Set the overlay opacity based on setting.
		doc.body.style.setProperty('--obsidian-nav-background-pos', `url('${this.settings.pos}')`);
		doc.body.style.setProperty('--obsidian-nav-background-Posblur', `blur(${this.settings.Posblur})`);
		doc.body.style.setProperty('--obsidian-nav-background-posOpacity', `${this.settings.posOpacity}`);
	}
	
}
