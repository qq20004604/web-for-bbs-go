<template>
    <div id="user-info">
        <wti-form :fields="userInfoFields"
                  :data="$store.state.userInfo"
                  :text-model="isReadOnly"
                  ref="form"/>
    </div>
</template>

<script>
    export default {
        name: 'UserInfo',
        data () {
            return {
                data: {},
                isReadOnly: true,
            };
        },
        created () {},
        mounted () {
            // this.data = this.$store.state.userInfo;
            // this.$watch('$store.state.userInfo', () => {
            //     this.data = this.$store.state.userInfo;
            // });
        },
        computed: {
            userInfoFields () {
                return [
                    {
                        label: '用户信息',
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
        methods: {},
        components: {},
    };
</script>

<style scoped lang="less">
    @import '~common/less/config.less';

    #user-info {

    }
</style>
