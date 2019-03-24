<template>
  <section class="comment">
    <h3 class="comment-title">评论</h3>

    <div class="comment-form">
      <Form>
        <FormItem>
          <Input class="comment-text" type="text">
          </Input>
          <Button type="primary">评 论</Button>
        </FormItem>
      </Form>
    </div>

    <div class="comment-list">

    </div>

  </section>
</template>

<script>

export default {
  components: {},
  data() {
    return {
      commentText: '',
    };
  },
  computed: {},
  methods: {},
  mounted() { },
}
</script>
<style type='text/less' lang='less'>
.comment {
  &-title {
    font-size: 16px;
    text-align: center;
    font-weight: 500;
    margin-top: 30px;
    color: #8a9aa9;
    letter-spacing: 5px;
  }

  &-form {
    padding: 3px 0 3px 3%;
    background: #ffffff;
    input {
      width: 100%;
      height: 45px;
      border: 1px solid #585b5e59;
      background: #f4f4f473;
      border-radius: 4px;
    }
  }

  &-text {
    width: 90%;
    margin-right: 1%;
  }
}
</style>