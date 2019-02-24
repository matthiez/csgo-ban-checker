<template>
    <div id='app' class='container-fluid'>
        <navi></navi>
        <main>
            <router-view></router-view>
        </main>
        <foot></foot>
    </div>
</template>

<script>
    import Foot from './components/Layout/Foot';
    import Navi from './components/Layout/Navi';

    export default {
        components: {Foot, Navi},

        created() {
            this.$store.commit('steam/setApiKey', {
                apiKey: this.steamWeb.apiKey
            });

            this.$store.commit('demos/setFilePath', {
                filePath: this.demoManager.basePath
            });
        }
    };
</script>
