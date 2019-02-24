<template>
    <b-field label='API-Key'>
        <b-field>
            <b-input minlength='12' expanded
                     :placeholder='$store.state.steam.apiKey' v-model='apiKey'></b-input>
            <button class='button is-primary' @click='submitApiKey' :disabled="!apiKey">Submit
            </button>
        </b-field>
    </b-field>
</template>

<script>
    import SteamWeb from '../../lib/SteamWeb';

    export default {
        data() {
            return {
                apiKey: ''
            };
        },

        methods: {
            async submitApiKey() {
                let steamWeb;

                try {
                    steamWeb = new SteamWeb(this.apiKey);
                    await steamWeb.getNews(); // just to test if the API-key is actually valid
                } catch (err) {
                    this.$toast.open(err);
                    return;
                }

                this.steamWeb = steamWeb;

                this.$store.commit('steam/setApiKey', {
                    apiKey: this.apiKey
                });

                this.$store.commit('steam/setWeb', {
                    web: true
                });

                this.$toast.open('API-Key updated!');
            }
        }
    };
</script>