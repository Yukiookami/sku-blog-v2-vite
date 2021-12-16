<!--
 * @Author: zxy
 * @Date: 2021-07-01 14:44:51
 * @LastEditTime: 2021-11-23 20:40:50
 * @FilePath: /sku-blog-vite/src/components/adminPage/kanriPage/typeClassKanri.vue
-->
<template>
<div class="main-page">
  <div class="add-page">
    <div class="content-sec">

      <div class="input-box">
        <span>类型名称</span>
        <div class="title-box">
          <el-input class="input-magin" v-model="typeClassObj.typeName" placeholder="请输入标签"></el-input>

          <el-radio-group v-model="typeClassObj.contentType">
            <el-radio-button label="program">编程</el-radio-button>
            <el-radio-button label="japanese">日语</el-radio-button>
            <el-radio-button label="component">组件</el-radio-button>
          </el-radio-group>
        </div>
      </div>

      <div class="up-img-box">
        <el-upload
          class="upload-demo"
          drag
          :action="`${API}api/upload/uploadFile`"
          :on-success="imgAdd"
          name="file"
          :before-upload="beforeAvatarUploadImage"
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <template #tip>
            <div class="el-upload__tip">
              上传类型图标
            </div>
          </template>
        </el-upload>

        <div class="cover-img icon-box">
          <img :src="typeClassObj.typeIcon" alt="">
        </div>
      </div>
    </div>

    <div class="md-sec">
      <div class="input-box">
        <span>タイプネーム</span>
        <el-input class="input-magin" v-model="typeClassObjJP.typeName" placeholder="タグを入力してください"></el-input>
      </div>

      <div class="up-img-box">
        <el-upload
          class="upload-demo"
          drag
          :action="`${API}api/upload/uploadFile`"
          :on-success="coverAdd"
          name="file"
          :before-upload="beforeAvatarUploadImage"
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <template #tip>
            <div class="el-upload__tip">
              上传类型封面
            </div>
          </template>
        </el-upload>

        <div class="cover-img">
          <img :src="typeClassObj.typeCover" alt="">
        </div>
      </div>
    </div>
  </div>

  <div class="md-box">
    <div class="flex-bw-box">
      <el-radio-group v-model="mdContentType" class="choose-button">
        <el-radio-button label="chinese">中文</el-radio-button>
        <el-radio-button label="japanese">日本語</el-radio-button>
      </el-radio-group>

      <el-button type="primary" @click="addTypeClass" round>新增</el-button>
    </div>

    <el-table
      :data="typeClassList"
      height="100vh"
      border>
      <el-table-column
        prop="cnTypeClassInfo.typeName"
        label="类型名称">
      </el-table-column>
      <el-table-column
        prop="jaTypeClassInfo.typeName"
        label="タイプネーム">
      </el-table-column>
      <el-table-column
        prop="jaTypeClassInfo.contentType"
        label="所属文章类型">
      </el-table-column>
      <el-table-column
        prop="cnTypeClassInfo.typeIcon"
        label="类型icon">
        <template #default="scope">
          <div class="image-box icon-box">
            <img :src="scope.row.cnTypeClassInfo.typeIcon" alt="">
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="cnTypeClassInfo.typeCover"
        label="类型cover">
        <template #default="scope">
          <div class="image-box">
            <img :src="scope.row.cnTypeClassInfo.typeCover" alt="">
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="操作"
        label="操作">
        <template #default="scope">
          <el-button @click="sureDel(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</div>
</template>

<script>
import { computed, getCurrentInstance, onMounted, reactive, toRefs } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { imageRegexp } from '../../../assets/js/Regexp'
import Base64 from '../../../assets/js/base64'
import { useRoute } from 'vue-router'

