import axios from "axios";

export default {
    state: {
        // departments_test: 0,
        tasks: [],
        inbox_tasks: [],
        tasksLinks: [],
        inboxTasksLinks: [],
        completed_tasks: [],
        completedTaskLinks: []
    },
    getters: {
        tasks(state) {
            return state.tasks;
        },
        tasksLinks(state) {
            return state.tasksLinks;
        },
        inbox_tasks(state) {
            return state.inbox_tasks;
        },
        inboxTasksLinks(state) {
            return state.inboxTasksLinks;
        },
        completed_tasks(state) {
            return state.completed_tasks;
        },
        completedTaskLinks(state) {
            return state.completedTaskLinks;
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
            state.inbox_tasks = data;

            state.inboxTasksLinks = [];

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
                    state.inboxTasksLinks.push(data.links[i]);
                }
            }
        },
        set_completed_tasks: (state, data) => {
            state.completed_tasks = data;

            state.completedTaskLinks = [];

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
                    // console.log(data)
                    state.completedTaskLinks.push(data.links[i]);
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
        getInboxTasksResults: (context, link) => {
            axios.get(link.url).then((response) => {
                // console.log(response.data);
                context.commit("set_inbox_tasks", response.data);
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
        getCompletedTasks: (context) => {
            axios.get(`${window.url}api/getCompletedTasks`).then((response) => {
                // console.log(response.data);
                context.commit("set_completed_tasks", response.data);
            });
        },
        storePerformTask: (context,data) =>{
            axios.post(window.url + "api/storePerformTask", data.performTaskData, data.config).then((response) => {
                // this.getDepartments();
                context.dispatch('getInboxTasks')
                context.dispatch('getCompletedTasks')
                $("#exampleModal").modal("hide");
                $("#task_file").val('');
                window.Toast.fire({
                    icon: "success",
                    title: "Task performance stored successfully!",
                });
            });
        },
        storeTask: (context, taskData) => {
            taskData.post(window.url + "api/storeTask").then((response) => {
                // this.getDepartments();
                context.dispatch('getTasks')
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
