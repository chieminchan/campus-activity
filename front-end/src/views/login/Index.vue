<template>
	<div class="login-page">
		<!-- <h2 class="login-title" slot="title">
			<img class="logo" src="https://i.loli.net/2019/03/14/5c8a0d74354ca.png">
		</h2> -->
		<Card class="login-card">
			<h2 class="login-title" slot="title">
				<img class="logo" src="https://i.loli.net/2019/03/14/5c8a0d74354ca.png">
			</h2>
			<!-- <h3 class="login-text">校园活动服务平台</h3> -->
			<Form class="login-form" :model="user" label-position="left" :rules="ruleInline" ref="loginForm">
				<FormItem class="item" label="身 份" prop="character">
					<Select class="item-content" v-model="user.character">
						<Option value="student">学生</Option>
						<Option value="manager">活动管理员</Option>
						<Option value="root">超级管理员</Option>
					</Select>
				</FormItem>
				<FormItem class="item" label="账号" prop="userId">
					<Input class="item-content" type="text" v-model="user.userId"></Input>
				</FormItem>
				<FormItem class="item" label="密 码" prop="password">
					<Input class="item-content" type="password" v-model="user.password"></Input>
				</FormItem>
				<FormItem class="login-btn">
					<Button type="primary" size="large" :loading="isFetching" @click.prevent="submit" ghost>登 录</Button>
				</FormItem>
			</Form>
		</Card>
		<div class="bg">
			<LazyloadImg :src="target"></LazyloadImg>
		</div>
	</div>
</template>

<script>
import { login } from '@/store/api/auth';
import LazyloadImg from '@/components/LazyloadImg';

export default {
	components: { LazyloadImg },
	data() {
		return {
			user: {
				character: 'student',
				userId: '',
				password: ''
			},
			ruleInline: {
				userId: [
					{
						required: true,
						message: '请填写有效的账号.',
						trigger: 'blur'
					}
				],
				password: [
					{
						required: true,
						message: '请填写密码.',
						trigger: 'blur'
					},
					{
						type: 'string',
						min: 6,
						message: '密码必须不能小于6位',
						trigger: 'blur'
					}
				],
				character: [
					{
						required: true,
						message: '请选择登录身份.',
						trigger: 'blur'
					}
				]
			},
			isFetching: false,
			target: 'https://i.loli.net/2019/04/23/5cbf0a3fe48e9.png',
		};
	},
	methods: {
		submit() {
			this.$refs.loginForm.validate(isValid => {
				if (isValid) {
					this.login();
				} else {
					this.$Message.error('请输入有效的账号密码');
				}
			});
		},
		login() {
			this.isFetching = true;

			const { user: { character, userId, password } } = this;

			login({ character, userId, password }).then(() => {
				this.$Message.success('登录成功');
				this.isFetching = false;
				
				// 管理员或者超级管理员进入后台
				if (character === 'manager' || character === 'root') {
					this.$router.push({ name: 'admin-activities' });
				}

				// 学生进入前台
				if (character === 'student') {
					const { query } = this.$route;
					const to = query.hasOwnProperty('q') ? query.q : { name: 'home' };
					this.$router.replace(to);
					// this.$router.push({ name: 'home' });
				}
			})
				.catch(() => {
					this.isFetching = false;
					this.$Message.error('登陆失败,请检查账号和密码是否正确！');
				});
		}
	},
};
</script>

<style type='text/less' lang='less'>
@import "~@/css/vars.less";

.login {
	&-page {
		width: 100%;
		height: 785px;
		position: relative;
		background: white;

		.ivu-form-item-label {
			font-size: 15px;
			line-height: 2;
			display: inline-block;
			width: 60px;
		}

		.logo {
			width: 300px;
		}
	}
	&-card {
		width: 470px;
		border: none;
		position: absolute;
		top: 32%;
		left: 50%;
		z-index: 2;
		transform: translate(-50%, -50%);

		.ivu-card-head {
			border-bottom: none;
			padding: 15px 0 0;
		}
		.ivu-card-body {
			padding: 0 50px;
		}
	}
	&-title {
		text-align: center;
		// position: absolute;
		// top: 16%;
		// left: 50%;
		// transform: translate(-50%, -50%);
	}

	&-text {
		text-align: center;
	}

	&-btn {
		text-align: center;
		button {
			padding: 10px 80px;
			font-size: 16px;
			font-weight: 400;
		}
	}
}
.login-form {
	.item-content {
		width: 80%;
	}
}
.bg {
	width: 100%;
	text-align: center;
	position: absolute;
	bottom: 0;
}
</style>