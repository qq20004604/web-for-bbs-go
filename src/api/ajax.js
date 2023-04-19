/**
 * Created by 王冬 on 2019/5/23.
 * QQ: 20004604
 * weChat: qq20004604
 * 功能说明：
 *
 */
import {post} from '../config/http';

const $ajax = {
    // 登录
    login (payload) {
        return post('/login', payload);
    },
    // 注册
    register (payload) {
        return post('/register', payload);
    },
    // 登录检查
    isOnline (payload) {
        return post('/isOnline', payload);
    },

    // 测试
    test (payload) {
        return post('/test', payload);
    },
};

export default {
    install: function (Vue) {
        // 添加方法，可以修改 <title> 标签的内容
        Vue.prototype.$ajax = $ajax;
    },
};

