<template>
	<Card class='detail'>
		<h2 slot="title">活动详情管理</h2>

		<h3 class="them"> {{ activityInfo.activity_name }} </h3>
		<!-- 海报 -->
		<div class="poster">
			<template v-if="activityInfo.activity_poster_front">
				<LazyloadImg :src="activityInfo.activity_poster_front"></LazyloadImg>
			</template>

			<template v-if="activityInfo.activity_poster_back">
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
			<Button class="btn" icon="ios-build" type="primary" size="large" @click.prevent="">编辑活动信息</Button>
			<Button class="btn" icon="md-contacts" type="warning" size="large" @click.prevent="">查看报名名单</Button>
			<Button class="btn" icon="ios-brush" type="success" size="large" @click.prevent="">导出报名名单</Button>
			<template v-if="activityInfo.activity_type == 'online'">
				<Button class="btn works-btn" icon="ios-color-palette" type="info" size="large" @click.prevent="">查看参赛作品</Button>
			</template>
		</div>
	</Card>
</template>

<script>
import _ from 'lodash';
import { mapState, mapActions } from 'vuex';
import stateParseMixin from '@/utils/stateParseMixin';
import LazyloadImg from '@/components/LazyloadImg';

export default {
	components: { LazyloadImg },
	mixins: [stateParseMixin],
	data() {
		return {};
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
	},
	methods: {
		...mapActions('admin', ['getActivityDetail']),
		load() {
			const { params: { aid } } = this.$route;
			this.getActivityDetail({ activityId: aid });
		},
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
		font-size: 20px;
	}

	.ivu-card-body {
		padding: 20px;
	}

	.poster {
		width: 100%;
		min-height: 200px;
		padding: 0 10%;
		display: flex;
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