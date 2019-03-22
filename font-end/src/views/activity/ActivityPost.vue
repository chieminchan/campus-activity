<template>
  <div class='activity-detail-page'>
    <ActivityDetailCtrl></ActivityDetailCtrl>
    <ActivityCommentCtrl></ActivityCommentCtrl>
  </div>
</template>

<script>
import ActivityDetailCtrl from './Detail.vue';
import ActivityCommentCtrl from './Comment.vue';

export default {
  components: {ActivityDetailCtrl, ActivityCommentCtrl},
  data() {
    return {
      
    };
  },
  computed: {},
  methods: {},
  mounted() { },
}
</script>
<style type='text/less' lang='less'>
</style>