import { useRef, useState } from 'react'
import { OCCASIONS } from '../../data/restaurant'
import { NOTES_MAX, validateDetails } from '../../lib/validation'
import Button from '../ui/Button'
import { SelectField, TextAreaField, TextField } from '../ui/FormFields'

// The order fields appear on screen — used to find the FIRST field with an error.
const FIELD_ORDER = ['name', 'phone', 'email', 'notes']

// STEP 2 — the guest's details.
export default function StepDetails({ details, onChange, onBack, onContinue }) {
  // Which fields has the guest already visited? We don't shout "required!" at an
  // empty field they haven't even reached yet — only after they leave it.
  const [touched, setTouched] = useState({})
  const [triedToContinue, setTriedToContinue] = useState(false)
  const fieldRefs = useRef({})

  // Errors are recalculated on every render straight from the current details.
  const errors = validateDetails(details)
  const errorCount = Object.keys(errors).length

  function errorFor(field) {
    return touched[field] || triedToContinue ? errors[field] : undefined
  }

  // Controlled inputs: React holds the value; every keystroke updates state.
  function update(field) {
    return (event) => onChange({ ...details, [field]: event.target.value })
  }

  function markTouched(field) {
    return () => setTouched((previous) => ({ ...previous, [field]: true }))
  }

  function register(field) {
    return (element) => {
      fieldRefs.current[field] = element
    }
  }

  function handleSubmit(event) {
    event.preventDefault() // stop the browser from reloading the page
    setTriedToContinue(true)

    const firstInvalid = FIELD_ORDER.find((field) => errors[field])
    if (firstInvalid) {
      fieldRefs.current[firstInvalid]?.focus() // take them straight to the problem
      return
    }
    onContinue()
  }

  return (
    // noValidate turns off the browser's own popup bubbles so we can show our clearer messages.
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <TextField
        ref={register('name')}
        id="name"
        label="Full name"
        autoComplete="name"
        value={details.name}
        onChange={update('name')}
        onBlur={markTouched('name')}
        error={errorFor('name')}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          ref={register('phone')}
          id="phone"
          label="Mobile number"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="0917 123 4567"
          hint="Only used to reach you about this booking."
          value={details.phone}
          onChange={update('phone')}
          onBlur={markTouched('phone')}
          error={errorFor('phone')}
        />
        <TextField
          ref={register('email')}
          id="email"
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={details.email}
          onChange={update('email')}
          onBlur={markTouched('email')}
          error={errorFor('email')}
        />
      </div>

      <SelectField
        id="occasion"
        label="Occasion"
        optional
        options={OCCASIONS}
        hint="Celebrating? We'll try to make it special."
        value={details.occasion}
        onChange={update('occasion')}
      />

      <TextAreaField
        ref={register('notes')}
        id="notes"
        label="Special requests"
        optional
        maxLength={NOTES_MAX}
        placeholder="Allergies, a high chair, a quiet corner…"
        hint={`${details.notes.length}/${NOTES_MAX} characters`}
        value={details.notes}
        onChange={update('notes')}
        onBlur={markTouched('notes')}
        error={errorFor('notes')}
      />

      {triedToContinue && errorCount > 0 && (
        // role="alert" makes screen readers announce this the moment it appears.
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-800">
          {errorCount === 1 ? 'One field needs' : `${errorCount} fields need`} your attention before you continue.
        </p>
      )}

      <div className="flex items-center justify-between gap-3 border-t border-stone-200 pt-6">
        <Button variant="ghost" onClick={onBack}>
          ← Back
        </Button>
        <Button type="submit" size="lg">
          Review booking
        </Button>
      </div>
    </form>
  )
}
