<template>
  <main class="content">
    <section class="desk">
      <!-- Отображение дояерних маршрутов -->
       <router-view/>
      <!-- Шапока доски -->
       <div class="desk__header">
        <h1
          class="desk__title"
          data-test="desk-title"
        >
          Design Coffee Lab
        </h1>
        <!-- Добавили кнопку добавления новой колонки -->
        <button
          class="desk__add"
          type="button"
          data-test="desk-add"
          @click="columnsStore.addColumn"
        >
          Добавить столбец
        </button>

        <div class="desk__filters">
          <div class="desk__user-filter">
            <!-- Список пользователей -->
             <ul class="user-filter">
              <li
                v-for="user in usersStore.users"
                :key="user.id"
                :title="user.name"
                data-test="user-filter"
                class="user-filter__item"
                :class="{ active: filtersStore.filters.users.some(id => id === user.id ) }"
                @click="filtersStore.applyFilters({ item: user.id, entity: 'users' })"
              >
                <a class="user-filter__button">
                  <img
                    :src="getPublicImage(user.avatar)"
                    alt="Аватар юзера"
                    width="24"
                    height="24"
                  />
                </a>
              </li>
             </ul>
          </div>
          <div class="desk__meta-filter">
            <!--            Список статусов-->
            <ul class="meta-filter">
              <li
                  v-for="({ value, label }) in STATUSES"
                  :key="value"
                  data-test="status-filter"
                  class="meta-filter__item"
                  :class="{ active: filtersStore.filters.statuses.some(s => s === value) }"
                  @click="filtersStore.applyFilters({ item: value, entity: 'statuses' })"
              >
                <a
                    class="meta-filter__status"
                    :class="`meta-filter__status meta-filter__status--color meta-filter__status--${value}`"
                    :title="label"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!--      Колонки и задачи-->
      <div v-if="columnsStore.columns.length" class="desk__columns">
        <!--        Показываем колонки-->
        <desk-column
            v-for="column in columnsStore.columns"
            :key="column.id"
            :column="column"
            @update="columnsStore.updateColumn"
            @delete="columnsStore.deleteColumn"
        />
      </div>
    </section>
  </main>
</template>

<script setup>
import { useColumnsStore, useUsersStore, useFiltersStore } from '@/stores'
import { getPublicImage } from '../common/helpers'
import { STATUSES } from '../common/constants'
import DeskColumn from '@/modules/columns/components/DeskColumn.vue'

// Определяем хранилища
const columnsStore = useColumnsStore()
const usersStore = useUsersStore()
const filtersStore = useFiltersStore()
</script>

<style lang="scss" scoped>

</style>