import createPersistedState from 'vuex-persistedstate';
import demos from './modules/demos';
import steam from './modules/steam';

export default {
    strict: process.env.NODE_ENV === 'development',

    modules: {
        steam,
        demos
    },

    plugins: [createPersistedState({
        paths: [
            'steam.apiKey',
            'demos.filePath'
        ]
    })]
};