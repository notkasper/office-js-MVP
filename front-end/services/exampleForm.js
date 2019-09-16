import request from 'superagent'

export const testApi = (callback) => {
  request
    .get('/api/test')
    .end((error, response) => callback(error, response));
}