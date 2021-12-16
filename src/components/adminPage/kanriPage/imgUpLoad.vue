<!--
 * @Author: zxy
 * @Date: 2021-06-26 14:58:55
 * @LastEditTime: 2021-11-23 20:40:42
 * @FilePath: /sku-blog-vite/src/components/adminPage/kanriPage/imgUpLoad.vue
-->
<template>
  <div>
    <div class="up-img-box">
      <el-upload
        class="upload-demo"
        drag
        :action="`${API}api/upload/uploadFile`"
        :on-success="showUrl"
        name="file"
        :before-upload="beforeAvatarUpload"
        multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <template #tip>
          <div class="el-upload__tip">
            上传图片获得链接
          </div>
        </template>
      </el-upload>
    </div>

    <el-divider></el-divider>

    <span>
      {{imgUrl}}
    </span>
  </div>
</template>

<script>
import { getCurrentInstance, reactive, toRefs } from 'vue'
import { ElMessage } from 'element-plus'
import { imageRegexp } from '../../../assets/js/Regexp'

export default {
  setup () {
    const { proxy } = getCurrentInstance()
    const API = proxy.$API

    const state = reactive({
      imgUrl: '',
      showUrl: (res) => {
        state.imgUrl = res.url
        ElMessage.success('上传成功')
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
      }
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

