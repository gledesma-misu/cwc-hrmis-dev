import axios from "axios";

export default {
    state: {},
    getters: {},
    mutations: {},
    actions: {
        storeUser: (context, userData) => {
            userData
                .post(window.url + "api/storeUser")
                .then((response) => {
                    // context.dispatch("getUsers");
                    $("#exampleModal").modal("hide");
                });
        },
    },
};
