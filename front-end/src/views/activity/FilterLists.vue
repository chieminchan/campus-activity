<template>
	<div class='filter-lists'>
		<ul class='activity-items'>
			<template v-for="(item, index) in lists">
				<li class="activity-item" :key=index>
					<div class="activity-poster" :style="{ backgroundImage: 'url(' + item.activity_poster_front +')'}">
					</div>
					<div class="activity-info">
						<router-link :to="{ name: 'find-detail', params: {aid: item.activity_id} }">
							<h3 class="activity-title"> {{ item.activity_name }} </h3>
						</router-link>

						<template v-if="item.activity_score_value">
               <Rate class="activity-score" disabled v-model="item.activity_score_value" />
						</template>
						<template v-else>
               <Rate class="activity-score" disabled v-model="initalScore" />
						</template>

						<p class="activity-brief"> {{ item.activity_brief }}</p>

						<p class="activity-deadline">
              <span class="activity-tag">报名截止时间：</span>
              {{ item.activity_enroll_deadline }}
            </p>

						<p class="activity-times">
              <span class="activity-tag">活动时间：</span>
              {{ ` ${item.activity_start} - ${item.activity_end} ` }}
            </p>

						<template v-if="item.activity_type === 'offline'">
							<p class="activity-address">
                <span class="activity-tag">活动地点： </span>
                {{ item.activity_address }}
              </p>
						</template>
					</div>

				</li>
			</template>
		</ul>

	</div>
</template>

<script>

export default {
	props: {
		lists: {
			type: Array,
			default: () => []
		}
	},
	data() {
		return {
      initalScore: 0.0
    };
	},
}
</script>
<style type='text/less' lang='less'>
.activity {
	&-item {
    position: relative;
		width: 100%;
		height: 270px;
		display: flex;
		justify-content: flex-start;
		padding: 20px 35px;
		margin-bottom: 20px;
		border: 2px solid transparent;
		border-bottom: 1px solid #ccc;
		border-radius: 5px;
		transition: all 0.2s ease-in;
	}

	&-item:hover {
		border: 2px solid #2d8cf0;
	}

	&-items:first-child {
		margin-top: 50px;
	}

	&-poster {
		width: 45%;
		height: 220px;
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
	}

	&-info {
		width: 50%;
		margin-left: 20px;
		p {
			line-height: 50px;
		}
	}

	&-score {
		font-size: 15px;
		height: 40px;
		line-height: 40px;
    padding: 1px 30px !important;
    position: absolute;
    right: 15px;
    top: 5px;
  }
  
  &-brief, &-tag {
    font-weight: 500;
    font-size: 15px;
  }
  &-brief {
    color: #3e405d;
  }
}
</style>