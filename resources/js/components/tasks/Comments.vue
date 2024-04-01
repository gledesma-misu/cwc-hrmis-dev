<template>
  <div
    class="modal fade"
    id="commentsModal"
    tabindex="-1"
    aria-labelledby="commentsModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-md modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="commentsModalLabel">
            Comments List {{ taskInfo.title }}
          </h5>

          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-12">
              <div v-for="(comment, index) in comments" :key="index">
                <div class="d-flex justify-content-between">
                  <p><strong>{{ comment.user.name }}: </strong> {{ comment.comment }}</p>
                </div>
                <div class="comments-line"></div>
              </div>
              <p v-if="comments.length == 0"> No Comments Yet</p>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <label for="comment">Comment</label>
                <textarea
                  rows="3"
                  class="form-control"
                  v-model="commentData.comment"
                ></textarea>
                <div
                  class="text-danger"
                  v-if="commentData.errors.has('comment')"
                  v-html="commentData.errors.get('comment')"
                />
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-between">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-success" @click="storeComment">
              Submit Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["taskInfo", "comments"],
  mounted() {
    this.$store.dispatch("getAuthRolesAndPermissions");
    this.current_user = window.auth_user
    window.emitter.on("resetCommentData", () => {
      this.commentData.reset();
      this.commentData.clear();
    });
  },
  computed: {
    current_roles() {
      return this.$store.getters.current_roles;
    },
    current_permissions() {
      return this.$store.getters.current_permissions;
    },
  },
  data() {
    return {
      editMode: false,
      current_user: {},
      commentData: new Form({
        id: "",
        task_id: "",
        comment: "",
      }),
    };
  },
  methods: {
    storeComment() {
      this.commentData.task_id = this.taskInfo.id;
      this.$store.dispatch("storeComment", this.commentData);
    },
  },
};
</script>

<style  scoped>
  .comments-line{
    width: 100%;
    margin-bottom: 10px;
    border: 1px solid lightgray;
  }
</style>>