<template>
    <section class='hero is-medium is-white is-bold'>
        <div class='columns'>
            <div class='column is-half-desktop'>
                <h1 class='title'>Load Demos</h1>
                <p>
                    Load your locally stored demos and retrieve the users from the matches.
                </p>
            </div>
            <div class='column is-half-desktop'>
                <demos-table></demos-table>
            </div>
        </div>
        <friends-table :friends='demosUsers' :loading='loading' @getBans='getBans'
                       v-if='demosUsers.length'></friends-table>
    </section>
</template>

<script>
    import DemosTable from './DemosTable';
    import SteamID from 'steamid';
    import FriendsTable from '../../components/Friends/FriendsTable';

    export default {
        components: {DemosTable, FriendsTable},

        data() {
            return {
                loading: false
            };
        },

        computed: {
            demosUsers() {
                return this.demoManager.users.map(u => Object.assign(u, {
                    steamid: (new SteamID(u.guid)).getSteamID64(),
                    bans: {},
                    friends: null
                }));
            }
        },

        methods: {
            async getBans() {
                this.loading = true;

                for (const player of (await this.steamWeb.getBans(this.demoManager.users.map(u => u.steamid))).players) {
                    const user = this.demoManager.users.filter(u => u.steamid === player.SteamId)[0];

                    user.bans = Object.assign(user.bans, player);
                }

                this.loading = false;
            }
        }
    };
</script>