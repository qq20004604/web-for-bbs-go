class User {
    // 用户登录后，将用户信息更新到 vuex 里
    setUserInfo (vue) {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
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

                    }
                    // 否则无需特别处理
                } else {
                    // 此时说明已经在登录后页面，将用户信息写入vuex
                    this.setUserInfo(vue);
                }
            });

            return;
        } else {
            // 如果过期了，先清空localStore，然后再判断当前是否是登录页，不是的话则跳到登录页
            localStorage.clear();
            sessionStorage.removeItem('recentOnline');
            if (window.location.href.indexOf('login') === -1) {
                window.location.href = './login.html';
            }
        }
    }

}

export default new User();
