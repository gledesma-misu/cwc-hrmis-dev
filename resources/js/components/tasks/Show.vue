<template>
  <div class="table-responsive">
    <table class="table">
      <tr>
        <th style="width: 20%">Title</th>
        <td>{{ taskInfo.title }}</td>
      </tr>
      <tr>
        <th style="width: 20%">Priority</th>
        <td>
          <span
            :class="`badge ${
              taskInfo.priority === 'Urgent' ? 'bg-danger' : 'bg-success'
            }`"
          >
            {{ taskInfo.priority }}
          </span>
        </td>
      </tr>
      <tr>
        <th style="width: 20%">Start Date</th>
        <td>{{ taskInfo.start_date }}</td>
      </tr>
      <tr>
        <th style="width: 20%">End Date</th>
        <td>{{ taskInfo.end_date }}</td>
      </tr>
      <tr>
        <th style="width: 20%">Description</th>
        <td>{{ taskInfo.description }}</td>
      </tr>
      <tr>
        <th style="width: 20%">Assigned To</th>
        <td>
          <span
            :class="`badge bg-dark mx-1`"
            v-for="(user, index) in taskInfo.users"
            :key="index"
          >
            {{ user.name }}
          </span>
        </td>
      </tr>
      <tr>
        <th style="width: 20%">Performed By</th>
        <td>
          <p>
            {{
              taskInfo.performed_by !== 0 ? taskInfo.performed_by?.name : "..."
            }}
          </p>
        </td>
      </tr>
      <tr>
        <th style="width: 20%">Progress</th>
        <td>
          <p>{{ taskInfo.progress }} %</p>
        </td>
      </tr>
      <tr>
        <th style="width: 20%">Result</th>
        <td>
          <p>
            {{ taskInfo.result ? taskInfo.result : 'No results yet!' }}
          </p>
        </td>
      </tr>
      <tr>
        <th style="width: 20%">Task File</th>
        <td>
          <a
            :href="`${url}public/tasks/${taskInfo.file}`"
            class="btn btn-success " v-if="taskInfo.file"
            target="_blank"
          >
          <i class="fa fa-download" ></i>
          </a>
          <p v-else>No file uploaded yet</p>
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  props: ["taskInfo"],
  data() {
    return {
      url: "",
    };
  },
  mounted() {
    this.url = window.url;
  },
};
</script>