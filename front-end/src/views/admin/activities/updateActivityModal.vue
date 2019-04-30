<template>
	<Modal v-model="isShowActivityModal" title="编辑活动信息" @on-ok="updateActivity" @on-cancel="closeModal" width="600">
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
</template>

<script>

export default {
	components: {},
	props: {
		isShowModal: {
			type: Boolean,
			defalut: false
		},
		info: {
			type: Object,
			defalut: null
		}
	},
	data() {
		return {
			currentActivity: {},
			isShowActivityModal: false,
		};
	},
	computed: {

	},
	methods: {
		updateActivity() {
			const info = { ...this.currentActivity };
			this.$emit('close');
			this.$emit('change', info);
		},
		closeModal() {
			this.$emit('close');
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
	},
	watch: {
		info(newVal) {
			this.currentActivity = { ...newVal };
		},
		isShowModal(newVal) {
			this.isShowActivityModal = newVal;
		}
	}
}
</script>
<style type='text/less' lang='less'>
.detail-form {
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
</style>