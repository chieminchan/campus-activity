<template>
	<Card class="publish-page">
		<h2>校园活动发布</h2>
		<Form class="publish-form">
			<Row :gutter="24">
				<Col span="12">
				<FormItem>
					<label class="item-label">活动主题：</label>
					<Input class="item-content" type="text" v-model="newActivity.name" placeholder="活动主题">
					</Input>
				</FormItem>
				</Col>
				<Col span="12">
				<FormItem>
					<label class="item-label">活动类型：</label>
					<Select class="item-content" v-model="newActivity.type" placeholder="选择活动类型">
						<Option value="online">线上活动</Option>
						<Option value="offline">线下活动</Option>
					</Select>
				</FormItem>
				</Col>
			</Row>
			<Row :gutter="24">
				<Col span="12">
				<FormItem>
					<label class="item-label">活动地点：</label>
					<Input class="item-content" type="text" v-model="newActivity.address" placeholder="如果为线下类型的活动，请输入活动地点。">
					</Input>
				</FormItem>
				</Col>
				<Col span="12">
				<FormItem>
					<label class="item-label">活动简介：</label>
					<Input class="item-content" type="text" v-model="newActivity.brief" placeholder="简单介绍一下活动，方便同学们了解。">
					</Input>
				</FormItem>
				</Col>
			</Row>
			<Row :gutter="24">
				<Col span="12">
				<FormItem>
					<label class="item-label">报名截止时间：</label>
					<DatePicker class="date-picker" v-model="newActivity.enrollDeadline" type="datetime" format="yyyy-MM-dd HH:mm:ss"
					 :confirm=true @on-change="confirmDeadline"></DatePicker>
				</FormItem>
				</Col>
				<Col :span="12">
				<FormItem>
					<label class="item-label">活动联系方式：</label>
					<Input class="concat" type="text" v-model="newActivity.concator" placeholder="联系人">
					</Input> :
					<Input class="concat" type="text" v-model="newActivity.concatorPhone" placeholder="联系人手机号码">
					</Input>
				</FormItem>
				</Col>
			</Row>
			<Row :gutter="24">
				<Col span="12">
				<FormItem>
					<label class="item-label">活动开始时间：</label>
					<DatePicker class="date-picker" v-model="newActivity.start" type="date" format="yyyy-MM-dd"
					 :confirm=true @on-change="confirmStart"></DatePicker>
				</FormItem>
				</Col>
				<Col span="12">
				<FormItem>
					<label class="item-label">活动结束时间：</label>
					<DatePicker class="date-picker" v-model="newActivity.end" type="date" format="yyyy-MM-dd"
					 :confirm=true @on-change="confirmEnd"></DatePicker>
				</FormItem>
				</Col>
			</Row>
			<Row :gutter="24">
				<Col span="14">
				<FormItem>
					<label class="item-label">活动海报（正面）：</label>
					<Upload type="drag" :before-upload="frontPosterUploaded" action="null" accept="image/jpeg,image/png,image/jpg"
					 :format="['jpg','jpeg','png']" :loading="isLoading">
						<div style="padding: 20px 0">
							<Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
							<p>选择图片或者拖拽图片进行上传</p>
						</div>
					</Upload>
				</FormItem>
				</Col>
				<Col span="10">
				<FormItem>
					<label class="item-label">
						<Icon type="md-information-circle" /> 温馨提示：
					</label>
					<p class="tip">1. 尽量选用横向和分辨率高的海报,这样子显示的信息会更加完整哦。</p>
					<p class="tip">2. 如果活动海报没有反面，可以选择不添加海报反面图片。</p>
					<p class="tip">3. 仅支持jpg、jpeg、png格式。</p>
					<p class="tip">4. 精致的活动海报能吸引更多关注哦！</p>
				</FormItem>
				</Col>
			</Row>
			<Row :gutter="24">
				<Col span="14">
				<FormItem>
					<label class="item-label">活动海报（反面）：</label>
					<Upload type="drag" :before-upload="backPosterUploaded" action="null" accept="image/jpeg,image/png,image/jpg"
					 :format="['jpg','jpeg','png']" :loading="isLoading">
						<div style="padding: 20px 0">
							<Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
							<p>选择图片或者拖拽图片进行上传</p>
						</div>
					</Upload>
				</FormItem>
				</Col>
			</Row>
			<Row v-if="hasAddition">
				<FormItem>
					<label class="item-label">活动额外信息：</label>

					<template v-if="newActivity.addition">
						<p class="addition-items" v-for="(value, key, index) in newActivity.addition" :key="index">
							<span class="item-label">{{key}}</span> ：
							<span class="item-content">{{value}}</span>
							<Button type="text" icon="md-close" shape="circle" size="small" @click.prevent="removeAddition(key)"></Button>
						</p>

					</template>
					<div class="addition-item">
						<Input class="addition-key" type="text" v-model="additionObj.key" placeholder="信息字段">
						</Input>
						：
						<Input class="addition-val" type="text" v-model="additionObj.value" placeholder="信息内容">
						</Input>
					</div>
				</FormItem>
			</Row>

			<Row>
				<FormItem>
					<div class="actions">
						<Button class="btn" type="warning" :loading="isLoading" @click.prevent="moreAddition" ghost>增加额外信息</Button>
						<Button class="btn" type="primary" :loading="isLoading" @click.prevent="addApproval">提交发布申请</Button>
					</div>
				</FormItem>
			</Row>

		</Form>
	</Card>
