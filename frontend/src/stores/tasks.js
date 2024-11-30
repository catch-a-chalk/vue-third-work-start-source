import { defineStore } from 'pinia'
import tasks from "../mocks/tasks.json"
import { normalizeTask } from "../common/helpers"
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
  actions: {
    async fetchTasks () {
      this.tasks = tasks.map(task => normalizeTask(task))
    },
    updateTasks (tasksToUpdate) {
      tasksToUpdate.forEach(task => {
        const index = this.tasks.findIndex(({ id }) => id === task.id)
        // findIndex вернет элемент массива или -1
        if (~index) {
          this.tasks.splice(index, 1, task)
        }
      })
    },
    addTask (task) {
      // Нормализуем задачу
      const newTask = normalizeTask(task)

      // Добавляем идентификатор, последний элемент в списке задач
      // После подключения сервера идентификатор будет присваисваться сервером
      newTask.id = this.tasks.length + 1

      // Добавляем задачу в конец списка задач в бэклоге
      newTask.sortOrder = this.tasks.filter(task => !task.columnId).length

      // Если задаче присвоен исполнитель, то добавляем объект пользователя в задачу
      // Это будет добавлено сервером позже
      if (newTask.userId) {
        newTask.user = {
          ...this.getTaskUserById(newTask.userId)
        }
      }
      // Добавляем задачу в массив
      this.tasks = [...this.tasks, newTask]
    },
    editTask (task) {
      const index = this.tasks.findIndex(({ id }) => task.id === id)

      if (~index) {
        const newTask = normalizeTask(task)
        if (newTask.userId) {
          newTask.user = {
            ...this.getTaskUserById(newTask.userId)
          }
        }
        this.tasks.splice(index, 1, newTask)
      }
    },
    deleteTask (id) {
      this.tasks = this.tasks.filter(task => task.id !== id)
    }
  },
});