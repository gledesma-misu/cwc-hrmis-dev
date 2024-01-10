<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header bg-dark">
          <h5 class="float-start text-light">Users List</h5>
          <button
            class="btn btn-success float-end"
            @click="createUser"
            v-if="current_permissions.has('users-create')"
          >
            New User
          </button>
        </div>
        <div class="card-body">
          <!-- <button @click="testAction" class="btn btn-info">Test</button> -->
          <!-- {{ test }} -->
          <div class="table-responsive">
            <!-- <table class="table table-hover text-center">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th
                      v-if="
                        current_permissions.has(
                          'departments-update' || has('departments-delete')
                        )
                      "
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(department, index) in departments" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ department.name }}</td>
  
                    <td
                      v-if="
                        current_permissions.has(
                          'departments-update' || has('departments-delete')
                        )
                      "
                    >
                      <button
                        class="btn btn-success mx-1"
                        @click="editDepartment(department)"
                      >
                        <i class="fa fa-edit"></i>
                        Edit
                      </button>
                      <button
                        class="btn btn-danger mx-1"
                        @click="deleteDepartment(department)"
                      >
                        <i class="fa fa-trash"></i>
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table> -->
          </div>

          <!-- Modal -->
          <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    {{ !editMode ? "Create User" : "Update User" }}
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
                    <div class="col-md-3">
                        
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    @click="!editMode ? storeUser() : updateUser()"
                    class="btn btn-success"
                  >
                    {{ !editMode ? "Store" : "Save Changes" }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
export default {
  data() {
    return {
      editMode: false,

      userData: new Form({
        id: "",
        name: "",
      }),
    };
  },
  methods: {
    createUser() {
      this.editMode = false;
      this.userData.name = "";
      $("#exampleModal").modal("show");
    },
    storeUser() {
      //   this.departmentData.name == ""
      //     ? (this.departmentErrors.name = true)
      //     : (this.departmentErrors.name = false);
      //   this.departmentData.director_id == ""
      //     ? (this.departmentErrors.director_id = true)
      //     : (this.departmentErrors.director_id = false);

      //   if (this.departmentData.name && this.departmentData.director_id) {

      this.$store.dispatch("storeDepartment", this.departmentData);
      //   }
    },
    editUser(user) {
      this.editMode = true;
      this.departmentData.id = department.id;
      this.departmentData.name = department.name;
      $("#exampleModal").modal("show");
    },
    updateUser() {
      //   this.departmentData.name == ""
      //     ? (this.departmentErrors.name = true)
      //     : (this.departmentErrors.name = false);
      //   this.departmentData.director_id == ""
      //     ? (this.departmentErrors.director_id = true)
      //     : (this.departmentErrors.director_id = false);

      //   if (this.departmentData.name && this.departmentData.director_id) {
      this.$store.dispatch("updateDepartment", this.departmentData);
      //   }
    },
    deleteUser(user) {
      this.$store.dispatch("deleteDepartment", department);
    },
    // testAction() {
    //   this.$store.dispatch("testAction");
    // },
  },
  mounted() {
    this.$store.dispatch("getDepartments");
    this.$store.dispatch("getAuthRolesAndPermissions");
  },
  computed: {
    // test() {
    //   return this.$store.getters.test;
    // },

    current_roles() {
      return this.$store.getters.current_roles;
    },
    current_permissions() {
      return this.$store.getters.current_permissions;
    },
  },
};
</script>
  
  <style lang="scss" scoped></style>