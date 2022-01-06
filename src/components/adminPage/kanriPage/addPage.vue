<!--
 * @Author: zxy
 * @Date: 2021-06-06 15:50:41
 * @LastEditTime: 2022-01-06 14:11:16
 * @FilePath: /sku-blog-vite/src/components/adminPage/kanriPage/addPage.vue
-->
<template>
<div class="main-page">
  <div class="add-page">
    <div class="content-sec">
      <div class="input-box">
        <span>标题</span>
        <div class="title-box">
          <el-input class="input-magin" v-model="contentObj.title" placeholder="请输入标题"></el-input>

          <el-switch v-model="contentObj.isTop" active-text="置顶文章" inactive-text="取消置顶"></el-switch>
        </div>
      </div>

      <div class="input-box">
        <span>作者</span>
        <div class="title-box">
          <el-input class="input-magin" v-model="contentObj.sakusya" placeholder="请输入作者"></el-input>

          <el-radio-group v-model="contentObj.contentType">
            <el-radio-button label="program">编程</el-radio-button>
            <el-radio-button label="japanese">日语</el-radio-button>
            <el-radio-button label="component">组件</el-radio-button>
          </el-radio-group>
        </div>
      </div>

      <div class="input-box">
        <span>标签</span>
        <el-input class="input-magin" v-model="contentObj.tag" placeholder="请输入标签"></el-input>
      </div>

      <div class="title-box type-box">
        <span>类型</span>
        <el-select v-model="contentObj.typeClass" placeholder="请选择">
          <template v-for="(item, index) in typeClassList" :key="`typeList${index}`">
            <el-option v-if="item.contentType === contentObj.contentType"
              :label="item.typeName"
              :value="item.typeName">
            </el-option>
          </template>
        </el-select>
      </div>

      <el-input
        type="textarea"
        :autosize="{ minRows: 7, maxRows: 7}"
        placeholder="请输入简介"
        v-model="contentObj.content">
      </el-input>

      <div class="up-img-box">
        <!-- <el-upload
          class="upload-demo"
          drag
          :action="`${API}api/upload/uploadFile`"
          :on-success="mdAdd"
          :before-upload="beforeAvatarUpload"
          name="file"
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <template #tip>
            <div class="el-upload__tip">
              上传markdown文件
            </div>
          </template>
        </el-upload> -->

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
              上传文章封面图片
            </div>
          </template>
        </el-upload>

        <div class="cover-img">
          <img :src="contentObj.coverImg" alt="">
        </div>
      </div>
    </div>

    <div class="md-sec">
      <div class="input-box">
        <span>タイトル</span>
        <div class="title-box">
          <el-input class="input-magin" v-model="contentObjJP.title" placeholder="タイトルを入力してください"></el-input>
        </div>
      </div>

      <div class="input-box">
        <span>作者</span>
        <div class="title-box">
          <el-input class="input-magin" v-model="contentObjJP.sakusya" placeholder="作者を入力してください"></el-input>
        </div>
      </div>

      <div class="input-box">
        <span>タグ</span>
        <el-input class="input-magin" v-model="contentObjJP.tag" placeholder="タグを入力してください"></el-input>
      </div>

      <div class="title-box type-box">
        <span>タイプ</span>
        <el-select v-model="contentObjJP.typeClass" placeholder="選択してください">
          <template v-for="(item, index) in typeClassListJP" :key="`typeList${index}`">
            <el-option v-if="item.contentType === contentObj.contentType"
              :label="item.typeName"
              :value="item.typeName">
            </el-option>
          </template>
        </el-select>
      </div>

      <el-input
        type="textarea"
        :autosize="{ minRows: 7, maxRows: 7}"
        placeholder="前書きを入力してください"
        v-model="contentObjJP.content">
      </el-input>

      <div class="up-img-box">
        <el-upload
          class="upload-demo"
          drag
          :action="`${API}api/upload/uploadFile`"
          :on-success="showUrl"
          name="file"
          :before-upload="beforeAvatarUploadImage"
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
  </div>

  <div class="md-box">
    <div class="flex-bw-box">
      <el-radio-group v-model="mdContentType" class="choose-button">
        <el-radio-button label="chinese">中文</el-radio-button>
        <el-radio-button label="japanese">日本語</el-radio-button>
      </el-radio-group>

      <el-button type="primary" @click="upMdData" v-if="!isChange" round>新增</el-button>
      <el-button type="success" @click="changeMdData(isChange)" v-else round>修改</el-button>
    </div>
    <v-md-editor
      v-if="mdContentType === 'chinese'"
      @save="saveMd"
      v-model="contentObj.markdownContent"
      height="100vh"></v-md-editor>

    <v-md-editor
      v-else
      @save="saveMdJa"
      v-model="contentObjJP.markdownContent"
      height="100vh"></v-md-editor>
  </div>
