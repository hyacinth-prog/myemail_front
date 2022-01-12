<!-- 获取验证码按钮 -->
<template>
  <div class="btn-wrap">
    <button
      :class="['get-code', { 'disable-click': disabled }]"
      @click="run"
      type="button"
    >
      {{ tipText }}
    </button>
  </div>
</template>



<script>
import { mapState } from 'vuex'
import { getAuthCode } from '../api/api'

export default {
  data() {
    return {
      tipText: '获取验证码',
      time: 60,
      disabled: false,
    }
  },
  computed: {
    ...mapState(['home'])
  },
  methods: {
    // 点击获取验证码
    run() {
      if (!this.disabled) {
        // if (this.home.email.password === '' || this.home.email.password == undefined || this.home.email.account === '' || this.home.email.account == undefined) {
        //   this.$message({
        //     message: '缺失必填信息',
        //     type: 'error',
        //   })
        // }
        // else {
        //   let params = {
        //     emailAddress: this.home.email.account,
        //     authCode: this.home.email.password
        //   }
        //   getAuthCode(params).then(data => {



        //   })
          this.setDisabled(true);
          this.timer();
        

      } else {
        return false;
      }
      //   let params = {
      //     emailAddress: this.home.email.account,
      //     authCode: this.home.email.password
      //   }
      //   getAuthCode(params).then(data => {



      //   })
      //   console.log(this.home.email.account)
      //   console.log(this.home.email.password)
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
  }
}
</script>

<style lang="scss" scoped>
.btn-wrap {
  text-align: center;
}
.get-code {
  -webkit-appearance: none;
  border: none;

  outline: none;
  font-size: 10px;
  padding: 2px 8px;
  border-radius: 5px;
  background-color: #009efc;
  color: #fff;
  cursor: pointer;
  &.disable-click {
    cursor: not-allowed;
    background-color: #b4b4b4;
  }
}
</style>