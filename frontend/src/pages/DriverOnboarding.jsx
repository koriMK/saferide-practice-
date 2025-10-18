import { useState } from 'react'
import { uploadService } from '../services/api'

const DriverOnboarding = () => {
  const [step, setStep] = useState(1)
  const [uploading, setUploading] = useState(false)
  const [documents, setDocuments] = useState({
    license: null,
    id: null
  })

  const handleFileUpload = async (file, documentType) => {
    setUploading(true)
    try {
      const response = await uploadService.uploadDocument(file, documentType)
      setDocuments(prev => ({
        ...prev,
        [documentType]: response.url
      }))
    } catch (error) {
      console.error('Upload failed:', error)
      alert('Upload failed. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = () => {
    if (documents.license && documents.id) {
      alert('Documents submitted for verification! You will be notified once approved.')
      // In a real app, you'd navigate to a success page or dashboard
    } else {
      alert('Please upload both documents before submitting.')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold">Driver Onboarding</h1>
          <p className="text-gray-600 mt-1">Complete your profile to start driving</p>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className={`flex items-center ${step >= 1 ? 'text-primary' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-primary text-white' : 'bg-gray-200'}`}>
                1
              </div>
              <span className="ml-2 font-medium">Documents</span>
            </div>
            <div className={`flex items-center ${step >= 2 ? 'text-primary' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-primary text-white' : 'bg-gray-200'}`}>
                2
              </div>
              <span className="ml-2 font-medium">Verification</span>
            </div>
            <div className={`flex items-center ${step >= 3 ? 'text-primary' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-primary text-white' : 'bg-gray-200'}`}>
                3
              </div>
              <span className="ml-2 font-medium">Complete</span>
            </div>
          </div>
        </div>

        {step === 1 && (
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">Upload Required Documents</h2>
              <p className="text-gray-600 mb-6">
                Please upload clear photos of your documents. All information must be clearly visible.
              </p>

              {/* Driver's License */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Driver's License</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  {documents.license ? (
                    <div className="text-green-600">
                      <div className="text-2xl mb-2">✅</div>
                      <p>License uploaded successfully</p>
                    </div>
                  ) : (
                    <div>
                      <div className="text-4xl mb-2">📄</div>
                      <p className="text-gray-600 mb-3">Upload your driver's license</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0]
                          if (file) handleFileUpload(file, 'license')
                        }}
                        className="hidden"
                        id="license-upload"
                      />
                      <label
                        htmlFor="license-upload"
                        className="btn-primary cursor-pointer inline-block"
                      >
                        {uploading ? 'Uploading...' : 'Choose File'}
                      </label>
                    </div>
                  )}
                </div>
              </div>

              {/* ID Document */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Government ID</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  {documents.id ? (
                    <div className="text-green-600">
                      <div className="text-2xl mb-2">✅</div>
                      <p>ID uploaded successfully</p>
                    </div>
                  ) : (
                    <div>
                      <div className="text-4xl mb-2">🆔</div>
                      <p className="text-gray-600 mb-3">Upload your government-issued ID</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0]
                          if (file) handleFileUpload(file, 'id')
                        }}
                        className="hidden"
                        id="id-upload"
                      />
                      <label
                        htmlFor="id-upload"
                        className="btn-primary cursor-pointer inline-block"
                      >
                        {uploading ? 'Uploading...' : 'Choose File'}
                      </label>
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!documents.license || !documents.id || uploading}
                className="w-full btn-primary disabled:opacity-50"
              >
                Continue to Verification
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="card text-center">
            <div className="text-6xl mb-4">⏳</div>
            <h2 className="text-2xl font-semibold mb-4">Documents Under Review</h2>
            <p className="text-gray-600 mb-6">
              Your documents have been submitted and are being reviewed by our team. 
              This process typically takes 24-48 hours.
            </p>
            <p className="text-sm text-gray-500 mb-6">
              You will receive an email notification once your documents are approved.
            </p>
            <button
              onClick={handleSubmit}
              className="btn-primary"
            >
              Complete Onboarding
            </button>
          </div>
        )}

        {/* Requirements */}
        <div className="mt-8 card bg-blue-50 border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-3">Document Requirements</h3>
          <ul className="text-sm text-blue-800 space-y-2">
            <li>• Valid driver's license (not expired)</li>
            <li>• Government-issued photo ID</li>
            <li>• Clear, high-quality photos</li>
            <li>• All text must be legible</li>
            <li>• No screenshots or photocopies</li>
          </ul>
        </div>
      </main>
    </div>
  )
}

export default DriverOnboarding