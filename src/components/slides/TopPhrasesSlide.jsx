export default function TopPhrasesSlide({ data }) {
  const phrases = data.linguistics.topPhrases.slice(0, 6);

  return (
    <>
      <p className="slide-label animate-fade-in-up">Signature Phrases</p>

      <h2 className="slide-title animate-fade-in-up delay-100">
        Your most used phrases
      </h2>

      <div className="phrase-cards animate-fade-in-up delay-200">
        {phrases.map((item, index) => (
          <div
            key={item.phrase}
            className="phrase-card"
            style={{ animationDelay: `${0.3 + index * 0.1}s` }}
          >
            <div className="phrase-text">"{item.phrase}"</div>
            <div className="phrase-count">Used {item.count.toLocaleString()} times</div>
          </div>
        ))}
      </div>
    </>
  );
}
