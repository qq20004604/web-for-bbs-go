<template>
    <div id="login">
        <wti-form :fields="loginFields"
                  ref="form">
            <template #login-btn>
                <el-button type="success"
                           @loading="loading"
                           @click="submit"
                           style="width:100px">
                    {{ $t('Login.login') }}
                </el-button>

                <el-link type="info"
                         icon="el-icon-user"
                         @click="$emit('changeType', 'register')"
                         style="margin-left:40px">
                    {{ $t('Login.goRegPage') }}
                </el-link>
            </template>
        </wti-form>
    </div>
</template>

<script>
    export default {
        name: 'Login',
        created () {
            this.lanModel = this.$i18n.locale;
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
                                name: 'login-btn',
                            },
                        ],
                    },
                ];
            },
        },
        data () {
            return {
                loading: false,
            };
        },
        methods: {
            submit () {
                if (this.loading) {
                    return;
                }
                this.$refs.form.validate((isPass, data) => {
                    if (isPass) {
                        this.loading = true;
                        this.$ajax.login(data).then(result => {
                            if (result.code === 200) {
                                // 说明登录成功
                                // 先把token写入localStorage里
                                localStorage.setItem('token', result.data.token);
                                localStorage.setItem('userInfo', JSON.stringify(result.data.userInfo));
                                window.location.href = './home.html';
                            } else {
                                this.$message.error(result.msg);
                                this.loading = false;
                            }
                        }).catch(err => {
                            console.log(`err:${err}`);
                            this.loading = false;
                        });
                    } else {
                        this.$message.error(this.$t('Login.checkFailed'));
                        this.loading = false;
                    }
                });
            },
        },
    };
</script>

<style scoped lang="less">
    @import '~common/less/config.less';

    #login {
        padding: 40px 30px;
        width: 400px;

        .title {
            text-align: center;
            font-size: 24px;
            font-weight: bold;
        }
    }
</style>
