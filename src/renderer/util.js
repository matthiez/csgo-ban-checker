import electron from 'electron';

export default {
    open(link) {
        electron.shell.openExternal(link);
    }
};