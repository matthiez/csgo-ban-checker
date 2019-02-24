export default {
    namespaced: true,

    state: {
        filePath: '',

        manager: false
    },

    mutations: {
        setData(state, payload) {
            state = Object.assign(state, payload);
        },

        setFilePath(state, payload) {
            state.filePath = payload.filePath;
        },

        setManager(state, payload) {
            state.manager = payload.manager;
        }
    }
};