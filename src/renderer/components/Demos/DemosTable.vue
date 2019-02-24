<template>
    <b-table paginated per-page='5' :data='demoFilePaths' narrowed>
        <template slot-scope='props'>
            <b-table-column field='path' label='Demo'>
                {{ props.row.path }}
            </b-table-column>
        </template>

        <template slot='bottom-left'>
            <button class='button field is-success' :disabled='disabled' @click='loadDemos'>
                Load {{ demosCount }} Demo{{ demosCount > 1 ? 's' : '' }}
            </button>
        </template>

        <template slot='empty'>
            <section class='section'>
                <div class='content has-text-grey has-text-centered'>
                    <p>Waiting for data...</p>
                </div>
            </section>
        </template>
    </b-table>
</template>

<script>
    export default {
        computed: {
            demoFilePaths() {
                const STR = 'match';
                const STR1 = '\\' + STR;

                return this.demoManager.filePaths.map(p => {
                    return {
                        path: p.split(p.includes(STR1) ? STR1 : '/' + STR)[1].replace('.dem', '')
                    };
                });
            },

            demosCount() {
                return this.demoManager.filePaths.length;
            }
        },

        data() {
            return {
                disabled: false
            };
        },

        methods: {
            async loadDemos() {
                this.disabled = true;

                await this.demoManager.setDemos();

                this.demoManager.setUsers();

                this.disabled = false;
            }
        }
    };
</script>