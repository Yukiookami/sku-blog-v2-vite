<!--
 * @Author: zxy
 * @Date: 2021-06-06 15:51:21
 * @LastEditTime: 2021-11-23 20:40:05
 * @FilePath: /sku-blog-vite/src/components/adminPage/kanriPage/appKanriPage.vue
-->
<template>
  <div>
    <div class="add-app-sec">
      <div class="text-info-sec">
        <div class="input-box">
          <span>名称</span>
          <el-input class="input-magin" v-model="appObj.appName" placeholder="请输入名称"></el-input>
        </div>

        <div class="input-box">
          <span>链接</span>
          <el-input class="input-magin" v-model="appObj.appUrl" placeholder="请输入链接"></el-input>
        </div>

        <div class="input-box">
          <span>平台</span>
          <el-select class="pla-box" v-model="appObj.appPlatform" placeholder="请选择平台">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>

      <div class="upload-box">
        <!-- icon上传 -->
        <el-upload
          class="avatar-uploader"
          :action="`${API}api/upload/uploadFile`"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUploadImage"
        >
          <img v-if="appObj.appCover" :src="appObj.appCover" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>

        <!-- 安装包上传 -->
        <el-upload
          class="upload-demo"
          :action="`${API}api/upload/uploadFile`"
          :on-success="pakUpSuc"
          multiple
          :file-list="fileList"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <template #tip>
            <div class="el-upload__tip">如果为非web平台项目请上传安装包</div>
          </template>
        </el-upload>
      </div>

      <!-- 提交 -->
      <div class="up-button">
        <el-button type="primary" @click="addApp" round v-if="!isChange">新增</el-button>
        <el-button type="success" @click="changeApp" round v-else>修改</el-button>
      </div>
    </div>

    <el-input
      placeholder="请输入内容"
      v-model="keyword"
      class="search-input"
      @keyup="search(keyword)">

      <template #append>
        <el-button icon="el-icon-search"></el-button>
      </template>

    </el-input>

    <el-table
      :data="tableData"
      height="330"
      border>
      <el-table-column
        prop="appName"
        label="名称">
      </el-table-column>
      <el-table-column
        prop="appUrl"
        label="url">
      </el-table-column>
      <el-table-column
        prop="appPackage"
        label="安装包">
      </el-table-column>
      <el-table-column
        prop="date"
        label="发布时间">
      </el-table-column>
      <el-table-column
        prop="appPlatform"
        label="平台">
      </el-table-column>
      <el-table-column
        prop="appCover"
        label="图标">
        <template #default="scope">
          <div class="image-box">
            <img :src="scope.row.appCover" alt="">
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="操作"
        label="操作">
        <template #default="scope">
          <el-button @click="deleteApp(scope.row)" type="text" size="small">删除</el-button>
          <el-button @click="getAppById(scope.row)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getCurrentInstance, reactive, toRefs } from 'vue'
import { ElMessage } from 'element-plus'
import { imageRegexp } from '../../../assets/js/Regexp'
import { timeChange } from '../../../assets/js/common'