</div>
</template>

<script>
import { computed, getCurrentInstance, onMounted, reactive, toRefs } from 'vue'
import { ElMessage } from 'element-plus'
import { imageRegexp } from '../../../assets/js/Regexp'
import Base64 from '../../../assets/js/base64'
import { useRoute } from 'vue-router'
import { initNowTime } from '../../../assets/js/common'

export default {
  setup () {
    const { proxy } = getCurrentInstance()
    const API = proxy.$API
    const route = useRoute()

    const state = reactive({
      // 页面为修改还是新增
      isChange: '',
      // 获得图片链接
      imgUrl: '',
      // md类型
      mdContentType: 'chinese',
      // 分类数组
      typeClassList: [],
      typeClassListJP: [],
      // 中文文章信息
      contentObj: {
        // 文章标题
        title: '',
        // 作者
        sakusya: 'skuZxy',
        // 标签分类
        tag: '',
        // 文章内容
        content: '',
        // 是否置顶
        isTop: false,
        // 文章类型（属于哪一种页面）
        contentType: 'program',
        // 封面图片
        coverImg: '',
        // md内容
        markdownContent: '',
        // 语言
        lange: 'cn',
        // 文章所属大类
        typeClass: ''
      },
      // 日语文章信息
      contentObjJP: {
        // 文章标题
        title: '',
        // 作者
        sakusya: 'skuZxy',
        // 标签分类
        tag: '',
        // 文章内容
        content: '',
        // 是否置顶
        isTop: computed(() => state.contentObj.isTop),
        // 文章类型（属于哪一种页面）
        contentType: computed(() => state.contentObj.contentType),
        // 封面图片
        coverImg: computed(() => state.contentObj.coverImg),
        // md内容
        markdownContent: '',
        // 语言
        lange: 'ja',
        // 文章所属大类
        typeClass: ''
      },
      /**
       * @description: 检测上传类型是否为markdown
       * @param {*}
       * @return {*}
       */
      beforeAvatarUpload: (file) => {
        if (file.type === 'text/markdown') {
          return true
        } else {
          ElMessage.error('请确认上传类型是否正确')
          return false
        }
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
       * @description: 上传markdown
       * @param {*}
       * @return {*}
       */
      mdAdd: (res) => {
        let { url } = res
      },
      /**
       * @description: 上传封面图片
       * @param {*}
       * @return {*}
       */
      imgAdd: (res) => {
        let { url } = res
        state.contentObj.coverImg = url
      },
      /**
       * @description: 获得图片链接
       * @param {*}
       * @return {*}
       */
      showUrl: (res) => {
        state.imgUrl = res.url
        ElMessage.success('上传成功')
      },
      /**
       * @description: 保存markdown内容
       * @param {string} text
       * @param {string} html
       * @return {*}
       */
      saveMd: (text, html) => {
        localStorage.setItem('_mdContent', text)
        console.log(text)
        ElMessage.success('保存成功')
      },
      saveMdJa: (text, html) => {
        localStorage.setItem('_mdContentJa', text)
        ElMessage.success('保存成功')
      },
      /**
       * @description: 获得存储数据
       * @param {*}
       * @return {*}
       */
      getMd: () => {
        let text = localStorage.getItem('_mdContent')

        if (text) {
          state.contentObj.markdownContent = text
        }
      },
      getMdJa: () => {
        let text = localStorage.getItem('_mdContentJa')

        if (text) {
          state.contentObjJP.markdownContent = text
        }
      },
      /**
       * @description: 上传文章数据
       * @param {*}
       * @return {*}
       */
      upMdData: () => {
        let contentObj = state.contentObj
        let contentObjJP = state.contentObjJP

        let emptyFlag = false

        for(let i in contentObj) {
          if (contentObj[i] === '' || contentObjJP[i] === '') {
            console.log(i)
            emptyFlag = true
          }
        }

        if (!emptyFlag) {
          let nowTime = initNowTime()

          proxy.$http.post(`${API}api/content/addContent`, {
            cnContentInfo: contentObj,
            jaContentInfo: contentObjJP,
            contentType: contentObj.contentType,
            date: nowTime
          }).then((res) => {
            if (res.data.status) {
              ElMessage.success('上传成功')

              // 重置状态
              for(let i in contentObj) {
                if (i === 'isTop') {
                  contentObj[i] = false
                } else if (i === 'sakusya') {
                  contentObj[i] = 'skuZxy'
                  contentObjJP[i] = 'skuZxy'
                } else if (i === 'contentType' || i === 'lange') {
                  continue
                } else {
                  contentObj[i] = ''
                  contentObjJP[i] = ''
                }
              }

              localStorage.removeItem('_mdContent')
              localStorage.removeItem('_mdContentJa')
            } else {
              ElMessage.error(`上传失败`)
            }
          })
        } else {
          ElMessage.warning('请完整填写信息')
        }
      },
      /**
       * @description: 获取指定文章信息用于修改
       * @param {*}
       * @return {*}
       */
      getContentData: (id, contentType) => {
        proxy.$http.get(`${API}api/content/getContent?id=${id}&&contentType=${contentType}`)
          .then((res) => {
            let contentObj = state.contentObj
            let contentObjJP = state.contentObjJP
            let list = res.data.list

            for(let i in contentObj) {
              contentObj[i] = list.cnContentInfo[i]
              contentObjJP[i] = list.jaContentInfo[i]
            }
          })
      },
      /**
       * @description: 修改文章
       * @param {*}
       * @return {*}
       */
      changeMdData: (changeObj) => {
        let contentObj = state.contentObj
        let contentObjJP = state.contentObjJP

        let emptyFlag = false

        for(let i in contentObj) {
          if (contentObj[i] === '' || contentObjJP[i] === '') {
            emptyFlag = true
          }
        }

        if (!emptyFlag) {
          let nowTime = initNowTime()

          proxy.$http.put(`${API}api/content/putContent`, {
            cnContentInfo: contentObj,
            jaContentInfo: contentObjJP,
            contentType: contentObj.contentType,
            id: state.isChange.id,
            date: nowTime
          }).then((res) => {
            if (res.data.status) {
              ElMessage.success('修改成功')
            } else {
              ElMessage.error('修改失败')
            }
          })
        } else {
          ElMessage.warning('请完整填写信息')
        }
      },
    /**
     * @description: 获取typeClass
     * @param {*}
     * @return {*}
     */      
    getAllTypeClass: () => {
      proxy.$http.get(`${API}api/typeClass/getAllTypeClass`)
        .then((res) => {
          let cnList = []
          let jaList = []

          res.data.list.forEach((ele) => {
            let { cnTypeClassInfo, jaTypeClassInfo } = ele

            cnList.push(cnTypeClassInfo)
            jaList.push(jaTypeClassInfo)
          })
          
          state.typeClassList = cnList
          state.typeClassListJP = jaList
        })
    }
    })

    onMounted(() => {
      state.getMd()
      state.getMdJa()
      state.getAllTypeClass()

      if (route.query.id) {
        let id = Base64.decode(route.query.id)
        let contentType = Base64.decode(route.query.type)
        state.isChange = {
          id,
          contentType
        }

        state.getContentData(id, contentType)
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
</style>
