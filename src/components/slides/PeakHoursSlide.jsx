export default function PeakHoursSlide({ data }) {
  const { peakHourFormatted, timeOfDay, hourData } = data.peakTimes;
  const maxHour = Math.max(...hourData);

  const getTimeEmoji = () => {
    const hour = data.peakTimes.peakHour;
    if (hour >= 5 && hour < 12) return '🌅';
    if (hour >= 12 && hour < 17) return '☀️';
    if (hour >= 17 && hour < 21) return '🌆';
    return '🌙';
  };

  return (
    <>
      <p className="slide-label animate-fade-in-up">Peak Activity</p>

      <h2 className="slide-title animate-fade-in-up delay-100">
        You're a
      </h2>

      <div className="slide-stat animate-count delay-200" style={{ fontSize: '3.5rem' }}>
        {getTimeEmoji()} {timeOfDay}
      </div>

      <p className="slide-description animate-fade-in-up delay-300">
        Your most active hour is <strong>{peakHourFormatted}</strong>
      </p>

      <div className="time-chart animate-fade-in-up delay-400">
        {hourData.map((count, hour) => (
          <div
            key={hour}
            className="time-bar"
            style={{
              height: `${maxHour > 0 ? (count / maxHour) * 100 : 0}%`,
              opacity: hour === data.peakTimes.peakHour ? 1 : 0.6
            }}
            title={`${hour}:00 - ${count.toLocaleString()} messages`}
          />
        ))}
      </div>
      <div className="time-labels animate-fade-in-up delay-500">
        <span>12am</span>
        <span>6am</span>
        <span>12pm</span>
        <span>6pm</span>
        <span>12am</span>
      </div>
    </>
  );
}
