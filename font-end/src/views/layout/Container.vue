<template>
  <section class="app-main">
    <transition name="fade-transform"  mode="out-in">
      <router-view></router-view>
    </transition>
  </section>
</template>

<script>

export default {
  // 引入组件
  components: {},
  data() {
  // 存放数据
    return {

    };
  },
  // 监听属性
  computed: {},
  // 方法集合
  methods: {

  },
  // 监控数据变化
  watch: {},
}
</script>
<style type='text/less' lang='less'>
.app-main{
  margin-top: 20px;
  width: 100%;
  min-height: 730px;
  background: #f4f4f4;
}
</style>