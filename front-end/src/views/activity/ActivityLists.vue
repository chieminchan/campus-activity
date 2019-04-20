<template>
  <div class='activity'>

    <template v-if="isFetching">
      <Spin size="large"></Spin>
    </template>

    <template v-else v-for="(item, index) in activityTypeLists">
      <Card class="activity-card" :bordered="false" :key="index">
        <router-link slot="title" :to="{ name: 'index-detail', params: {aid: item.activity_id} }">
          <h3 class="activity-title"> {{ item.activity_name }} </h3>
        </router-link>
        <span class="activity-status" slot="extra"> {{ status[item.current_status] }}</span>

        <p class="activity-deadline">{{ `报名截止时间： ${item.activity_enroll_deadline}` }}</p>

        <router-link :to="{ name: 'index-detail', params: {aid: item.activity_id} }">
          <div class="activity-poster" 
               :style="{ backgroundImage: 'url(' + item.activity_poster_front +')'}">
          </div>
        </router-link>

        <p class="activity-brief"> {{ item.activity_brief }} </p>
      </Card>
    </template>
  </div>
</template>

<script>
import stateParseMixin from '@/utils/stateParseMixin';
import { mapActions, mapState } from 'vuex';

export default {
  mixins: [stateParseMixin],
  data() {
    return {
      status: {
        'processing': '进行中',
        'over': '已结束',
        'waitting': '未开始'
      }
    };
  },
  props: {
    selectedType: {
      type: String,
      default: 'online'
    },
  },
  computed: {
    ...mapState('activity', { state: 'activityTypeLists' }),
    activityTypeLists() {
      if (this.isFulfill) {
        return this.state.payload.results;
      }
      return '';
    }
  },
  methods: {
    ...mapActions('activity', ['getActivityTypeLists']),
    load() {
      const type = this.selectedType;
      this.getActivityTypeLists({ type })
        .catch(() => {
          this.$Message.error('活动列表请求出现错误！');
        });
    },
  },
  created() {
    this.load();
  },
  watch: {
    selectedType(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.load();
      }
    }
  }
}
</script>

<style type='text/less' lang='less'>
@import "~@/css/vars.less";

.activity {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: baseline;

  &-card {
    width: 31.3%;
    margin-bottom: 30px;
    margin-right: 2%;
  }

  &-title {
    color: #484041;
  }
  
  &-status {
    font-weight: 600;
    color: #ee4b4b;
  }

  &-poster {
    width: 100%;
    height: 290px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    transition: all 0.2s ease-in;
  }

  &-deadline {
    padding: 0px 10px 10px;
    color: @color-primary;
    font-size: 14px;
    cursor: pointer;
  }

  &-brief {
    padding: 15px 10px;
    color: #736d6d;
  }

  .ivu-card-head {
    border-bottom: none;
  }
}
</style>