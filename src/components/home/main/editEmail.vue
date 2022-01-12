<template>
  <div id="app">
    <div>
      <el-button>发送</el-button>
      <el-button>存草稿</el-button>
      <el-button>取消</el-button>
      <el-form>
        <el-form-item label="收件人" prop="username">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="主题" prop="username">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="发件人" prop="username">
          <el-input></el-input>
        </el-form-item>

        <el-form-item
          label="添加附件"
          prop="username"
          style="float: left; display: block"
        >
          <!-- <el-input ></el-input> -->

          <div>
            <el-upload class="upload-demo" :auto-upload="false">
              <el-button size="small" type="primary" style=""
                >点击上传</el-button
              >
            </el-upload>
          </div>
        </el-form-item>
      </el-form>
    </div>

    <br />
    <br />
    <br />
    <br />
    <div style=" float: left; ">
      <vue-editor
        style="height: 500px ;"
        id="editor"
        useCustomImageHandler
        @image-added="handleImageAdded"
        v-model="htmlForEditor"
      >
      </vue-editor>
       <button @click="saveContent"></button>
      <el-button style="position: relative; float: left;">发送</el-button>
    <el-button style="position: relative; float: left;">存草稿</el-button>
    <el-button style="position: relative; float: left;">取消</el-button>
    </div>
    
  </div>
</template>

<script>
// Advanced Use - Hook into Quill's API for Custom Functionality
import { VueEditor, Quill } from "vue2-editor";
import axios from "axios";
export default {
  components: {
    VueEditor
  },

  data() {
    return {
      htmlForEditor: ""
    };
  },

  methods: {
    handleImageAdded: function (file, Editor, cursorLocation, resetUploader) {
      // An example of using FormData
      // NOTE: Your key could be different such as:
      // formData.append('file', file)

      var formData = new FormData();
      formData.append("image", file);

      axios({
        url: "https://fakeapi.yoursite.com/images",
        method: "POST",
        data: formData
      })
        .then(result => {
          let url = result.data.url; // Get url from response
          Editor.insertEmbed(cursorLocation, "image", url);
          resetUploader();
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