export default {
  setup () {
    const { proxy } = getCurrentInstance()
    const API = proxy.$API

    const state = reactive({
      // 表明是修改还是新增状态
      isChange: '',
      // 应用列表
      tableData: [],
      // 平台列表
      options: [{
        value: 'Web application',
        label: 'Web application'
      }, {
        value: 'Windows application',
        label: 'Windows application'
      }, {
        value: 'Mac application',
        label: 'Mac application'
      }, {
        value: 'IOS',
        label: 'IOS'
      }, {
        value: 'Android',
        label: 'Android'
      }],
      // 添加app
      appObj: {
        // 名称
        appName: "",
        // 链接
        appUrl: '',
        // 平台
        appPlatform: 'Web application',
        // 图标
        appCover: '',
        // 包
        appPackage: ''
      },
      // 搜索关键字
      keyword: '',
      /**
       * @description: 模糊搜索
       * @param {striing} keyword
       * @return {array}
       */
      search: (keyword) => {

      },
      // 文件列表
      fileList: [],
      /**
       * @description: 图片上传成功
       * @param {*} res
       * @param {*} file
       * @return {*}
       */
      handleAvatarSuccess: (res, file) => {
        state.appObj.appCover = res.url
      },
      /**
       * @description: 检测上传类型是否为图片
       * @param {*}
       * @return {*}
       */
      beforeAvatarUploadImage: (file) => {
        const sizeFlag = file.size / 1024 / 1024 < 2

        if (imageRegexp.test(file.type) && sizeFlag) {
          return true
        } else if (!sizeFlag) {
          ElMessage.error('图片大小不能超过2MB')
          return false
        } else {
          ElMessage.error('请确认上传类型是否正确')
          return false
        }
      },
      /**
       * @description: app上传
       * @param {*}
       * @return {*}
       */      
      pakUpSuc: (res) => {
        state.appObj.appPackage = res.url
      },
      /**
       * @description: 新增app
       * @param {*}
       * @return {*}
       */
      addApp: () => {
        let addObj = state.appObj
        let emptyFlag = false

        for (let i in addObj) {
          if (!addObj[i] && i !== 'appPackage') {
            emptyFlag = true
          }
        }

        if (!emptyFlag) {
          console.log(state.appObj)
          proxy.$http.post(`${API}api/appKanri/addApp`, {
            ...addObj
          }).then((res) => {
            if (res.data.status) {
              ElMessage.success('保存成功')

              for (let i in addObj) {
                if (i !== 'appPackage') {
                  addObj[i] = ''
                }
              }

              state.getAllApp()
            }
          })
        } else {
          ElMessage.warning('请完整填写信息')
        }
      },
      /**
       * @description: 获取所有APP数据
       * @param {*}
       * @return {*}
       */      
      getAllApp: () => {
        proxy.$http.get(`${API}api/appKanri/getAllApp`)
          .then((res) => {
            let list = res.data.list
            list.forEach((ele) => {
              ele.date = timeChange(ele.date)
            })

            state.tableData = res.data.list
          })
      },
      /**
       * @description: 根据id获得app数据
       * @param {*}
       * @return {*}
       */      
      getAppById: (row) => {
        state.isChange = row._id
        proxy.$http.get(`${API}api/appKanri/getAppById?id=${row._id}`)
          .then((res) => {
            let appObj = state.appObj
            for (let i in appObj) {
              appObj[i] = res.data.data[i]
            }
          })
      },
      /**
       * @description: 根据id修改APP
       * @param {*}
       * @return {*}
       */      
      changeApp: () => {
        let addObj = state.appObj
        let emptyFlag = false

        for (let i in addObj) {
          if (!addObj[i] && i !== 'appPackage') {
            emptyFlag = true
            console.log(i)
          }
        }

        if (!emptyFlag) {
          proxy.$http.put(`${API}api/appKanri/changeAppById`, {
            id: state.isChange,
            changeObj: addObj
          }).then((res) => {
            if (res.data.status) {
              ElMessage.success('修改成功')

              for (let i in addObj) {
                if (i !== 'appPackage') {
                  addObj[i] = ''
                }
              }

              state.getAllApp()
              state.isChange = ''
            }
          })
        } else {
          ElMessage.warning('请完整填写信息')
        }
      },
      /**
       * @description: 根据id删除app
       * @param {*}
       * @return {*}
       */      
      deleteApp: (row) => {
        proxy.$http.delete(`${API}api/appKanri/deleteAppById`, {
          data: {
            id: row._id
          }
        }).then((res) => {
          if (res.data.status) {
            ElMessage.success('删除成功')
            state.getAllApp()
          } else {
            ElMessage.error('删除失败')
          }
        })
      }
    })

    state.getAllApp()

    return {
      ...toRefs(state),
      API
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/adminCss/adminCommon.scss';
// 添加应用
.add-app-sec {
  padding-bottom: 40px;
  margin-bottom: 40px;
  border-bottom: 1px dashed #ccc;

  // 添加文字信息
  .text-info-sec {
    display: flex;
    width: 100%;

    .input-box {
      width: calc(100% / 3);

      .input-magin {
        width: 80%;
      }
    }
  }

  // 上传区域
  .upload-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 50%;

    .avatar-uploader {
      font-size: 20px;
      color: #8c939d;
      width: 78px;
      height: 78px;
      line-height: 78px;
      text-align: center;
      border: 1px dashed #ccc;
    }

    .avatar {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }

  // 提交
  .up-button {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 40px;
    width: calc(100% - 40px);
  }
}


// 搜索框
.search-input {
  margin-bottom: 10px;
}

.image-box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  img {
    width: 30%;
  }
}

.pla-box {
  margin-top: 10px;
}
</style>
