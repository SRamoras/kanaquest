import React, { useState, useEffect, useRef } from 'react'
import './Divider.css'

const Divider = () => {
  const [angle, setAngle] = useState(0)
  const lastScrollY = useRef(window.scrollY)

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      const delta = currentY - lastScrollY.current
      setAngle(prev => prev + (delta > 0 ? 1 : -1))
      lastScrollY.current = currentY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="divider">
      <div className="divider-line" />
      <div
        className="divider-icon"
        style={{ transform: `rotate(${angle}deg)` }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          width="40"
          height="40"
          className="flower-spinner"
        >
          <defs>
            <linearGradient id="petalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%"   stopColor="var(--clr-border-flower)" stopOpacity="0.4"/>
              <stop offset="100%" stopColor="var(--clr-border-flower)" stopOpacity="0.1"/>
            </linearGradient>
          </defs>
          <g fill="url(#petalGrad)" transform="translate(50,50)">
            {[0,45,90,135,180,225,270,315].map(deg => (
              <ellipse
                key={deg}
                rx="10"
                ry="30"
                transform={`rotate(${deg}) translate(0,-40)`}
              />
            ))}
          </g>
          <circle cx="50" cy="50" r="8" fill="var(--clr-primary)"/>
        </svg>
      </div>
      <div className="divider-line" />
    </div>
  )
}

export default Divider
