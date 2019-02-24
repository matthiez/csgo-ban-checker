const demofile = require('demofile');
import fs from 'fs';
import fsx from 'fs-extra';
import klaw from 'klaw';
import {remote} from 'electron';

const HOME_PATH = remote.app.getPath('home');

export const DEFAULT_GUESS_PATHS = {
    darwin: ['/Library/Application Support/Steam/SteamApps/common/Counter-Strike Global Offensive/csgo/replays'],
    linux: [
        HOME_PATH + '/.local/share/Steam/SteamApps/common/Counter-Strike Global Offensive/csgo/replays',
        HOME_PATH + '.steam/steam/steamapps/common/Counter-Strike Global Offensive/'
    ],
    win32: ['C:/Program Files (x86)/Steam/steamapps/common/Counter-Strike Global Offensive/csgo/replays']
};

export default class DemoManager {
    constructor(basePath = null) {
        this.basePath = basePath;

        this._init();
    }

    _init() {
        this.demos = [];
        this.users = [];
        this.filePaths = [];
    }

    async init(basePath) {
        this.basePath = DemoManager.findPaths(basePath);

        if (!this.basePath) throw new Error('Path not found');

        this._init();

        this.filePaths = await DemoManager.getFilePaths(this.basePath, '.dem.info');
    }

    async setDemos() {
        for (let i = 0; i < this.filePaths.length; i++) {
            const demoFile = new demofile.DemoFile();

            demoFile.parse(await fsx.readFile(this.filePaths[i]));

            await Promise.resolve(new Promise(resolve => {
                demoFile.stringTables.on('update', e => {
                    if (e.table.name === 'userinfo' && e.userData != null && !e.userData.fakePlayer)
                        resolve(this.demos.push(e));
                });
            }));
        }
    }

    setUsers() {
        for (let i = 0; i < this.demos.length; i++) {
            const demo = this.demos[i];

            const GUID = demo.userData.guid;

            /*filter doubles*/
            if (GUID === 'BOT' || this.users.filter(u => u.guid === GUID).length !== 0) continue;

            this.users.push(demo.userData);
        }
    }

    static findPaths(basePath = '') {
        if (basePath.length && fs.existsSync(basePath))
            return basePath;

        for (const path of DEFAULT_GUESS_PATHS[process.platform] ? DEFAULT_GUESS_PATHS[process.platform] : [])
            if (fs.existsSync(path))
                return basePath;
    }

    static getFilePaths(path) {
        return new Promise((resolve, reject) => {
            const arr = [];
            klaw(path)
                .on('data', item => item.path.endsWith('.dem') && arr.push(item.path))
                .on('error', err => reject(err))
                .on('end', () => resolve(process.platform === 'win32' ? arr.slice(1) : arr)); // the first element is the base path - WIN32 hack
        });
    }
}
