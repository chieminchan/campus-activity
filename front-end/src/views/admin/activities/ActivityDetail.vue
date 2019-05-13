<template>
	<Card class='detail'>
		<GoBack></GoBack>
		<h2>活动详情管理</h2>
		<h3 class="them"> {{ activityInfo.activity_name }} </h3>
		<!-- 海报 -->
		<div class="poster">
			<template v-if="activityInfo.activity_poster_front">
				<LazyloadImg :src="activityInfo.activity_poster_front"></LazyloadImg>
			</template>

			<template v-if="hasBackPoster">
				<LazyloadImg :src="activityInfo.activity_poster_back"></LazyloadImg>
			</template>
		</div>

		<!-- 活动信息 -->
		<p class="info brief">
			<Divider>简介</Divider>
			<span class="info-text">{{ activityInfo.activity_brief }}</span>
		</p>

		<p class="info deadline">
			<Divider>报名截止时间</Divider>
			<span class="info-text">{{ activityInfo.activity_enroll_deadline }}</span>
		</p>

		<p class="info period">
			<Divider>活动时间</Divider>
			<span class="info-text">
				{{ `${activityInfo.activity_start} — ${activityInfo.activity_end}` }}
			</span>
		</p>

		<template v-if="activityInfo.activity_type == 'offline'">
			<p class="info address">
				<Divider>活动地点</Divider>
				<span class="info-text">
					{{ activityInfo.activity_address }}
				</span>
			</p>
		</template>

		<p class="info concat">
			<Divider>联系方式</Divider>
			<span class="info-text">
				{{ `${activityInfo.activity_concat_name} ：${activityInfo.activity_concat_phone}` }}
			</span>
		</p>

		<template v-for="(value, key, index) in activityAddition">
			<p class="info addition" :key="index">
				<Divider>{{ key }}</Divider>
				<span class="info-text">
					{{ value }}
				</span>
			</p>
		</template>

		<div class="action-btn">
			<Button class="btn" icon="ios-build" type="primary" size="large" @click.prevent="showActivityModal(activityInfo)">编辑活动信息</Button>
			<Button class="btn" icon="md-contacts" type="warning" size="large" @click.prevent="toEnrolled">查看报名名单</Button>
			<Button class="btn" icon="ios-brush" type="success" size="large" @click.prevent="exportExcel(activityInfo.activity_id)">导出报名名单</Button>
			<template v-if="activityInfo.activity_type == 'online'">
				<Button class="btn works-btn" icon="ios-color-palette" type="info" size="large" @click.prevent="toWorks">查看参赛作品</Button>
			</template>
		</div>

		<Modal v-model="isShowActivityModal" title="编辑活动信息" @on-ok="updateActivity" width="600">
			<Form class="detail-form">
				<FormItem label="活动主题">
					<Input class="item-content" type="text" v-model="currentActivity.activity_name">
					</Input>
				</FormItem>
				<FormItem label="活动简介">
					<Input class="item-content" type="text" v-model="currentActivity.activity_brief">
					</Input>
				</FormItem>
				<FormItem label="活动地点" v-if="currentActivity.activity_type === 'offline'">
					<Input class="item-content" type="text" v-model="currentActivity.activity_address">
					</Input>
				</FormItem>
				<FormItem label="报名截止时间">
					<DatePicker class="item-content" :value="currentActivity.activity_enroll_deadline" type="datetime" format="yyyy-MM-dd HH:mm:ss" :confirm=true @on-change="changeDeadline"></DatePicker>
				</FormItem>
				<FormItem label="活动开始时间">
					<DatePicker class="item-content" :value="currentActivity.activity_start" type="date" format="yyyy-MM-dd" :confirm=true @on-change="changeStartTime"></DatePicker>
				</FormItem>
				<FormItem label="活动结束时间">
					<DatePicker class="item-content" :value="currentActivity.activity_end" type="date" format="yyyy-MM-dd" :confirm=true @on-change="changeEndTime"></DatePicker>
				</FormItem>
				<FormItem label="联系方式">
					<Input class="concat-item" type="text" v-model="currentActivity.activity_concat_name"></Input>
					-
					<Input class="concat-item" type="text" v-model="currentActivity.activity_concat_phone"></Input>
				</FormItem>

				<template v-if="currentActivity.activity_addition">
					<FormItem v-for="(value, key, index) in currentActivity.activity_addition" :label="key" :key="index">
						<Input class="item-content" type="text" v-model="currentActivity.activity_addition[key]">
						</Input>
					</FormItem>
				</template>

			</Form>
		</Modal>

	</Card>
