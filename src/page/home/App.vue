<template>
    <div id="home">
        <el-tabs v-model="activeName" @tab-click="tabClick">
            <el-tab-pane label="帖子列表" name="post">
                <PostList/>
            </el-tab-pane>
            <el-tab-pane label="个人信息" name="userinfo">
                用户信息：
                {{ userInfo }}
            </el-tab-pane>
            <el-tab-pane label="用户管理" name="third">
                角色管理
            </el-tab-pane>
            <el-tab-pane label="" name="fourth">
                定时任务补偿
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>

    import i18nConfig from '@/i18n/main.js';
    import PostList from './components/post/postList.vue';
    import user from '@/common/js/user';

    export default {
        created () {
            window.app = this;
            const val = localStorage.getItem('lanModel');
            if (val) {
                this.$i18n.locale = val;
                this.lanModel = val;
            } else {
                this.lanModel = this.$i18n.locale;
            }

            user.checkLogin(this);
        },
        name: 'App',
        data () {
            return {
                lanModel: '简体',
                isLogin: false,
                LanguageList: i18nConfig.LanguageList,

                userInfo: JSON.parse(localStorage.getItem('userInfo', 4)),

                activeName: 'post',
            };
        },
        computed: {},
        methods: {
            tabClick (tab, event) {
                console.log(tab, event);
                // this.activeName = tab;
            },
        },
        components: {
            PostList,
        },
    };
</script>
<style lang="less" type="text/less">
    @import '~common/css/reset.css';

    #home {
        padding: 0 30px;

    }
</style>

