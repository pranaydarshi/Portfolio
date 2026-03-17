import { useState } from 'react'
import axios from 'axios'

// API base URL comes from .env  (VITE_API_BASE_URL=http://localhost:5000)
// Copy .env.example → .env and set the correct URL before running.
const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000'

const INITIAL_FIELDS = {
  name:    '',
  email:   '',
  company: '',
  message: '',
}

const INITIAL_ERRORS = {
  name:    '',
  email:   '',
  message: '',
}

/**
 * Validates the form fields client-side.
 * Returns an errors object; empty strings mean "no error".
 */
function validate(fields) {
  const errors = { name: '', email: '', message: '' }

  if (!fields.name.trim()) {
    errors.name = 'Name is required.'
  }

  if (!fields.email.trim()) {
    errors.email = 'Email is required.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = 'Please enter a valid email address.'
  }

  if (!fields.message.trim()) {
    errors.message = 'Message is required.'
  } else if (fields.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters.'
  }

  return errors
}

/**
 * useContactForm
 *
 * Manages field state, client-side validation, submission to
 * POST /api/contact, and UI feedback (loading / success / error).
 */
export default function useContactForm() {
  const [fields,  setFields]  = useState(INITIAL_FIELDS)
  const [errors,  setErrors]  = useState(INITIAL_ERRORS)
  const [status,  setStatus]  = useState('idle') // 'idle' | 'loading' | 'success' | 'error'
  const [apiError, setApiError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFields((prev) => ({ ...prev, [name]: value }))
    // Clear field-level error as the user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Client-side validation
    const validationErrors = validate(fields)
    const hasErrors = Object.values(validationErrors).some(Boolean)
    if (hasErrors) {
      setErrors(validationErrors)
      return
    }

    setStatus('loading')
    setApiError('')

    try {
      // POST /api/contact — matches the ASP.NET Core ContactController endpoint
      await axios.post(`${API_BASE}/api/contact`, {
        name:    fields.name.trim(),
        email:   fields.email.trim(),
        company: fields.company.trim() || null,
        message: fields.message.trim(),
      })

      setStatus('success')
      setFields(INITIAL_FIELDS)
      setErrors(INITIAL_ERRORS)
    } catch (err) {
      setStatus('error')
      // Use the API's error message if available, otherwise a generic fallback
      const serverMessage =
        err?.response?.data?.message ??
        err?.response?.data ??
        null
      setApiError(
        typeof serverMessage === 'string' && serverMessage
          ? serverMessage
          : 'Something went wrong. Please try again or email me directly.'
      )
    }
  }

  const resetStatus = () => {
    setStatus('idle')
    setApiError('')
  }

  return {
    fields,
    errors,
    status,
    apiError,
    handleChange,
    handleSubmit,
    resetStatus,
  }
}
