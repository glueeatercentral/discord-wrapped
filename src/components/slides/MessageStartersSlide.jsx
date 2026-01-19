export default function MessageStartersSlide({ data }) {
  const starters = data.linguistics.messageStarters.slice(0, 5);

  return (
    <>
      <p className="slide-label animate-fade-in-up">Conversation Opener</p>

      <h2 className="slide-title animate-fade-in-up delay-100">
        How you start messages
      </h2>

      <div className="phrase-cards animate-fade-in-up delay-200">
        {starters.map((item, index) => (
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
            <div className="phrase-text" style={{ textTransform: 'capitalize' }}>
              "{item.word}..."
            </div>
            <div className="phrase-count">{item.percent}%</div>
          </div>
        ))}
      </div>

      <p className="slide-description animate-fade-in-up delay-400" style={{ marginTop: '1.5rem' }}>
        {starters[0]?.word === 'i' && "You often start with yourself - confident communicator!"}
        {starters[0]?.word === 'so' && "You love building on conversations!"}
        {starters[0]?.word === 'hey' && "Friendly opener - you're approachable!"}
        {starters[0]?.word === 'lol' && "You lead with humor!"}
        {!['i', 'so', 'hey', 'lol'].includes(starters[0]?.word) && "You have a unique way of starting conversations!"}
      </p>
    </>
  );
}
