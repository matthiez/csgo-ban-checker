<template>
    <div class="columns">
        <div class="column is-half-desktop">
            <h1 class="title">Load Friendlist</h1>

            <p class="content">
                You can load a users friendlist only if its profile is not set to private.<br>
                If the profile is set to friends-only, you need to be friends with the user.
            </p>
        </div>
        <div class="column is-half-desktop">
            <b-field label='SteamID64'>
                <b-field>
                    <b-input maxlength='17' minlength='17' expanded
                             placeholder='76561198235926344' v-model='steamid'></b-input>
                    <button class='button is-primary' @click='getFriends'
                            :disabled="!steamid.length && !loading">Load
                    </button>
                </b-field>
            </b-field>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['loading'],

        data() {
            return {
                steamid: ''
            };
        },

        methods: {
            getFriends() {
                this.$emit('getFriends', {
                    steamid: this.steamid
                });
            }
        }
    };
</script>