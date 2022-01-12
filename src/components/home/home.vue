<template>
  <el-container style="position: absolute">
    <el-header>
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="1">处理中心</el-menu-item>
        <el-menu-item index="2">
          <el-dropdown :hide-on-click="false" @command="handleShift">
            <span class="el-dropdown-link">
              切换邮箱账号<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <template v-for="item in accountItem">
                <el-dropdown-item
                  :key="item.emailAddress"
                  command="a"
                  @click.native="handleShift1(item)"
                  >{{ item.emailAddress }}
                  {{ item.emailAddress === current ? "✔️" : "" }}</el-dropdown-item
                >
              </template>
            </el-dropdown-menu>
          </el-dropdown>
        </el-menu-item>

        <el-menu-item index="3" style="border-bottom: none">
          <search />
        </el-menu-item>
        <el-submenu index="5" class="menu-float">
          <template slot="title"
            ><i class="el-icon-user-solid"> </i> 个人信息
          </template>
          <el-menu-item index="5-1" @click="addEmailDialogFormVisible = true"
            >添加邮箱</el-menu-item
          >
          <el-menu-item
            index="5-2"
            @click="showPasswordEditDialogFormVisible = true"
            >修改密码</el-menu-item
          >
          <el-menu-item index="5-3" @click="exit">退出登录</el-menu-item>
        </el-submenu>
        <el-menu-item index="4" style="float: right; border-bottom: none">
          当前邮箱账号:{{ current }}</el-menu-item
        >
      </el-menu>
      <div class="line"></div>
    </el-header>
    <el-container direction="horizontal" style="height: auto">
      <el-aside width="150px"> <left-sidebar /></el-aside>
      <el-container style="height: auto">
        <el-main>
          <router-view />

          <el-dialog
            title="添加邮箱"
            :visible.sync="addEmailDialogFormVisible"
            :close-on-click-modal="false"
            width="35%"
            @close="dialogClose"
            center
          >
            <el-form
              class="demo-form-inline"
              :inline="true"
              :model="addEmailForm"
              label-width="100px"
              size="medium"
              ref="AddEmailForm"
              :rules="rules"
            >
              <div v-if="active == 1">
                <el-form-item
                  prop="email"
                  label="邮箱"
                  :rules="[
                    {
                      required: true,
                      message: '请输入邮箱地址',
                      trigger: 'blur',
                    },
                    {
                      type: 'email',
                      message: '请输入正确的邮箱地址',
                      trigger: ['blur', 'change'],
                    },
                  ]"
                >
                  <el-input
                    @input="onUpload('account', addEmailForm.email)"
                    v-model.trim="addEmailForm.email"
                    style="width: 200px"
                  ></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                  <el-input
                    @input="onUpload('password', addEmailForm.password)"
                    type="password"
                    v-model.trim="addEmailForm.password"
                    style="width: 200px"
                  ></el-input>
                </el-form-item>
                <el-form-item label="账户类型" prop="type">
                  <el-radio-group v-model="addEmailForm.type">
                    <el-radio label="POP"></el-radio>
                    <el-radio label="IMAP"></el-radio>
                  </el-radio-group>
                </el-form-item>
              </div>

              <el-collapse>
                <el-collapse-item title="接收邮件" name="1" v-if="active == 2">
                  <el-form
                    v-if="active == 2"
                    :model="recieveForm"
                    :rules="rulesRecieve"
                    ref="RecieveForm"
                  >
                    <el-form-item label="服务器" prop="host">
                      <el-input v-model.trim="recieveForm.host"></el-input>
                    </el-form-item>
                    <el-form-item label="端口" prop="port">
                      <el-input v-model.trim="recieveForm.port"></el-input>
                    </el-form-item>
                  </el-form>
                </el-collapse-item>
                <el-collapse-item title="待发邮件" name="2" v-if="active == 2">
                  <el-form
                    v-if="active == 2"
                    :model="sendForm"
                    :rules="rulesSend"
                    ref="SendForm"
                  >
                    <el-form-item label="服务器" prop="host">
                      <el-input v-model.trim="sendForm.host"></el-input>
                    </el-form-item>
                    <el-form-item label="端口" prop="port">
                      <el-input v-model.trim="sendForm.port"></el-input>
                    </el-form-item>
                  </el-form>
                </el-collapse-item>
              </el-collapse>

              <el-form-item style="float: right">
                <el-button
                  style="
                    margin-top: 12px;
                    font-size: 5px;
                    margin-right: 12px;
                    padding: 10px;
                  "
                  @click="next"
                  v-if="active == 1"
                  >下一步</el-button
                >
              </el-form-item>
              <el-form-item>
                <el-button
                  style="
                    margin-top: 12px;
                    font-size: 5px;
                    margin-right: 12px;
                    padding: 10px;
                  "
                  @click="pre"
                  v-if="active == 2"
                  >上一步</el-button
                >
              </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer" v-if="active == 2">
              <el-button type="primary" @click="handleAddEmail"
                >确 定</el-button
              >
              <el-button @click="addEmailDialogFormVisible = false"
                >取 消</el-button
              >
            </div>
          </el-dialog>
          <el-dialog
            title="修改密码"
            :visible.sync="showPasswordEditDialogFormVisible"
            :close-on-click-modal="false"
            width="35%"
            @close="dialogClose"
            center
          >
            <el-form
              status-icon
              class="demo-form-inline"
              :inline="true"
              label-width="80px"
              size="medium"
              :model="editPasswordForm"
              ref="EditPasswordForm"
              :rules="ruleEdit"
            >
              <el-form-item label="新密码" prop="password">
                <el-input
                  type="password"
                  v-model.trim="editPasswordForm.password"
                ></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="checkPass">
                <el-input
                  type="password"
                  v-model.trim="editPasswordForm.checkPass"
                ></el-input>
              </el-form-item>

              <el-form-item style="margin-left: 85px">
                <el-button
                  type="primary"
                  @click.native.prevent="handleEditPassword('EditPasswordForm')"
                  >确定</el-button
                >

                <el-button type="primary" @click="showPasswordEditDialogFormVisible = false">取消</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>
        </el-main>

        <el-footer>Footer</el-footer>
      </el-container>
      <el-aside width="63px;"><right-sidebar /></el-aside>
    </el-container>
  </el-container>
