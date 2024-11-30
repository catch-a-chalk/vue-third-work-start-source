<template>
  <app-layout
      :tasks="filteredTasks"
      :filters="state.filters"
      @update-tasks="updateTasks"
  >
    <router-view
        :tasks="filteredTasks"
        :filters="state.filters"
        @update-tasks="updateTasks"
        @apply-filters="applyFilters"
        @add-task="addTask"
        @edit-task="editTask"
        @delete-task="deleteTask"
    />
  </app-layout>
</template>

<script setup>
import { AppLayout } from '@/layouts'
import { useTasksStore, useColumnsStore, useUsersStore } from './stores'

// Определяем хранилища
const tasksStore = useTasksStore()
const usersStore = useUsersStore()
const columnStore = useColumnsStore()

// Загрузка первоначальных данных
// Загрузка задач
void tasksStore.fetchTasks()
// Загрузка пользователей
void usersStore.fetchUsers()
// Загрузка колонок
void useColumnsStore.fetchColumns()
</script>

<style lang="scss">
@import "@/assets/scss/app.scss";
</style>