</template>

<script>
import _ from 'lodash';
import { updateApproval } from '@/store/api/activity';

export default {
	components: {},
	data() {
		return {
			isLoading: false,
			hasAddition: false,
			newActivity: {
				addition: {}
			},
			additionObj: {}
		};
	},
	computed: {},
	methods: {
		confirmDeadline(datetime) {
			const { end } = this.newActivity;
			if (end && end < datetime) {
				this.$Message.warning('报名截止日期不能大于结束日期，请重新选择');
				datetime = '';
			}
			this.newActivity.enrollDeadline = datetime;
		},
		confirmStart(datetime) {
			const { end } = this.newActivity;
			if (end && end < datetime) {
				this.$Message.warning('开始日期不能大于结束日期，请重新选择');
				datetime = '';
			}
			this.newActivity.start = datetime;
		},
		confirmEnd(datetime) {
			const { start } = this.newActivity;
			if (start && start > datetime) {
				this.$Message.warning('结束日期不能小于开始日期，请重新选择');
				datetime = '';
			}
			this.newActivity.end = datetime;
		},
		frontPosterUploaded(file) {
			this.newActivity.frontPoster = file;
			return false;
		},
		backPosterUploaded(file) {
			this.newActivity.backPoster = file;
			return false;
		},
		moreAddition() {
			this.hasAddition = true;
			const { additionObj } = this;
			if (additionObj && additionObj.hasOwnProperty('key') && additionObj.hasOwnProperty('value')) {
				const { key, value } = this.additionObj;
				this.newActivity.addition[key] = value;
				this.additionObj = {};
			}
		},
		addApproval() {
			const {
				name,
				type,
				brief,
				address,
				deadline,
				start,
				end,
				concator,
				concatorPhone,
				frontPoster,
				backPoster,
				addition
			} = this.newActivity;
			const params = {
				name,
				type,
				brief,
				address,
				deadline,
				start,
				end,
				concator,
				concatorPhone,
				frontPoster,
				backPoster,
				addition
			};
			updateApproval(params);
		},
		removeAddition(key) {
			this.newActivity.addition = _.omit(this.newActivity.addition, [key]);
		}
	},
}
</script>
<style type='text/less' lang='less'>
.publish {
	&-form {
		padding: 2% 4%;
		.item-label {
			display: block;
		}

		.item-content {
			width: 90%;
			margin-top: 10px;
		}

		.concat {
			width: 40%;
		}

		.date-picker {
			display: block;
			width: 90%;
		}

		.ivu-date-picker-focused input {
			box-shadow: none;
		}

		.tip {
			line-height: 30px;
		}

		.actions {
			text-align: center;
			.btn {
				padding: 10px 40px;
				margin-left: 20px;
			}
		}

		.addition-items {
			margin-top: 10px;
			padding: 5px 0;
			border: 1px solid transparent;
			border-radius: 5px;
			transition: all 0.2s linear;
			vertical-align: middle;
			line-height: 1;
			span {
				display: inline-block;
			}
			.item-label {
				width: 12%;
				text-align: right;
			}
			.item-content {
				max-width: 80%;
			}

			&:hover {
				border: 1px solid #abcdec;
			}
		}

		.addition-item {
			margin-top: 10px;
		}

		.addition-key {
			width: 12%;
		}

		.addition-val {
			width: 50%;
		}
	}
}
</style>