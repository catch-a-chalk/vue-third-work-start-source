import { defineStore } from 'pinia'
import { ticketsService } from '@/services'

export const useTicksStore = defineStore('ticks', {
  state: () => ({
    ticks: [],
  }),
  getters: {
    getTicksByTaskId: state => taskId => state.ticks.filter(tick => tick.taskId === taskId)
  },
  actions: {
    async fetchTicks () {
      this.ticks = await ticketsService.fetchTicks()
    },
    async addTick (tick) {
      const newTick = await ticketsService.createTick(tick)
      this.ticks.push(newTick)
    },
    async updateTick (tick) {
      await ticketsService.updateTick(tick)
      const index = this.ticks.findIndex(({ id }) => id === tick.id)
      if (~index) {
        this.ticks.splice(index, 1, tick)
      }
    },
    async deleteTick (id) {
      await ticketsService.deleteTick(id)
      this.ticks = this.ticks.filter(tick => tick.id !== id)
    }
  },
})