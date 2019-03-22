<template>
  <section class="detail">
    <Card>
      <!-- 标题 -->
      <h1 slot="title" class="title">
        {{ activityInfo.activity_name }}
        <span class="status">
          {{ status[activityInfo.activity_status] }}
        </span>
      </h1>

      <!-- 评分 -->
      <Rate slot="extra" show-text allow-half v-model="activityScore" :disabled=disableScore
        @on-change="getScore">
      </Rate>

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

      <!-- 报名和收藏 -->
      <div class="action-btn">

        <template v-if="hasCollection">
          <Button type="info" size="large" @click.prevent="deleteCollection">已收藏</Button>
        </template>
        <template v-else>
          <Button type="info" size="large" @click.prevent="addCollection" ghost>收藏</Button>
        </template>

        <template v-if="hasEnroll">
          <Button type="warning" size="large" @click.prevent="deleteEnroll">已报名</Button>
        </template>
        <template v-else>
          <Button type="warning" size="large" @click.prevent="addEnroll" ghost>立即报名</Button>
        </template>
      </div>

    </Card>
  </section>
</template>

<script>
import _ from 'lodash';
import { mapState, mapActions } from 'vuex';
import stateParseMixin from '@/utils/stateParseMixin';
import LazyloadImg from '@/components/LazyloadImg';
import {  updateScore,
  removeActivityCollection,
  updateActivityCollection,
  removeActivityEnroll,
  updateActivityEnroll,
} from '@/store/api/activity';

export default {
  components: { LazyloadImg },
  mixins: [stateParseMixin],
  data() {
    return {
      status: {
        'processing': '进行中',
        'over': '已结束',
        'removed': '已下架'
      },
      score: 0,
      disableScore: false,
      hasCollection: false,
      hasEnroll: false,
    };
  },
  computed: {
    ...mapState('activity', { state: 'activityInfo' }),
    ...mapState({ userInfo: 'profile' }),
    userId() {
      if (this.userInfo.isFulfill) {
        return this.userInfo.payload.results[0].user_id;
      }
      return '';
    },
    activityInfo() {
      if (this.isFulfill) {
        return this.state.payload.results;
      }
      return '';
    },
    activityScore: {
      get() {
        if (this.isFulfill) {
          const score = this.state.payload.results.activity_score_value;
          return _.isNil(score) ? 0 : score;
        }
        return 0;
      },
      set(val) {
        this.score = val;
      }
    },
    activityAddition() {
      if (this.isFulfill) {
        const addition = this.state.payload.results.activity_addition;
        return _.isNil(this.score) ? {} : addition;
      }
      return {};
    },
  },
  methods: {
    ...mapActions('activity', ['getActivityInfo']),
    load() {
      const { params: { aid } } = this.$route;
      const { userId } = this;
      this.getActivityInfo({ userId, activityId: aid });
    },
    getScore(score) {
      this.score = score;
      this.disableScore = true;
      const { params: { aid } } = this.$route;

      updateScore({ score: this.score, id: aid });
    },
    addCollection() {
      this.hasCollection = true;
      const { userId } = this;
      const { params: { aid } } = this.$route;

      updateActivityCollection({ userId, activityId: aid })
        .then(() => {
          this.$Message.success('收藏成功！');
        })
        .catch(() => {
          this.$Message.error('收藏失败！');
        });

    },
    deleteCollection() {
      this.hasCollection = false;
      const { userId } = this;
      const { params: { aid } } = this.$route;

      removeActivityCollection({ userId, activityId: aid })
        .then(() => {
          this.$Message.success('取消收藏成功！');
        })
        .catch(() => {
          this.$Message.error('取消收藏失败！');
        });
    },
    addEnroll() {
      this.hasEnroll = true;
      const { userId } = this;
      const { params: { aid } } = this.$route;

      updateActivityEnroll({ userId, activityId: aid })
        .then(() => {
          this.$Message.success('报名成功！');
        })
        .catch(() => {
          this.$Message.error('报名失败！');
        });
    },
    deleteEnroll() {
      this.hasEnroll = false;
      const { userId } = this;
      const { params: { aid } } = this.$route;

      removeActivityEnroll({ userId, activityId: aid })
        .then(() => {
          this.$Message.success('取消报名成功！');
        })
        .catch(() => {
          this.$Message.error('取消报名失败！');
        });
    }
  },
  mounted() {
    if (this.userInfo.isFulfill) {
      this.load();
    }
  },
  watch: {
    userId() {
      this.load();
    },
    activityInfo(newVal) {
      this.hasCollection = newVal.hasCollection;
      this.hasEnroll = newVal.hasEnroll;
    },
  }
}
</script>

<style type='text/less' lang='less'>
.detail {
  margin-top: 20px;

  .title {
    margin: 10px;
    font-weight: 500;
  }

  .ivu-card-body {
    padding: 30px;
  }

  .poster {
    width: 100%;
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