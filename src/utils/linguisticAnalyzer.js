/**
 * Linguistic Analyzer
 * Analyzes message content for linguistic patterns, phrases, and quirks
 */

// Common stop words to filter out
const STOP_WORDS = new Set([
  'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i',
  'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at',
  'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she',
  'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what',
  'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me',
  'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know', 'take',
  'people', 'into', 'year', 'your', 'good', 'some', 'could', 'them', 'see',
  'other', 'than', 'then', 'now', 'look', 'only', 'come', 'its', 'over',
  'think', 'also', 'back', 'after', 'use', 'two', 'how', 'our', 'work',
  'first', 'well', 'way', 'even', 'new', 'want', 'because', 'any', 'these',
  'give', 'day', 'most', 'us', 'is', 'are', 'was', 'were', 'been', 'has',
  'had', 'did', 'does', "i'm", "it's", "don't", "that's", "i've", "you're",
  "he's", "she's", "we're", "they're", "isn't", "aren't", "wasn't", "weren't",
  "hasn't", "haven't", "hadn't", "won't", "wouldn't", "didn't", "doesn't",
  "can't", "couldn't", "shouldn't", "let's", "here's", "there's", "what's",
  "where's", "who's", "how's", "im", "dont", "thats", "ive", "youre", 'oh',
  'yeah', 'yes', 'no', 'ok', 'okay', 'lol', 'haha', 'u', 'ur', 'r', 'b',
  'k', 'n', 'y', 'tho', 'tho', 'tho', 'rn', 'ig', 'idk', 'ngl', 'tbh',
  'imo', 'btw', 'bruh', 'bro', 'dude', 'man', 'yo', 'hey', 'hi', 'hello'
]);

// Common filler words
const FILLER_WORDS = [
  'like', 'literally', 'actually', 'basically', 'honestly', 'seriously',
  'obviously', 'definitely', 'probably', 'maybe', 'kinda', 'sorta',
  'really', 'very', 'super', 'pretty', 'quite', 'just', 'so', 'well',
  'anyway', 'anyways', 'i mean', 'you know', 'kind of', 'sort of',
  'i guess', 'i think', 'i feel like', 'lowkey', 'highkey', 'fr',
  'deadass', 'lowkey', 'ngl', 'tbh', 'imo', 'imho'
];

// Message starters
const MESSAGE_STARTERS = [
  'i', 'the', 'so', 'but', 'and', 'well', 'oh', 'yeah', 'no', 'wait',
  'omg', 'lol', 'bruh', 'bro', 'yo', 'hey', 'hi', 'ok', 'okay', 'hmm',
  'nah', 'yea', 'ye', 'ugh', 'damn', 'wow', 'like', 'honestly', 'literally'
];

// Message enders
const MESSAGE_ENDERS = [
  'lol', 'lmao', 'haha', 'hahaha', '!', '?', '...', 'tho', 'though',
  'tbh', 'ngl', 'fr', 'imo', 'rn', 'ig', 'xd', 'dude', 'bro', 'man',
  ':)', ':(', ':D', 'D:', 'ok', 'okay', 'k', 'kk'
];

/**
 * Main linguistic analysis function
 */
