<template>
    <div id="main">
        <div class="container">
            <Login v-if="type==='login'" @changeType="changeType"/>
            <Register v-if="type==='register'" @changeType="changeType"/>
        </div>

        <div class="footter">
            <div>
                {{ $t('Login.changeLanBtn') }}
                <el-radio-group v-model="lanModel" size="small" @change="onLanChange">
                    <el-radio-button v-for="val in LanguageList" :key="val" :label="val"/>
                </el-radio-group>
            </div>

            <div class="source-code">
                <p>{{ $t('Login.github') }}</p>
                <p>
                    <el-link href="https://github.com/qq20004604/web-for-bbs-go" target="_blank">
                        {{ $t('Login.webCode') }}<i class="el-icon-view el-icon--right"></i>
                    </el-link>
                </p>
                <p>
                    <el-link href="https://github.com/qq20004604/bbs-go-public" target="_blank">
                        {{ $t('Login.goCode') }}<i class="el-icon-view el-icon--right"></i>
                    </el-link>
                </p>
            </div>
        </div>
    </div>
</template>
<script>
    import i18nConfig from '@/i18n/main.js';
    import Login from './login.vue';
    import Register from './register.vue';

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

                type: 'login',
            };
        },
        methods: {
            onLanChange (v) {
                if (v !== 'cn') {
                    this.$message.warning('请注意，后端服务的返回内容是中文。如果需要后端提示是英文，请自行更改');
                }
                this.$i18n.locale = v;
                localStorage.setItem('lanModel', v);
            },

            changeType (v) {
                console.log(v);
                this.type = v;
            },
        },
        components: {
            Login,
            Register,
        },
    };
</script>
<style lang="less" type="text/less">
    @import '~common/css/reset.css';

    .source-code {
        p {
            line-height: 20px;
        }
    }

    .footter {
        padding-left: 28px;
    }
</style>

