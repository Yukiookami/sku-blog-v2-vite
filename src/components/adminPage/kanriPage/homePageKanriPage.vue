<!--
 * @Author: zxy
 * @Date: 2021-06-06 15:51:21
 * @LastEditTime: 2021-11-23 20:40:32
 * @FilePath: /sku-blog-vite/src/components/adminPage/kanriPage/homePageKanriPage.vue
-->
<template>
  <div>
    <el-table
      :data="tableData"
      height="880"
      border>
      <el-table-column
        prop="imgUrl"
        label="图片">
        <template #default="scope">
          <div class="image-box">
            <img :src="scope.row.coverUrl" alt="">
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="操作"
        label="操作">
        <template #default="scope">
          <el-button @click="delCover(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="up-img-box">
      <el-upload
        class="upload-demo"
        drag
        :action="`${API}api/upload/uploadFile`"
        :on-success="imgAdd"
        :before-upload="beforeAvatarUpload"
        name="file"
        multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <template #tip>
          <div class="el-upload__tip">
            上传首页图片
          </div>
        </template>
      </el-upload>
    </div>
  </div>
</template>

<script>
import { getCurrentInstance, onMounted, reactive, toRefs } from 'vue'
import { ElMessage } from 'element-plus'
import { imageRegexp } from '../../../assets/js/Regexp'

export default {
  setup () {
    const { proxy } = getCurrentInstance()
    const API = proxy.$API

    const state = reactive({
      // 文章列表
      tableData: [],
      /**
       * @description: 上传图片
       * @param {*} res
       * @return {*}
       */
      imgAdd: (res) => {
        console.log(res.url)
        proxy.$http.post(`${API}api/homePage/saveCover`, {
          coverUrl: res.url
        }).then((res) => {
          if (res.data.status) {
            ElMessage.success(`上传成功`)
            state.getAllImg()
          } else {
            ElMessage.error(res.data.err)
          }
        })
      },
      /**
       * @description: 检测上传类型是否为图片
       * @param {*}
       * @return {*}
       */
      beforeAvatarUpload: (file) => {
        const sizeFlag = file.size / 1024 / 1024 < 10

        if (imageRegexp.test(file.type) && sizeFlag) {
          return true
        } else if (!sizeFlag) {
          ElMessage.error('图片大小不能超过10MB')
          return false
        } else {
          ElMessage.error('请确认上传类型是否正确')
          return false
        }
      },
      /**
       * @description: 获取所有图片
       * @param {*}
       * @return {*}
       */
      getAllImg: () => {
        proxy.$http.get(`${API}api/homePage/getAllCover`)
          .then((res) => {
            state.tableData = res.data.list
          })
      },
      /**
       * @description: 删除指定图片
       * @param {*} row
       * @return {*}
       */
      delCover: (row) => {
        proxy.$http.delete(`${API}api/homePage/deleteCover`, {
          data: {
            id: row._id
          }
        }).then((res) => {
          if (res.data.status) {
            ElMessage.success(`删除成功`)
            state.getAllImg()
          } else {
            ElMessage.error(res.data.err)
          }
        })
      }
    })

    onMounted(() => {
      state.getAllImg()
    })

    return {
      ...toRefs(state),
      API
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/adminCss/adminCommon.scss';
// 表格图片
.image-box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  img {
    width: 30%;
  }
}

// 上传文件
.up-img-box {
  margin-top: 40px;
  display: flex;
  align-items: center;
  width: 100%;

  // 上传按钮
  .up-button {
    margin-left: 40px;
  }
}
</style>