export function analyzeLinguistics(messages) {
  const analysis = {
    // Phrase analysis
    topPhrases: [],
    twoWordPhrases: [],
    threeWordPhrases: [],
    fourWordPhrases: [],
    fiveWordPhrases: [],

    // Vocabulary
    uniqueWords: 0,
    totalWords: 0,
    vocabularyRichness: 0,
    favoriteWords: [],
    rareWords: [],

    // Sentence patterns
    questionFrequency: 0,
    exclamationFrequency: 0,
    avgWordsPerMessage: 0,
    shortMessagePercent: 0,
    longMessagePercent: 0,

    // Quirks
    fillerWords: {},
    messageStarters: {},
    messageEnders: {},
    capsLockPercent: 0,
    emojiDensity: 0,

    // Evolution
    vocabularyOverTime: {},
    messageStyleOverTime: {},

    // Unique patterns
    catchphrases: [],
    uniqueExpressions: [],
    recurringReferences: [],

    // Sample messages
    sampleMessages: []
  };

  if (messages.length === 0) return analysis;

  // Filter to only text messages
  const textMessages = messages.filter(m => m.Contents && m.Contents.trim().length > 0);

  if (textMessages.length === 0) return analysis;

  // Word frequency map
  const wordFreq = {};
  const phraseFreq2 = {};
  const phraseFreq3 = {};
  const phraseFreq4 = {};
  const phraseFreq5 = {};
  const starterFreq = {};
  const enderFreq = {};
  const fillerFreq = {};

  let totalWords = 0;
  let questionCount = 0;
  let exclamationCount = 0;
  let capsMessages = 0;
  let shortMessages = 0;
  let longMessages = 0;
  let totalEmojis = 0;

  // Process each message
  for (const msg of textMessages) {
    const content = msg.Contents;
    const cleanContent = cleanText(content);
    const words = tokenize(cleanContent);

    if (words.length === 0) continue;

    totalWords += words.length;

    // Count words
    for (const word of words) {
      if (!STOP_WORDS.has(word.toLowerCase()) && word.length > 1) {
        const lower = word.toLowerCase();
        wordFreq[lower] = (wordFreq[lower] || 0) + 1;
      }
    }

    // Count n-grams (phrases)
    const ngrams2 = getNgrams(words, 2);
    const ngrams3 = getNgrams(words, 3);
    const ngrams4 = getNgrams(words, 4);
    const ngrams5 = getNgrams(words, 5);

    for (const phrase of ngrams2) {
      if (!isBoringPhrase(phrase)) {
        phraseFreq2[phrase] = (phraseFreq2[phrase] || 0) + 1;
      }
    }
    for (const phrase of ngrams3) {
      if (!isBoringPhrase(phrase)) {
        phraseFreq3[phrase] = (phraseFreq3[phrase] || 0) + 1;
      }
    }
    for (const phrase of ngrams4) {
      if (!isBoringPhrase(phrase)) {
        phraseFreq4[phrase] = (phraseFreq4[phrase] || 0) + 1;
      }
    }
    for (const phrase of ngrams5) {
      if (!isBoringPhrase(phrase)) {
        phraseFreq5[phrase] = (phraseFreq5[phrase] || 0) + 1;
      }
    }

    // Message starters
    const firstWord = words[0]?.toLowerCase();
    if (firstWord) {
      starterFreq[firstWord] = (starterFreq[firstWord] || 0) + 1;
    }

    // Message enders
    const lastWord = words[words.length - 1]?.toLowerCase();
    if (lastWord) {
      enderFreq[lastWord] = (enderFreq[lastWord] || 0) + 1;
    }

    // Filler words
    for (const filler of FILLER_WORDS) {
      if (cleanContent.toLowerCase().includes(filler)) {
        fillerFreq[filler] = (fillerFreq[filler] || 0) + 1;
      }
    }

    // Sentence patterns
    if (content.includes('?')) questionCount++;
    if (content.includes('!')) exclamationCount++;

    // Caps lock detection (more than 50% caps in a message of 3+ chars)
    const alphaChars = content.replace(/[^a-zA-Z]/g, '');
    if (alphaChars.length >= 3) {
      const upperChars = content.replace(/[^A-Z]/g, '');
      if (upperChars.length / alphaChars.length > 0.5) {
        capsMessages++;
      }
    }

    // Message length categories
    if (words.length <= 3) shortMessages++;
    else if (words.length >= 20) longMessages++;

    // Emoji count
    const emojis = content.match(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F600}-\u{1F64F}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|<a?:[a-zA-Z0-9_]+:\d+>/gu) || [];
    totalEmojis += emojis.length;
  }

  // Calculate statistics
  const uniqueWordCount = Object.keys(wordFreq).length;

  analysis.totalWords = totalWords;
  analysis.uniqueWords = uniqueWordCount;
  analysis.vocabularyRichness = totalWords > 0
    ? (uniqueWordCount / Math.sqrt(totalWords)).toFixed(2)
    : 0;

  analysis.avgWordsPerMessage = (totalWords / textMessages.length).toFixed(1);
  analysis.questionFrequency = ((questionCount / textMessages.length) * 100).toFixed(1);
  analysis.exclamationFrequency = ((exclamationCount / textMessages.length) * 100).toFixed(1);
  analysis.capsLockPercent = ((capsMessages / textMessages.length) * 100).toFixed(1);
  analysis.shortMessagePercent = ((shortMessages / textMessages.length) * 100).toFixed(1);
  analysis.longMessagePercent = ((longMessages / textMessages.length) * 100).toFixed(1);
  analysis.emojiDensity = (totalEmojis / textMessages.length).toFixed(2);

  // Top favorite words
  analysis.favoriteWords = Object.entries(wordFreq)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 20)
    .map(([word, count]) => ({ word, count }));

  // Top phrases
  analysis.twoWordPhrases = getTopPhrases(phraseFreq2, 10);
  analysis.threeWordPhrases = getTopPhrases(phraseFreq3, 10);
  analysis.fourWordPhrases = getTopPhrases(phraseFreq4, 10);
  analysis.fiveWordPhrases = getTopPhrases(phraseFreq5, 5);

  // Combined top phrases
  analysis.topPhrases = [
    ...analysis.threeWordPhrases.slice(0, 3),
    ...analysis.fourWordPhrases.slice(0, 3),
    ...analysis.twoWordPhrases.slice(0, 4)
  ].sort((a, b) => b.count - a.count).slice(0, 10);

  // Filler words
  analysis.fillerWords = Object.entries(fillerFreq)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([word, count]) => ({ word, count }));

  // Message starters
  analysis.messageStarters = Object.entries(starterFreq)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([word, count]) => ({
      word,
      count,
      percent: ((count / textMessages.length) * 100).toFixed(1)
    }));

  // Message enders
  analysis.messageEnders = Object.entries(enderFreq)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([word, count]) => ({
      word,
      count,
      percent: ((count / textMessages.length) * 100).toFixed(1)
    }));

  // Find catchphrases (phrases used very frequently relative to others)
  analysis.catchphrases = findCatchphrases(phraseFreq3, phraseFreq4, textMessages.length);

  // Find unique expressions (phrases used multiple times but not common)
  analysis.uniqueExpressions = findUniqueExpressions(
    { ...phraseFreq3, ...phraseFreq4, ...phraseFreq5 }
  );

  // Sample interesting messages
  analysis.sampleMessages = findInterestingMessages(textMessages);

  // Vocabulary over time
  analysis.vocabularyOverTime = analyzeVocabularyOverTime(textMessages);

  return analysis;
}

