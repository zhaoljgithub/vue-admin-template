<template>
    <div class="login-container">
        <div class="logo-container">
        </div>
        <div class="login-form-container">
            <div class="hello-text">欢迎登录</div>
            <div class="form-container">
                <a-form :model="loginForm" name="normal_login" class="login-form" @finish="onFinish"
                    @finishFailed="onFinishFailed">
                    <a-form-item label="" name="userAccount" :rules="[{ required: true, message: '账号不存在' }]">
                        <a-input :placeholder="acctPlaceholder" v-model:value="loginForm.userAccount">
                            <template #prefix>
                                <UserOutlined class="site-form-item-icon" />
                            </template>
                        </a-input>
                    </a-form-item>

                    <a-form-item label="" name="userPassword" :rules="[{ required: true, message: '密码不能为空' }]">
                        <a-input-password :placeholder="pwdPlaceholder" v-model:value="loginForm.userPassword">
                            <template #prefix>
                                <LockOutlined class="site-form-item-icon" />
                            </template>
                        </a-input-password>
                    </a-form-item>

                    <a-form-item>
                        <a-button class="submit-btn" type="primary" html-type="submit">登录</a-button>
                    </a-form-item>
                </a-form>
            </div>
        </div>
    </div>
</template>
  
<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';

export default defineComponent({
    setup(props, context) {
        const data = reactive({
            acctPlaceholder: "请输入账号",
            pwdPlaceholder: "请输入密码",
            loginType: 1,
            loginForm: {
                userAccount: "",
                userPassword: "",
            },
        })

        const onFinish = async (values: any) => {
            
        };

        const onFinishFailed = (errorInfo: any) => {
            console.log('Failed:', errorInfo);
        };

        return {
            ...toRefs(data),
            onFinish,
            onFinishFailed
        };
    },
    components: {
        UserOutlined,
        LockOutlined,
    }
});
</script>
  
<style lang='scss' scoped>
.login-container {
    min-width: 1250px;
    width: 100%;
    height: 100%;
    // background-color: #ffffff;
    background-size: cover;
    position: relative;

    .logo-container {
        padding: 40px;
    }

    .login-form-container {
        position: absolute;
        top: calc(50% - 277px);
        right: 14.58%;
        width: 420px;
        padding: 45px;
        box-sizing: border-box;
        border-radius: 16px;
        background: #155EEF;
        box-shadow: 0px 8px 8px -4px #10182807, 0px 20px 24px -4px #10182814;

        .hello-text {
            font-size: 30px;
            color: #ffffff;
            margin-top: 60px;
            margin-bottom: 55px;
            font-weight: 500;
        }

        &:deep(.ant-tabs-top > .ant-tabs-nav::before, .ant-tabs-bottom > .ant-tabs-nav::before, .ant-tabs-top > div > .ant-tabs-nav::before, .ant-tabs-bottom > div > .ant-tabs-nav::before) {
            border-color: #D1D1D6;
        }

        &:deep(.ant-tabs-tab:hover) {
            color: #D1D1D6;
        }

        &:deep(.ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn) {
            color: #FFFFFF;
        }

        &:deep(.ant-tabs-ink-bar) {
            background: #ffffff
        }

        &:deep(.ant-tabs-tab-btn) {
            color: #D1D1D6;
        }

        &:deep(.ant-tabs-tab) {
            padding: 12px 34.5px;
        }

        .form-container {
            .ant-input-affix-wrapper {
                border-color: #B2CCFF;
            }

            .submit-btn {
                width: 100%;
                margin-top: 25px;
                height: 40px;
                font-size: 16px;
                background: #00359E;
                border-color: #00359E;
            }


        }
    }
}
.registry-txt {
    text-align: right;
    padding-top: 6px;
    span {
        cursor: pointer;
    }
}
</style>
  