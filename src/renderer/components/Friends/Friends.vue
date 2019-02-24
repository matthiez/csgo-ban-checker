<template>
    <section class="hero is-medium is-white is-bold">
        <friends-top :loading='loading' @getFriends='getFriends'></friends-top>

        <friends-table :friends='friends' :loading='loading' :steamid='steamid'
                       @getBans='getBans' v-if='friends.length'></friends-table>
    </section>
</template>

<script>
    import {ERROR_CODES} from '../../lib/SteamWeb';
    import FriendsTable from './FriendsTable';
    import FriendsTop from './FriendsTop';

    export default {
        components: {FriendsTable, FriendsTop},

        data() {
            return {
                loading: false,

                steamid: '',

                friends: [],

                selected: null
            };
        },

        methods: {
            async getFriends(payroll) {
                this.loading = true;

                try {
                    this.friends = (await this.steamWeb.getFriends(payroll.steamid)).friendslist.friends.map(f => {
                        f.bans = {};
                        return f;
                    });
                } catch (errCode) {
                    this.$toast.open(`${ERROR_CODES[errCode] || 'An undetermined error occured.'} (${errCode})`);
                } finally {
                    this.loading = false;
                }
            },

            async getBans() {
                this.loading = true;

                for (const player of (await this.steamWeb.getBans(this.friends.map(u => u.steamid))).players) {
                    const user = this.friends.filter(u => u.steamid === player.SteamId)[0];

                    user.bans = Object.assign(user.bans, player);
                }

                this.loading = false;
            }
        }
    };
</script>