<template>
    <div id="register">
        <wti-form :fields="registerFields"
                  :form-item-col="12"
                  ref="form">
            <template #register-btn>
                <el-button type="success"
                           @loading="loading"
                           @click="submit"
                           style="width:100px">
                    {{ $t('Login.submit') }}
                </el-button>

                <el-link type="info"
                         icon="el-icon-user"
                         @click="$emit('changeType', 'register')"
                         style="margin-left:40px">
                    {{ $t('Login.login') }}
                </el-link>
            </template>
        </wti-form>
    </div>
</template>

<script>
    export default {
        name: 'Register',
        data () {
            return {
                loading: false,
            };
        },
        computed: {
            registerFields () {
                return [
                    {
                        label: this.$t('Login.regTitle'),
                        children: [
                            {
                                key: 'account',
                                type: 'input',
                                label: '登录账号',
                                placeholder: '请输入登录账号',
                                rules: [
                                    { required: true, message: '请输入登录账号', trigger: 'blur' },
                                    { min: 4, max: 20, message: '登录账号长度应在4-20个字符之间', trigger: 'blur' },
                                ],
                            },
                            {
                                key: 'password',
                                type: 'input',
                                label: '密码',
                                placeholder: '请输入密码',
                                rules: [
                                    { required: true, message: '请输入密码', trigger: 'blur' },
                                    { min: 6, max: 40, message: '密码长度应在6-40个字符之间', trigger: 'blur' },
                                ],
                            },
                            {
                                key: 'repeatPassword',
                                type: 'input',
                                label: '重复密码',
                                placeholder: '请重复输入密码',
                                rules: [
                                    { required: true, message: '请重复输入密码', trigger: 'blur' },
                                    {
                                        validator: (rule, value, callback) => {
                                            if (value !== this.$refs.form.formData.password) {
                                                callback(new Error('两次输入的密码不一致'));
                                            } else {
                                                callback();
                                            }
                                        },
                                        trigger: 'blur',
                                    },
                                ],
                            },
                            {
                                key: 'name',
                                type: 'input',
                                label: '用户名称',
                                placeholder: '请输入用户名称',
                                rules: [
                                    { required: true, message: '请输入用户名称', trigger: 'blur' },
                                    { max: 20, message: '用户名长度不得超过20个字符', trigger: 'blur' },
                                ],
                            },
                            {
                                key: 'email',
                                type: 'input',
                                label: '用户邮箱',
                                placeholder: '请输入用户邮箱',
                                rules: [
                                    { max: 60, message: '邮箱长度不得超过60个字符', trigger: 'blur' },
                                ],
                            },
                            {
                                key: 'mobile',
                                type: 'input',
                                label: '手机号码',
                                placeholder: '请输入手机号码',
                                rules: [
                                    { len: 11, message: '请输入11位手机号码', trigger: 'blur' },
                                ],
                            },
                            {
                                key: 'gender',
                                type: 'normal-select',
                                label: '用户性别',
                                options: [
                                    {
                                        value: 1,
                                        label: '男',
                                    },
                                    {
                                        value: 2,
                                        label: '女',
                                    },
                                    {
                                        value: 3,
                                        label: '男同',
                                    },
                                    {
                                        value: 4,
                                        label: '女同',
                                    },
                                    {
                                        value: 5,
                                        label: '未告知',
                                    },
                                    {
                                        value: 6,
                                        label: '其他',
                                    },
                                ],
                                defaultValue: 5,
                            },

                            {
                                key: 'birthday',
                                type: 'date-input',
                                label: '生日',
                                placeholder: '请选择生日',
                            },
                            {
                                key: 'signature',
                                type: 'textarea',
                                label: '个性签名',
                                placeholder: '请输入个性签名',
                                rules: [
                                    { max: 255, message: '个性签名长度不得超过255个字符', trigger: 'blur' },
                                ],
                            },
                            {
                                key: 'company',
                                type: 'input',
                                label: '所在公司',
                                placeholder: '请输入所在公司',
                                rules: [
                                    { max: 20, message: '公司名称长度不得超过20个字符', trigger: 'blur' },
                                ],
                            },
                            {
                                key: 'website',
                                type: 'input',
                                label: '个人网站',
                                placeholder: '请输入个人网站',
                                rules: [
                                    { max: 255, message: '个人网站长度不得超过255个字符', trigger: 'blur' },
                                ],
                            },

                            {
                                type: 'slot-single',
                                name: 'register-btn',
                            },
                        ],
                    },
                ];
            },
        },
        methods: {
            submit () {
                if (this.loading) {
                    return;
                }
                this.$refs.form.validate((isPass, data) => {
                    if (isPass) {
                        this.loading = true;
                        this.$ajax.register(data).then(result => {
                            if (result.code === 200) {
                                // 注册成功，跳转到登录页，并要求登录
                                this.$message.success('注册成功，请登录！');
                                this.$emit('changeType', 'login');
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

    #register {
        padding: 40px 30px;
        width: 800px;

    }
</style>
