// Rules for the guest-details form.
// Each rule returns a message that says what's wrong AND how to fix it.

export const NOTES_MAX = 200

// Accepts 09171234567 or +639171234567. Spaces and dashes are fine — we strip them first.
const PH_MOBILE = /^(09\d{9}|\+639\d{9})$/

// A simple, forgiving email check: something@something.something
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateDetails(details) {
  const errors = {}

  const name = details.name.trim()
  if (!name) {
    errors.name = 'Please enter the name for the booking.'
  } else if (name.length < 2) {
    errors.name = 'Your name should be at least 2 characters.'
  }

  const phone = details.phone.replace(/[\s-]/g, '')
  if (!phone) {
    errors.phone = 'Please enter a mobile number so we can reach you.'
  } else if (!PH_MOBILE.test(phone)) {
    errors.phone = 'Use an 11-digit PH mobile number, like 0917 123 4567.'
  }

  const email = details.email.trim()
  if (!email) {
    errors.email = 'Please enter your email address.'
  } else if (!EMAIL.test(email)) {
    errors.email = "That email doesn't look right — check for a typo."
  }

  if (details.notes.length > NOTES_MAX) {
    errors.notes = `Please keep requests under ${NOTES_MAX} characters.`
  }

  return errors // an empty object {} means everything is valid
}
