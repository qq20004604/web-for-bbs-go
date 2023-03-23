<template>
    <div id="home">
        用户信息：
        {{ userInfo }}
    </div>
</template>
<script>

    import i18nConfig from '@/i18n/main.js';

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
        },
        name: 'App',
        data () {
            return {
                lanModel: '简体',
                isLogin: false,
                LanguageList: i18nConfig.LanguageList,

                userInfo: JSON.parse(localStorage.getItem('userInfo', 4)),
            };
        },
        computed: {},
        methods: {},
    };
</script>
<style lang="less" type="text/less">
    @import '~common/css/reset.css';

    #login {
        padding: 40px 30px;
        width: 400px;

        .title {
            text-align: center;
            font-size: 24px;
            font-weight: bold;
        }

        .login-change {
            height: 60px;

            > p {
                height: 20px;
                font-size: 14px;
            }
        }

        .source-code {
            a {
                font-size: 14px;
                color: blue;
                text-decoration: underline;
            }

            p {
                line-height: 20px;
            }
        }
    }
</style>

