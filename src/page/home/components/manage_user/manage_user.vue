<template>
    <div id="manage-user">
        <UserList/>
    </div>
</template>

<script>
    import UserList from './user_list.vue';

    export default {
        name: 'ManageUser',
        data () {
            return {};
        },
        created () {},
        mounted () {},
        computed: {},
        methods: {},
        components: {
            UserList,
        },
    };
</script>

<style scoped lang="less">
    @import '~common/less/config.less';

</style>
