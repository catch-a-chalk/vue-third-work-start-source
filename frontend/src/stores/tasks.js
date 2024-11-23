import { defineStore } from 'pinia'
import { useFiltersStore } from './filters'
import { useUsersStore } from './users'

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: [],
  }),
  getters: {
    filteredTasks: state => {
      const filtersStore = useFiltersStore()
      const filtersAreEmpty = Object.values(filtersStore.filters).every(value => !value.length)

      // Вернуть все задачи, если фильтры не применялись
      if (filtersAreEmpty) {
        return state.tasks
      }
      // Поиск по фильтру
      const searchFilter = task => task.title.toLowerCase()
        .includes(filtersStore.filters.search.toLowerCase().trim())
      // Фильтрация по пользователям
      const usersFilter = task => filtersStore.filters.users.some(userId => userId === task.userId)
      // Фильтрация по статусам
      const statusesFilter = task => filtersStore.filters.statuses
        .some(el => el ===task.status || el === task.timeStatus)
      
      // Обработать задачи в соответствии с фильтрами
      return state.tasks.filter(task => {
        let result = {
          search: searchFilter,
          users: usersFilter,
          statuses: statusesFilter
        }
        return Object.entries(result).every(([key, callback]) =>
          filtersStore.filters[key].length || callback(task))
      })
    },
    getTaskUserById: () => id => {
      const usersStore = useUsersStore()
      return usersStore.users.find(user => user.id === id)
    },

    // Фильтруем задачи, относящиеся к бэклогу columnId === null
    sidebarTasks: state => {
      return state.filteredTasks
        .filter(task => !task.columnId)
        .sort((a, b) => a.sortOrder - b.sortOrder)
    }
  },
  actions: {},
});