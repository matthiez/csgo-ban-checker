<template>
    <section class='hero is-medium is-white is-bold'>
        <h1 class='title'>Settings</h1>

        <p class='hero-body'>
            <api-key></api-key>

            <demos-path></demos-path>
        </p>
    </section>
</template>

<script>
    import ApiKey from './ApiKey';
    import DemosPath from './DemosPath';

    export default {
        components: {
            ApiKey, DemosPath
        }
    };
</script>