export default function TopEmojisSlide({ data }) {
  const emojis = data.topEmojis.slice(0, 10);

  // Check if it's a custom Discord emoji
  const renderEmoji = (emoji) => {
    const customMatch = emoji.match(/<a?:([a-zA-Z0-9_]+):(\d+)>/);
    if (customMatch) {
      const isAnimated = emoji.startsWith('<a:');
      const name = customMatch[1];
      const id = customMatch[2];
      const ext = isAnimated ? 'gif' : 'png';
      return (
        <img
          src={`https://cdn.discordapp.com/emojis/${id}.${ext}`}
          alt={name}
          style={{ width: '2rem', height: '2rem' }}
        />
      );
    }
    return emoji;
  };

  return (
    <>
      <p className="slide-label animate-fade-in-up">Express Yourself</p>

      <h2 className="slide-title animate-fade-in-up delay-100">
        Your favorite emojis
      </h2>

      <div className="emoji-grid animate-fade-in-up delay-200">
        {emojis.map((item, index) => (
          <div
            key={index}
            className="emoji-item"
            style={{ animationDelay: `${0.3 + index * 0.05}s` }}
          >
            <div className="emoji-char">{renderEmoji(item.emoji)}</div>
            <div className="emoji-count">{item.count.toLocaleString()}</div>
          </div>
        ))}
      </div>

      {emojis[0] && (
        <p className="slide-description animate-fade-in-up delay-400" style={{ marginTop: '1.5rem' }}>
          You used {renderEmoji(emojis[0].emoji)} <strong>{emojis[0].count.toLocaleString()}</strong> times!
        </p>
      )}
    </>
  );
}
