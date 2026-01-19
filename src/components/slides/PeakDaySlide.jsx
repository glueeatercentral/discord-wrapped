export default function PeakDaySlide({ data }) {
  const { peakDay, dayData } = data.peakTimes;
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const maxDay = Math.max(...dayData);

  const getDayEmoji = () => {
    switch (peakDay) {
      case 'Monday': return '😤';
      case 'Friday': return '🎉';
      case 'Saturday': return '🎮';
      case 'Sunday': return '😴';
      default: return '💬';
    }
  };

  return (
    <>
      <p className="slide-label animate-fade-in-up">Favorite Day</p>

      <h2 className="slide-title animate-fade-in-up delay-100">
        You chat the most on
      </h2>

      <div className="slide-stat animate-count delay-200" style={{ fontSize: '3.5rem' }}>
        {getDayEmoji()} {peakDay}s
      </div>

      <div className="time-chart animate-fade-in-up delay-300" style={{ height: '120px', marginTop: '2rem' }}>
        {dayData.map((count, dayIndex) => (
          <div
            key={dayIndex}
            className="time-bar"
            style={{
              height: `${maxDay > 0 ? (count / maxDay) * 100 : 0}%`,
              opacity: dayNames[dayIndex] === peakDay.substring(0, 3) ? 1 : 0.6,
              flex: 1,
              maxWidth: '60px'
            }}
            title={`${dayNames[dayIndex]} - ${count.toLocaleString()} messages`}
          />
        ))}
      </div>
      <div className="time-labels animate-fade-in-up delay-400" style={{ justifyContent: 'space-around' }}>
        {dayNames.map(day => <span key={day}>{day}</span>)}
      </div>
    </>
  );
}
