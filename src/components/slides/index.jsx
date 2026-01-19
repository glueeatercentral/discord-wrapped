import IntroSlide from './IntroSlide';
import TotalMessagesSlide from './TotalMessagesSlide';
import MessagesByYearSlide from './MessagesByYearSlide';
import PeakHoursSlide from './PeakHoursSlide';
import PeakDaySlide from './PeakDaySlide';
import TopEmojisSlide from './TopEmojisSlide';
import BusiestDaysSlide from './BusiestDaysSlide';
import FavoriteWordsSlide from './FavoriteWordsSlide';
import TopPhrasesSlide from './TopPhrasesSlide';
import CommunicationStyleSlide from './CommunicationStyleSlide';
import MessageStartersSlide from './MessageStartersSlide';
import FillerWordsSlide from './FillerWordsSlide';
import VocabularySlide from './VocabularySlide';
import StreakSlide from './StreakSlide';
import YearComparisonSlide from './YearComparisonSlide';
import CatchphrasesSlide from './CatchphrasesSlide';
import SummarySlide from './SummarySlide';

export function generateSlides(data) {
  const slides = [];

  // 1. Intro
  slides.push({
    background: 'discord',
    render: (props) => <IntroSlide data={data} {...props} />
  });

  // 2. Total messages
  slides.push({
    background: '1',
    render: (props) => <TotalMessagesSlide data={data} {...props} />
  });

  // 3. Messages by year (if multiple years)
  if (Object.keys(data.stats.messagesByYear).length > 1) {
    slides.push({
      background: '2',
      render: (props) => <MessagesByYearSlide data={data} {...props} />
    });
  }

  // 4. Year comparison (if available)
  if (data.yearComparison) {
    slides.push({
      background: '3',
      render: (props) => <YearComparisonSlide data={data} {...props} />
    });
  }

  // 5. Peak hours
  slides.push({
    background: '4',
    render: (props) => <PeakHoursSlide data={data} {...props} />
  });

  // 6. Peak day of week
  slides.push({
    background: '5',
    render: (props) => <PeakDaySlide data={data} {...props} />
  });

  // 7. Busiest days
  if (data.busiestDays.length > 0) {
    slides.push({
      background: '6',
      render: (props) => <BusiestDaysSlide data={data} {...props} />
    });
  }

  // 8. Message streak
  if (data.stats.longestStreak > 1) {
    slides.push({
      background: '7',
      render: (props) => <StreakSlide data={data} {...props} />
    });
  }

  // 9. Top emojis
  if (data.topEmojis.length > 0) {
    slides.push({
      background: '8',
      render: (props) => <TopEmojisSlide data={data} {...props} />
    });
  }

  // 10. Favorite words
  if (data.linguistics.favoriteWords.length > 0) {
    slides.push({
      background: '9',
      render: (props) => <FavoriteWordsSlide data={data} {...props} />
    });
  }

  // 11. Top phrases
  if (data.linguistics.topPhrases.length > 0) {
    slides.push({
      background: '10',
      render: (props) => <TopPhrasesSlide data={data} {...props} />
    });
  }

  // 12. Catchphrases
  if (data.linguistics.catchphrases.length > 0) {
    slides.push({
      background: '11',
      render: (props) => <CatchphrasesSlide data={data} {...props} />
    });
  }

  // 13. Communication style
  if (data.communicationStyle.length > 0) {
    slides.push({
      background: '12',
      render: (props) => <CommunicationStyleSlide data={data} {...props} />
    });
  }

  // 14. Message starters
  if (data.linguistics.messageStarters.length > 0) {
    slides.push({
      background: '1',
      render: (props) => <MessageStartersSlide data={data} {...props} />
    });
  }

  // 15. Filler words
  if (data.linguistics.fillerWords.length > 0) {
    slides.push({
      background: '2',
      render: (props) => <FillerWordsSlide data={data} {...props} />
    });
  }

  // 16. Vocabulary stats
  slides.push({
    background: '3',
    render: (props) => <VocabularySlide data={data} {...props} />
  });

  // 17. Summary
  slides.push({
    background: 'discord',
    render: (props) => <SummarySlide data={data} {...props} />
  });

  return slides;
}
