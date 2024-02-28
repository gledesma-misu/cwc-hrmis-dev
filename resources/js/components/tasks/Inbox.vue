<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header bg-dark">
          <h5 class="float-start text-light">Inbox Tasks List</h5>

        </div>
        <div class="card-body">
          <!-- search filter -->
          <div class="row">
            <div class="col-md-3">
              <div class="form-group">
                <label for="search_type">Search Type</label>
                <select name="search_type" class="form-control" v-model="searchData.search_type">
                  <option value="name">Name</option>
                </select>
              </div>
            </div>
            <div class="col-md-3">
              <div class="form-group">
                <label for="search_value">Search Value</label>
                <input type="text" name="search_value" class="form-control" v-model="searchData.search_value"
                  @keyup="searchDepartment" />
              </div>
            </div>
          </div>
          <!-- <button @click="testAction" class="btn btn-info">Test</button> -->
          <!-- {{ test }} -->
          <div class="table-responsive">
            <table class="table table-hover text-center">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Priority</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Description</th>
                  <th>Assign To</th>
                  <th v-if="current_permissions.has('inbox-update')">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(  task, index  ) in inbox_tasks.data  " :key="index">
                  <td>{{ index + 1 }}</td>
                  <td>{{ task.title }}</td>
                  <td>
                    <span :class="`badge ${task.priority === 'Urgent'
                        ? 'badge-danger'
                        : 'badge-success'
                      }`
                      ">
                      {{ task.priority }}
                    </span>
                  </td>
                  <td>{{ task.start_date }}</td>
                  <td>{{ task.end_date }}</td>
                  <td>
                    {{
                      task.description.length <= 10 ? task.description : task.description.substr(0, 10) + "..." }} </td>
                  <td>{{ task.users.length }} Staff Member/s</td>
                  <td v-if="current_permissions.has(
                    'inbox-update'
                  )
                    ">
                    <button class="btn btn-success mx-1" @click="editTask(task)">
                      <i class="fa fa-edit"></i>
                      Edit
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- pagination -->
          <div class="d-flex justify-content-center" v-if="inboxTasksLinks.length > 3">
            <nav aria-label="Page navigation example">
              <ul class="pagination">
                <li :class="`page-item ${link.active ? 'active' : ''} ${!link.url ? 'disabled' : ''
                  }`
                  " v-for="(  link, index  ) in   inboxTasksLinks  " :key="index">
                  <a class="page-link" href="#" v-html="link.label" @click.prevent="getResults(link)"></a>
                </li>
              </ul>
            </nav>
          </div>

          <!-- Modal -->

        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  mounted() {
    this.$store.dispatch("getInboxTasks");
    this.$store.dispatch("getAuthRolesAndPermissions");
  },
  computed: {
    inboxTasksLinks() {
      return this.$store.getters.inboxTasksLinks;
    },
    inbox_tasks() {
      return this.$store.getters.inbox_tasks;
    },
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

      taskData: new Form({
        id: "",
        title: "",
        priority: "",
        start_date: "",
        end_date: "",
        description: "",
        assign_to: [],
      }),
      searchData: {
        search_type: "name",
        search_value: "",
      },
    };
  },
  methods: {
    getResults(link) {
      if (!link.url || link.active) {
        return;
      } else {
        this.$store.dispatch("getInboxTasksResults", link);
      }
    },
  }
};
</script>