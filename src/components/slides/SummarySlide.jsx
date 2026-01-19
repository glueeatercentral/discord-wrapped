import { useCallback } from 'react';

export default function SummarySlide({ data, onReset }) {
  const { stats, linguistics, peakTimes, topEmojis, communicationStyle } = data;

  const handleExport = useCallback(async () => {
    // Create a summary text
    const summary = generateTextSummary(data);

    // Create blob and download
    const blob = new Blob([summary], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'discord-wrapped-summary.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [data]);

  return (
    <>
      <p className="slide-label animate-fade-in-up">That's a Wrap!</p>

      <h2 className="animate-fade-in-up delay-100" style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' }}>
        Your Discord Wrapped
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '1rem',
        maxWidth: '450px',
        margin: '1.5rem auto'
      }}>
        <div className="quirk-highlight animate-fade-in-up delay-200" style={{ padding: '1rem' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>
            {stats.totalMessages.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>messages sent</div>
        </div>

        <div className="quirk-highlight animate-fade-in-up delay-300" style={{ padding: '1rem' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>
            {linguistics.uniqueWords.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>unique words</div>
        </div>

        <div className="quirk-highlight animate-fade-in-up delay-400" style={{ padding: '1rem' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>
            {peakTimes.timeOfDay}
          </div>
          <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>chat personality</div>
        </div>

        <div className="quirk-highlight animate-fade-in-up delay-500" style={{ padding: '1rem' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>
            {stats.longestStreak} days
          </div>
          <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>longest streak</div>
        </div>
      </div>

      {topEmojis[0] && (
        <p className="animate-fade-in-up delay-500" style={{ opacity: 0.8, marginTop: '1rem' }}>
          Favorite emoji: {topEmojis[0].emoji}
        </p>
      )}

      {communicationStyle[0] && (
        <p className="animate-fade-in-up delay-600" style={{ opacity: 0.8 }}>
          Communication style: {communicationStyle[0].trait}
        </p>
      )}

      <div className="animate-fade-in-up delay-700" style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button className="export-button" onClick={handleExport}>
          📥 Download Summary
        </button>
        <button className="export-button" onClick={onReset}>
          🔄 Start Over
        </button>
      </div>

      <p className="animate-fade-in-up delay-800" style={{
        marginTop: '2rem',
        fontSize: '0.85rem',
        opacity: 0.6
      }}>
        Thanks for using Discord Wrapped!
      </p>
    </>
  );
}

function generateTextSummary(data) {
  const { stats, linguistics, peakTimes, topEmojis, yearComparison } = data;

  let summary = `
╔══════════════════════════════════════════╗
║           DISCORD WRAPPED                 ║
╚══════════════════════════════════════════╝

📊 MESSAGE STATISTICS
━━━━━━━━━━━━━━━━━━━━━━
Total Messages: ${stats.totalMessages.toLocaleString()}
Avg Messages/Day: ${stats.avgMessagesPerDay}
Longest Streak: ${stats.longestStreak} days

📅 ACTIVITY PATTERNS
━━━━━━━━━━━━━━━━━━━━━━
Peak Hour: ${peakTimes.peakHourFormatted}
Peak Day: ${peakTimes.peakDay}
Chat Personality: ${peakTimes.timeOfDay}

📝 VOCABULARY
━━━━━━━━━━━━━━━━━━━━━━
Unique Words: ${linguistics.uniqueWords.toLocaleString()}
Total Words: ${linguistics.totalWords.toLocaleString()}
Avg Words/Message: ${linguistics.avgWordsPerMessage}
Vocabulary Richness: ${linguistics.vocabularyRichness}

💬 TOP PHRASES
━━━━━━━━━━━━━━━━━━━━━━
${linguistics.topPhrases.slice(0, 5).map((p, i) => `${i + 1}. "${p.phrase}" (${p.count} times)`).join('\n')}

${topEmojis.length > 0 ? `😊 TOP EMOJIS
━━━━━━━━━━━━━━━━━━━━━━
${topEmojis.slice(0, 5).map((e, i) => `${i + 1}. ${e.emoji} (${e.count} times)`).join('\n')}` : ''}

${yearComparison ? `📈 YEAR COMPARISON
━━━━━━━━━━━━━━━━━━━━━━
${yearComparison.previousYear}: ${yearComparison.previousCount.toLocaleString()} messages
${yearComparison.currentYear}: ${yearComparison.currentCount.toLocaleString()} messages
Change: ${yearComparison.changePercent > 0 ? '+' : ''}${yearComparison.changePercent}%` : ''}

━━━━━━━━━━━━━━━━━━━━━━
Generated by Discord Wrapped
`;

  return summary;
}
