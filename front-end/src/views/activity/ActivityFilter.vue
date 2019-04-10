<template>
  <Card class="filter-page">
    <div class="filter-items">
      <p class="filter-item activity-types">
        <span class="label">活动类型：</span>
        <RadioGroup v-model="activityType" type="button" size="large">
          <Radio label="all">
            <span>全部</span>
          </Radio>
          <Radio label="online">
            <span>线上活动</span>
          </Radio>
          <Radio label="offline">
            <span>线下活动</span>
          </Radio>
        </RadioGroup>
      </p>
      <p class="filter-item activity-status">
        <span class="label">活动状态：</span>
        <RadioGroup v-model="activityStatus" type="button" size="large">
          <Radio label="all">
            <span>全部</span>
          </Radio>
          <Radio label="waitting">
            <span>未开始</span>
          </Radio>
          <Radio label="processing">
            <span>进行中</span>
          </Radio>
          <Radio label="over">
            <span>已结束</span>
          </Radio>
        </RadioGroup>
      </p>
    </div>

    <template v-if="isFetching">
      <Spin size="large"></Spin>
    </template>
    <template v-else>
      <FilterLists :lists="allActivities"></FilterLists>
    </template>

    <Page class="pagination" :total=totalPgae :current="currentPage" :page-size-opts="pageOpts" :page-size="pageSize" @on-change="changePage" show-elevator show-sizer />
  </Card>
</template>

<script>
import stateParseMixin from '@/utils/stateParseMixin';
import { mapState, mapActions } from 'vuex';
import FilterLists from './FilterLists';

export default {
  components: { FilterLists },
  mixins: [stateParseMixin],
  data() {
    return {
      activityType: 'all',
      activityStatus: 'all',
      currentPage: 1,
      pageOpts: [3, 5, 10, 20],
      pageSize: 5
    };
  },
  computed: {
    ...mapState('activity', { state: 'activities' }),
    allActivities() {
      if (this.isFulfill) {
        return this.state.payload.results.data;
      }
      return [];
    },
    totalPgae() {
      if (this.isFulfill) {
        return this.state.payload.results.totalPgae;
      }
      return 0;
    }
  },
  methods: {
    ...mapActions('activity', ['getActivities']),
    load() {
      const { activityType, activityStatus, currentPage, pageSize } = this;
      this.getActivities({ activityType, activityStatus,currentPage, pageSize })
        .catch(() => {
          this.$Message.error('活动列表请求出现错误！');
        });
    },
    changePage(currentIndex) {
      this.currentPage = currentIndex;
      this.load();
    }
  },
  mounted() {
    this.load();
  },
  watch: {
    activityType(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.load();
      }
    },
    activityStatus(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.load();
      }
    },

  }
}
</script>
<style type='text/less' lang='less'>
.filter {
  &-page {
    width: 100%;
    padding: 0 3% 1%;
    margin-top: 30px;
  }

  &-items {
    font-size: 14px;
    .label {
      font-weight: 500;
    }
  }

  &-item {
    margin-top: 30px;
  }
}
.pagination {
  margin-top: 50px;
  text-align: center;
}
</style>