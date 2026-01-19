export default function BusiestDaysSlide({ data }) {
  const days = data.busiestDays.slice(0, 5);
  const maxCount = days[0]?.count || 1;

  return (
    <>
      <p className="slide-label animate-fade-in-up">Record Breakers</p>

      <h2 className="slide-title animate-fade-in-up delay-100">
        Your busiest days ever
      </h2>

      <div className="stats-list animate-fade-in-up delay-200">
        {days.map((day, index) => (
          <div
            key={day.date}
            className="stat-item"
            style={{ animationDelay: `${0.3 + index * 0.1}s` }}
          >
            <div className="stat-rank">#{index + 1}</div>
            <div className="stat-info">
              <div className="stat-name">{day.formatted}</div>
              <div className="stat-value">{day.count.toLocaleString()} messages</div>
              <div className="stat-bar-container">
                <div
                  className="stat-bar"
                  style={{ width: `${(day.count / maxCount) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="slide-description animate-fade-in-up delay-500">
        What happened on {days[0]?.formatted.split(',')[0]}? That was intense!
      </p>
    </>
  );
}
