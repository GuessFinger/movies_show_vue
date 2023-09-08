import instance from "./index.js";

export const queryPerformerList =
    () => instance.get('/max/queryPerformerList');
