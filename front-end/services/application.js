import request from 'superagent';
import notificationStore from '../stores/_notifcation';

/* HELPERS */
const handleResponse = (error, response, callback) => {
  if (error) {
    notificationStore.setMessage(response.body.message || error.description, 'error');
  }
  if (response.status === 401) {
    setLocation('login');
  }
  callback(error, response);
};

/* AUTH */
export const oauth = callback => {
  request.get('/api/auth/url').end((error, response) => handleResponse(error, response, callback));
};

/* PROFILES */
export const createProfile = (profileData, callback) => {
  request
    .post('/api/profiles')
    .send(profileData)
    .end((error, response) => handleResponse(error, response, callback));
};

export const getProfiles = callback => {
  request.get('/api/profiles').end((error, response) => handleResponse(error, response, callback));
};

export const deleteProfile = (id, callback) => {
  request.delete(`/api/profiles/${id}`).end((error, response) => handleResponse(error, response, callback));
};

export const updateProfile = (id, profileData, callback) => {
  request
    .put(`/api/profiles/${id}`)
    .send(profileData)
    .end((error, response) => handleResponse(error, response, callback));
};

/* FORMDATA */
export const getEstablishments = callback => {
  request.get('/api/formData/establishments').end((error, response) => handleResponse(error, response, callback));
};

export const getDepartments = callback => {
  request.get('/api/formData/departments').end((error, response) => handleResponse(error, response, callback));
};

export const getWorkFunctions = callback => {
  request.get('/api/formData/workFunctions').end((error, response) => handleResponse(error, response, callback));
};

export const getAanhefs = callback => {
  request.get('/api/formData/aanhefs').end((error, response) => handleResponse(error, response, callback));
};

export const getGroetOpties = callback => {
  request.get('/api/formData/groetOpties').end((error, response) => handleResponse(error, response, callback));
};

/* OTHER */
export const getUserDetails = callback => {
  request.get('/api/getUserDetails').end((error, response) => handleResponse(error, response, callback));
};

export const getLetterTemplate = callback => {
  request.get('/api/letterTemplate').end((error, response) => handleResponse(error, response, callback));
};
