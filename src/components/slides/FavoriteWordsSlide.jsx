export default function FavoriteWordsSlide({ data }) {
  const words = data.linguistics.favoriteWords.slice(0, 15);

  // Calculate font sizes based on count
  const maxCount = words[0]?.count || 1;
  const minSize = 0.8;
  const maxSize = 2;

  const getSize = (count) => {
    const ratio = count / maxCount;
    return minSize + (ratio * (maxSize - minSize));
  };

  return (
    <>
      <p className="slide-label animate-fade-in-up">Your Vocabulary</p>

      <h2 className="slide-title animate-fade-in-up delay-100">
        Words you love to use
      </h2>

      <div className="word-cloud animate-fade-in-up delay-200">
        {words.map((item, index) => (
          <div
            key={item.word}
            className="word-item"
            style={{
              fontSize: `${getSize(item.count)}rem`,
              animationDelay: `${0.3 + index * 0.05}s`,
              opacity: 0.7 + (item.count / maxCount) * 0.3
            }}
            title={`${item.count.toLocaleString()} times`}
          >
            {item.word}
          </div>
        ))}
      </div>

      {words[0] && (
        <p className="slide-description animate-fade-in-up delay-400" style={{ marginTop: '1.5rem' }}>
          "<strong>{words[0].word}</strong>" appeared in your messages{' '}
          <strong>{words[0].count.toLocaleString()}</strong> times
        </p>
      )}
    </>
  );
}
