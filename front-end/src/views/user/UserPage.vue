<template>
	<Card class='user-page'>
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
			<TabPane label="发布过的活动" icon="ios-color-wand">
				<UserCreated :userId="userInformation.user_id"></UserCreated>
			</TabPane>
			<TabPane label="参与过的活动" icon="md-contacts">
				<UserEnrolled :userId="userInformation.user_id"></UserEnrolled>
			</TabPane>
		</Tabs>
	</Card>
</template>

<script>
import { mapState } from 'vuex';
import stateParseMixin from '@/utils/stateParseMixin';
import UserCollections from './UserCollections';
import UserEnrolled from './UserEnrolled';
import UserCreated from './UserCreated';

export default {
	components: { UserCollections, UserEnrolled, UserCreated },
	mixins: [stateParseMixin],
	data() {
		return {};
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
	methods: {},
	created() {},
}
</script>
<style type='text/less' lang='less'>
@import "~@/css/vars.less";

.user {
	&-page {
		width: 100%;
		min-height: 200px;
		margin-top: 40px;
		padding: 25px 0 10px;
	}
	&-infos {
		.flex-vertical();
		p {
			font-size: 16px;
			line-height: 50px;
		}
	}

	&-info-avatar {
		width: 130px;
		height: 130px;
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
		padding: 50px 70px;
	}
}
</style>