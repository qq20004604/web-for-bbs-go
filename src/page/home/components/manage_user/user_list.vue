<template>
    <div id="user-list">
        <div class="top-btns">
            <!--            <el-button round>批量更新状态</el-button>-->
            <el-button type="primary" round @click="updateStatus">批量更新状态</el-button>
            <!--            <el-button type="success" round>成功按钮</el-button>-->
            <!--            <el-button type="info" round>信息按钮</el-button>-->
            <!--            <el-button type="warning" round>警告按钮</el-button>-->
            <!--            <el-button type="danger" round>危险按钮</el-button>-->
        </div>
        <el-table :data="userList"
                  border
                  @selection-change="handleSelectionChange"
                  style="min-width: 100%">
            <el-table-column
                type="selection"
                width="55"/>
            <el-table-column
                prop="id"
                fixed
                label="ID"
                width="80"/>
            <el-table-column
                prop="account"
                fixed
                label="登录账号"
                width="100"/>
            <el-table-column
                prop="name"
                fixed
                width="200"
                label="用户名"/>
            <el-table-column
                prop="statusText"
                width="100"
                :filters="statusFilters"
                :filter-method="filterHandler"
                label="用户状态"/>
            <el-table-column
                prop="email"
                width="160"
                label="邮箱"/>
            <el-table-column
                prop="mobile"
                width="120"
                label="手机号码"/>
            <el-table-column
                prop="genderText"
                width="70"
                label="性别"/>
            <el-table-column
                prop="birthday"
                width="180"
                label="生日">
                <template slot-scope="scope">
                    {{ scope.row.birthday.split(' ')[0] }}
                </template>
            </el-table-column>
            <el-table-column
                prop="signature"
                width="200"
                label="个性签名"/>
            <el-table-column
                prop="isAdminText"
                width="120"
                label="权限等级"/>
            <el-table-column
                prop="company"
                width="200"
                label="公司"/>
            <el-table-column
                prop="website"
                width="300"
                label="个人网站"/>
            <el-table-column
                prop="createdAt"
                width="180"
                label="创建时间"/>
            <el-table-column
                prop="updatedAt"
                width="180"
                label="更新时间"/>
            <el-table-column
                fixed="right"
                label="操作"
                width="120">
                <template slot-scope="scope">
                    <el-button
                        @click.native.prevent="updateUserInfo(scope.row)"
                        type="text"
                        size="small">
                        编辑
                    </el-button>
                    <el-button
                        @click.native.prevent="updateUserPassword(scope.row)"
                        type="text"
                        size="small">
                        修改密码
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination layout="total, prev, pager, next, jumper"
                       background
                       @current-change="pageChange"
                       :page-size="3"
                       :total="totalUser"/>

        <el-drawer
            title="批量更新用户状态"
            :visible.sync="isUpdatingStatus"
            direction="rtl">
            <div class="update-status-drawer">
                <div class="row">
                    该操作将批量更新以下用户的状态为指定状态，请谨慎确认后再进行操作。
                </div>
                <div class="row">
                    <el-select v-model="toStatus" placeholder="请选择状态">
                        <el-option
                            v-for="item in statusFilters"
                            :key="item.value"
                            :label="item.text"
                            :value="item.value"/>
                    </el-select>
                </div>
                <div class="row">受影响的用户：</div>
                <el-table :data="multipleSelection"
                          border
                          style="width: 100%">
                    <el-table-column
                        prop="id"
                        label="ID"
                        width="80"/>
                    <el-table-column
                        prop="account"
                        label="登录账号"/>
                    <el-table-column
                        prop="name"
                        label="用户名"/>
                </el-table>
                <div class="row btn-row">
                    <el-button @click="isUpdatingStatus=false">取消</el-button>
                    <el-button type="primary" @click="doUpdateStatus">确认</el-button>
                </div>
            </div>
        </el-drawer>
        <UpdateUserInfo v-if="isUpdatingUserInfo"
                        :user-info="userInfo"
                        :load-user-list="loadUserList"
                        :close-update-user-info="closeUpdateUserInfo"/>
        <UpdateUserPassword v-if="isUpdatingUserPassword"
                            :user-info="userInfo"
                            :close-update-user-info="closeUpdateUserInfo"/>
    </div>
