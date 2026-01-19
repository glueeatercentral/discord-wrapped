export default function Slide({ slide, isActive, isPrev, isNext, onReset }) {
  const className = `slide slide-bg-${slide.background} ${
    isActive ? 'active' : isPrev ? 'prev' : isNext ? 'next' : ''
  }`;

  return (
    <div className={className}>
      <div className="slide-content">
        {slide.render({ onReset })}
      </div>
    </div>
  );
}
