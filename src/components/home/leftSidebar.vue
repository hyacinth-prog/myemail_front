<template>
  <div class="sidebar">
    <div class="sidebar__nav">
     
      <router-link
        v-for="item in nav"
        :key="item.name"
        :to="item.path"
        tag="div"
        class="sidebar__nav-item"
        v-if="item.path!=undefined"
      >  <i class="el-icon-message" v-if="item.name==='收件箱'"></i>{{ item.name }}</router-link>
    </div>
  </div>
</template>

<script>
import nav from '../navigation'

export default {
  name: '',

  data () {
    return {
      nav: nav.sidebar
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/scss/variables.scss';

.sidebar {
  border-right: 1px solid #ddd;
  height: 100%;
  &__nav {
    &-item {
      padding: 25px 10px;
      font-size: 12px;
      text-transform: uppercase;
      cursor: pointer;
      text-align: center;
      &.active {
        background-color: $color-primary;
        color: #fff;
        &:hover {
          background-color: $color-primary;
          color: #fff;
        }
      }
      &:hover {
        background-color: #eee;
        color: #000;
      }
    }
  }
}
</style>
