/**
 * @name ShowConnections
 * @author DevilBro
 * @authorId 278543574059057154
 * @version 1.0.4
 * @description Shows the connected Accounts of a User in the UserPopout
 * @invite Jx3TjNS
 * @donate https://www.paypal.me/MircoWittrien
 * @patreon https://www.patreon.com/MircoWittrien
 * @website https://mwittrien.github.io/
 * @source https://github.com/mwittrien/BetterDiscordAddons/tree/master/Plugins/ShowConnections/
 * @updateUrl https://mwittrien.github.io/BetterDiscordAddons/Plugins/ShowConnections/ShowConnections.plugin.js
 */

module.exports = (_ => {
	const config = {
		"info": {
			"name": "ShowConnections",
			"author": "DevilBro",
			"version": "1.0.4",
			"description": "Shows the connected Accounts of a User in the UserPopout"
		},
		"changeLog": {
			"improved": {
				"Tooltip Color": "Slighty darkened the Tooltip Color to increase Readability"
			},
			"added": {
				"Filter": "You can now enable/disable certain Connections so they don't show",
				"Position": "You can now change the order and place them at the top of the UserPopout",
				"Customization": "You can now disable the Tooltip Color, change the Icons to a white Version, disable the Verified Badge",
			}
		}
	};

	return (window.Lightcord || window.LightCord) ? class {
		getName () {return config.info.name;}
		getAuthor () {return config.info.author;}
		getVersion () {return config.info.version;}
		getDescription () {return "Do not use LightCord!";}
		load () {BdApi.alert("Attention!", "By using LightCord you are risking your Discord Account, due to using a 3rd Party Client. Switch to an official Discord Client (https://discord.com/) with the proper BD Injection (https://betterdiscord.app/)");}
		start() {}
		stop() {}
	} : !window.BDFDB_Global || (!window.BDFDB_Global.loaded && !window.BDFDB_Global.started) ? class {
		getName () {return config.info.name;}
		getAuthor () {return config.info.author;}
		getVersion () {return config.info.version;}
		getDescription () {return `The Library Plugin needed for ${config.info.name} is missing. Open the Plugin Settings to download it. \n\n${config.info.description}`;}
		
		downloadLibrary () {
			require("request").get("https://mwittrien.github.io/BetterDiscordAddons/Library/0BDFDB.plugin.js", (e, r, b) => {
				if (!e && b && r.statusCode == 200) require("fs").writeFile(require("path").join(BdApi.Plugins.folder, "0BDFDB.plugin.js"), b, _ => BdApi.showToast("Finished downloading BDFDB Library", {type: "success"}));
				else BdApi.alert("Error", "Could not download BDFDB Library Plugin. Try again later or download it manually from GitHub: https://mwittrien.github.io/downloader/?library");
			});
		}
		
		load () {
			if (!window.BDFDB_Global || !Array.isArray(window.BDFDB_Global.pluginQueue)) window.BDFDB_Global = Object.assign({}, window.BDFDB_Global, {pluginQueue: []});
			if (!window.BDFDB_Global.downloadModal) {
				window.BDFDB_Global.downloadModal = true;
				BdApi.showConfirmationModal("Library Missing", `The Library Plugin needed for ${config.info.name} is missing. Please click "Download Now" to install it.`, {
					confirmText: "Download Now",
					cancelText: "Cancel",
					onCancel: _ => {delete window.BDFDB_Global.downloadModal;},
					onConfirm: _ => {
						delete window.BDFDB_Global.downloadModal;
						this.downloadLibrary();
					}
				});
			}
			if (!window.BDFDB_Global.pluginQueue.includes(config.info.name)) window.BDFDB_Global.pluginQueue.push(config.info.name);
		}
		start () {this.load();}
		stop () {}
		getSettingsPanel () {
			let template = document.createElement("template");
			template.innerHTML = `<div style="color: var(--header-primary); font-size: 16px; font-weight: 300; white-space: pre; line-height: 22px;">The Library Plugin needed for ${config.info.name} is missing.\nPlease click <a style="font-weight: 500;">Download Now</a> to install it.</div>`;
			template.content.firstElementChild.querySelector("a").addEventListener("click", this.downloadLibrary);
			return template.content.firstElementChild;
		}
	} : (([Plugin, BDFDB]) => {
		var loadedUsers = {}, fetchTimeout, currentPopup = {};
		
		return class ShowConnections extends Plugin {
			onLoad () {
				this.patchedModules = {
					after: {
						UserPopout: ["render", "componentDidMount"]
					}
				};
				
				this.defaults = {
					general: {
						useColoredIcons:	{value: true, 	description: "Uses colored Version of the Icons"},
						useColoredTooltips:	{value: true, 	description: "Uses colored Version of the Tooltips"},
						placeAtTop:			{value: false, 	description: "Places the Connections at the Top of the UserPopout Body"},
						showVerifiedBadge:	{value: true, 	description: "Shows the Badge for verified Connections"},
						openWebpage:		{value: true, 	description: "Opens the Connection Page when clicking the Icon"}
					},
					connections: {}
				};
				
				for (let connection of BDFDB.LibraryModules.ConnectionProviderUtils.filter(n => n)) this.defaults.connections[connection.type] = Object.assign({}, connection, {value: true});
				
				this.css = `
					${BDFDB.dotCN._showconnectionsconnections} {
						display: flex;
						flex-wrap: wrap;
						margin-bottom: 6px;
					}
					${BDFDB.dotCN._showconnectionsconnection} {
						position: relative;
						width: 28px;
						height: 28px;
						margin: 0 10px 10px 0;
					}
					${BDFDB.dotCN._showconnectionsicon} {
						margin: -15% 0 0 -15%;
						width: 130%;
						height: 130%;
					}
					${BDFDB.dotCN._showconnectionsverifiedbadge} {
						position: absolute;
						bottom: -10%;
						right: -10%;
					}
				`;
			}
			
			onStart () {				
				BDFDB.PatchUtils.patch(this, BDFDB.LibraryModules.DispatchApiUtils, "dispatch", {after: e => {
					if (BDFDB.ObjectUtils.is(e.methodArguments[0]) && e.methodArguments[0].type == BDFDB.DiscordConstants.ActionTypes.USER_PROFILE_FETCH_SUCCESS && e.methodArguments[0].user && e.methodArguments[0].connected_accounts) {
						loadedUsers[e.methodArguments[0].user.id] = e.methodArguments[0].connected_accounts;
						if (currentPopup.id == e.methodArguments[0].user.id) {
							BDFDB.ReactUtils.forceUpdate(currentPopup.instance);
							currentPopup = {};
						}
					}
				}});
				
				BDFDB.PatchUtils.forceAllUpdates(this);
			}
			
			onStop () {
				BDFDB.PatchUtils.forceAllUpdates(this);
			}

			getSettingsPanel (collapseStates = {}) {
				let settingsPanel;
				return settingsPanel = BDFDB.PluginUtils.createSettingsPanel(this, {
					collapseStates: collapseStates,
					children: _ => {
						let settingsItems = [];
				
						for (let key in this.defaults.general) settingsItems.push(BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.SettingsSaveItem, {
							type: "Switch",
							plugin: this,
							keys: ["general", key],
							label: this.defaults.general[key].description,
							value: this.settings.general[key]
						}));
						
						settingsItems.push(BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.SettingsPanelList, {
							title: "Display Connections:",
							children: Object.keys(this.defaults.connections).map(key => BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.SettingsSaveItem, {
								type: "Switch",
								plugin: this,
								keys: ["connections", key],
								label: this.defaults.connections[key].name,
								value: this.settings.connections[key],
								labelChildren: [
									BDFDB.ReactUtils.createElement("img", {style: {width: 28, height: 28}, src: this.defaults.connections[key].icon.color}),
									BDFDB.ReactUtils.createElement("img", {style: {width: 28, height: 28}, src: this.defaults.connections[key].icon.white})
								]
							}))
						}));
						
						return settingsItems;
					}
				});
			}

			processUserPopout (e) {
				if (e.instance.props.user && !e.instance.props.user.bot && e.instance.props.user.discriminator != "0000") {
					if (e.node) currentPopup = {id: e.instance.props.user.id, instance: e.instance};
					else {
						if (loadedUsers[e.instance.props.user.id]) {
							let connections = loadedUsers[e.instance.props.user.id].filter(c => this.settings.connections[c.type]);
							if (connections.length) {
								let isLightTheme = BDFDB.DiscordUtils.getTheme() == BDFDB.disCN.themelight;
								let bodyInner = BDFDB.ReactUtils.findChild(e.returnvalue, {props: [["className", BDFDB.disCN.userpopoutbodyinnerwrapper]]});
								if (bodyInner) bodyInner.props.children.splice(this.settings.general.placeAtTop ? 0 : bodyInner.props.children.length - 1, 0, [
									BDFDB.ReactUtils.createElement("div", {
										className: BDFDB.disCN.userpopoutbodytitle,
										children: BDFDB.LanguageUtils.LanguageStrings.CONNECTIONS
									}),
									BDFDB.ReactUtils.createElement("div", {
										className: BDFDB.disCN._showconnectionsconnections,
										children: connections.map(c => {
											let provider = BDFDB.LibraryModules.ConnectionProviderUtils.get(c.type);
											let url = this.settings.general.openWebpage && provider.getPlatformUserUrl && provider.getPlatformUserUrl(c);
											return BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.TooltipContainer, {
												text: `${provider.name}: ${c.name}`,
												tooltipConfig: {backgroundColor: this.settings.general.useColoredTooltips && BDFDB.ColorUtils.change(provider.color, -0.3), color: !this.settings.general.useColoredTooltips || !provider.color ? "black" : null},
												children: BDFDB.ReactUtils.createElement(!url ? "div" : BDFDB.LibraryComponents.Anchor, Object.assign(!url ? {} : {
													href: url
												}, {
													className: BDFDB.DOMUtils.formatClassName(BDFDB.disCN._showconnectionsconnection, url && BDFDB.disCN.cursorpointer),
													children: [
														BDFDB.ReactUtils.createElement("img", {
															className: BDFDB.disCN._showconnectionsicon,
															alt: BDFDB.LanguageUtils.LanguageStringsFormat("IMG_ALT_LOGO", provider.name),
															src: provider.icon[this.settings.general.useColoredIcons ? "color" : "white"]
														}),
														this.settings.general.showVerifiedBadge && c.verified && BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.TooltipContainer, {
															text: BDFDB.LanguageUtils.LanguageStrings.CONNECTION_VERIFIED,
															tooltipConfig: {color: "brand", type: "bottom"},
															children: BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.FlowerStar, {
																className: BDFDB.disCN._showconnectionsverifiedbadge,
																size: "50%",
																color: isLightTheme ? BDFDB.DiscordConstants.Colors.STATUS_GREY_200 : BDFDB.DiscordConstants.Colors.PRIMARY_DARK,
																children: BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.SvgIcon, {
																	name: BDFDB.LibraryComponents.SvgIcon.Names.CHECKMARK,
																	width: "70%",
																	height: "70%",
																	color: isLightTheme ? BDFDB.DiscordConstants.Colors.STATUS_GREY_500 : BDFDB.DiscordConstants.Colors.WHITE
																})
															})
														})
													]
												}))
											});
										})
									})
								]);
							}
						}
						else {
							BDFDB.TimeUtils.clear(fetchTimeout);
							fetchTimeout = BDFDB.TimeUtils.timeout(_ => {
								if (!loadedUsers[e.instance.props.user.id]) BDFDB.LibraryModules.UserProfileUtils.fetchProfile(e.instance.props.user.id);
							}, 1000);
						}
					}
				}
			}
		};
	})(window.BDFDB_Global.PluginUtils.buildPlugin(config));
})();