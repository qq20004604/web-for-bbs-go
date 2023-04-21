<template>
    <div id="user-info">
        <div style="margin-bottom: 10px">
            <el-radio-group v-model="showModel" size="small">
                <el-radio-button label="view">查看</el-radio-button>
                <el-radio-button label="edit">编辑</el-radio-button>
                <el-radio-button label="changePassword">更改密码</el-radio-button>
            </el-radio-group>
        </div>
        <wti-form v-show="showModel==='view'"
                  :fields="viewFields"
                  :data="$store.state.userInfo"
                  :text-model="true"
                  ref="formView"/>
        <wti-form v-show="showModel==='edit'"
                  :fields="editFields"
                  :data="data"
                  ref="formEdit"/>
        <wti-form v-show="showModel==='changePassword'"
                  :fields="passwordFields"
                  :data="data"
                  ref="formPassword"/>
        <el-button v-if="showModel==='edit' || showModel==='changePassword'"
                   @click="submitData"
                   :loading="submiting"
                   type="primary">
            提交
        </el-button>
        <el-button v-if="showModel==='edit' || showModel==='changePassword'"
                   @click="resetData">
            取消更改
        </el-button>
    </div>
</template>

<script>
    export default {
        name: 'UserInfo',
        data () {
            return {
                data: {},
                showModel: 'edit',
                submiting: false,

                viewFields: [
                    {
                        label: '用户信息',
                        children: [
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
                            },
                            {
                                key: 'email',
                                type: 'input',
                                label: '用户邮箱',
                            },
                            {
                                key: 'mobile',
                                type: 'input',
                                label: '手机号码',
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
                            },

                            {
                                key: 'birthday',
                                type: 'date-input',
                                label: '生日',
                            },
                            {
                                key: 'signature',
                                type: 'textarea',
                                label: '个性签名',
                            },
                            {
                                key: 'company',
                                type: 'input',
                                label: '所在公司',
                            },
                            {
                                key: 'website',
                                type: 'input',
                                label: '个人网站',
                            },

                            {
                                type: 'slot-single',
                                name: 'register-btn',
                            },
                        ],
                    },

                ],
                editFields: [
                    {
                        label: '更改用户信息',
                        children: [
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

                ],

                passwordFields: [
                    {
                        label: '更改密码',
                        children: [
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
                        ],
                    },
                ],
            };
        },
        created () {},
        mounted () {
            this.copyUserInfo();
            this.$watch('$store.state.userInfo', () => {
                this.copyUserInfo();
            });
        },
        computed: {},
        methods: {
            copyUserInfo () {
                const data = {};
                Object.keys(this.$store.state.userInfo).forEach(key => {
                    data[key] = this.$store.state.userInfo[key];
                });
                this.data = data;
            },

            resetData () {
                this.copyUserInfo();
            },

            submitData () {
                if (this.submiting) {
                    this.$message.warning('提交中，请耐心等待');
                    return;
                }
                this.submiting = true;
                if (this.showModel === 'edit') {
                    this.$refs.formEdit.validate((isPass, data) => {
                        if (isPass) {
                            console.log('这是你刚提交的数据', data);
                            // 对提交数据和原始数据进行对比，只有不同的才会被提交
                            let isChange = false;
                            let isError = false;
                            const payload = {};
                            Object.keys(data).forEach(key => {
                                if (data[key] !== this.$store.state.userInfo[key]) {
                                    payload[key] = data[key];
                                    isChange = true;
                                    // 如果是生日，则在后面补位
                                    if (key === 'birthday') {
                                        // 如果生日为空，后端会认为没有修改这个值，所以是不能这么做的
                                        if (!payload[key]) {
                                            delete payload[key];
                                            this.$message.error('生日不能为空');
                                            isError = true;
                                        } else {
                                            payload[key] = payload[key] + ' 00:00:00';
                                        }
                                    }
                                }
                            });
                            console.log('这是最终提交的数据', payload);
                            if (!isChange) {
                                this.$message.warning('至少要有一个字段的数据改变，才有必要提交');
                                this.submiting = false;
                                return;
                            }
                            if (isError) {
                                this.submiting = false;
                                return;
                            }

                            this.$ajax.updateSelfInfo(payload).then(res => {
                                if (res.code === 200) {
                                    this.$message.success(res.msg);
                                    this.$user.getUserInfo(this);
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
                }

            },
        },
        components: {},
    };
</script>

<style scoped lang="less">
    @import '~common/less/config.less';

    #user-info {

    }
</style>
