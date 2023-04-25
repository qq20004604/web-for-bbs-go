/**
 * Created by 王冬 on 2023/4/25.
 * QQ: 20004604
 * weChat: qq20004604
 * 功能说明：
 *
 */
import {post} from '../config/http';

const topic = {
    // 发主题帖
    createTopic (payload) {
        return post('/createTopic', payload);
    },
    // 分页查看主题帖列表
    getTopicListByPage (payload) {
        return post('/getTopicListByPage', payload);
    },
};

export default topic;
