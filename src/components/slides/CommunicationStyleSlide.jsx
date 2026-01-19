export default function CommunicationStyleSlide({ data }) {
  const traits = data.communicationStyle;

  const getTraitEmoji = (trait) => {
    const lower = trait.toLowerCase();
    if (lower.includes('curious')) return '🤔';
    if (lower.includes('expressive')) return '🎭';
    if (lower.includes('concise')) return '✂️';
    if (lower.includes('detailed') || lower.includes('storyteller')) return '📖';
    if (lower.includes('enthusiastic')) return '🔊';
    if (lower.includes('emoji')) return '😊';
    if (lower.includes('casual')) return '😎';
    return '💬';
  };

  return (
    <>
      <p className="slide-label animate-fade-in-up">Your Style</p>

      <h2 className="slide-title animate-fade-in-up delay-100">
        Your communication personality
      </h2>

      <div className="stats-list animate-fade-in-up delay-200" style={{ maxWidth: '450px', margin: '0 auto' }}>
        {traits.map((item, index) => (
          <div
            key={item.trait}
            className="stat-item"
            style={{ animationDelay: `${0.3 + index * 0.1}s` }}
          >
            <div className="stat-rank" style={{ fontSize: '1.8rem' }}>
              {getTraitEmoji(item.trait)}
            </div>
            <div className="stat-info">
              <div className="stat-name">{item.trait}</div>
              <div className="stat-value">{item.description}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
