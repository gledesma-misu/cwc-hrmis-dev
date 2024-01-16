import axios from "axios";

export default {
    state: {
        users: {},
    },
    getters: {
        users(state){
            return state.users
        }
    },
    mutations: {
        set_users: (state,data) => {
            state.users = data
        }
    },
    actions: {
        getUsers: (context) => {
            axios.get(`${window.url}api/getUsers`).then((response) => {
                // console.log(response.data);
                context.commit("set_users", response.data);
                console.log(response.data);
            });
        },
        storeUser: (context, userData) => {
            userData
                .post(window.url + "api/storeUser")
                .then((response) => {
                    // context.dispatch("getUsers");
                    console.log(response.data);
                    $("#exampleModal").modal("hide");
                });
        },
        updateUser: (context, userData) => {
            userData
                .post(
                    window.url +
                        "api/updateUser/" +
                        userData.id
                )
                .then((response) => {
                    context.dispatch('getUsers')
                    $("#exampleModal").modal("hide");
                });
        },

        deleteUser: (context, userData) => {
            if (confirm("Are you sure you wanna delete this user?")) {
                axios
                  .post(window.url + "api/deleteUser/" + userData.id)
                  .then(() => {
                    context.dispatch('getUsers')
                  });
              }
        }
    },
};
