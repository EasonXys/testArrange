<template>
  <div class="edit__container">
    <Calendar />
    <a-divider type="vertical" />
    <Setting />
  </div>
</template>

<script setup lang="ts">
import Calendar from '../components/Calendar.vue'
import Setting from '../components/Setting.vue'

</script>

<style lang="scss" scoped>
.edit__container {
  display: flex;
  box-sizing: border-box;
  border: 1px solid #eee;
  height: 100vh;
  align-items: center;

}
</style>
