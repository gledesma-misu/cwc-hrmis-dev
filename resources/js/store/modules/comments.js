import axios from "axios";

export default {
    state: {
        comments: {},
    },
    getters: {
        comments(state){
            return state.comments
        }
    },
    mutations: {
        set_comments: (state, data) => {
            state.comments = data
        }
    },
    actions: {
        getComments: (context, data) => {
            axios.get(`${window.url}api/getComments/${data.taskData.id}`).then((response) => {
                // console.log(response.data);
                context.commit("set_comments", response.data);
            });
        },
        storeComment: (context, commentData) => {
            commentData
                .post(window.url + "api/storeComment")
                .then((response) => {
                    // this.getDepartments();
                    context.dispatch("getComments", {taskData: {id: commentData.task_id}});
                    window.emitter.emit('resetCommentData');
                    window.Toast.fire({
                        icon: "success",
                        title: "Comment created successfully!",
                    });
                });
        },
        updateComment: (context, commentData) => {
            commentData
                .post(window.url + "api/updateComment/" + commentData.id)
                .then((response) => {
                    // this.getDepartments();
                    context.dispatch("getComments", {taskData: {id: commentData.task_id}});
                    window.emitter.emit('resetCommentData');
                    window.Toast.fire({
                        icon: "success",
                        title: "Comment updated successfully!",
                    });
                });
        },
        deleteComment: (context, commentData) => {
            axios
                .post(window.url + "api/deleteComment/" + commentData.id)
                .then((response) => {
                    // this.getDepartments();
                    context.dispatch("getComments", {taskData: {id: commentData.task_id}});
                    window.Toast.fire({
                        icon: "success",
                        title: "Comment deleted successfully!",
                    });
                });
        },
        
        
    },
};
