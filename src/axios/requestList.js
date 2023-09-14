import instance from './index.js'

export const loginOperation =
    loginItem => instance.post('/max/login', loginItem)

export const queryPerformerList =
    () => instance.get('/max/performer/queryPerformerList')

export const queryPerformerDetailByName =
    performerName => instance.get(`/max/performer/queryPerformerDetailByName?performerName=${performerName}`)

export const savePerformerInfo =
    performerInfoObject => instance.post('/max/performer/savePerformerInfo', performerInfoObject)

export const queryPerformerListById =
    performerId => instance.get(`/max/movie/queryPerformerProductListById?id=${performerId}`)

export const queryMoviePlots =
    (performerId, num) =>
      instance.get(`/max/movie/queryMoviePlots?id=${performerId}&num=${num}`)
