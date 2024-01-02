import axios from "axios";

export default {
    state: {
        // departments_test: 0,
    },
    getters: {
        departments(state) {
            return state.departments;
        },
    },
    mutations: {
        set_departments: (state, data) => {
            state.departments = data;
        },
    },
    actions: {
        getDepartments: (context) => {
            axios.get(`${window.url}api/getDepartments`).then((response) => {
                // console.log(response.data);
                context.commit("set_departments", response.data);
            });
        },
        storeDepartment: (context, departmentData) => {
            departmentData
                .post(window.url + "api/storeDepartment")
                .then((response) => {
                    // this.getDepartments();
                    context.dispatch('getDepartments')
                    $("#exampleModal").modal("hide");
                });
        },
        updateDepartment: (context, departmentData) => {
            departmentData
                .post(
                    window.url +
                        "api/updateDepartment/" +
                        departmentData.id
                )
                .then((response) => {
                    context.dispatch('getDepartments')
                    $("#exampleModal").modal("hide");
                });
        },
        deleteDepartment: (context, departmentData) => {
            if (confirm("Are you sure you wanna delete this department?")) {
                axios
                  .post(window.url + "api/deleteDepartment/" + departmentData.id)
                  .then(() => {
                    context.dispatch('getDepartments')
                  });
              }
        }
    },
};
