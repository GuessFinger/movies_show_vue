import instance from "./index.js";

export const queryPerformerList =
    () => instance.get('/max/queryPerformerList');

export const queryPerformerDetailByName =
    performerName => instance.get(`/max/queryPerformerDetailByName?performerName=${performerName}`);