export default {
  setup () {
    const { proxy } = getCurrentInstance()
    const API = proxy.$API

    const state = reactive({
      // 获得图片链接
      imgUrl: '',
      // md类型
      mdContentType: 'chinese',
      // 分类数组
      typeClassList: [],
      // 中文类型信息
      typeClassObj: {
        // 类型名称
        typeName: '',
        // 类型icon
        typeIcon: '',
        // 类型背景图
        typeCover: '',
        // 所属文章类型
        contentType: 'program'
      },
      // 日语类型信息
      typeClassObjJP: {
        // 类型名称
        typeName: '',
        // 类型icon
        typeIcon: computed(() => state.typeClassObj.typeIcon),
        // 类型背景图
        typeCover: computed(() => state.typeClassObj.typeCover),
        // 所属文章类型
        contentType: computed(() => state.typeClassObj.contentType)
      },
      /**
       * @description: 检测上传类型是否为图片
       * @param {*}
       * @return {*}
       */
      beforeAvatarUploadImage: (file) => {
        const sizeFlag = file.size / 1024 / 1024 < 2

        if (file.type==='image/svg+xml' || imageRegexp.test(file.type) && sizeFlag) {
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
       * @description: 上传封面图片
       * @param {*}
       * @return {*}
       */
      imgAdd: (res) => {
        let { url } = res
        state.typeClassObj.typeIcon = url
      },
      /**
       * @description: 上传封面图片
       * @param {*}
       * @return {*}
       */
      coverAdd: (res) => {
        let { url } = res
        state.typeClassObj.typeCover = url
      },
      /**
       * @description: 新增typeClass 
       * @param {*}
       * @return {*}
       */
      addTypeClass: () => {
        let typeClassObj = state.typeClassObj
        let typeClassObjJP = state.typeClassObjJP

        let emptyFlag = false

        for(let i in typeClassObj) {
          if (typeClassObj[i] === '' || typeClassObjJP[i] === '') {
            console.log(i)
            emptyFlag = true
          }
        }

        if (!emptyFlag) {
          proxy.$http.post(`${API}api/typeClass/addTypeClass`, {
            typeClassObj,
            typeClassObjJP
          }).then((res) => {
            if(res.status) {
              for(let i in typeClassObj) {
                if (i !== 'contentType') {
                  typeClassObjJP[i] = ''
                  typeClassObj[i] = ''
                }
              } 

              ElMessage.success('上传成功')
              state.getAllTypeClass()
            } else {
              ElMessage.error('上传失败')
            }
          })
        } else {
          ElMessage.warning('请完整填写信息')
        }
      },
      /**
       * @description: 获得所有typeClass
       * @param {*}
       * @return {*}
       */      
      getAllTypeClass: () => {
        proxy.$http.get(`${API}api/typeClass/getAllTypeClass`)
          .then((res) => {
            state.typeClassList = res.data.list
          })
      },
      /**
       * @description: 删除typeClass
       * @param {*} row
       * @return {*}
       */      
      delContent: (row) => {
        proxy.$http.delete(`${API}api/typeClass/deleteTypeClass`, {
          data: {
            id: row._id,
          }
        }).then((res) => {
          if (res.status) {
            state.getAllTypeClass()
            ElMessage.success('删除成功')
          } else {
            ElMessage.error('删除失败')
          }
        })
      },
      /**
       * @description: 确认是否删除文件
       * @param {*} row
       * @return {*}
       */
      sureDel: (row) => {
        ElMessageBox.confirm('此操作将永久删除该类型, 并且该类型下的文章将无法显示, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          state.delContent(row)
        }).catch(() => {
          ElMessage.warning('操作已取消')
        });
      },
    })

    onMounted(() => {
      state.getAllTypeClass()
    })

    return {
      ...toRefs(state),
      API
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

.up-img-box {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  .cover-img {
    width: 50%;

    img {
      width: 100%;
    }
  }
}

.title-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.md-box {
  margin-top: 30px;

  .flex-bw-box {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 20px;
  }
}

.type-box {
  margin-bottom: 20px;
}

.image-box {
  width: 100%;

  img {
    width: 100%;
  }
}

.icon-box {
  width: 30px !important;
}
</style>
