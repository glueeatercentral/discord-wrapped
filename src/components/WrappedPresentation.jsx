import { useState, useEffect, useCallback, useRef } from 'react';
import Slide from './Slide';
import { generateSlides } from './slides';

export default function WrappedPresentation({ data, onReset }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoAdvance, setAutoAdvance] = useState(false);
  const [slideKey, setSlideKey] = useState(0);
  const containerRef = useRef(null);

  const slides = generateSlides(data);
  const totalSlides = slides.length;

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        goToNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPrev();
      } else if (e.key === 'Escape') {
        onReset();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, totalSlides, onReset]);

  // Auto-advance timer
  useEffect(() => {
    if (!autoAdvance) return;

    const timer = setTimeout(() => {
      if (currentSlide < totalSlides - 1) {
        goToNext();
      } else {
        setAutoAdvance(false);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [autoAdvance, currentSlide, totalSlides]);

  const goToNext = useCallback(() => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(prev => prev + 1);
      setSlideKey(prev => prev + 1);
    }
  }, [currentSlide, totalSlides]);

  const goToPrev = useCallback(() => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
      setSlideKey(prev => prev + 1);
    }
  }, [currentSlide]);

  const goToSlide = useCallback((index) => {
    setCurrentSlide(index);
    setSlideKey(prev => prev + 1);
  }, []);

  const progress = ((currentSlide + 1) / totalSlides) * 100;

  return (
    <div className="wrapped-container" ref={containerRef}>
      {/* Progress bar */}
      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${progress}%` }} />
      </div>

      {/* Auto-advance toggle */}
      <div className="auto-advance">
        <label>Auto-play</label>
        <div
          className={`toggle-switch ${autoAdvance ? 'active' : ''}`}
          onClick={() => setAutoAdvance(!autoAdvance)}
        />
      </div>

      {/* Slides */}
      {slides.map((slide, index) => (
        <Slide
          key={`${index}-${slideKey}`}
          slide={slide}
          isActive={index === currentSlide}
          isPrev={index < currentSlide}
          isNext={index > currentSlide}
          onReset={onReset}
        />
      ))}

      {/* Progress dots (show only if < 20 slides) */}
      {totalSlides <= 20 && (
        <div className="progress-dots">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`progress-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      )}

      {/* Navigation buttons */}
      <div className="nav-buttons">
        <button
          className="nav-button"
          onClick={goToPrev}
          disabled={currentSlide === 0}
          title="Previous (Left Arrow)"
        >
          ←
        </button>
        <button
          className="nav-button"
          onClick={goToNext}
          disabled={currentSlide === totalSlides - 1}
          title="Next (Right Arrow or Space)"
        >
          →
        </button>
      </div>
    </div>
  );
}
