import {post} from '../config/http';

/**
 * Created by 王冬 on 2023/4/23.
 * QQ: 20004604
 * weChat: qq20004604
 * 功能说明：
 *
 */
const user = {
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
    // 登出
    logout () {
        return post('/logout');
    },
    // 更新本人信息
    updateSelfInfo (payload) {
        return post('/updateSelfInfo', payload);
    },
    // 获取用户信息
    getUserInfo () {
        return post('/getUserInfo');
    },
    // 管理员分页获取所有用户信息
    getUsersInfoByPage (payload) {
        return post('/getUsersInfoByPage', payload);
    },
    // 管理员批量更新用户状态
    updateUserStatus (payload) {
        return post('/updateUserStatus', payload);
    },
    // 管理员修改其他用户信息
    updateUserInfo (payload) {
        return post('/updateUserInfo', payload);
    },

    // 用户修改自己的密码
    updateSelfPassword (payload) {
        return post('/updateSelfPassword', payload);
    },
    // 更新本人信息
    updateUserPassword (payload) {
        return post('/updateUserPassword', payload);
    },

    // 测试
    test (payload) {
        return post('/test', payload);
    },
};
export default user;
