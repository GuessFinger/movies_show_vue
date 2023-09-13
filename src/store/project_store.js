import {defineStore} from "pinia";
import store from "store2";

export const performerHotUseStore = defineStore('degreeOfHot',
    {
        state: () => {
            return {
                performerHot: {},
                token: ''
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


export const baseInfoUseStore = defineStore('baseInfo', {
    state() {
        return {
            token: ''
        }
    },
    getters: {},
    actions: {
        setToken(token) {
            this.token = token;
            console.log(this.token);
        }
    },
})