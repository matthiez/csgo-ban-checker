<template>
    <div>
        <strong>
            <span v-if='steamid'>Friendlist for SteamID {{steamid}}</span>

            <span v-else>Friendlist from Demos</span>
        </strong>

        <b-table paginated per-page='10' :data='friends' hoverable>
            <template slot-scope='props'>
                <b-table-column field='name' label='Name' :visible='!!props.row.name'>
                    {{ props.row.name }}
                </b-table-column>

                <b-table-column field='steamid' label='SteamID'>
                    {{ props.row.steamid }}
                </b-table-column>

                <b-table-column field='friend_since' label='Friend since'
                                :visible='!!props.row.friend_since'>
                    {{ new Date(props.row.friend_since * 1000).toLocaleString() }}
                </b-table-column>

                <b-table-column field='bans.VACBanned' label='VAC'
                                meta='Is the player VAC banned?' centered>
                    <span class='tag is-warning' v-if='props.row.bans.VACBanned === undefined'><b-icon
                            icon='help' size='is-small'></b-icon></span>
                    <span class='tag is-danger' v-else-if='props.row.bans.VACBanned'><b-icon
                            icon='thumb-down' size='is-small'></b-icon></span>
                    <span class='tag is-success' v-else><b-icon icon='thumb-up'
                                                                size='is-small'></b-icon></span>
                </b-table-column>

                <b-table-column field='bans.NumberOfGameBans' label='GBs'
                                meta='Number of Game bans (OW)' centered>
                    <span class='tag is-warning'
                          v-if='props.row.bans.NumberOfGameBans === undefined'><b-icon
                            icon='help' size='is-small'></b-icon></span>
                    <span class='tag is-danger' v-else-if='props.row.bans.NumberOfGameBans > 0'> {{ props.row.bans.NumberOfGameBans }}</span>
                    <span class='tag is-success'
                          v-else> {{ props.row.bans.NumberOfGameBans }}</span>
                </b-table-column>

                <b-table-column field='bans.NumberOfVACBans' label='VACs'
                                meta='Number of VAC bans' centered>
                    <span class='tag is-warning'
                          v-if='props.row.bans.NumberOfVACBans === undefined'><b-icon
                            icon='help' size='is-small'></b-icon></span>
                    <span class='tag is-danger' v-else-if='props.row.bans.NumberOfVACBans > 0'> {{ props.row.bans.NumberOfVACBans }}</span>
                    <span class='tag is-success'
                          v-else> {{ props.row.bans.NumberOfVACBans }}</span>
                </b-table-column>

                <b-table-column field='bans.EconomyBan' label='EB'
                                meta='Is the player economy banned?' centered>
                    <span class='tag is-warning' v-if='props.row.bans.EconomyBan === undefined'><b-icon
                            icon='help' size='is-small'></b-icon></span>
                    <span class='tag is-danger'
                          v-else-if='props.row.bans.EconomyBan !== "none"'><b-icon
                            icon='thumb-down' size='is-small'></b-icon></span>
                    <span class='tag is-success' v-else><b-icon icon='thumb-up'
                                                                size='is-small'></b-icon></span>
                </b-table-column>

                <b-table-column field='bans.CommunityBanned' label='CB'
                                meta='Is the player community banned?' centered>
                    <span class='tag is-warning'
                          v-if='props.row.bans.CommunityBanned === undefined'><b-icon
                            icon='help' size='is-small'></b-icon></span>
                    <span class='tag is-danger' v-else-if='props.row.bans.CommunityBanned'><b-icon
                            icon='thumb-down' size='is-small'></b-icon></span>
                    <span class='tag is-success' v-else><b-icon icon='thumb-up'
                                                                size='is-small'></b-icon></span>
                </b-table-column>

                <b-table-column field='bans.DaysSinceLastBan' label='DSLB'
                                meta='Days Since Last Ban' centered>
                    <span class='tag is-warning'
                          v-if='props.row.bans.DaysSinceLastBan === undefined'><b-icon
                            icon='help' size='is-small'></b-icon></span>
                    <span class='tag is-danger' v-else-if='props.row.bans.DaysSinceLastBan > 0'> {{ props.row.bans.DaysSinceLastBan }}</span>
                    <span class='tag is-success'
                          v-else> {{ props.row.bans.DaysSinceLastBan }}</span>
                </b-table-column>
            </template>

            <template slot-scope='props' slot='header'>
                <b-tooltip :active='!!props.column.meta' :label='String(props.column.meta)'
                           dashed>
                    {{ props.column.label }}
                </b-tooltip>
            </template>

            <template slot='bottom-left'>
                <b-field grouped group-multiline>
                    <button class='button field is-success' @click='getBans'
                            :disabled='loading'>
                        Check Bans
                    </button>
                </b-field>
            </template>
        </b-table>
    </div>
</template>

<script>
    export default {
        props: ['friends', 'loading', 'steamid'],

        methods: {
            getBans() {
                this.$emit('getBans');
            }
        }
    };
</script>