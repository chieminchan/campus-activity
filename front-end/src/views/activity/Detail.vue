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
          <Button class="btn" icon="md-heart" type="primary" size="large" @click.prevent="deleteCollection">已收藏</Button>
        </template>
        <template v-else>
          <Button class="btn" icon="md-heart-outline" type="primary" size="large" @click.prevent="addCollection"
            ghost>收藏</Button>
        </template>

        <template v-if="hasEnroll">
          <Button class="btn" icon="ios-sunny" type="warning" size="large" @click.prevent="deleteEnroll"
            :disabled=hasEnroll>已报名</Button>
          <template v-if="activityInfo.activity_type === 'online'">
            <Button class="btn" icon="md-paper-plane" type="success" size="large">提交电子作品</Button>
          </template>
        </template>
        <template v-else>
          <Button class="btn" icon="ios-sunny-outline" type="warning" size="large" @click.prevent="addEnroll"
            ghost>立即报名</Button>
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
      updateScore({ score: this.score, activityId: aid });
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
      const { userId } = this;
      const { params: { aid } } = this.$route;

      this.$Modal.confirm({
        title: ' 确认报名',
        content: '<p>确定要参与报名吗？</p>',
        onOk: () => {
          updateActivityEnroll({ userId, activityId: aid })
            .then(() => {
              this.hasEnroll = true;
              this.$Message.success('报名成功！');
            })
            .catch(() => {
              this.$Message.error('报名失败！');
            });
        },
        onCancel: () => {
          this.$Message.info('取消报名');
        }
      });
    },
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
  padding: 0 5%;
  .title {
    margin: 10px;
    font-weight: 500;
  }

  .ivu-card-body {
    padding: 30px;
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

.action-btn {
  margin-top: 50px;
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
}
</style>