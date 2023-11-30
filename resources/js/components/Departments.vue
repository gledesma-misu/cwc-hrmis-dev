<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header bg-dark">
          <h5 class="float-start text-light">Departments List</h5>
          <button class="btn btn-success float-end" @click="createDepartment">
            New Department
          </button>
        </div>
        <div class="card-body">
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
                    Modal title
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
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="name">Name</label>
                        <input
                          type="text"
                          class="form-control"
                          name="name"
                          v-model="departmentData.name"
                        />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="director_id">Director</label>
                        <select
                          name="director_id"
                          class="form-control"
                          v-model="departmentData.director_id"
                        >
                          <option value="">Select a person</option>
                          <option value="1">IT Director</option>
                          <option value="2">HR Director</option>
                        </select>
                      </div>
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
                    @click="storeDepartment"
                    class="btn btn-success"
                  >
                    Store
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
      departmentData: {
        name: "",
        director_id: "",
      },
    };
  },
  methods: {
    getDepartments(){
        axios.get(`${window.url}api/getDepartments`).then((response) => {
            console.log(response.data)
        })
    },
    createDepartment() {
        this.departmentData.name = this.departmentData.director_id = ''
      $("#exampleModal").modal("show");
    },
    storeDepartment() {
        axios.post(window.url + 'api/storeDepartment', this.departmentData)
        .then((response) => {
            $("#exampleModal").modal("show");
        })
    },
    
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
</style>