/**
 * Clean text for analysis
 */
function cleanText(text) {
  return text
    .replace(/<a?:[a-zA-Z0-9_]+:\d+>/g, '') // Remove custom emojis
    .replace(/https?:\/\/\S+/g, '') // Remove URLs
    .replace(/<@!?\d+>/g, '') // Remove user mentions
    .replace(/<#\d+>/g, '') // Remove channel mentions
    .replace(/<@&\d+>/g, '') // Remove role mentions
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`[^`]+`/g, '') // Remove inline code
    .replace(/\|\|[\s\S]*?\|\|/g, '') // Remove spoilers
    .trim();
}

/**
 * Tokenize text into words
 */
function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s']/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 0);
}

/**
 * Get n-grams from words
 */
function getNgrams(words, n) {
  const ngrams = [];
  for (let i = 0; i <= words.length - n; i++) {
    ngrams.push(words.slice(i, i + n).join(' '));
  }
  return ngrams;
}

/**
 * Check if a phrase is boring/common
 */
function isBoringPhrase(phrase) {
  const words = phrase.split(' ');

  // Filter phrases that are all stop words
  if (words.every(w => STOP_WORDS.has(w))) return true;

  // Filter very short phrases
  if (phrase.length < 4) return true;

  // Filter phrases starting with common filler
  const boringStarts = ['i ', 'the ', 'a ', 'an ', 'to ', 'is ', 'it ', 'of '];
  if (boringStarts.some(s => phrase.startsWith(s))) {
    // But allow some interesting ones
    const interesting = ['i feel', 'i think', 'i mean', 'i love', 'i hate', 'i need', 'i want'];
    if (!interesting.some(i => phrase.startsWith(i))) {
      if (words.filter(w => !STOP_WORDS.has(w)).length < 2) return true;
    }
  }

  return false;
}

/**
 * Get top phrases sorted by count
 */
function getTopPhrases(phraseFreq, limit) {
  return Object.entries(phraseFreq)
    .filter(([, count]) => count >= 3) // Must appear at least 3 times
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit)
    .map(([phrase, count]) => ({ phrase, count }));
}

/**
 * Find catchphrases
 */
function findCatchphrases(phraseFreq3, phraseFreq4, totalMessages) {
  const threshold = Math.max(5, totalMessages * 0.001); // At least 0.1% of messages

  const allPhrases = { ...phraseFreq3, ...phraseFreq4 };

  return Object.entries(allPhrases)
    .filter(([phrase, count]) => count >= threshold && !isBoringPhrase(phrase))
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([phrase, count]) => ({ phrase, count }));
}

/**
 * Find unique expressions
 */
function findUniqueExpressions(phraseFreq) {
  return Object.entries(phraseFreq)
    .filter(([phrase, count]) => {
      // Used multiple times but not too common
      if (count < 5 || count > 50) return false;
      // Not boring
      if (isBoringPhrase(phrase)) return false;
      // Has some character
      const words = phrase.split(' ');
      return words.some(w => !STOP_WORDS.has(w) && w.length > 3);
    })
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([phrase, count]) => ({ phrase, count }));
}

/**
 * Find interesting sample messages
 */
function findInterestingMessages(messages) {
  // Look for messages that are expressive but not too long
  return messages
    .filter(m => {
      const content = m.Contents;
      const wordCount = content.split(/\s+/).length;
      return wordCount >= 5 && wordCount <= 30;
    })
    .filter(m => {
      // Has some punctuation or emotion
      return /[!?]/.test(m.Contents) || /[\u{1F300}-\u{1F9FF}]/u.test(m.Contents);
    })
    .slice(0, 20)
    .sort(() => Math.random() - 0.5)
    .slice(0, 5);
}

/**
 * Analyze vocabulary changes over time
 */
function analyzeVocabularyOverTime(messages) {
  const byYear = {};

  for (const msg of messages) {
    const year = new Date(msg.Timestamp).getFullYear();
    if (!byYear[year]) {
      byYear[year] = {
        words: new Set(),
        totalWords: 0,
        messageCount: 0,
        avgLength: 0
      };
    }

    const words = tokenize(cleanText(msg.Contents));
    byYear[year].messageCount++;
    byYear[year].totalWords += words.length;
    words.forEach(w => {
      if (!STOP_WORDS.has(w) && w.length > 2) {
        byYear[year].words.add(w);
      }
    });
  }

  // Calculate stats
  const result = {};
  for (const [year, data] of Object.entries(byYear)) {
    result[year] = {
      uniqueWords: data.words.size,
      totalWords: data.totalWords,
      messageCount: data.messageCount,
      avgWordsPerMessage: (data.totalWords / data.messageCount).toFixed(1),
      vocabularyRichness: (data.words.size / Math.sqrt(data.totalWords)).toFixed(2)
    };
  }

  return result;
}

/**
 * Get communication style summary
 */
export function getCommunicationStyle(analysis) {
  const traits = [];

  // Question asker
  if (parseFloat(analysis.questionFrequency) > 15) {
    traits.push({ trait: 'Curious Mind', description: 'You ask a lot of questions' });
  }

  // Exclaimer
  if (parseFloat(analysis.exclamationFrequency) > 20) {
    traits.push({ trait: 'Expressive', description: 'You use exclamation marks liberally!' });
  }

  // Concise
  if (parseFloat(analysis.shortMessagePercent) > 40) {
    traits.push({ trait: 'Concise Communicator', description: 'You keep messages short and sweet' });
  }

  // Elaborate
  if (parseFloat(analysis.longMessagePercent) > 10) {
    traits.push({ trait: 'Detailed Storyteller', description: 'You write detailed messages' });
  }

  // Caps enthusiast
  if (parseFloat(analysis.capsLockPercent) > 5) {
    traits.push({ trait: 'ENTHUSIASTIC', description: 'YOU REALLY EMPHASIZE YOUR POINTS' });
  }

  // Emoji lover
  if (parseFloat(analysis.emojiDensity) > 1) {
    traits.push({ trait: 'Emoji Enthusiast', description: 'You express yourself with emojis' });
  }

  // Filler word user
  if (analysis.fillerWords.length > 0 && analysis.fillerWords[0].count > 100) {
    traits.push({
      trait: 'Casual Conversationalist',
      description: `You ${analysis.fillerWords[0].word} use filler words`
    });
  }

  return traits.slice(0, 4);
}
