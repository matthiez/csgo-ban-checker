<template>
    <b-field label='Demo Filepath'>
        <b-field>
            <b-input minlength='3' expanded
                     :placeholder='$store.state.demos.filePath'
                     v-model='demosFilePath'></b-input>

            <button class='button is-primary' @click='submit' v-if="demosFilePath">Submit
            </button>
            <button class='button is-primary' @click='openFileBrowser' v-else>Search</button>
        </b-field>
    </b-field>
</template>

<script>
    import fs from 'fs-extra';

    export default {
        data() {
            return {
                demosFilePath: ''
            };
        },

        methods: {
            openFileBrowser() {
                this.$electron.remote.dialog.showOpenDialog({
                    title: 'Set Demo Filepath',
                    properties: ['openDirectory']
                }, filePaths => {
                    if (filePaths.length) this.demosFilePath = filePaths[0];
                });
            },

            async submit() {
                if (!fs.existsSync(this.demosFilePath))
                    return this.$toast.open('Please provide a valid path.');

                this.$store.commit('demos/setFilePath', {
                    filePath: this.demosFilePath
                });

                await this.demoManager.init(this.demosFilePath);

                console.log('AFTER_AWAIT');

                this.$store.commit('demos/setManager', {
                    manager: true
                });

                console.log('AFTER_COMMIT');

                this.$toast.open('Demo Filepath updated!');
            }
        }
    };
</script>