<template>
    <div id="post-main">
        <PostList/>
    </div>
</template>

<script>
    import PostList from './post_list.vue';

    export default {
        name: 'PostMain',
        components: {
            PostList,
        },
    };
</script>

<style scoped lang="less">
    @import '~common/less/config.less';

    #post-main {

    }
</style>
