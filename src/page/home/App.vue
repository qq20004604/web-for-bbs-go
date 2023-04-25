<template>
    <div id="home">
        <el-tabs v-model="activeName" @tab-click="tabClick">
            <el-tab-pane label="帖子列表" name="post">
                <PostMain/>
            </el-tab-pane>
            <el-tab-pane label="个人信息" name="userinfo">
                <UserMain/>
            </el-tab-pane>
            <el-tab-pane label="用户管理" name="manageUser" v-if="isAdmin">
                <ManageUser/>
            </el-tab-pane>
            <el-tab-pane label="登出" name="logout"/>
        </el-tabs>
    </div>
</template>
<script>

    import i18nConfig from '@/i18n/main.js';
    import PostMain from './components/post/post_main.vue';
    import UserMain from './components/user_info/user_main.vue';
    import ManageUser from './components/manage_user/manage_user.vue';

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

            this.$user.checkLogin(this);
            this.$watch('activeName', v => {
                if (v === 'logout') {
                    this.logout();
                }
            });
        },
        name: 'App',
        data () {
            return {
                lanModel: '简体',
                isLogin: false,
                LanguageList: i18nConfig.LanguageList,

                activeName: 'post',
            };
        },
        computed: {
            isAdmin () {
                if (this.$store.state.userInfo.isAdmin >= 10) {
                    return true;
                } else {
                    return false;
                }
            },
        },
        methods: {
            tabClick (tab, event) {
                console.log(tab, event);
                // this.activeName = tab;
            },
            logout () {
                this.$ajax.logout(res => {
                    if (res.code === 200) {
                        this.$message.success('登出成功');
                    }
                });

                this.$user.logout(this);
            },
        },
        components: {
            PostMain,
            UserMain,
            ManageUser,
        },
    };
</script>
<style lang="less" type="text/less">
    @import '~common/css/reset.css';

    #home {
        padding: 0 30px;

    }
</style>

