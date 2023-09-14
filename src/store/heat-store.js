import { defineStore } from 'pinia'
import store from 'store2'

export const performerHeatUseStore = defineStore('degreeOfHot',
  {
    state: () => {
      return {
        performerHeat: {}
      }
    },
    getters: {},
    actions: {
      addHot (performerId, score) {
        const value = this.performerHeat[performerId]
        this.performerHeat[`${performerId}`] = value ? (value + score) : score
        store.set('performerHeat', JSON.stringify(this.performerHeat))
      }
    }
  })
