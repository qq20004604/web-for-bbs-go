<template>
    <div id="post-list">
        <template v-for="topic in topicList">
            <div class="topic" :key="topic.id">
                <div class="topic-reply-count">
                </div>
                <div class="topic-main">
                    <div class="topic-title">
                        {{ topic.title }}
                    </div>
                    <div class="topic-content">
                        {{ topic.content | contentFilter }}
                    </div>
                </div>
                <div class="topic-last-reply-time">
                    {{ topic.last_reply_at | replyAtFilter }}
                </div>
            </div>
        </template>

        <el-pagination @current-change="getTopicListByPage"
                       :current-page.sync="currentPage"
                       :page-size="countPerPage"
                       layout="prev, pager, next, jumper"
                       :total="totalTopic"/>
        <CreateTopic @getTopicListByPage="getTopicListByPage"/>
    </div>
</template>

<script>
    import CreateTopic from './create_topic.vue';

    export default {
        name: 'TopicList',
        data () {
            return {
                topicList: [],
                currentPage: 1,

                totalTopic: 0,
                totalPage: 0,
                countPerPage: 20,
            };
        },
        created () {
            this.getTopicListByPage(1);
        },
        methods: {
            getTopicListByPage (page) {
                if (!page) {
                    page = this.currentPage;
                } else {
                    this.currentPage = page;
                }
                this.$ajax.getTopicListByPage({
                    page,
                }).then(res => {
                    // 如果请求的数据和当前分页不同，则无视返回结果
                    if (res.code === 200) {
                        if (res.data.page !== this.currentPage) {
                            return;
                        }
                        this.topicList = res.data.list;
                        this.totalTopic = res.data.total_topic;
                        this.totalPage = res.data.total_page;
                        this.countPerPage = res.data.count_per_page;
                    } else {
                        this.$message.error(res.msg);
                    }
                }).catch(() => {
                    this.$message.error('服务器错误，请重新加载');
                });
            },
        },
        filters: {
            replyAtFilter (date) {
                const now = new Date();
                const inputDate = new Date(date);

                if (inputDate.toDateString() === now.toDateString()) {
                    return inputDate.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
                } else if (inputDate.getFullYear() === now.getFullYear()) {
                    return inputDate.toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit' });
                } else {
                    return inputDate.toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' });
                }
            },
            contentFilter (content) {
                if (content.length > 300) {
                    return content.slice(0, 300);
                } else {
                    return content;
                }
            },
        },
        components: {
            CreateTopic,
        },
    };
</script>

<style scoped lang="less">
    @import '~common/less/config.less';

    .topic {
        position: relative;
        border-bottom: 1px solid #888;
        padding: 10px 5px;

        .topic-reply-count {
            position: absolute;
            height: 100%;
            left: 0;
            top: 10px;
            width: 80px;
        }

        .topic-main {
            position: relative;
            padding-left: 90px;
            padding-right: 130px;
            width: 100%;

            .topic-title {
                width: 100%;
                height: 30px;
                font-size: 22px;
                font-weight: bold;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
            }

            .topic-content {
                position: relative;
                width: 100%;
                font-size: 16px;
                max-height: 100px;
                text-overflow: ellipsis;
                overflow: hidden;
                //white-space: nowrap;
            }
        }

        .topic-last-reply-time {
            position: absolute;
            height: 100%;
            top: 10px;
            right: 0;
            width: 120px;
            font-size: 9px;
        }
    }
</style>
