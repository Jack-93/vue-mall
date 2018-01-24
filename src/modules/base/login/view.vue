<style lang="stylus" src="./view.styl" scoped></style>
<style lang="stylus">
    .login-container {
        .el-input input {
            background: transparent;
            color: #eee;
        }
        .el-button {
            width 100%
        }
    }
</style>
<template lang="html" src="./view.html"></template>

<script>
    import Utils from '@/common/app.utils.js'
    import Model from './view.model.js';

    export default {
        data() {
            return {
                user: {
                    email: 'admin@qq.com',
                    password: '123456',
                },
                rules: {
                    email: [
                        { required: true, message: '用户名不能为空', trigger: 'blur' },
                        { min: 3, max: 40, message: '长度在 3 到 40 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '密码不能为空', trigger: 'blur' },
                        { min: 6, message: '长度大于 6 位', trigger: 'blur' }
                    ]
                }
            };
        },
        watch: {},
        mounted: function () {
        },
        methods: {
            validate(){
                let promise = this.$refs['userForm'].validate( valid => {
                    if (valid) {
                        this.login()
                    }
                });
            },
            login: async function () {
                /*let data = await Model.login(this.user);
                if(!!data){
                    let user = data.data;
                    let dateTime = new Date().getTime();
                    window.localStorage.setItem('user',JSON.stringify(user))
                    window.localStorage.setItem('token',JSON.stringify({
                        access_token: user.access_token,
                        expires_in: dateTime + user.expires_in*1000,
                        token_type: user.token_type
                    }))
                    this.$router.replace({
                        path: '/'
                    })
                }else{
                }*/
                this.$router.replace({
                    path: '/'
                })
            }
        }
    }
</script>
