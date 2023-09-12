import {defineStore} from "pinia";
import store from "store2";

export const performerHotUseStore = defineStore('degreeOfHot',
    {
        state: () => {
            return {
                performerHot: {}
            }
        },
        getters: {},
        actions: {
            addHot(performerId, score) {
                console.log(this.performerHot);
                const value = this.performerHot[performerId];
                this.performerHot[`${performerId}`] = value ? (value + score) : score;
                store.set('performerHot', JSON.stringify(this.performerHot));
            }
        }
    });

