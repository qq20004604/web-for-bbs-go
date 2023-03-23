<template>
    <div id="login">
        <wti-form :fields="loginFields"
                  ref="loginForm">
            <template #change-lan-btn>
                <div class="login-change">
                    <div>
                        {{ $t('Login.changeLanBtn') }}
                        <el-radio-group v-model="lanModel" size="small" @change="onLanChange">
                            <el-radio-button v-for="val in LanguageList" :key="val" :label="val"/>
                        </el-radio-group>
                    </div>
                </div>
            </template>
            <template #login-btn>
                <el-button type="success"
                           @loading="isLogin"
                           @click="login"
                           style="width:100px">
                    {{ $t('Login.login') }}
                </el-button>
            </template>
        </wti-form>

        <div class="source-code">
            <p>{{ $t('Login.github') }}</p>
            <p>
                <a href="https://github.com/qq20004604/web-for-bbs-go" target="_blank">
                    {{ $t('Login.webCode') }}</a>
            </p>
            <p>
                <a href="https://github.com/qq20004604/bbs-go-public" target="_blank">{{ $t('Login.goCode') }}</a>
            </p>
        </div>
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
            };
        },
        computed: {
            loginFields () {
                return [
                    {
                        label: this.$t('Login.login'),
                        children: [
                            {
                                key: 'account',
                                type: 'input',
                                label: this.$t('Login.account'),
                                span: 24,
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入',
                                        trigger: [
                                            'blur',
                                            'change',
                                        ],
                                    },
                                ],
                            },
                            {
                                key: 'password',
                                type: 'input',
                                label: this.$t('Login.password'),
                                span: 24,
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入',
                                        trigger: [
                                            'blur',
                                            'change',
                                        ],
                                    },
                                ],
                            },
                            {
                                type: 'slot-single',
                                name: 'change-lan-btn',
                            },
                            {
                                type: 'slot-single',
                                name: 'login-btn',
                            },
                        ],
                    },
                ];
            },
        },
        methods: {
            onLanChange (v) {
                if (v !== 'cn') {
                    this.$message.warning('请注意，后端服务的返回内容是中文。如果需要后端提示是英文，请自行更改');
                }
                this.$i18n.locale = v;
                localStorage.setItem('lanModel', v);
            },
            login () {
                if (this.isLogin) {
                    return;
                }
                this.$refs.loginForm.validate((isPass, data) => {
                    if (isPass) {
                        this.isLogin = true;
                        this.$ajax.login(data).then(result => {
                            console.log(result);
                            if (result.code === 200) {
                                // 说明登录成功
                                // 先把token写入localStorage里
                                localStorage.setItem('token', result.data.token);
                                localStorage.setItem('userInfo', JSON.stringify(result.data.userInfo));
                                window.location.href = './home.html';
                            } else {
                                this.$message.error(result.msg);
                                this.isLogin = false;
                            }
                        }).catch(err => {
                            console.log(`err:${err}`);
                            this.isLogin = false;
                        });
                    } else {
                        this.$message.error(this.$t('Login.checkFailed'));
                        this.isLogin = false;
                    }
                });
            },
        },
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

