<template>
    <el-drawer title="修改用户密码"
               :visible="true"
               size="50%"
               :before-close="beforeClose"
               direction="rtl">
        <div class="updating-user-info-drawer">
            <wti-form :fields="passwordFields"
                      :data="data"
                      :form-item-col="8"
                      ref="formPassword"/>
            <el-button @click="submitData"
                       :loading="submiting"
                       type="primary">
                提交
            </el-button>
            <el-button @click="closeUpdateUserInfo">
                取消
            </el-button>
        </div>
    </el-drawer>
</template>

<script>
    export default {
        name: 'UpdateUserPassword',
        props: {
            // isUpdatingUserInfo: {
            //     type: Boolean,
            //     default: false,
            // },
            userInfo: {
                type: Object,
                default: () => {
                    return {};
                },
            },
            closeUpdateUserInfo: {
                type: Function,
                default: () => {
                },
            },
        },
        data () {
            return {
                submiting: false,
                data: {},

                passwordFields: [
                    {
                        label: '更改密码',
                        children: [
                            {
                                key: 'id',
                                type: 'input',
                                label: 'ID',
                                isText: true,
                            },
                            {
                                key: 'account',
                                type: 'input',
                                label: '登录账号',
                                isText: true,
                            },
                            {
                                key: 'name',
                                type: 'input',
                                label: '用户名称',
                                isText: true,
                            },
                            {
                                key: 'password',
                                type: 'input',
                                label: '密码',
                                placeholder: '请输入密码',
                                span: 24,
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
                                span: 24,
                                rules: [
                                    { required: true, message: '请重复输入密码', trigger: 'blur' },
                                    {
                                        validator: (rule, value, callback) => {
                                            if (value !== this.$refs.formPassword.formData.password) {
                                                callback(new Error('两次输入的密码不一致'));
                                            } else {
                                                callback();
                                            }
                                        },
                                        trigger: 'blur',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            };
        },
        mounted () {
            this.copyUserInfo();
        },
        computed: {},
        methods: {
            beforeClose (done) {
                this.closeUpdateUserInfo();
                done();
            },
            copyUserInfo () {
                const data = {};
                Object.keys(this.userInfo).forEach(key => {
                    data[key] = this.userInfo[key];
                });
                this.data = data;
            },
            submitData () {
                if (this.submiting) {
                    this.$message.warning('提交中，请耐心等待');
                    return;
                }
                this.submiting = true;
                this.$refs.formPassword.validate((isPass, data) => {
                    if (isPass) {
                        console.log('这是你刚提交的数据', data);
                        this.$ajax.updateUserPassword({
                            id: this.userInfo.id,
                            password: data.password,
                        }).then(res => {
                            if (res.code === 200) {
                                this.$message.success(res.msg);
                                this.closeUpdateUserInfo();
                            } else {
                                this.$message.error(res.msg);
                            }
                        }).catch(() => {
                            this.$message.error('服务器错误，请重试或者联系管理员');
                        }).finally(() => {
                            this.submiting = false;
                        });
                    } else {
                        this.$message.error('校验失败！');
                        this.submiting = false;
                    }
                });
            },
        },
        components: {},
    };
</script>

<style scoped lang="less">
    @import '~common/less/config.less';

    .updating-user-info-drawer {
        padding: 0 20px;
    }
</style>
