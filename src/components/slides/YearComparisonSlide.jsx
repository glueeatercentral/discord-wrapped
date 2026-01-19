export default function YearComparisonSlide({ data }) {
  const { currentYear, previousYear, currentCount, previousCount, changePercent } = data.yearComparison;

  const isPositive = changePercent >= 0;
  const arrow = isPositive ? '↑' : '↓';

  return (
    <>
      <p className="slide-label animate-fade-in-up">Year Over Year</p>

      <h2 className="slide-title animate-fade-in-up delay-100">
        How you've changed
      </h2>

      <div className="year-comparison animate-fade-in-up delay-200">
        <div className="year-stat">
          <div className="year-label">{previousYear}</div>
          <div className="year-value">{previousCount.toLocaleString()}</div>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          fontSize: '2rem',
          opacity: 0.5
        }}>
          →
        </div>

        <div className="year-stat">
          <div className="year-label">{currentYear}</div>
          <div className="year-value">{currentCount.toLocaleString()}</div>
        </div>
      </div>

      <div className={`animate-fade-in-up delay-300`} style={{
        marginTop: '2rem',
        padding: '1rem 2rem',
        background: 'rgba(255,255,255,0.15)',
        borderRadius: '12px',
        display: 'inline-block'
      }}>
        <span style={{
          fontSize: '2rem',
          fontWeight: 700,
          color: isPositive ? '#57F287' : '#ED4245'
        }}>
          {arrow} {Math.abs(changePercent)}%
        </span>
        <p style={{ marginTop: '0.5rem', opacity: 0.8 }}>
          {isPositive
            ? `You were ${changePercent}% more active!`
            : `A quieter year - quality over quantity!`
          }
        </p>
      </div>
    </>
  );
}
