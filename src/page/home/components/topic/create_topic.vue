<template>
    <div id="create-topic">
        <wti-form :fields="fields"
                  :form-item-col="24"
                  :border-form="false"
                  ref="form">
            <template #send-btn>
                <el-button type="primary"
                           @loading="sending"
                           @click="submit"
                           style="width:100px">
                    发 表
                </el-button>
            </template>
        </wti-form>
    </div>
</template>

<script>
    export default {
        name: 'CreateTopic',
        data () {
            return {
                fields: [
                    {
                        label: '发表新帖',
                        children: [
                            {
                                key: 'title',
                                type: 'input',
                                placeholder: '请输入标题',
                                rules: [
                                    { required: true, message: '请输入用户名称', trigger: 'blur' },
                                    { max: 30, message: '标题长度不得超过30个字符', trigger: 'blur' },
                                ],
                            },
                            {
                                key: 'content',
                                type: 'textarea',
                                placeholder: '请输入内容',
                                autosize: {
                                    minRows: 4,
                                    maxRows: 20,
                                },
                                rules: [
                                    { required: true, message: '请输入用户名称', trigger: 'blur' },
                                    { max: 4000, message: '内容长度不得超过4000个字符', trigger: 'blur' },
                                ],
                                showWordLimit: true,
                                maxlength: 4000,
                            },
                            {
                                type: 'slot-single',
                                name: 'send-btn',
                            },
                        ],
                    },
                ],

                sending: false,
            };
        },
        created () {},
        mounted () {},
        computed: {},
        methods: {
            submit () {
                if (this.sending) {
                    return;
                }
                this.$refs.form.validate((isPass, data) => {
                    if (isPass) {
                        this.loading = true;
                        this.$ajax.createTopic(data).then(result => {
                            if (result.code === 200) {
                                // 注册成功，跳转到登录页，并要求登录
                                this.$message.success(result.msg);
                                this.loading = false;
                                this.$refs.form.resetFields();
                                this.$emit('getTopicListByPage');
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
        components: {},
    };
</script>

<style scoped lang="less">
    @import '~common/less/config.less';

    #create-topic {
        width: 600px;
        padding-top: 20px;
    }
</style>
