<template>
	<div class="login-page">
		<Card class="login-card">
			<h2 class="login-title" slot="title">
				<img class="logo" src="https://i.loli.net/2019/03/14/5c8a0d74354ca.png">
			</h2>
			<h3 class="login-text">校园活动服务平台</h3>
			<Form :model="user" label-position="left" :rules="ruleInline" ref="loginForm">
				<FormItem label="身 份" prop="character">
					<Select v-model="user.character">
						<Option value="student">学生</Option>
						<Option value="manager">活动管理员</Option>
						<Option value="root">超级管理员</Option>
					</Select>
				</FormItem>
				<FormItem label="账号" prop="userId">
					<Input type="text" v-model="user.userId"></Input>
				</FormItem>
				<FormItem label="密 码" prop="password">
					<Input type="password" v-model="user.password"></Input>
				</FormItem>
				<FormItem class="login-btn">
					<Button type="primary" size="large" :loading="isFetching" @click.prevent="submit">登 录</Button>
				</FormItem>
			</Form>
		</Card>
	</div>
</template>

<script>
import { login } from '@/store/api/auth';

export default {
	data() {
		// 存放数据
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
						message: '请填写有效的学号.',
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
			isFetching: false
		};
	},
	// 方法集合
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

				// 管理员或者超级管理员进入后台
				if (character === 'manager' || character === 'root') {
					this.$router.push({ name: 'admin-activities' });
				}

				// 学生进入前台
				if (character === 'student') {
					const { query } = this.$route;
					const to = query.hasOwnProperty('q') ? query.q : { name: 'home' };
					this.$router.replace(to);
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
		background-image: url("https://i.loli.net/2019/03/12/5c8769d753661.png");
		background-position: center;
		width: 100%;
		min-height: 850px;
		.flex-line;

		.ivu-form-item-label {
			font-size: 15px;
			line-height: 1px;
		}

		.logo {
			width: 310px;
		}
	}
	&-card {
		width: 480px;
		padding: 10px 30px 5px;

		.ivu-card-head {
			border-bottom: none;
			font-size: 30px;
			padding: 0px;
		}
		.ivu-card-body {
			padding: 0px 16px;
		}
	}
	&-title,
	&-text {
		text-align: center;
	}

	&-text {
		font-size: 20px;
		font-weight: 500;
		color: @color-primary;
		letter-spacing: 2px;
	}

	&-btn {
		margin-top: 40px;
		text-align: center;

		button {
			width: 200px;
			font-size: 16px;
			font-weight: 600;
		}
	}
}
</style>