<template>
    <footer class='has-text-centered'>
        <b-icon icon='heart' slot='trigger'></b-icon>
        <b>Donations:</b>
        <b-collapse :open='false'>
            <b-icon icon='bitcoin' slot='trigger'></b-icon>
            <div class='notification'>
                <div class='content'>
                    {{$constants.bitcoin}}
                </div>
            </div>
        </b-collapse>
        <b-collapse :open='false'>
            <b-icon icon='steam' slot='trigger'></b-icon>
            <div class='notification'>
                <div class='content'>
                    <a @click='$util.open($constants.tradelink)'>Steam</a>
                </div>
            </div>
        </b-collapse>
    </footer>
</template>

<style scoped lang='scss'>
    @import "~bulma/sass/utilities/mixins";

    @include desktop {
        .collapse {
            display: inline-block;
        }
    }
</style>