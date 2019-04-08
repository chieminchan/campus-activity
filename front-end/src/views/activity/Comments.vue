<template>
  <section class="comment">
    <h3 class="comment-title">评论</h3>

    <Card class="comment-card">

      <Form class="comment-form">
        <FormItem>
          <Input class="comment-text" type="text" v-model="commentText">
          </Input>
          <Button type="primary" @click.prevent="updateComment">评 论</Button>
        </FormItem>
      </Form>

      <ul class="comment-lists">
        <template v-for="(item, index) in commentsData">
          <li class="comment-item" :key="index">

            <!-- 评论人头像 -->
            <template v-if="item.comment_user_sex === '男'">
              <Avatar class="user-avatar boy-avatar" size="large" :loading="isFetching" src="https://i.loli.net/2019/04/01/5ca1dbef3e9cd.png">
              </Avatar>
            </template>
            <template v-else>
              <Avatar class="user-avatar girl-avatar" size="large" :loading="isFetching" src="https://i.loli.net/2019/04/01/5ca1dbef40320.png">
              </Avatar>
            </template>

            <!-- 评论内容 -->
            <div class="comment-content">
              <p class="comment-header">
                <span class="comment-user">{{ item.comment_user_name }}</span>
                <span class="comment-time">{{ item.comment_time | formatTime }}</span>
              </p>
              <p class="comment-text"> {{ item.comment_content }}</p>

              <!-- 评论回复框 -->
              <Collapse class="comment-collapse" accordion>
                <Panel class="comment-panel" hide-arrow=true>
                  <i class="fa fa-comments icon" aria-hidden="true"></i>
                  回复
                  <Form slot="content" class="reply-form">
                    <FormItem>
                      <Input class="reply-text" type="text" v-model="replyText">
                      </Input>
                      <Button type="primary" @click="updateTopReply(item)">回复</Button>
                    </FormItem>
                  </Form>
                </Panel>
              </Collapse>
            </div>

            <!-- 回复内容 -->
            <div class="comment-reply">
              <template v-for="(replyItem, replyIndex) in item.replyInfo">
                <div class="reply-item" :key="replyIndex">
                  <!-- 回复人头像 -->
                  <template v-if="replyItem.reply_user_sex === '男'">
                    <Avatar class="user-avatar boy-avatar" size="large" :loading="isFetching" src="https://i.loli.net/2019/04/01/5ca1dbef3e9cd.png">
                    </Avatar>
                  </template>
                  <template v-else>
                    <Avatar class="user-avatar girl-avatar" size="large" :loading="isFetching" src="https://i.loli.net/2019/04/01/5ca1dbef40320.png">
                    </Avatar>
                  </template>

                  <!-- 回复内容 -->
                  <div class="reply-content">
                    <p class="reply-header">
                      <span class="reply-user">{{ replyItem.reply_user_name }}</span>
                      <span class="reply-time">{{ replyItem.reply_time | formatTime }}</span>
                    </p>
                    <p class="reply-text">
                      回复
                      <span class="reply-target">{{ replyItem.reply_target_name }}</span> :
                      <span>{{ replyItem.reply_content }}</span>
                    </p>

                    <!-- 回复框 -->
                    <Collapse class="reply-collapse" simple accordion>
                      <Panel class="reply-panel" hide-arrow=true>
                        <i class="fa fa-comments icon" aria-hidden="true"></i>
                        回复
                        <Form slot="content" class="reply-form">
                          <FormItem>
                            <Input class="reply-text" type="text" v-model="replyText">
                            </Input>
                            <Button type="primary" @click="updateSubReply(replyItem)">回复</Button>
                          </FormItem>
                        </Form>
                      </Panel>
                    </Collapse>

                  </div>
                </div>
              </template>
            </div>

          </li>
        </template>
      </ul>
    </Card>

  </section>
</template>

<script>
import moment from 'moment';
import { mapState, mapActions } from 'vuex';
import stateParseMixin from '@/utils/stateParseMixin';
import { addActivityComment, addActivityReply } from '@/store/api/activity';

