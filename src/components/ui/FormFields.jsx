// Form inputs with their label, hint and error message built in.
// Each field wires up the accessibility links (htmlFor, aria-invalid,
// aria-describedby) so a screen reader announces the label AND the error.

const inputBase =
  'w-full rounded-xl border bg-white px-4 py-3 text-base text-charcoal placeholder:text-stone-400 ' +
  'focus:border-ember-600 focus:outline-none focus:ring-2 focus:ring-ember-200'
// text-base (16px) matters: iPhones zoom into any input smaller than 16px.

function FieldShell({ id, label, optional, hint, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-charcoal">
        {label}
        {optional && <span className="ml-1 font-normal text-stone-500">(optional)</span>}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-sm font-medium text-red-700">
          {error}
        </p>
      ) : (
        hint && (
          <p id={`${id}-hint`} className="text-sm text-stone-500">
            {hint}
          </p>
        )
      )}
    </div>
  )
}

// Which helper text is currently on screen — the error wins over the hint.
function describedBy(id, error, hint) {
  if (error) return `${id}-error`
  if (hint) return `${id}-hint`
  return undefined
}

// In React 19, `ref` is an ordinary prop — no forwardRef needed.
// The parent uses it to move keyboard focus to the first field with an error.
export function TextField({ id, label, optional, hint, error, ref, ...inputProps }) {
  return (
    <FieldShell id={id} label={label} optional={optional} hint={hint} error={error}>
      <input
        ref={ref}
        id={id}
        name={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={`${inputBase} ${error ? 'border-red-600' : 'border-stone-300'}`}
        {...inputProps}
      />
    </FieldShell>
  )
}

export function SelectField({ id, label, optional, hint, error, options, ref, ...selectProps }) {
  return (
    <FieldShell id={id} label={label} optional={optional} hint={hint} error={error}>
      <select
        ref={ref}
        id={id}
        name={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={`${inputBase} ${error ? 'border-red-600' : 'border-stone-300'}`}
        {...selectProps}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </FieldShell>
  )
}

export function TextAreaField({ id, label, optional, hint, error, ref, ...textareaProps }) {
  return (
    <FieldShell id={id} label={label} optional={optional} hint={hint} error={error}>
      <textarea
        ref={ref}
        id={id}
        name={id}
        rows={3}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={`${inputBase} resize-y ${error ? 'border-red-600' : 'border-stone-300'}`}
        {...textareaProps}
      />
    </FieldShell>
  )
}
