
<template>
  <div>
    <div>
      <!-- <img src="../../assets/logo.png" style="margin-left: -49px"> -->
    </div>
    <!-- 注册对话框 -->
    <el-dialog
      title="注册"
      :visible.sync="showRegisterDialog"
      :close-on-click-modal="false"
      width="30%"
      center
      before-close="resetForm('ruleForm')"
    >
      <!-- <span>注册</span> -->
      <span slot="footer" class="dialog-footer">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          size="medium"
          label-width="80px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="checkName">
            <el-input
              v-model.trim="ruleForm.checkName"
              style="width: 200px"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input
              type="password"
              v-model.trim="ruleForm.pass"
              autocomplete="off"
              style="width: 200px"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input
              type="password"
              v-model.trim="ruleForm.checkPass"
              autocomplete="off"
              style="width: 200px"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >提交</el-button
            >
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </span>
    </el-dialog>
    <!-- 登录表单 -->
    <el-form
      :model="account"
      label-width="100px"
      class="demo-ruleForm loginContainer"
      label-position="left"
      :rules="rules"
      ref="AccountForm"
      @submit.native.prevent
    >
      <h3 style="margin-left: 20%">登录</h3>
      <el-form-item label="用户名" prop="username">
        <el-input v-model.trim="account.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pwd">
        <el-input
          v-model.trim="account.pwd"
          auto-complete="off"
          type="password"
        ></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-checkbox
          label="记住密码"
          v-model="checked"
          style="float: right"
        ></el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          native-type="submit"
          @click.native.prevent="handleLogin"
          >登录</el-button
        >
        <el-button type="primary" @click="showRegisterDialog = true"
          >注册</el-button
        >
      </el-form-item>
      <!-- <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item> -->
      <el-link
        type="primary"
        style="margin-left: 100px"
        @click="showResetDialog = true"
      >
        已有账号，忘记密码？</el-link
      >
    </el-form>
    <!-- 重置密码对话框 -->
    <el-dialog
      title="重置密码"
      :visible.sync="showResetDialog"
      :close-on-click-modal="false"
      @close="resetForm('ResetPasswordForm')"
      width="30%"
      center
    >
      <el-form
        status-icon
        class="demo-form-inline"
        :inline="true"
        label-width="80px"
        size="medium"
        :model="resetPasswordForm"
        ref="ResetPasswordForm"
        :rules="ruleReset"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model.trim="resetPasswordForm.username"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="password">
          <el-input
            type="password"
            v-model.trim="resetPasswordForm.password"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            type="password"
            v-model.trim="resetPasswordForm.checkPass"
          ></el-input>
        </el-form-item>
        <el-form-item label="验证邮箱" prop="email">
          <el-select
            placeholder="选择验证邮箱"
            v-model="resetPasswordForm.email"
            @change="handleChange"
          >
            <el-option
              v-for="item in emailItem"
              :key="item.emailId"
              :label="item.emailAddress"
              :value="item.emailAddress"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="验证码" prop="authCode">
          <el-input
            style="width: 100px"
            v-model.trim="resetPasswordForm.authCode"
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="small"
            @click="run"
            :disabled="this.disabled"
          >
            {{ tipText }}</el-button
          >
        </el-form-item>

        <el-form-item style="margin-left: 85px">
          <el-button
            type="primary"
            @click="handleResetPassword('ResetPasswordForm')"
            >确定</el-button
          >
          <el-button type="primary" @click="showResetDialog = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
/* eslint-disable */
import { mapMutations, mapState, mapGetters } from "vuex";
import AuthCode from '.././AuthCode';
import { requestLogin, checkUsername, RegisterUser, getEmailAddressList, getAuthCode, confirmResetPassword, getEmailList, getEmailAccounts } from "../../api/api";

