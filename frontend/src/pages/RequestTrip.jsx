import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { tripService } from '../services/api'

const TripSchema = Yup.object().shape({
  pickup_location: Yup.string().required('Pickup location is required'),
  dropoff_location: Yup.string().required('Drop-off location is required'),
})

const RequestTrip = () => {
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setError('')
      const response = await tripService.createTrip(values)
      navigate(`/trip/${response.trip_id}`)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create trip')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">Request a Driver</h1>
          <button 
            onClick={() => navigate('/')}
            className="text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-8">
        <div className="card">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Where do you need a driver?</h2>
            <p className="text-gray-600">We'll send a professional driver to drive your car safely.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <Formik
            initialValues={{ pickup_location: '', dropoff_location: '' }}
            validationSchema={TripSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    📍 Pickup Location
                  </label>
                  <Field
                    name="pickup_location"
                    type="text"
                    className="input-field"
                    placeholder="Where are you and your car?"
                  />
                  <ErrorMessage name="pickup_location" component="div" className="mt-1 text-sm text-red-600" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    🏠 Drop-off Location
                  </label>
                  <Field
                    name="dropoff_location"
                    type="text"
                    className="input-field"
                    placeholder="Where should we drive you?"
                  />
                  <ErrorMessage name="dropoff_location" component="div" className="mt-1 text-sm text-red-600" />
                </div>

                {/* Fare Estimate */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Estimated Fare</span>
                    <span className="text-xl font-semibold">$25.00</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Base rate + distance. Final fare may vary.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary text-lg py-4 disabled:opacity-50"
                >
                  {isSubmitting ? 'Requesting Driver...' : 'Request Driver'}
                </button>
              </Form>
            )}
          </Formik>
        </div>

        {/* Safety Info */}
        <div className="mt-8 card bg-blue-50 border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-2">Safety First</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• All drivers are background-checked and licensed</li>
            <li>• Your trip is tracked in real-time</li>
            <li>• 24/7 customer support available</li>
          </ul>
        </div>
      </main>
    </div>
  )
}

export default RequestTrip