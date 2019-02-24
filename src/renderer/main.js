import Vue from 'vue';
import dialogs from 'dialogs';
import electron from 'electron';
import 'mdi/css/materialdesignicons.css';
import 'buefy/dist/buefy.css';
import './plugins/axios';
import './plugins/vuex';
import './plugins/buefy';
import './plugins/electron';
import store from './plugins/vuex/index';
import router from './plugins/router';
import SteamWeb from './lib/SteamWeb';
import DemoManager from './lib/DemoManager';
import App from './App';
import constants from './constants';
import util from './util';
import {remote} from 'electron';
import fs from 'fs';

const IS_DEV = 'development' === process.env.NODE_ENV;

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));

let apiKey, demosFilePath, steamWeb;
const demoManager = new DemoManager();

const dialog = dialogs({
    hostname: 'Required'
});

const prompt = msg => new Promise((resolve, reject) => {
    dialog.prompt(msg, data => data ? resolve(data) : reject(false));
});

(async () => {
    try {
        const {steam, demos} = JSON.parse(window.localStorage.getItem('vuex'));
        apiKey = steam.apiKey;
        demosFilePath = demos.filePath;
    } catch (err) {
        if (IS_DEV) console.warn({getStoreLocal: {store, err}});
    }

    if (!demosFilePath) demosFilePath = DemoManager.findPaths();

    if (!apiKey) apiKey = await prompt('API-Key required');

    try {
        steamWeb = new SteamWeb(apiKey);
        if (IS_DEV) await steamWeb.getNews(); // just to test if the API-key is actually valid
    } catch (err) {
        apiKey = await prompt('API-Key required');
    }

    if (!fs.existsSync(demosFilePath))
        try {
            demosFilePath = await prompt('Demos Filepath required');
        } catch (err) {
            electron.remote.app.quit();
        }

    const currentWindow = remote.getCurrentWindow();
    currentWindow.openDevTools();

    Vue.prototype.$util = util;

    Vue.prototype.$constants = constants;

    Vue.prototype.$electron = electron;

    Vue.config.productionTip = false;

    await demoManager.init(demosFilePath);

    Vue.mixin({
        data() {
            return {
                demoManager,
                steamWeb
            };
        }
    });

    /* eslint-disable no-new */
    new Vue({
        components: {App},

        router,

        template: '<App/>',

        store
    }).$mount('#app');
})();




