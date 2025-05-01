import React from 'react';
import * as Lucide from 'lucide-react';

export default function Icon({ name, size = 24, color = 'var(--clr-text-default)' }) {
  const Component = Lucide[name] || Lucide.Star;
  return <Component size={size} color={color} />;
}