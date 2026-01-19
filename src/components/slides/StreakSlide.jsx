export default function StreakSlide({ data }) {
  const { longestStreak, currentStreak } = data.stats;

  const getStreakEmoji = () => {
    if (longestStreak > 365) return '🏆';
    if (longestStreak > 100) return '🔥';
    if (longestStreak > 30) return '⚡';
    if (longestStreak > 7) return '✨';
    return '💬';
  };

  const getStreakMessage = () => {
    if (longestStreak > 365) return "Over a year of daily messages. Incredible dedication!";
    if (longestStreak > 100) return "100+ day streak! You're a Discord regular!";
    if (longestStreak > 30) return "A month-long streak! Consistent communicator!";
    if (longestStreak > 7) return "A solid week of daily chatting!";
    return "Every message counts!";
  };

  return (
    <>
      <p className="slide-label animate-fade-in-up">Dedication</p>

      <h2 className="slide-title animate-fade-in-up delay-100">
        Your longest messaging streak
      </h2>

      <div className="slide-stat animate-count delay-200">
        {getStreakEmoji()} {longestStreak}
      </div>
      <p className="slide-stat-label animate-fade-in-up delay-300">
        consecutive days
      </p>

      <p className="slide-description animate-fade-in-up delay-400">
        {getStreakMessage()}
      </p>

      {currentStreak > 0 && (
        <div className="quirk-highlight animate-fade-in-up delay-500" style={{ marginTop: '2rem' }}>
          <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Current streak</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>
            {currentStreak} day{currentStreak !== 1 ? 's' : ''} and counting!
          </div>
        </div>
      )}
    </>
  );
}
