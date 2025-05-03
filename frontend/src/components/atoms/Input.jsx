import React from 'react';
import PropTypes from 'prop-types';
import './Input.css';

/**
 * InputComponent
 * A reusable input field with label, error message, and styling.
 *
 * Props:
 * - label: string (optional) — The label text displayed above the input.
 * - type: string — The type of input (e.g. "text", "email", "password").
 * - value: string — The controlled value of the input.
 * - placeholder: string (optional) — Placeholder text inside the input.
 * - onChange: func — Callback fired on input change (receives event).
 * - onBlur: func (optional) — Callback fired on blur event.
 * - error: string (optional) — Error message to display below the input.
 * - disabled: bool (optional) — Disables the input if true.
 */
export default function InputComponent({
  label,
  type,
  value,
  name,
  placeholder,
  onChange,
  onBlur,
  error,
  disabled
}) {
  return (
    <div className="input-component">
      {label && <label className="input-label">{label}</label>}
      <input
        className={`input-field ${error ? 'input-error' : ''}`}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        name={name}        
        onBlur={onBlur}
        disabled={disabled}
      />
      {error && <p className="input-error-text">{error}</p>}
    </div>
  );
}