<template>
	<div class='activity-detail-page'>
		<GoBack></GoBack>
		<ActivityDetailCtrl></ActivityDetailCtrl>
		<ActivityCommentCtrl></ActivityCommentCtrl>
	</div>
</template>

<script>
import GoBack from '@/components/GoBack';
import ActivityDetailCtrl from './Detail.vue';
import ActivityCommentCtrl from './Comments.vue';

export default {
	components: { ActivityDetailCtrl, ActivityCommentCtrl, GoBack },
}
</script>
<style type='text/less' lang='less'>
.activity-detail-page {
	padding: 0 5%;
}
</style>