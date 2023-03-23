/**
 * Created by 王冬 on 2023/3/23.
 * QQ: 20004604
 * weChat: qq20004604
 * 功能说明：
 *  1、编写的i18n文件，最后都在这个文件里引入并mixin，然后再被引入vue
 *  2、假如国际化内容过多，那么则在各自的app.js文件里引入
 */

import Login from './login';

const LanguageMap = {
    Login: Login,
};

const LanguageList = [
    'en', 'cn',
];

// 最终语言文本
const mixin = {};
LanguageList.forEach(lan => {
    mixin[lan] = {};
});
Object.keys(LanguageMap).forEach(key => {
    LanguageList.forEach(lan => {
        mixin[lan][key] = LanguageMap[key][lan];
    });
});

const Config = {
    // 默认语言
    defaultLanguage: 'cn',
    // mixin后的语言包
    mixin,
    LanguageList,
};


export default Config;
