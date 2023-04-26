<template>
    <div id="post-main">
        <TopicList/>
    </div>
</template>

<script>
    import TopicList from './topic_list.vue';

    export default {
        name: 'PostMain',
        components: {
            TopicList,
        },
    };
</script>

<style scoped lang="less">
    @import '~common/less/config.less';

    #post-main {

    }
</style>
