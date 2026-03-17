// src/api/contactApi.js
//
// This file shows exactly how the React frontend integrates with the
// POST /api/contact endpoint on the ASP.NET Core backend.
//
// Your existing useContactForm.js hook already implements this correctly.
// This file is provided as a standalone reference / alternative if you ever
// want to extract the API call into a dedicated service module.

import axios from 'axios'

// ── API base URL ─────────────────────────────────────────────────────────────
// Reads from your .env file:
//   VITE_API_BASE_URL=http://localhost:5000
//
// Development:  http://localhost:5000  (ASP.NET Core default)
// Production:   https://your-azure-app.azurewebsites.net
//
// To set it:  copy .env.example → .env  and update the value.
const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000'

// ── JSON shape sent to POST /api/contact ─────────────────────────────────────
//
// {
//   "name":    "Priya Sharma",           // required, string
//   "email":   "priya@company.com",      // required, valid email
//   "company": "Acme Pvt Ltd",           // optional, null or omit
//   "message": "Hi, I'd like to..."      // required, min 10 chars
// }
//
// Successful response (201 Created):
// {
//   "id":      42,
//   "message": "Your message has been received. I'll be in touch shortly."
// }
//
// Validation error (400 Bad Request) — ASP.NET Core ModelState format:
// {
//   "errors": {
//     "Email":   ["A valid email address is required."],
//     "Message": ["Message must be at least 10 characters."]
//   }
// }

/**
 * Submits the contact form to the backend.
 *
 * @param {{ name: string, email: string, company?: string, message: string }} payload
 * @returns {Promise<{ id: number, message: string }>}
 * @throws {Error} on network failure or API error
 */
export async function submitContactForm(payload) {
  const response = await axios.post(
    `${API_BASE}/api/contact`,
    {
      name:    payload.name.trim(),
      email:   payload.email.trim(),
      company: payload.company?.trim() || null,
      message: payload.message.trim(),
    },
    {
      headers: { 'Content-Type': 'application/json' },
      timeout: 10_000,  // 10 second timeout
    }
  )

  // axios throws on non-2xx automatically — no manual status check needed.
  return response.data  // { id, message }
}

// ── How this maps to your existing useContactForm.js ─────────────────────────
//
// Your hook already does the equivalent inline. If you want to use this module
// instead, replace the axios.post(...) block in useContactForm.js with:
//
//   import { submitContactForm } from '../api/contactApi'
//   ...
//   const data = await submitContactForm(fields)
//
// Everything else (loading state, success/error, validation) stays the same.