</template>

<script>
    import UpdateUserInfo from './update_user_info.vue';
    import UpdateUserPassword from './update_user_password.vue';

    export default {
        name: 'UserList',
        data () {
            return {
                userList: [],
                currentPage: 1,

                isUpdatingStatus: false,
                toStatus: '',

                isUpdatingUserInfo: false,
                isUpdatingUserPassword: false,
                userInfo: null,

                multipleSelection: [],
                statusFilters: [
                    { text: '正常', value: 10 },
                    { text: '禁言', value: 1 },
                    { text: '用户已离职', value: 2 },
                    { text: '账号已删除', value: 3 },
                    { text: '注册审核中', value: 4 },
                ],

                totalUser: 0,
                totalPage: 0,
                countPerPage: 100,
            };
        },
        created () {
            this.loadUserList(1);
        },
        mounted () {},
        computed: {},
        methods: {
            loadUserList (page) {
                if (!page) {
                    page = this.currentPage;
                } else {
                    this.currentPage = page;
                }
                this.$ajax.getUsersInfoByPage({
                    page,
                }).then(res => {
                    // 如果请求的数据和当前分页不同，则无视返回结果
                    if (res.code === 200) {
                        if (res.data.page !== this.currentPage) {
                            return;
                        }
                        this.userList = res.data.list;
                        this.userList.forEach(user => {
                            user.birthday = user.birthday.split(' ')[0];
                        });
                        this.totalUser = res.data.total_user;
                        this.totalPage = res.data.total_page;
                        this.countPerPage = res.data.count_per_page;
                    } else {
                        this.$message.error(res.msg);
                    }
                }).catch(() => {
                    this.$message.error('服务器错误，请重新加载');
                });
            },
            pageChange (page) {
                this.loadUserList(page);
            },
            handleSelectionChange (val) {
                this.multipleSelection = val;
            },
            filterHandler (value, row) {
                return row.status === value;
            },
            updateStatus () {
                this.toStatus = '';
                this.isUpdatingStatus = true;
            },
            doUpdateStatus () {
                if (this.multipleSelection.length === 0) {
                    return this.$message.error('未选中任何数据，无法进行操作');
                } else if (!this.toStatus) {
                    return this.$message.error('未选中任何状态，无法进行操作');
                }
                const payload = {
                    status: this.toStatus,
                    list: this.multipleSelection.map(item => item.id),
                };
                this.$ajax.updateUserStatus(payload).then(res => {
                    if (res.code === 200) {
                        this.$message.success('批量更新成功');
                        this.loadUserList(this.currentPage);
                        this.isUpdatingStatus = false;
                    } else {
                        this.$message.error(res.msg);
                    }
                }).catch(() => {
                    this.$message.error('服务器错误，请重试');
                });
            },

            updateUserInfo (row) {
                this.userInfo = row;
                this.isUpdatingUserInfo = true;
            },
            updateUserPassword (row) {
                console.log('updateUserPassword', row);
                this.userInfo = row;
                this.isUpdatingUserPassword = true;
            },

            closeUpdateUserInfo () {
                this.isUpdatingUserInfo = false;
                this.isUpdatingUserPassword = false;
                this.userInfo = null;
            },
        },
        components: {
            UpdateUserInfo,
            UpdateUserPassword,
        },
    };
</script>

<style scoped lang="less">
    @import '~common/less/config.less';

    .top-btns {
        position: relative;
        float: right;
        padding-bottom: 10px;
    }

    .update-status-drawer {
        padding: 0 20px;

        .row {
            line-height: 26px;
            font-size: 16px;
            color: #333;
        }

        .btn-row {
            margin-top: 10px;
        }
    }

</style>
