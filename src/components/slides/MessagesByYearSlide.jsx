export default function MessagesByYearSlide({ data }) {
  const years = Object.entries(data.stats.messagesByYear)
    .sort(([a], [b]) => parseInt(a) - parseInt(b));

  const maxCount = Math.max(...years.map(([, count]) => count));

  return (
    <>
      <p className="slide-label animate-fade-in-up">Your Journey</p>

      <h2 className="slide-title animate-fade-in-up delay-100">
        Messages over the years
      </h2>

      <div className="stats-list animate-fade-in-up delay-200" style={{ maxWidth: '400px', margin: '0 auto' }}>
        {years.map(([year, count], index) => (
          <div key={year} className="stat-item" style={{ animationDelay: `${0.3 + index * 0.1}s` }}>
            <div className="stat-rank">{year}</div>
            <div className="stat-info">
              <div className="stat-name">{count.toLocaleString()} messages</div>
              <div className="stat-bar-container">
                <div
                  className="stat-bar"
                  style={{ width: `${(count / maxCount) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
