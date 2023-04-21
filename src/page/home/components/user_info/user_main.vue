<template>
    <div id="user-main">
        <UserInfo/>
    </div>
</template>

<script>
    import UserInfo from './user_info.vue';

    export default {
        name: 'UserMain',
        data () {
            return {};
        },
        created () {},
        mounted () {},
        computed: {},
        methods: {},
        components: { UserInfo },
    };
</script>

<style scoped lang="less">
    @import '~common/less/config.less';

</style>
