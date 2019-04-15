<template>
	<Card class='user-page'>
		<div class="user-update">
			<Button class="update-btn" type="warning" ghost @click.prevent="showInfoModal">修改个人信息</Button>
			<Button class="update-btn" type="warning" ghost @click.prevent="showPwdModal">修改个人密码</Button>
		</div>

		<Modal v-model="isShowInfoModal" title="修改个人信息" @on-ok="updateInfo" :mask-closable=false>
			<Form class="user-form">
				<FormItem>
					<label class="item-label">院系：</label>
					<Input type="text" v-model="userInformation.user_department" disabled>
					</Input>
				</FormItem>
				<FormItem>
					<label class="item-label">专业：</label>
					<Input type="text" v-model="userInformation.user_profession" disabled>
					</Input>
				</FormItem>
				<FormItem>
					<label class="item-label">手机号码：</label>
					<Input type="text" v-model="userInfo.newPhone" :placeholder="userInformation.user_phone">
					</Input>
				</FormItem>
			</Form>
		</Modal>

		<Modal v-model="isShowPwdModal" title="修改个人密码" @on-ok="updatePwd" :mask-closable=false>
			<Form class="user-form">
				<FormItem>
					<label class="item-label">原始密码：</label>
					<Input type="password" v-model="userPwd.oldPwd" placeholder="输入旧密码">
					</Input>
				</FormItem>
				<FormItem>
					<label class="item-label">新密码：</label>
					<Input type="password" v-model="userPwd.newPwd" placeholder="输入新密码">
					</Input>
				</FormItem>
				<FormItem>
					<label class="item-label">确认新密码：</label>
					<Input type="password" v-model="userPwd.confirmPwd" placeholder="再输入一次新密码">
					</Input>
				</FormItem>
			</Form>
		</Modal>

		<div class="user-infos">
			<!-- 头像 -->
			<template v-if="userInformation.user_sex === '男'">
				<Avatar class="user-avatar boy-avatar" size="large" :loading="isFetching" src="https://i.loli.net/2019/04/01/5ca1dbef3e9cd.png">
				</Avatar>
			</template>
			<template v-else>
				<Avatar class="user-info-avatar girl-avatar" size="large" :loading="isFetching" src="https://i.loli.net/2019/04/01/5ca1dbef40320.png">
				</Avatar>
			</template>

			<p class="user-name">{{ userInformation.user_name }}</p>

			<p class="user-department">
				<i class="fa fa-graduation-cap" aria-hidden="true"></i>
				{{ userInformation.user_department }}
			</p>

			<p class="user-profession">
				<i class="fa fa-id-card-o" aria-hidden="true"></i>
				<span> {{ `${userInformation.user_grade}级` }}</span>
				<span> {{ `${userInformation.user_profession} ${userInformation.user_class}班` }}</span>
			</p>
		</div>

		<Tabs class="user-tabs">
			<TabPane label="收藏的活动" icon="ios-bookmark">
				<UserCollections :userId="userInformation.user_id"></UserCollections>
			</TabPane>
			<TabPane label="参与过的活动" icon="md-contacts">
				<UserEnrolled :userId="userInformation.user_id"></UserEnrolled>
			</TabPane>
			<TabPane label="发布过的活动" icon="ios-color-wand">
				<UserCreated :userId="userInformation.user_id"></UserCreated>
			</TabPane>
		</Tabs>
	</Card>
</template>

<script>
import { mapState } from 'vuex';
import stateParseMixin from '@/utils/stateParseMixin';
import { updateUserPwd, updateUserInfo } from '@/store/api/user';
import UserCollections from './UserCollections';
import UserEnrolled from './UserEnrolled';
import UserCreated from './UserCreated';

export default {
	components: { UserCollections, UserEnrolled, UserCreated },
	mixins: [stateParseMixin],
	data() {
		return {
			isShowInfoModal: false,
			isShowPwdModal: false,
			userPwd: {
				oldPwd: '',
				newPwd: '',
				confirmPwd: ''
			},
			userInfo: {
				newPhone: ''
			}
		};
	},
	computed: {
		...mapState({ state: 'profile' }),
		userInformation() {
			if (this.isFulfill) {
				return this.state.payload.results[0];
			}
			return {};
		}
	},
	methods: {
		showInfoModal() {
			this.isShowInfoModal = true;
		},
		showPwdModal() {
			this.isShowPwdModal = true;
		},
		updateInfo() {
			const { newPhone } = this.userInfo;
			const oldPhone = this.userInformation.user_phone;
			const userId = this.userInformation.user_id;
			const phoneFormat = /^[1]([3-9])[0-9]{9}$/;

			if (!newPhone.length === 11 || !phoneFormat.test(newPhone)) {
				this.$Message.warning('手机号码格式不正确，请重新输入！');
				this.userInfo.newPhone = '';
			} else if (newPhone === oldPhone) {
				this.$Message.warning('新手机号码和旧手机号不能一样哦！');
				this.userInfo.newPhone = '';
			} else {
				updateUserInfo({ userId, oldPhone, newPhone })
					.then(() => {
						this.$Message.success('个人信息修改成功！');
						this.userInfo.newPhone = '';
					})
					.catch((err) => {
						this.$Message.error(err.message);
					})
			}

		},
		updatePwd() {
			const { oldPwd, newPwd, confirmPwd } = this.userPwd;
			const userId = this.userInformation.user_id;

			if (newPwd === oldPwd) {
				this.$Message.warning('新密码不能和原始密码一样哦，请重新输入哦！');
				this.emptyPwd();
			} else if (newPwd !== confirmPwd) {
				this.$Message.warning('新密码和确认密码要一致哦！');
				this.emptyPwd();
			} else {
				updateUserPwd({ userId, oldPwd, newPwd })
					.then(() => {
						this.$Message.success('密码修改成功！');
						this.emptyPwd();
						this.$router.replace({ name: 'login' });
					})
					.catch((err) => {
						this.$Message.error(err.message);
					})
			}

		},
		emptyPwd() {
			this.userPwd.oldPwd = '';
			this.userPwd.newPwd = '';
			this.userPwd.confirmPwd = '';
		}
	}
}
</script>
<style type='text/less' lang='less'>
@import "~@/css/vars.less";

.user {
	&-page {
		width: 100%;
		min-height: 180px;
		margin-top: 35px;
		padding: 15px 0 10px;
	}

	&-update {
		text-align: right;
		.update-btn {
			margin-right: 20px;
		}
	}

	&-form {
		padding: 10px 20px;
	}

	&-infos {
		.flex-vertical();
		p {
			font-size: 16px;
			line-height: 50px;
		}
	}

	&-info-avatar {
		width: 120px;
		height: 120px;
		background: transparent;
	}

	&-name {
		font-size: 25px !important;
		margin-top: 10px;
		font-weight: 500;
		letter-spacing: 2px;
		color: black;
	}

	&-profession,
	&-department {
		color: rgb(70, 80, 95);
	}

	&-tabs {
		padding: 45px 70px;
	}
}
</style>