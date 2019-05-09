<template>
	<div class='home-activity'>

		<!-- 最新活动 -->
		<Carousel class="carousel" autoplay loop :autoplay-speed="8000">
			<template v-for="(item, index) in recommendItems">
				<CarouselItem :key="index">
					<router-link :to="{ name: 'find-detail', params: {aid: item.activity_id} }">
						<div class="carousel-img" :style="{ backgroundImage: 'url(' + item.activity_poster_front +')'}">
						</div>
					</router-link>
				</CarouselItem>
			</template>
		</Carousel>

		<!-- 活动列表 -->
		<Menu class="choose-tag" mode="horizontal" :active-name=showActivityLists @on-select="changeType">
			<MenuItem name="online">线上活动</MenuItem>
			<MenuItem name="offline">线下活动</MenuItem>
		</Menu>
		<ActivityLists :selectedType="showActivityLists"></ActivityLists>

		<!-- 查看更多 -->
		<router-link class="more-link" :to="{name: 'find'}">
			查看更多....
		</router-link>
	</div>
</template>

<script>
import stateParseMixin from '@/utils/stateParseMixin';
import { mapActions, mapState } from 'vuex';
import ActivityLists from './ActivityLists';


export default {
	components: { ActivityLists },
	mixins: [stateParseMixin],
	data() {
		return {
			showActivityLists: 'online',
		};
	},
	computed: {
		...mapState('activity', { state: 'latestActivities' }),
		recommendItems() {
			if (this.isFulfill) {
				return this.state.payload.results;
			}
			return '';
		},

	},
	methods: {
		...mapActions('activity', ['getLatestActivities']),
		changeType() {
			if (this.showActivityLists === 'online') {
				this.showActivityLists = 'offline';
			} else {
				this.showActivityLists = 'online';
			}
		}
	},
	created() {
		this.getLatestActivities();
	}
}
</script>

<style type='text/less' lang='less'>
.home-activity {
	.ivu-card-body {
		padding: 4px;
	}

	.choose-tag {
		height: 60px;
		font-weight: 600;
		margin: 20px 0 15px 10px;
		background: transparent;
		border: none;
	}
}

.carousel {
	width: 95%;
	height: 300px;
	margin: 0 auto;
}
.carousel-img {
	width: 100%;
	height: 280px;
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
}

.more-link {
	padding: 0 10px 20px;
	display: block;
	text-align: center;
	font-size: 16px;
	letter-spacing: 3px;
	font-weight: 500;
	color: #659fdc;
}
</style>