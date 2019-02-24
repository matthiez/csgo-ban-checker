import _SteamWeb from 'steam-web';

const toArray = data => Array.isArray(data) ? data : [data];

export const ERROR_CODES = {
    400: 'Bad Request. Please verify that all required parameters are being sent.',
    401: 'Unauthorized. Access is denied. Retrying will not help. Please verify your key= parameter.',
    403: 'Forbidden. Access is denied. Retrying will not help. Please verify your key= parameter.',
    404: 'Not Found. The API requested does not exists.',
    405: 'Method Not Allowed. This API has been called with a the wrong HTTP method like GET or PUSH.',
    429: 'Too Many Requests. You are being rate limited.',
    500: 'Internal Server Error. An unrecoverable error has occurred, please try again. If this continues to persist then please post to the Steamworks developer discussion with additional details of your request.',
    503: 'Service Unavailable. Server is temporarily unavailable, or too busy to respond. Please wait and try again later.'
};

export default class SteamWeb {
    constructor(apiKey, opts = {}) {
        this.apiKey = apiKey;

        this.steam = new _SteamWeb(Object.assign({
            format: 'json',
            apiKey
        }, opts));
    }

    getBans(steamids) {
        return new Promise((resolve, reject) => this.steam.getPlayerBans({
            steamids: toArray(steamids),
            callback: (err, res) => err ? reject(err) : resolve(res)
        }));
    }

    getSummaries(steamids) {
        return new Promise((resolve, reject) => this.steam.getPlayerSummaries({
            steamids: toArray(steamids),
            callback: (err, res) => err ? reject(err) : resolve(res)
        }));
    }

    getFriends(steamid, appid = 730) {
        return new Promise((resolve, reject) => this.steam.getFriendList({
            steamid,
            appid,
            callback: (err, res) => err ? reject(err) : resolve(res)
        }));
    }

    getGameStats(steamid, relationship = 'friend') {
        return new Promise((resolve, reject) => this.steam.getUserStatsForGame({
            steamid,
            relationship, //'all' or 'friend'
            callback: (err, res) => err ? reject(err) : resolve(res)
        }));
    }

    getCurrentPlayerCount(appid = 730) {
        return new Promise((resolve, reject) => this.steam.getNumberOfCurrentPlayers({
            appid,
            callback: (err, res) => err ? reject(err) : resolve(res)
        }));
    }

    getNews(appid = 730, count = 3, maxlength = 300) {
        return new Promise((resolve, reject) => this.steam.getNewsForApp({
            appid,
            count,
            maxlength,
            callback: (err, res) => err ? reject(err) : resolve(res)
        }));
    }
}