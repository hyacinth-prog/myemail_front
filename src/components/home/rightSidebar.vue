<template>
  <div>
    <el-menu
    default-active="1-4-1"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    @select="handleSelect"
    :collapse="isCollapse"
    id="menu"
  >
    <el-menu-item index="2">
      <i class="el-icon-menu"></i>
      <span slot="title">日历</span>
    </el-menu-item>
    <el-menu-item index="3" disabled>
      <i class="el-icon-document"></i>
      <span slot="title">导航三</span>
    </el-menu-item>
    <el-menu-item index="4">
      <i class="el-icon-setting"></i>
      <span slot="title">导航四</span>
    </el-menu-item>
  </el-menu>

  <el-drawer
    title="日历"
    :visible.sync="drawer"
    :direction="direction"
    :before-close="handleClose1"
  >
  <calendar />
    
  </el-drawer>
  </div>
  
</template>

<script>
import calendar from './calendar.vue';
export default {
  components: { calendar },
  data() {
    return {
      isCollapse: true,
      drawer: false,
      direction: 'rtl',
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      this.drawer=true;
      console.log(key, keyPath);
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose1(done) {
      done();
        // this.$confirm('确认关闭？')
        //   .then(_ => {
        //     done();
        //   })
        //   .catch(_ => {});
      }
  }
}
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 100px;
  min-height: 400px;
}
#menu {
  border-width: 1px 0 0 1px;
  border-style: solid;
  border-color: #ddd;
  width: 63px;
  height: 100%;
}
</style>