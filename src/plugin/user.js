class User {
    // 用户登录后，将用户信息更新到 vuex 里
    setUserInfo (vue) {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        console.log('setUserInfo', userInfo);
        vue.$store.commit('updateUserinfo', userInfo);
    }

    // 检查用户是否登录
    checkLogin (vue) {
        // const token = localStorage.getItem('token');
        const tokenExpireTime = localStorage.getItem('tokenExpireTime');
        if (new Date() < new Date(tokenExpireTime)) {
            if (sessionStorage.getItem('recentOnline') === 'true') {
                this.setUserInfo(vue);
                sessionStorage.removeItem('recentOnline');
            }
            // 这个判断成立的话，则说明当前token没有过期
            // 调用登录检查接口，判断是否登录成功
            vue.$ajax.isOnline().then(res => {
                if (res.code === 200) {
                    // 如果当前是登录页面，则跳转到登录后页面
                    if (window.location.href.indexOf('login') > -1) {
                        // 临时添加一个缓存，避免重复判断在线状态
                        sessionStorage.setItem('recentOnline', 'true');
                        window.location.href = './home.html';
                    } else {
                        // 此时说明已经在登录后页面，将用户信息写入vuex
                        this.setUserInfo(vue);
                    }
                } else {
                    // 此时说明报错了，需要重新登录
                    this.logout();
                }
            });
        } else {
            this.logout();
        }
    }

    // 获取用户信息
    getUserInfo (vue) {
        vue.$ajax.getUserInfo().then(result => {
            if (result.code === 200) {
                // 说明成功获取到用户信息
                localStorage.setItem('userInfo', JSON.stringify(result.data));
                // 更新vuex里的数据
                vue.$store.commit('updateUserinfo', result.data);
            } else {
                vue.$message.error(result.msg);
            }
        }).catch(() => {
            vue.$message.error('获取用户信息失败');
        });
    }

    logout () {
        // 如果过期了，先清空localStore，然后再判断当前是否是登录页，不是的话则跳到登录页
        localStorage.clear();
        sessionStorage.removeItem('recentOnline');
        if (window.location.href.indexOf('login') === -1) {
            window.location.href = './login.html';
        }
    }

}

export default {
    install (Vue) {
        Vue.prototype.$user = new User();
    },
};
