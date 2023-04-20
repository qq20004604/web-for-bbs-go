/**
 * Created by 王冬 on 2021/03/05.
 * QQ: 20004604
 * weChat: qq20004604
 * 功能说明：
 * 通用配置文件，公共引入的东西都写到这里
 */
import Vue from 'vue';
import forDevelopment from 'plugin/for_development';
import Element from 'element-ui';
import http from '@/api/ajax.js';
import URL from './url';
import 'common/less/config.less';
import 'element-ui/lib/theme-chalk/index.css';
import VueHighlightJS from 'vue-highlightjs';
import 'highlight.js/styles/atom-one-dark.css';
import WtiForm from 'wti-form';
import {baseURL} from '@/config/env.js';
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import VueI18n from 'vue-i18n';
import i18nConfig from '@/i18n/main.js';
import User from '@/plugin/user';


const isProd = process.env.NODE_ENV !== 'development';

const CommonUtils = {
    init () {
        Vue.use(URL);
        Vue.config.productionTip = !isProd;
        Vue.use(http);
        // 国际化组件
        Vue.use(VueI18n);
        Vue.use(User);
        // 按需加载
        Vue.use(Element);
        VueMarkdownEditor.use(vuepressTheme);
        Vue.use(VueMarkdownEditor);
        const props = {
            // 基础 url，一般是指 axios 用的 baseURL
            // 由于组件并不能默认使用 axios 的 baseURL，所以如果有需要，这里要特殊设置
            baseURL: {
                type: String,
                default: baseURL,
            },
            // 全局属性配置
            globalConfig: {
                type: Object,
                default: () => {
                    return {
                        clearable: true,
                    };
                },
            },
            dynamicSelectOption: {
                type: Object,
                default: () => ({
                    // 这是字典接口的 url
                    dictUrl: '/dict',
                    // 异步请求时，请求内容是一个对象或一个数组。
                    // 如果是对象，那么包含一个 key 和一个数组。
                    // 如果是数组，那么只有这个数组。
                    // 数组是所有字典 FormItem 的 parentKey 的集合
                    queryKey: 'search', // 这是请求时那个 key。如果为空，则请求时是一个数组，而不是一个对象
                    parentKey: 'parentKey', // 这是返回结果的 parentKey。意思是，同一个 parentKey 归属于同一个下拉框选项
                    value: 'code', // 这是下拉框选项的值
                    label: 'label', // 这是下拉框选项的 label
                }),
            },
        };
        Vue.use(WtiForm, props);
        Vue.use(VueHighlightJS);

        if (!document.getElementById('app')) {
            const DOM = document.createElement('div');
            DOM.id = 'app';
            document.body.append(DOM);
        }

        window.version = process.env.date;
        Vue.use(forDevelopment);


    },
    setTitle (title) {
        const titleDOM = document.getElementsByTagName('title');
        if (titleDOM.length > 0) {
            titleDOM[0].innerText = title;
        }
    },

    geti18n () {
        const i18n = new VueI18n({
            locale: i18nConfig.defaultLanguage, // set locale
            messages: i18nConfig.mixin, // set locale messages
        });
        return i18n;
    },
};

export default CommonUtils;
