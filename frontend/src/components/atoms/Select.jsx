import React from 'react';
import PropTypes from 'prop-types';
import './Select.css';

const Select = ({ label, options, value, onChange }) => {
  return (
    <div className="select-atom">
      {label && <span className="select-label">{label}</span>}
      <div className="select-buttons">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            className={`select-button${value === opt.value ? ' selected' : ''}`}
            onClick={() => onChange(opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
};

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

export default Select;