export default {
  components: {},
  mixins: [stateParseMixin],
  data() {
    return {
      commentText: '',
      replyText: '',
    };
  },
  filters: {
    formatTime(time) {
      return moment(time).format("Y-MM-DD HH:mm:ss");
    }
  },
  computed: {
    ...mapState('activity', { state: 'activityComments' }),
    ...mapState({ user: 'profile' }),
    commentsData() {
      if (this.isFulfill) {
        return this.state.payload.results;
      }
      return [];
    }
  },
  methods: {
    ...mapActions('activity', ['getActivityComments']),
    load() {
      const { params: { aid } } = this.$route;
      this.getActivityComments({ activityId: aid });
    },
    updateComment() {
      const { params: { aid } } = this.$route;
      const userId = this.user.payload.results[0].user_id;
      const commentTime = moment().format('YYYY-MM-DD HH:mm:ss');
      const params = {
        activityId: aid,
        userId,
        commentContent: this.commentText,
        commentTime      };
      addActivityComment(params)
        .then(() => {
          this.commentText = '';
          this.$Message.success('评论成功！');
          this.load();
        })
        .catch(() => {
          this.$Message.error('评论失败！');
        });
    },
    updateTopReply(row) {
      const userId = this.user.payload.results[0].user_id;
      const replyTime = moment().format('YYYY-MM-DD HH:mm:ss');
      const params = {
        replyCommentId: row.comment_id,
        userId,
        targetId: row.comment_user_id,
        replyContent: this.replyText,
        replyTime
      };
      addActivityReply(params)
        .then(() => {
          this.replyText = '';
          this.load();
        })
        .catch(() => {
          this.$Message.error('回复失败！');
        });
    },
    updateSubReply(row) {
      const userId = this.user.payload.results[0].user_id;
      const replyTime = moment().format('YYYY-MM-DD HH:mm:ss');
      const params = {
        replyCommentId: row.reply_comment_id,
        userId,
        targetId: row.reply_user_id,
        replyContent: this.replyText,
        replyTime
      };
      addActivityReply(params)
        .then(() => {
          this.replyText = '';
          this.load();
        })
        .catch(() => {
          this.$Message.error('回复失败！');
        });
    },
  },
  created() {
    this.load();
  },
}
</script>
<style type='text/less' lang='less'>
.comment {
  padding: 0 5%;

  &-card {
    padding: 1% 3%;
  }

  &-title {
    font-size: 16px;
    text-align: center;
    font-weight: 500;
    margin-top: 30px;
    margin-bottom: 10px;
    color: #8a9aa9;
    letter-spacing: 5px;
  }

  &-form,
  .reply-form {
    padding: 1px 0 1px 3%;
    background: #fafbfc;
    border-radius: 6px;
    input {
      width: 97%;
      height: 38px;
      border: 1px solid #585b5e59;
      border-radius: 4px;
    }
  }

  &-text,
  .reply-text {
    width: 90%;
  }

  &-item,
  .reply-item {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 2% 0 0 3%;
    border-bottom: 1px solid #f1f1f1;
    .user-avatar {
      display: inline-block;
      width: 45px;
      height: 45px;
      margin-right: 15px;
      background-color: transparent !important;
    }
  }

  &-header,
  .reply-header {
    margin-bottom: 10px;
  }

  &-user,
  .reply-user {
    font-size: 15px;
    font-weight: 500;
    color: #202727;
  }

  &-time,
  .reply-time {
    font-size: 14px;
    margin-left: 35px;
    color: #9eaab5;
  }

  &-content,
  .reply-content {
    width: 90%;
  }

  &-reply {
    width: 99%;
    text-align: left;
    margin: 10px 0;
  }
}

.reply {
  &-item {
    background: #fafbfc;
  }

  &-item:nth-last-child(1) {
    border: none !important;
    margin-bottom: 10px;
  }

  &-target {
    color: #2b7dd4;
  }

  &-btn {
    cursor: pointer;
    width: 100%;
    text-align: right;
    padding: 0 0 5px;
  }
}

.reply-collapse,
.comment-collapse {
  background: transparent;
  border: none;
}

.reply-panel,
.comment-panel {
  .ivu-collapse-header {
    text-align: right;
    border: none;
    line-height: 1;
    .icon {
      margin-right: 4px !important;
    }
  }
  .ivu-collapse-content {
    background: transparent;
  }
}
</style>