<template>
  <h1>Inbox Tasks</h1>
</template>
<script>
export default {
    mounted() {
    this.$store.dispatch("getInboxTasks");
    this.$store.dispatch("getAuthRolesAndPermissions");
  },
  computed: {
    inboxTaskLinks() {
      return this.$store.getters.inboxTaskLinks;
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
};
</script>