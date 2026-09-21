import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select'

// Form inputs with their label, hint and error message built in.
// Each field wires up the accessibility links (htmlFor, aria-invalid,
// aria-describedby) so a screen reader announces the label AND the error.

const inputBase =
  // stone-500 rather than stone-400: placeholder text has to clear 4.5:1 like any other text.
  'w-full rounded-xl border bg-white px-4 py-3 text-base text-charcoal placeholder:text-stone-500 ' +
  'transition-[border-color,box-shadow] duration-150 ease-heat ' +
  'focus:border-ember-600 focus:outline-none focus:ring-2 focus:ring-ember-200'
// text-base (16px) matters: iPhones zoom into any input smaller than 16px.

function FieldShell({ id, label, optional, hint, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-charcoal">
        {label}
        {optional && <span className="ml-1 font-normal text-stone-600">(optional)</span>}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-sm font-medium text-red-700">
          {error}
        </p>
      ) : (
        hint && (
          <p id={`${id}-hint`} className="text-sm text-stone-600">
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

// Built on shadcn/ui's Select (Radix underneath), so the list is keyboard-driven,
// typeahead-searchable and styled consistently across every platform — a native
// <select> renders as an OS menu we can't theme. The parent still passes a plain
// `onChange`, so this stays a drop-in for the field it replaced.
export function SelectField({ id, label, optional, hint, error, options, value, onChange }) {
  return (
    <FieldShell id={id} label={label} optional={optional} hint={hint} error={error}>
      <Select value={value} onValueChange={(next) => onChange({ target: { value: next } })}>
        <SelectTrigger
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(id, error, hint)}
          className={`h-auto w-full rounded-xl border bg-white px-4 py-3 text-base text-charcoal transition-[border-color,box-shadow] duration-150 ease-heat focus:border-ember-600 focus:ring-2 focus:ring-ember-200 ${
            error ? 'border-red-600' : 'border-stone-300'
          }`}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="rounded-xl border-stone-200">
          {options.map((option) => (
            <SelectItem key={option} value={option} className="rounded-lg py-2 text-base">
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
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
