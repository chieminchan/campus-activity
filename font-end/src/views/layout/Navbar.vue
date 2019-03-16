<!--  -->
<template>
  <Menu class='nav' mode="horizontal" active-name="home">
    <template v-for="item in menu">
      <template v-if="item.hasOwnProperty('children')">
        <Submenu :name="item.name">
          <template slot="title">
            <Icon :type=item.icon size="22" />
            <span class="menu-item-text"> {{item.title}}</span>
          </template>
          <template v-for="child in item.children">
            <router-link :to="child.to">
              <MenuItem :name="child.name">
              {{child.title}}
              </MenuItem>
            </router-link>
          </template>
        </Submenu>
      </template>

      <template v-else>
        <router-link :to="item.to">
          <MenuItem :name="item.name">
          <Icon :type=item.icon size="22" />
          {{item.title}}
          </MenuItem>
        </router-link>
      </template>
    </template>
  </Menu>
</template>

<script>
import navData from '@/const/nav';

export default {
  // 引入组件
  components: {},
  data() {
    // 存放数据
    return {

    };
  },
  // 监听属性
  computed: {
    menu() {
      return navData;
    },
    activeItem() {
      const routePath = this.$route.path;
      const pathArr = routePath.split('/');
      return `/${pathArr[1]}/${pathArr[2]}`;
    }
  },
  // 方法集合
  methods: {

  },
  // 监控数据变化
  watch: {},
}
</script>

<style type='text/less' lang='less'>
.nav {
  flex-basis: 600px;
  .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item,
  .ivu-menu-light.ivu-menu-horizontal .ivu-menu-submenu {
    font-size: 15px;
  }
}
</style>