</template>

<script>
//导入api和axios

import axios from 'axios'
import qs from 'qs'
import { mapState } from 'vuex'
import { authSendServer, authReceiveServer, userEditPassword } from '../../api/api'
import Search from '../header/search.vue';
import LeftSidebar from './leftSidebar.vue';
import RightSidebar from './rightSidebar.vue';

//axios参数包
export default {
  components: { LeftSidebar, Search, RightSidebar, },
  name: 'Home',
  props: {},
  created() {//实例完成之后的钩子函数
    //在页面加载时读取localStorage里的状态信息
    if (localStorage.getItem('accountList')) {
      this.$store.commit('SET_ACCOUNT_LIST', JSON.parse(localStorage.getItem('accountList')))
    }
     window.addEventListener('beforeunload', () => {
      localStorage.setItem('accountList', JSON.stringify(this.home.accountList))

    })
    this.accountItem=JSON.parse(localStorage.getItem('accountList'))
  },
  data() {
    var validatePass3 = (rule, value, callback) => {
      //console.log(value)
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.editPasswordForm.password) {

        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      current: 'hyacinth_1@sina.cn',
      active: 1,
      activeIndex: '1',
      activeIndex2: '1',
      addEmailDialogFormVisible: false,
      showPasswordEditDialogFormVisible: false,
      addEmailForm: {
        email: '',
        password: '',
        type: '',
        authCode: ''
      },
      recieveForm: {
        host: '',
        port: '',
      },
      sendForm: {
        host: '',
        port: '',
      },
      accountItem: [
        {
          emailAddress: '17347064540@163.com'
        },
        {
          emailAddress: 'hyacinth_1@sina.cn'
        },

      ],
      editPasswordForm: {
        password: '',
        checkPass: '',
      },
      formLabelWidth: '120px',
      rules: {
        password: [
          { required: true, message: '请输入邮箱密码', trigger: 'blur' }

        ],
        type: [
          { required: true, message: '账户类型未勾选', trigger: 'blur' }
        ]
      },
      rulesRecieve: {
        host: [
          { required: true, message: '接收服务器不能为空', trigger: 'blur' }
        ],
        port: [
          { required: true, message: '接收端口不能为空', trigger: 'blur' }
        ]
      },
      rulesSend: {
        host: [
          { required: true, message: '发送服务器不能为空', trigger: 'blur' }
        ],
        port: [
          { required: true, message: '发送端口', trigger: 'blur' }
        ]
      },
      ruleEdit: {
        password: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ],
        checkPass: [
          { required: true, validator: validatePass3, trigger: 'blur' }
        ],
      }
    }
  },
  computed: {
    ...mapState(['home']),
  },
  mounted: function () {

  },
  methods: {
    //退出系统
    exit() {
      //退出登录，清空token
      localStorage.removeItem('accessToken');
      this.$router.push('/login');
    },
    onUpload(key, value) {
      var obj = {}
      obj[key] = value
      this.$store.dispatch('updateEmail', obj)
      //console.log(obj)

    },
    //重置表单
    resetForm(formName) {
      // console.log(this.addEmailform.email)
      this.$nextTick(() => {
        this.$refs[formName].resetFields();
      })
    },
    //对话框关闭
    dialogClose() {
      this.$nextTick(() => {
        if (this.$refs['AddEmailForm'] !== undefined) this.$refs['AddEmailForm'].resetFields();
        // console.log(this.$refs['AddEmailForm'])
        this.addEmailForm = this.$options.data().addEmailForm
        if (this.$refs['RecieveForm'] !== undefined) this.$refs['RecieveForm'].resetFields();
        if (this.$refs['SendForm'] !== undefined) this.$refs['SendForm'].resetFields();
      })
      this.active = 1;
    },

    //处理导航栏选择
    handleSelect(key, keyPath) {
      //console.log(key, keyPath);
    },
    next() {
      // console.log(this.addEmailform.type)
      this.$refs.AddEmailForm.validate((valid) => {
        if (valid) {
          // console.log('验证成功')
          let params = {
            emailAddress: this.addEmailForm.email,
            emailPassword: this.addEmailForm.password,
            receiveProtocol: this.addEmailForm.type
          }
          const loading = this.$loading({
            lock: true,
            text: '连接中',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          authSendServer(params).then(data => {
            if (data.code === 200) {

              loading.text = '连接成功';
              let obj = data.email;
              this.recieveForm.host = obj.receiveHost;
              this.recieveForm.port = obj.receivePort;
              this.sendForm.host = obj.sendHost;
              this.sendForm.port = '25';
              setTimeout(() => {



                loading.close();
              }, 500);
              if (this.active++ > 1) this.active = 1;
            }
            else {
              setTimeout(() => {
                loading.text = '连接失败';
                loading.close();
              }, 1000);
            }

          }

          )



        }

      })

    },
    pre() {
      if (this.active-- < 0) this.active = 1;
    },
    handleAddEmail() {
      console.log('添加邮箱')
      let params = {
        userId: sessionStorage.getItem('accessToken'),
        emailAddress: this.addEmailForm.email,
        emailPassword: this.addEmailForm.password,
        receiveProtocol: this.addEmailForm.type === 'POP' ? 'pop3' : 'imap',
        sendHost: this.sendForm.host,
        receiveHost: this.recieveForm.host,
        receivePort: this.recieveForm.port,
      }
      console.log(params)
      authReceiveServer(params).then(data => {
        if (data.code === 200) {
          this.$message({
            message: data.msg,
            type: 'success',

          })
          this.addEmailDialogFormVisible = false;
        }
        else {
          this.$message({
            message: data.msg,
            type: 'error',

          })
        }
      })
    },
    //处理邮箱账号切换
    handleShift(command) {
      console.log('处理邮箱账号切换' + command)
    },
    handleShift1(key) {
      this.current = key.emailAddress;
      // console.log('处理邮箱账号切换'+key.value)
    },
    handleEditPassword(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = {
            password: this.editPasswordForm.password
          }
          userEditPassword(params).then(data => {
            if (data.code === 200) {
              this.$message({
                message: data.msg,
                type: 'success',
              })
              this.showPasswordEditDialogFormVisible = false
            } else {
              this.$message({
                message: data.msg,
                type: 'error',
              })
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
      // console.log('重置密码')
    },
  },


}
</script>

<style scoped>
#app,
html,
body,
.el-container {
  height: 100%;
  width: 100%;
}
.el-aside {
  height: 100%;
}
.menu-float {
  float: right;
  margin-right: 30px；;
}
.menu-float1 {
  margin-right: 10px !important;
}
.hiddenItem {
  visibility: hidden;
}
</style>
