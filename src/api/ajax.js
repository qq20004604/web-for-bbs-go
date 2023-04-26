/**
 * Created by 王冬 on 2019/5/23.
 * QQ: 20004604
 * weChat: qq20004604
 * 功能说明：
 *
 */
// import {topic} from '../config/http';
import user from './user';
import topic from './topic';

const $ajax = {};
Object.assign($ajax, user, topic);

export default {
    install: function (Vue) {
        // 添加方法，可以修改 <title> 标签的内容
        Vue.prototype.$ajax = $ajax;
    },
};

