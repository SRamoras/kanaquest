// src/components/atoms/Select.jsx
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FiChevronDown } from 'react-icons/fi';
import './Select.css';

export default function Select({ label, options, value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  // Fecha o dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = () => setOpen(o => !o);

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className="select-atom" ref={ref}>
      {label && <span className="select-label">{label}</span>}
      <button
        type="button"
        className="select-toggle"
        onClick={handleToggle}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {selectedOption ? selectedOption.label : 'Selecione…'}
        <FiChevronDown className="select-arrow" />
      </button>
      {open && (
        <ul className="select-dropdown" role="listbox">
          {options.map(opt => (
            <li key={opt.value} role="option">
              <button
                type="button"
                className={`select-option${value === opt.value ? ' selected' : ''}`}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
              >
                {opt.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

Select.propTypes = {
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

Select.defaultProps = {
  label: '',
};
