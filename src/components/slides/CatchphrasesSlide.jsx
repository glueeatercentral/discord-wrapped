export default function CatchphrasesSlide({ data }) {
  const catchphrases = data.linguistics.catchphrases.slice(0, 5);

  if (catchphrases.length === 0) {
    return null;
  }

  return (
    <>
      <p className="slide-label animate-fade-in-up">Your Catchphrases</p>

      <h2 className="slide-title animate-fade-in-up delay-100">
        Things you say... a lot
      </h2>

      <div className="phrase-cards animate-fade-in-up delay-200">
        {catchphrases.map((item, index) => (
          <div
            key={item.phrase}
            className="phrase-card animate-slide-left"
            style={{
              animationDelay: `${0.3 + index * 0.15}s`,
              textAlign: 'center',
              padding: '1.25rem'
            }}
          >
            <div className="phrase-text" style={{ fontSize: '1.3rem' }}>
              "{item.phrase}"
            </div>
            <div className="phrase-count" style={{ marginTop: '0.5rem' }}>
              {item.count.toLocaleString()} times - it's basically your trademark!
            </div>
          </div>
        ))}
      </div>

      <p className="slide-description animate-fade-in-up delay-500" style={{ marginTop: '1.5rem' }}>
        These phrases are uniquely you!
      </p>
    </>
  );
}
