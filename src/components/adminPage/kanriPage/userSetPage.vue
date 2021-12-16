<!--
 * @Author: zxy
 * @Date: 2021-06-06 15:52:03
 * @LastEditTime: 2021-11-23 20:41:14
 * @FilePath: /sku-blog-vite/src/components/adminPage/kanriPage/userSetPage.vue
-->
<template>
  <div class="add-page">
    <div class="content-sec">
      <div class="input-box">
        <span>用户名</span>
        <el-input class="input-magin" v-model="changeUserObj.name" placeholder="请输入用户名"></el-input>
      </div>

      <div class="input-box">
        <span>原密码</span>
        <el-input class="input-magin" v-model="changeUserObj.password" placeholder="请输入原密码"></el-input>
      </div>

      <div class="input-box">
        <span>邮箱</span>
        <el-input class="input-magin" v-model="changeUserObj.email" placeholder="请输入邮箱"></el-input>
      </div>

      <div class="input-box">
        <span>新密码</span>
        <el-input class="input-magin" v-model="changeUserObj.nPassword" placeholder="请输入新密码"></el-input>
      </div>

      <div class="input-box">
        <span>确认新密码</span>
        <el-input class="input-magin" v-model="changeUserObj.aNPassword" placeholder="请再输入新密码"></el-input>
      </div>

      <el-button type="primary" @click="changeUser(changeUserObj)" round>修改</el-button>
    </div>

    <div class="md-sec">
      <div class="input-box">
        <span>用户名</span>
        <el-input class="input-magin" v-model="userObj.name" placeholder="请输入用户名"></el-input>
      </div>

      <div class="input-box">
        <span>密码</span>
        <el-input class="input-magin" v-model="userObj.password" placeholder="请输入密码"></el-input>
      </div>

      <div class="input-box">
        <span>确认密码</span>
        <el-input class="input-magin" v-model="userObj.aPassword" placeholder="请再输入密码"></el-input>
      </div>

      <div class="input-box">
        <span>邮箱</span>
        <el-input class="input-magin" v-model="userObj.email" placeholder="请输入邮箱"></el-input>
      </div>

      <el-button type="primary" @click="addUser(userObj)" round>新增</el-button>

      <div class="input-box del-box">
        <span>用户名</span>
        <el-input class="input-magin" v-model="delObj.name" placeholder="请输入用户名"></el-input>
      </div>

      <el-button type="primary" @click="delUser(delObj)" round>删除</el-button>
    </div>
  </div>
</template>

<script>
import { getCurrentInstance, onMounted, reactive, toRefs } from 'vue'
import { ElMessage } from 'element-plus'
import { loginOut, getIcon } from '../../../assets/js/common'
import jwt_decode from "jwt-decode";

export default {
  setup () {
    const { proxy } = getCurrentInstance()
    const API = proxy.$API

    const state = reactive({
      changeUserObj: {
        // 用户名
        name: '',
        // 原密码
        password: '',
        // 邮箱
        email: '',
        // 新密码
        nPassword: '',
        // 确认新密码
        aNPassword: ''
      },
      userObj: {
        // 用户名
        name: '',
        // 密码
        password: '',
        // 邮箱
        email: '',
        // 确认密码
        aPassword: ''
      },
      delObj: {
        // 用户名
        name: '',
      },
      /**
       * @description: 修改用户
       * @param {object} changeUserObj
       * @return {*}
       */
      changeUser: (changeUserObj) => {
        let emptyFlag = false

        for (let i in changeUserObj) {
          if (!changeUserObj[i]) {
            emptyFlag = true
          }
        }

        if (!emptyFlag) {
          if (changeUserObj.nPassword === changeUserObj.aNPassword) {
            proxy.$http.post(`${API}api/users/changeUser`, {
              name: changeUserObj.name,
              password: changeUserObj.password,
              email: changeUserObj.email,
              nPassword: changeUserObj.nPassword
            }).then((res) => {
              if(res.data.errors) {
                let { errors } = res.data
                let errorMsg = ''

                for (let i in errors) {
                  errorMsg += errors[i]
                }

                ElMessage.warning(errorMsg)
              } else if (!res.data.status) {
                ElMessage.warning(res.data.msg)
              } else {
                ElMessage.success(`修改用户${res.data.name}成功！`)

                for (let i in changeUserObj) {
                  changeUserObj[i] = ''
                }

                let token = proxy.$cookie.getCookie("login_SKU_cookies")
                const decoded = jwt_decode(token)

                if (decoded.name === res.data.name) {
                  state.nowGetOut()
                }
              }
            })
          } else if (changeUserObj.nPassword === changeUserObj.password) {
            ElMessage.warning('新旧密码不能相同')
          } else {
            ElMessage.warning('两次密码必须相同')
          }
        } else {
          ElMessage.warning('请填写完整信息')
        }
      },
      /**
       * @description: 新增用户
       * @param {*} addUserObj
       * @return {*}
       */
      addUser: (addUserObj) => {
        let emptyFlag = false

        for (let i in addUserObj) {
          if (!addUserObj[i]) {
            emptyFlag = true
          }
        }

        if (!emptyFlag) {
          if (addUserObj.password === addUserObj.aPassword) {
            proxy.$http.post(`${API}api/users/register`, {
              name: addUserObj.name,
              password: addUserObj.password,
              email: addUserObj.email
            }).then((res) => {
              if(res.data.errors) {
                let { errors } = res.data
                let errorMsg = ''

                for (let i in errors) {
                  errorMsg += errors[i]
                }

                ElMessage.warning(errorMsg)
              } else {
                ElMessage.success(`新增用户${res.data.name}成功！`)

                for (let i in addUserObj) {
                  addUserObj[i] = ''
                }
              }
            })
          } else {
            ElMessage.warning('两次密码必须相同')
          }
        } else {
          ElMessage.warning('请填写完整信息')
        }
      },
      /**
       * @description: 删除用户
       * @param {*} delObj
       * @return {*}
       */
      delUser: (delObj) => {
        if (delObj.name) {
          proxy.$http.delete(`${API}api/users/delUser`, {
            data: {
              name: delObj.name
            }
          }).then((res) => {
            if (res.data.status) {
              ElMessage.success(`删除用户${res.data.res.name}成功！`)
              delObj.name = ''
            } else {
              ElMessage.error(res.data.err)
            }
          })
        } else {
          ElMessage.warning('请输入用户名')
        }
      },
      // 头像url
      iconUrl: '',
      /**
       * @description: 登出
       * @param {*}
       * @return {*}
       */
      nowGetOut: () => {
        loginOut('login_SKU_cookies')
        state.iconUrl = getIcon()
      }
    })

    onMounted(() => {
      state.iconUrl = getIcon()
    })

    return {
      ...toRefs(state),
    }
  }
}
</script>

<style lang="scss" scoped>
// 引入公共样式
@import '../../../assets/css/adminCss/adminCommon.scss';

.add-page {
  display: flex;
  justify-content: space-between;

  .content-sec {
    width: 47%;
    padding-right: 3%;
    border-right: 1px dashed #ccc;
  }
}

.md-sec {
  width: 47%;
}

.del-box {
  margin-top: 30px;
}
</style>
