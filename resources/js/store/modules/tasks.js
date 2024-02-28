import axios from "axios";

export default {
    state: {
        // departments_test: 0,
        tasks: [],
        tasksLinks: [],
    },
    getters: {
        tasks(state) {
            return state.tasks;
        },
        tasksLinks(state) {
            return state.tasksLinks;
        },
       
    },
    mutations: {
        set_tasks: (state, data) => {
            state.tasks = data;

            state.tasksLinks = [];

            for (let i = 0; i < data.links.length; i++) {
                if (
                    i === 1 ||
                    i === Number(data.links.length - 2) ||
                    data.links[i].active ||
                    isNaN(data.links[i].label) ||
                    Number(data.links[i].label) ===
                        Number(data.current_page + 1) ||
                    Number(data.links[i].label) ===
                        Number(data.current_page - 1)
                ) {
                    state.tasksLinks.push(data.links[i]);
                }
            }
        },
        set_inbox_tasks: (state, data) => {
            state.tasks = data;
            console.log(data);
            state.tasksLinks = [];

            for (let i = 0; i < data.links.length; i++) {
                if (
                    i === 1 ||
                    i === Number(data.links.length - 2) ||
                    data.links[i].active ||
                    isNaN(data.links[i].label) ||
                    Number(data.links[i].label) ===
                        Number(data.current_page + 1) ||
                    Number(data.links[i].label) ===
                        Number(data.current_page - 1)
                ) {
                    state.tasksLinks.push(data.links[i]);
                }
            }
        },
    },
    actions: {
        // searchDepartment: (context, searchData) => {
        //     setTimeout(function(){
        //         axios.get(`${window.url}api/searchDepartment?${searchData.search_type}=${searchData.search_value}`).then((response) => {
        //             context.commit("set_departments", response.data);
        //         }).catch(err => {
        //             console.log(err);
        //         });
        //     })
        // },
        getTasksResults: (context, link) => {
            axios.get(link.url).then((response) => {
                // console.log(response.data);
                context.commit("set_tasks", response.data);
                // console.log(response.data);
            });
        },
        getTasks: (context) => {
            axios.get(`${window.url}api/getTasks`).then((response) => {
                // console.log(response.data);
                context.commit("set_tasks", response.data);
            });
        },
        getInboxTasks: (context) => {
            axios.get(`${window.url}api/getInboxTasks`).then((response) => {
                // console.log(response.data);
                context.commit("set_inbox_tasks", response.data);
            });
        },
        storeTask: (context, taskData) => {
            taskData.post(window.url + "api/storeTask").then((response) => {
                // this.getDepartments();
                // context.dispatch('getTasks')
                $("#exampleModal").modal("hide");
                window.Toast.fire({
                    icon: "success",
                    title: "Task created successfully!",
                });
            });
        },
        updateTask: (context, taskData) => {
            taskData
                .post(
                    window.url +
                        "api/updateTask/" +
                        taskData.id
                )
                .then((response) => {
                    context.dispatch('getTasks')
                    $("#exampleModal").modal("hide");
                });

                window.Toast.fire({
                    icon: "success",
                    title: "Task updated successfully!"
                  });

        },
        deleteTask: (context, taskData) => {
            // if (confirm("Are you sure you wanna delete this department?")) {
                axios
                  .post(window.url + "api/deleteTask/" + taskData.id)
                  .then(() => {
                    context.dispatch('getTasks')
                    window.Toast.fire({
                        icon: "success",
                        title: "Task deleted successfully!"
                      });
                  });
            //   }
        }
    },
};
