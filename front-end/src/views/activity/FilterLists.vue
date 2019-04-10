<template>
  <div class='filter-lists'>
    <ul class='activity-items'>
      <template v-for="(item, index) in lists">
        <li class="activity-item">
          <div class="activity-poster" :style="{ backgroundImage: 'url(' + item.activity_poster_front +')'}">
          </div>
          <div class="activity-info">
            <router-link :to="{ name: 'find-detail', params: {aid: item.activity_id} }">
              <h3 class="activity-title"> {{ item.activity_name }} </h3>
            </router-link>

            <p class="activity-deadline">{{ `报名截止时间： ${item.activity_enroll_deadline}` }}</p>

            <p class="activity-times">{{ `活动时间： ${item.activity_start} - ${item.activity_end} ` }}</p>

            <p class="activity-address">{{ `活动地点： ${item.activity_address}` }}</p>

            <p class="activity-brief"> {{ item.activity_brief }}</p>
          </div>

        </li>
      </template>
    </ul>

  </div>
</template>

<script>

export default {
  components: {},
  props: {
    lists: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {};
  },
  computed: {
  },
  methods: {},
  mounted() { },
}
</script>
<style type='text/less' lang='less'>
.activity {
  &-item {
    width: 100%;
    height: 260px;
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
}
</style>