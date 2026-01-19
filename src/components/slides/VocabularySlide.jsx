export default function VocabularySlide({ data }) {
  const { uniqueWords, totalWords, vocabularyRichness, avgWordsPerMessage } = data.linguistics;

  const getRichnessLabel = () => {
    const richness = parseFloat(vocabularyRichness);
    if (richness > 15) return 'Shakespearean';
    if (richness > 12) return 'Articulate';
    if (richness > 9) return 'Expressive';
    if (richness > 6) return 'Conversational';
    return 'Efficient';
  };

  return (
    <>
      <p className="slide-label animate-fade-in-up">Linguistic Depth</p>

      <h2 className="slide-title animate-fade-in-up delay-100">
        Your vocabulary stats
      </h2>

      <div className="slide-stat animate-count delay-200" style={{ fontSize: '4rem' }}>
        {uniqueWords.toLocaleString()}
      </div>
      <p className="slide-stat-label animate-fade-in-up delay-300">
        unique words used
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '1rem',
        marginTop: '2rem',
        maxWidth: '400px',
        margin: '2rem auto 0'
      }}>
        <div className="quirk-highlight animate-fade-in-up delay-400" style={{ padding: '1rem' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{totalWords.toLocaleString()}</div>
          <div style={{ fontSize: '0.85rem', opacity: 0.7 }}>total words</div>
        </div>
        <div className="quirk-highlight animate-fade-in-up delay-500" style={{ padding: '1rem' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{avgWordsPerMessage}</div>
          <div style={{ fontSize: '0.85rem', opacity: 0.7 }}>words per message</div>
        </div>
      </div>

      <div className="quirk-highlight animate-fade-in-up delay-600" style={{ marginTop: '1.5rem', maxWidth: '400px', margin: '1.5rem auto 0' }}>
        <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
          Your vocabulary richness score: <strong>{vocabularyRichness}</strong>
        </div>
        <div style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '0.5rem' }}>
          You're "{getRichnessLabel()}"
        </div>
      </div>
    </>
  );
}
