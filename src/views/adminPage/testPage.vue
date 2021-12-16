<!--
 * @Author: zxy
 * @Date: 2021-05-30 18:57:53
 * @LastEditTime: 2021-06-27 22:23:43
 * @FilePath: /my-blog/src/views/adminPage/testPage.vue
-->
<template>
  <div class="wrap">
    测试上传
    <div>token：</div>
    <el-input type="text" v-model="token" />
    <el-upload
      class="upload-demo"
      action="http://localhost:12138/api/upload/uploadFile"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      multiple
      name="file"
      :headers="headers"
      :limit="3"
      :on-exceed="handleExceed"
      :file-list="fileList"
    >
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>
  </div>
</template>

<script>
export default {
  data() {
    return {
      token: "",
      fileList: [],
    };
  },
  computed: {
    headers() {
      return {
        'Authorization': "Bearer "+ this.token
      }
    },
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    }
  }
};
</script>

<style lang="scss" scoped>
.wrap {
  width: 1200px;
  margin: 0 auto;
}
</style>
