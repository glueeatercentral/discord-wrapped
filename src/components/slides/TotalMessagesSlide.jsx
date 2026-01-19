export default function TotalMessagesSlide({ data }) {
  const total = data.stats.totalMessages;
  const formatted = total.toLocaleString();

  // Fun comparison
  const getComparison = () => {
    if (total > 100000) return "That's a novel's worth of messages!";
    if (total > 50000) return "You could fill a small book with all that!";
    if (total > 20000) return "You've been quite the conversationalist!";
    if (total > 10000) return "A solid year of chatting!";
    if (total > 5000) return "You're a regular Discord user!";
    return "Quality over quantity!";
  };

  return (
    <>
      <p className="slide-label animate-fade-in-up">Total Messages</p>

      <h2 className="slide-title animate-fade-in-up delay-100">
        You sent
      </h2>

      <div className="slide-stat animate-count delay-200">
        {formatted}
      </div>

      <p className="slide-stat-label animate-fade-in-up delay-300">
        messages
      </p>

      <p className="slide-description animate-fade-in-up delay-400">
        {getComparison()}
      </p>

      {data.stats.avgMessagesPerDay > 0 && (
        <div className="animate-fade-in-up delay-500" style={{ marginTop: '2rem' }}>
          <div style={{
            background: 'rgba(255,255,255,0.15)',
            padding: '1rem 1.5rem',
            borderRadius: '12px',
            display: 'inline-block'
          }}>
            That's about <strong>{data.stats.avgMessagesPerDay}</strong> messages per active day
          </div>
        </div>
      )}
    </>
  );
}
