import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

test('renders SafeRide app', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
  
  // Should render login page by default
  expect(screen.getByText(/SafeRide Login/i)).toBeInTheDocument()
})