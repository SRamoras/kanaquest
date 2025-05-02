import React from 'react';

/**
 * DividerLine: A simple horizontal line component.
 *
 * Props:
 * - thickness: CSS height of the line (default '1px')
 * - color: CSS backgroundColor of the line (default 'var(--clr-border)')
 * - width: CSS width of the line (default '100%')
 * - margin: CSS margin around the line (default '2rem 0')
 */
const DividerLine = ({
  thickness = '1px',
  color = 'var(--clr-border)',
  width = '100%',
  margin = '2rem 0'
}) => {
  const style = {
    width,
    height: thickness,
    backgroundColor: color,
    margin
  };

  return <div style={style} />;
};

export default DividerLine;
