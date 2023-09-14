import instance from './index.js'

export const loginOperation =
    loginItem => instance.post('/max/login', loginItem)

export const queryPerformerList =
    () => instance.get('/max/queryPerformerList')

export const queryPerformerDetailByName =
    performerName => instance.get(`/max/queryPerformerDetailByName?performerName=${performerName}`)

export const savePerformerInfo =
    performerInfoObject => instance.post('/max/savePerformerInfo', performerInfoObject)

export const queryPerformerListById =
    performerId => instance.get(`/max/queryPerformerProductListById?id=${performerId}`)

export const queryMoviePlots =
    (performerId, num) =>
      instance.get(`/max/queryMoviePlots?id=${performerId}&num=${num}`)
