<template>
	<div class='activity-detail-page'>
		<ActivityDetailCtrl></ActivityDetailCtrl>
		<ActivityCommentCtrl></ActivityCommentCtrl>
	</div>
</template>

<script>
import ActivityDetailCtrl from './Detail.vue';
import ActivityCommentCtrl from './Comments.vue';

export default {
	components: { ActivityDetailCtrl, ActivityCommentCtrl },
}
</script>
<style type='text/less' lang='less'>
</style>