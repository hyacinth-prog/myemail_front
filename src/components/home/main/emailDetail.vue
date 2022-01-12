<template>
  <div v-html="text"></div>
</template>

<script>
export default {
  name:'emailDetail',
  created() {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.fetchData()
  },
  data() {
    return {
      text: '',
    }
  },
   watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'fetchData'
  },
  methods: {
    fetchData() { 
      this.text = this.$route.params.text

    }
  }
};
</script>