</template>

<script>
import _ from 'lodash';
import { mapState, mapActions } from 'vuex';
import stateParseMixin from '@/utils/stateParseMixin';
import LazyloadImg from '@/components/LazyloadImg';
import GoBack from '@/components/GoBack';
import { updatePublished } from '@/store/api/user'
import { download } from '@/utils/download';

export default {
	components: { LazyloadImg, GoBack },
	mixins: [stateParseMixin],
	data() {
		return {
			isShowActivityModal: false,
			currentActivity: {},
		};
	},
	computed: {
		...mapState('admin', { state: 'activityDetail' }),
		activityInfo() {
			if (this.isFulfill) {
				return this.state.payload.results;
			}
			return '';
		},
		activityAddition() {
			if (this.isFulfill) {
				const addition = this.state.payload.results.activity_addition;
				return _.isNil(addition) ? {} : addition;
			}
			return {};
		},
		hasBackPoster() {
			const { activityInfo } = this;
			if (this.isFulfill) {
				return _.has(activityInfo, 'activity_poster_back') && activityInfo.activity_poster_back !== '';
			}
			return false;
		},
	},
	methods: {
		...mapActions('admin', ['getActivityDetail']),
		load() {
			const { params: { aid } } = this.$route;
			this.getActivityDetail({ activityId: aid });
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
					this.load();
				})
				.catch(() => {
					this.$Message.success('修改活动信息失败！');
				});
		},
		toEnrolled() {
			const { params: { aid } } = this.$route;
			this.$router.push({ name: 'admin-activity-enrolled', params: { aid } });
		},
		toWorks() {
			const { params: { aid } } = this.$route;
			this.$router.push({ name: 'admin-activity-works', params: { aid } });
		},
		exportExcel(activityId) {
			const url = '/api/activity/downloadEnrolls/' + activityId;
			download(url);
		}
	},
	mounted() {
		this.load();
	},
}
</script>
<style type='text/less' lang='less'>
.detail {
	.them {
		margin: 20px 0;
		text-align: center;
		font-size: 18px;
	}

	.ivu-card-body {
		padding: 10px 20px;
	}

	.poster {
		width: 100%;
		min-height: 200px;
		padding: 0 10%;
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: center;
		.img {
			padding: 10px;
		}
	}

	.status {
		font-size: 15px;
		font-weight: 500;
		color: #ee4b4b;
	}

	.action-btn {
		margin-top: 30px;
		display: flex;
		justify-content: center;

		button {
			margin-right: 30px;
		}

		.btn {
			padding: 10px 25px;
			font-size: 15px;
			border-radius: 8px;
		}
		.works-btn {
			background-color: #909399;
			border-color: #909399;
		}
	}

	&-form {
		.ivu-form-item-label {
			display: block;
			width: 100%;
			text-align: left;
		}
		.item-content {
			display: block;
			width: 90%;
		}
		.concat-item {
			display: inline-block;
			width: 44%;
		}
	}
}
.info {
	width: 100%;
	text-align: center;
	font-size: 15px;

	.ivu-divider {
		font-size: 17px;
		color: #4d739a;
		margin: 40px 0 10px;
	}
}
</style>