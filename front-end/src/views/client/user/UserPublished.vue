<template>
	<div class="published-lists">
		<template v-if="isEmpty">
			<div class="empty-tips">
				<p><i class="fa fa-meh-o" aria-hidden="true"></i></p>
				<p> 你还没发布过活动哦！</p>
			</div>
		</template>
		<template v-else v-for="(item, index) in publishedLists">
			<Card class="activity-card" :key="index">
				<router-link slot="title" :to="{ name: 'find-detail', params: {aid: item.activity_id} }">
					<h3 class="activity-title"> {{ item.activity_name }} </h3>
				</router-link>
				<span class="activity-status" slot="extra"> {{ status[item.activity_approval_status] }}</span>

				<router-link :to="{ name: 'find-detail', params: {aid: item.activity_id} }">
					<div class="activity-poster" :style="{ backgroundImage: 'url(' + item.activity_poster_front +')'}">
					</div>
				</router-link>

				<div class="actions">
					<template v-if="item.activity_approval_status == 1">
						<Button class="action-btn" type="warning" ghost @click.prevent="showActivityModal(item)">编辑活动信息</Button>
						<Button class="action-btn" type="warning" ghost @click.prevent="exportExcel(item.activity_id)">导出报名名单</Button>
					</template>

					<template v-if="item.activity_approval_status == 2">
						<Button class="action-btn" type="warning" ghost @click.prevent="showAdviceModal(item.activity_approval_advice)">查看反馈意见</Button>
					</template>
				</div>
			</Card>
		</template>

		<Modal v-model="isShowActivityModal" title="编辑活动信息" @on-ok="updateActivity" :mask-closable=false>
			<Form class="user-form">
				<FormItem>
					<label class="item-label">活动主题：</label>
					<Input type="text" v-model="currentActivity.activity_name">
					</Input>
				</FormItem>
				<FormItem>
					<label class="item-label">活动简介：</label>
					<Input type="text" v-model="currentActivity.activity_brief">
					</Input>
				</FormItem>
				<FormItem v-if="currentActivity.activity_type === 'offline'">
					<label class="item-label">活动地点：</label>
					<Input type="text" v-model="currentActivity.activity_address">
					</Input>
				</FormItem>
				<FormItem>
					<label class="item-label">报名截止时间：</label>
					<DatePicker :value="currentActivity.activity_enroll_deadline" type="datetime" format="yyyy-MM-dd HH:mm:ss" :confirm=true @on-change="changeDeadline"></DatePicker>
				</FormItem>
				<FormItem>
					<label class="item-label">活动开始时间：</label>
					<DatePicker :value="currentActivity.activity_start" type="date" format="yyyy-MM-dd" :confirm=true @on-change="changeStartTime"></DatePicker>
				</FormItem>
				<FormItem>
					<label class="item-label">活动结束时间：</label>
					<DatePicker :value="currentActivity.activity_end" type="date" format="yyyy-MM-dd" :confirm=true @on-change="changeEndTime"></DatePicker>
				</FormItem>
				<FormItem>
					<label class="item-label">联系方式：</label>
					<Input class="concat-item" type="text" v-model="currentActivity.activity_concat_name"></Input>
					-
					<Input class="concat-item" type="text" v-model="currentActivity.activity_concat_phone"></Input>
				</FormItem>

				<template v-if="currentActivity.activity_addition">
					<FormItem v-for="(value, key, index) in currentActivity.activity_addition" :key="index">
						<label class="item-label">{{key}}</label>
						<Input type="text" v-model="currentActivity.activity_addition[key]">
						</Input>
					</FormItem>
				</template>

			</Form>
		</Modal>
	</div>
</template>

<script>
import _ from 'lodash';
import { mapState, mapActions } from 'vuex';
import stateParseMixin from '@/utils/stateParseMixin';
import { updatePublished } from '@/store/api/user';
import { download } from '@/utils/download';

export default {
	props: {
		userId: {
			type: Number,
			require: true,
			default: 0
		}
	},
	mixins: [stateParseMixin],
	data() {
		return {
			isShowActivityModal: false,
			currentActivity: {},
			status: {
				0: '待审核',
				1: '审核通过',
				2: '审核失败'
			},
		};
	},
	computed: {
		...mapState('user', { state: 'userPublished' }),
		publishedLists() {
			if (this.isFulfill) {
				return this.state.payload.results;
			}
			return [];
		},
		isEmpty() {
			return this.publishedLists.length === 0;
		},
	},
	methods: {
		...mapActions('user', ['getUserPublished']),
		loadData() {
			const { userId } = this;
			this.getUserPublished({ userId });
		},
		showActivityModal(item) {
			this.isShowActivityModal = true;
			this.currentActivity = _.cloneDeep(item);
		},
		changeDeadline(newDate) {
			this.currentActivity.activity_enroll_deadline = newDate;
		},
		changeStartTime(newDate) {
			this.currentActivity.activity_start = newDate;
		},
		changeEndTime(newDate) {
			this.currentActivity.activity_end = newDate;
		},
		updateActivity() {
			const params = { ...this.currentActivity };
			updatePublished(params)
				.then(() => {
					this.$Message.success('修改活动信息成功！');
					this.loadData();
				})
				.catch(() => {
					this.$Message.error('修改活动信息失败！');
				});
		},
		showAdviceModal(advice) {
			this.$Modal.info({
				title: '活动申请反馈意见',
				content: `<p>${advice}</p>`,
			});
		},
		exportExcel(activityId) {
			const url = '/api/activity/downloadEnrolls/' + activityId;
			download(url);
		}
	},
	mounted() {
		this.loadData();
	},
	watch: {
		userId() {
			this.loadData();
		}
	}
}
</script>
<style type='text/less' lang='less'>
@import "~@/css/vars.less";

.published-lists {
	display: flex;
	justify-content: flex-start;
	flex-wrap: wrap;

	.activity {
		&-card {
			width: 31.2%;
			margin-bottom: 30px;
			margin-right: 2.1%;
		}

		&-poster {
			width: 100%;
			height: 290px;
			background-position: center;
			background-repeat: no-repeat;
			background-size: cover;
			transition: all 0.2s ease-in;
		}
	}

	.empty-tips {
		width: 100%;
		height: 200px;
		.flex-vertical();
		margin-top: 50px;
		font-size: 17px;
	}

	.actions {
		margin-top: 30px;
		display: flex;
		justify-content: space-around;
		.action-btn {
			margin-left: 10px;
		}
	}
}
.concat-item {
	width: 34%;
}
</style>