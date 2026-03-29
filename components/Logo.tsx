export default function Logo({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-lg"
    >
      {/* Background Circle */}
      <circle
        cx="50"
        cy="50"
        r="48"
        fill="url(#grad)"
        className="dark:fill-gradient-purple"
      />
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#3B82F6', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#8B5CF6', stopOpacity: 1 }} />
        </linearGradient>
      </defs>

      {/* Book Pages - Left */}
      <path
        d="M 30 25 L 35 25 L 35 75 L 30 75 Q 25 75 25 70 L 25 30 Q 25 25 30 25"
        fill="white"
        opacity="0.95"
      />
      <path
        d="M 35 25 L 40 25 L 40 75 L 35 75 L 35 25"
        fill="white"
        opacity="0.85"
      />

      {/* Book Pages - Right */}
      <path
        d="M 60 25 L 65 25 L 65 75 L 60 75 L 60 25"
        fill="white"
        opacity="0.85"
      />
      <path
        d="M 65 25 L 70 25 L 70 75 Q 75 75 75 70 L 75 30 Q 75 25 70 25"
        fill="white"
        opacity="0.95"
      />

      {/* AI Brain Circuit - Center */}
      <circle cx="50" cy="40" r="6" fill="#3B82F6" />
      <circle cx="42" cy="48" r="4" fill="#8B5CF6" />
      <circle cx="58" cy="48" r="4" fill="#8B5CF6" />
      <circle cx="50" cy="58" r="4" fill="#3B82F6" />

      {/* Circuit Lines */}
      <line x1="50" y1="46" x2="50" y2="54" stroke="#3B82F6" strokeWidth="1.5" />
      <line x1="46" y1="48" x2="50" y2="40" stroke="#8B5CF6" strokeWidth="1.5" />
      <line x1="54" y1="48" x2="50" y2="40" stroke="#8B5CF6" strokeWidth="1.5" />
      <line x1="46" y1="48" x2="50" y2="58" stroke="#3B82F6" strokeWidth="1.5" />
      <line x1="54" y1="48" x2="50" y2="58" stroke="#3B82F6" strokeWidth="1.5" />

      {/* Sparkle Stars */}
      <path d="M 65 32 L 67 37 L 72 37 L 68 40 L 70 45 L 65 42 L 60 45 L 62 40 L 58 37 L 63 37 Z" fill="#FCD34D" />
      <path d="M 30 35 L 31 37 L 33 37 L 31 38 L 32 40 L 30 39 L 28 40 L 29 38 L 27 37 L 29 37 Z" fill="#FCD34D" />

      {/* Main Title Outline - Optional shine effect */}
      <circle
        cx="50"
        cy="50"
        r="48"
        fill="none"
        stroke="white"
        strokeWidth="1.5"
        opacity="0.2"
      />
    </svg>
  );
}
