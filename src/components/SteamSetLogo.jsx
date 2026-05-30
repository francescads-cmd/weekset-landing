export default function SteamSetLogo({ size = 28, onDark = true }) {
  const bg = onDark ? 'rgba(255,255,255,0.15)' : '#1F5C52';
  const dotColor = '#FFD7C9';
  const bowlColor = '#FF7A5C';
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-label="weekset">
      <rect width="32" height="32" rx="7.5" fill={bg}/>
      <circle cx="11" cy="8" r="1.7" fill={dotColor}/>
      <circle cx="16" cy="8" r="1.7" fill={dotColor} opacity="0.78"/>
      <circle cx="21" cy="8" r="1.7" fill={dotColor} opacity="0.55"/>
      <circle cx="11" cy="13" r="1.7" fill={dotColor} opacity="0.4"/>
      <circle cx="16" cy="13" r="1.7" fill={dotColor} opacity="0.25"/>
      <circle cx="21" cy="13" r="1.7" fill={dotColor} opacity="0.13"/>
      <ellipse cx="16" cy="20" rx="9.5" ry="1.6" fill={bowlColor}/>
      <path d="M 6.5 20 Q 16 30, 25.5 20 Z" fill={bowlColor}/>
    </svg>
  );
}
