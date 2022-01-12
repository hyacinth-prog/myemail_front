<template>
  <div>
    <!-- <el-button @click="getList">fdfs</el-button> -->
    <el-table :data.sync="item" @row-dblclick="handleDetail">
      <el-table-column prop="from" label="发件人" width="140">
      </el-table-column>

      <el-table-column prop="subject" label="主题" width="120">
      </el-table-column>
      <el-table-column prop="content" label="摘要"> </el-table-column>

      <el-table-column prop="date" label="日期"> </el-table-column>
      <el-table-column label="发件人2" width="100" v-if="show">
        <template slot-scope="scope">{{ scope.row.mainContent }}</template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

import { mapGetters, mapState } from 'vuex'

export default {
  name: 'emailList',
  created() {
    //在页面加载时读取localStorage里的状态信息
    if (localStorage.getItem('emailList')) {
      this.$store.commit('SET_EMAIL_LIST', JSON.parse(localStorage.getItem('emailList')))
    }
    //在页面刷新时将vuex里的信息保存到localStorage里
    window.addEventListener('beforeunload', () => {
      localStorage.setItem('emailList', JSON.stringify(this.emailList.list))

    })
    this.item = JSON.parse(localStorage.getItem('emailList'))
  },
  data() {
    return {
      // tableData: Array(20).fill(item),
      item: JSON.parse(localStorage.getItem('emailList')),
      show: false
    }
  },
  computed: {
    ...mapState(['emailList']),
    ...mapGetters({
      emailList: 'getEmailList'
    }),
    List: {
      get() {
        let l = this.emailList.list
        // for (let k of l) {
        //   k.content = k.content.toString()
        //   k.content = k.content.replace(/<head>(.*?)<\/head>/gms, "")
        //   k.content = k.content.replace(/<.*?>/gs, "")
        //   k.content = k.content.replace(/\ +/g, "");  //空格
        //   k.content = k.content.replace(/[\r\n]/g, "");      //回车换行  
        //   k.content = k.content.length > 20 ? k.content.slice(0, 17) + '...' : k.content
        // }
        return l
      },
      set(v) {
        this.$store.commit('SET_EMAIL_LIST', v)
      }
    }

  },
  watch: {
    List: {
      handler(newVal, oldVal) {
        this.List = newVal
        //  console.log("List:" + newVal)
      },
      immediate: true,
      deep: true
    },
  },
  methods: {
    handleclick(row, event, column) {
      alert("我被单击了");
      console.log(row, event, column);
    },
    handleDetail(row, event, column) {
      alert("我被双击了");
      this.$router.push({ name: 'detail', params: {text: row.mainContent} })
     // console.log(row.mainContent);
    }
  }

};
</script>