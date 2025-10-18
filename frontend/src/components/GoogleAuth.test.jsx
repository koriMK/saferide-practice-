import { render, screen } from '@testing-library/react'
import GoogleAuth from './GoogleAuth'

// Mock Google Identity Services
global.google = {
  accounts: {
    id: {
      initialize: jest.fn(),
      renderButton: jest.fn()
    }
  }
}

test('renders Google Sign-In button container', () => {
  const mockSuccess = jest.fn()
  const mockError = jest.fn()
  
  render(<GoogleAuth onSuccess={mockSuccess} onError={mockError} />)
  
  expect(screen.getByRole('button')).toBeInTheDocument()
})