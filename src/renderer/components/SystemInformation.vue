<template>
    <section class='hero is-medium is-white is-bold'>
        <h1 class='title'>System Information</h1>
        <div class='items'>
            <div class='item'>
                <div class='name'>Path:</div>
                <div class='value'>{{ path }}</div>
            </div>
            <div class='item'>
                <div class='name'>Route Name:</div>
                <div class='value'>{{ name }}</div>
            </div>
            <div class='item'>
                <div class='name'>Vue.js:</div>
                <div class='value'>{{ vue }}</div>
            </div>
            <div class='item'>
                <div class='name'>Electron:</div>
                <div class='value'>{{ electron }}</div>
            </div>
            <div class='item'>
                <div class='name'>Node:</div>
                <div class='value'>{{ node }}</div>
            </div>
            <div class='item'>
                <div class='name'>Platform:</div>
                <div class='value'>{{ platform }}</div>
            </div>
            <div class='item'>
                <div class='name'>Home:</div>
                <div class='value'>{{ home }}</div>
            </div>
            <div class='item'>
                <div class='name'>AppData:</div>
                <div class='value'>{{ appData }}</div>
            </div>
            <div class='item'>
                <div class='name'>UserData:</div>
                <div class='value'>{{ userData }}</div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                electron: process.versions['atom-shell'],

                name: this.$route.name,

                node: process.versions.node,

                path: this.$route.path,

                platform: process.platform,

                vue: require('vue/package.json').version,

                home: this.$electron.remote.app.getPath('home'),

                appData: this.$electron.remote.app.getPath('appData'),

                userData: this.$electron.remote.app.getPath('userData')
            };
        }
    };
</script>

<style scoped>
    .title {
        color: #888;
        font-size: 18px;
        font-weight: initial;
        letter-spacing: .25px;
        margin-top: 10px;
    }

    .items {
        margin-top: 8px;
    }

    .item {
        display: flex;
        margin-bottom: 6px;
    }

    .item .name {
        color: #6a6a6a;
        margin-right: 6px;
    }

    .item .value {
        color: #35495e;
        font-weight: bold;
    }
</style>
