import React from 'react';
import PropTypes from 'prop-types';
import './Input.css';

/**
 * InputComponent
 * A reusable input field with label, error message, icon and styling.
 *
 * Props:
 * - label: string (optional) — The label text displayed above the input.
 * - type: string — The type of input (e.g. "text", "email", "password").
 * - name: string — The name attribute for the input.
 * - value: string — The controlled value of the input.
 * - placeholder: string (optional) — Placeholder text inside the input.
 * - onChange: func — Callback fired on input change (receives event).
 * - onBlur: func (optional) — Callback fired on blur event.
 * - error: string (optional) — Error message to display below the input.
 * - disabled: bool (optional) — Disables the input if true.
 * - icon: elementType (optional) — A React Icon component from react-icons.
 */
export default function InputComponent({
  label,
  type,
  name,
  value,
  placeholder,
  onChange,
  onBlur,
  error,
  disabled,
  icon: Icon,
}) {
  return (
    <div className="input-component">
      {label && <label htmlFor={name} className="input-label">{label}</label>}

      <div className={`input-wrapper ${Icon ? 'has-icon' : ''}`}>
        {Icon && <span className="input-icon"><Icon /></span>}

        <input
          id={name}
          className={`input-field ${error ? 'input-error' : ''}`}
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
        />
      </div>

      {error && <p className="input-error-text">{error}</p>}
    </div>
  );
}

InputComponent.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  icon: PropTypes.elementType, // componente React
};

InputComponent.defaultProps = {
  label: '',
  placeholder: '',
  onBlur: undefined,
  error: '',
  disabled: false,
  icon: null,
};
