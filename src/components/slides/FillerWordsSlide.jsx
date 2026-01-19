export default function FillerWordsSlide({ data }) {
  const fillers = data.linguistics.fillerWords.slice(0, 6);

  if (fillers.length === 0) {
    return (
      <>
        <p className="slide-label animate-fade-in-up">Word Patterns</p>
        <h2 className="slide-title animate-fade-in-up delay-100">
          Clean communicator!
        </h2>
        <p className="slide-description animate-fade-in-up delay-200">
          You don't rely on filler words. Clear and direct!
        </p>
      </>
    );
  }

  return (
    <>
      <p className="slide-label animate-fade-in-up">Your Verbal Tics</p>

      <h2 className="slide-title animate-fade-in-up delay-100">
        Your favorite filler words
      </h2>

      <div className="phrase-cards animate-fade-in-up delay-200">
        {fillers.map((item, index) => (
          <div
            key={item.word}
            className="phrase-card"
            style={{
              animationDelay: `${0.3 + index * 0.1}s`,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div className="phrase-text">"{item.word}"</div>
            <div className="phrase-count">{item.count.toLocaleString()} times</div>
          </div>
        ))}
      </div>

      <p className="slide-description animate-fade-in-up delay-400" style={{ marginTop: '1.5rem' }}>
        We all have our conversational quirks!
      </p>
    </>
  );
}