export default {
  name: 'Login',
  props: {},
  components: { AuthCode },
  data() {

    var validateName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空'));
      }
      else {
        let params = {
          checkName: this.ruleForm.checkName
        }
        checkUsername(params).then(
          data => {
            if (data.msg == "exist") {
              callback(new Error('该用户名已被注册'));
            }
            else {
              //console.log(data.msg)
              callback();
            }
          }
        )
      }

    };
    var validateName2 = (rule, value, callback) => {
      this.emailItem = null;
      if (!value) {
        return callback(new Error('用户名不能为空'));
      }
      else {
        let params = {
          username: this.resetPasswordForm.username
        }
        getEmailAddressList(params).then(
          data => {
            if (data.code === 200) {
              // callback(new Error('该用户名已被注册'));    
              this.emailItem = (JSON.parse(JSON.stringify(data.list)));
              // console.log(JSON.parse(JSON.stringify(data.list)))
              // console.log(this.emailItem.emailId)
              callback();
            }
            else {
              // console.log(data.msg)
              callback(new Error(data.msg));
            }
          }
        )

      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {

          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {

        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    var validatePass3 = (rule, value, callback) => {
      //console.log(value)
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.resetPasswordForm.password) {

        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      emailItem: [{

      }],
      ruleForm: {
        pass: '',
        checkPass: '',
        checkName: ''
      },
      resetPasswordForm: {
        username: '',
        password: '',
        checkPass: '',
        email: '',
        authCode: ''
      },
      tipText: '获取验证码',
      time: 60,
      disabled: false,
      showRegisterDialog: false,
      showResetDialog: false,
      account: {
        username: '',
        pwd: '',
      },
      checked: true,
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        checkName: [
          { validator: validateName, trigger: 'blur' }
        ],
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ],
        pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ],
      },
      ruleReset: {
        username: [
          { required: true, validator: validateName2, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ],
        checkPass: [
          { required: true, validator: validatePass3, trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请选择验证邮箱', trigger: 'change' }
        ],
        authCode: [
          { required: true, message: '验证码不能为空', trigger: 'blur' }
        ],
      }
    }
  },
  computed: {
    ...mapState(['emailList', 'home']),
    ...mapGetters({
      emailList: 'getEmailList'
    }),
    // ...mapState(['emailList']),

    // List: {
    //   get() {

    //     return this.emailList.list

    //   }
    // }
  },
  watch: {

  },

  methods: {


    ...mapMutations(['changeLogin']),
    //对用户身份进行验证，成功跳转到home.vue
    handleLogin: function () {

      this.$refs.AccountForm.validate((valid) => {
        if (valid) {//校验成功//validate校验成功
          let params = {//设置参数变量，用户名+密码
            username: this.account.username,
            password: this.account.pwd
          };

          requestLogin(params).then(data => {//登录请求
            //console.log(data);
            let vm = this;//声明一个变量指向父函数的this
            if (data.code === 200) {
              localStorage.setItem('accessToken', data.token);//设置token
              localStorage.setItem('accountList', JSON.stringify(data.list))//存储邮箱账户列表
              vm.$router.push({ path: '/home' }); //路由跳转到主页
              this.changeLogin({ Authorization: data.token })

              console.log(localStorage.getItem('accountList'))//控制台输出，检查是否存储成功
              getEmailList({ emailAddress: JSON.parse(localStorage.getItem('accountList'))[0].emailAddress }).then(res => {
                // console.log(JSON.stringify(res.list))
                this.$store.commit('SET_EMAIL_LIST', res.list);
                //  console.log(JSON.parse(JSON.stringify(res.list)))

                if (console.log(this.emailList.list) === undefined) {
                  localStorage.removeItem('emailList')
                  localStorage.setItem('emailList', JSON.stringify(this.emailList.list))
                  // console.log('undefined')
                  //使用loading加载
                  // vm.$router.push({ path: '/home/emailList' });
                  vm.$router.push({ path: '/home/emailList' });

                }
                //在SessionStorage中保存原始信息
                //创建另一个字段保存content原本,路由传参时使用
              })

              this.$message({
                message: data.msg,
                type: 'success',

              })

            } else {
              this.$message({
                message: data.msg,
                type: 'error',

              })
            }//if(data.code)
          });
        } else {//校验失败
          return false;
        }//if(valid)
      }//function
      );
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!');
          let params = {
            // userId: null,
            username: this.ruleForm.checkName,
            password: this.ruleForm.checkPass
          }
          RegisterUser(params).then(data => { //注册用户
            if (data.code === 200) {
              this.$message({
                message: data.msg,
                type: 'success',
              })
            } else {
              this.showRegisterDialog = false
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
    },
    resetForm(formName) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields();
      })
      // this.emailItem = null;

    },
    handleResetPassword(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let user = {
            username: this.resetPasswordForm.username,
            password: this.resetPasswordForm.password
          }
          let params = {
            user: user,
            code: this.resetPasswordForm.authCode
          }
          confirmResetPassword(params).then(data => {
            if (data.code === 200) {
              this.$message({
                message: data.msg,
                type: 'success',
              })
              this.showResetDialog = false
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
    handleChange(formName) {


      console.log(this.resetPasswordForm.email)
    },
    run() {

      if (!this.disabled) {
        this.$refs['ResetPasswordForm'].validateField('email', emailError => {
          if (!emailError) {
            const loading = this.$loading({
              lock: true,
              text: '验证码发送中',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            });
            let params = {
              emailAddress: this.resetPasswordForm.email
            }
            getAuthCode(params).then(data => {
              // console.log(data)
              if (data.code === 200) {
                // callback(new Error('该用户名已被注册'));
                loading.text = '发送成功';

                setTimeout(() => {
                  loading.close();
                }, 500);
                this.setDisabled(true);
                this.timer();
                this.$message({
                  message: data.msg,
                  type: 'success',
                })

              }
              else {
                loading.text = '发送失败';
                setTimeout(() => {
                  loading.close();
                }, 500);
                this.$message({
                  message: data.msg,
                  type: 'error',
                })
              }
            }
            )
          }
          else {
            this.$message({
              message: '未选择验证邮箱',
              type: 'error',
            })
          }
        })

        // console.log('获取验证码')
      } else {
        return false;
      }
    },
    // 倒计时
    timer() {
      if (this.time > 0) {
        this.tipText = this.time + 's后重新获取';
        this.time--;
        setTimeout(this.timer, 1000);
      } else {
        this.setDisabled(false);
        this.time = 60;
        this.tipText = '重新获取';
      }
    },
    // 设置disable的值
    setDisabled(val) {
      this.disabled = val;
    },
  },
}
    /* eslint-disable */
</script>

<style scoped>
body {
  background-color: #faecec;
}

.loginContainer {
  width: 350px;
  margin-left: 32%;
}
</style>
