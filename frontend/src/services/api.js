import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const authService = {
  login: (email, password) => api.post('/auth/login', { email, password }).then(res => res.data),
  register: (userData) => api.post('/auth/register', userData).then(res => res.data),
}

export const tripService = {
  createTrip: (tripData) => api.post('/api/trips', tripData).then(res => res.data),
  getTrips: (page = 1) => api.get(`/api/trips?page=${page}`).then(res => res.data),
  updateTripStatus: (tripId, status) => api.put(`/api/trips/${tripId}/status`, { status }).then(res => res.data),
}

export const uploadService = {
  uploadDocument: (file, documentType) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('document_type', documentType)
    
    return api.post('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then(res => res.data)
  }
}

export const mpesaService = {
  initiatePayment: (phoneNumber, amount, tripId) => 
    api.post('/api/mpesa/initiate-payment', { phone_number: phoneNumber, amount, trip_id: tripId }).then(res => res.data),
  queryPayment: (checkoutRequestId) => 
    api.get(`/api/mpesa/query-payment/${checkoutRequestId}`).then(res => res.data)
}

export default api