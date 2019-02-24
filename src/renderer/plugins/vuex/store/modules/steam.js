export default {
    namespaced: true,

    state: {
        apiKey: '',

        web: false
    },

    mutations: {
        setApiKey(state, payload) {
            state.apiKey = payload.apiKey;
        },

        setWeb(state, payload) {
            state.web = payload.web;
        }
    }
};