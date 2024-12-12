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
import { useTasksStore, useColumnsStore, useUsersStore, useCommentsStore, useTicksStore } from './stores'

// Определяем хранилища
const tasksStore = useTasksStore()
const usersStore = useUsersStore()
const columnStore = useColumnsStore()
const commentsStore = useCommentsStore()
const ticksStore = useTicksStore()

// Загрузка первоначальных данных
// Загрузка задач
void tasksStore.fetchTasks()
// Загрузка пользователей
void usersStore.fetchUsers()
// Загрузка колонок
void columnStore.fetchColumns()
// Загрузка комментариев
void commentsStore.fetchComments()
// Загрузка подзадачи
void ticksStore.fetchTicks()
</script>

<style lang="scss">
@import "@/assets/scss/app.scss";
</style>
