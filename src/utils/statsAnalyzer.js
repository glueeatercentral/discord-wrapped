/**
 * Statistics Analyzer
 * Analyzes Discord message data to extract meaningful statistics
 */

export function analyzeMessages(messages, messageIndex, servers) {
  const stats = {
    totalMessages: messages.length,
    messagesByYear: {},
    messagesByMonth: {},
    messagesByDay: {},
    messagesByHour: new Array(24).fill(0),
    messagesByDayOfWeek: new Array(7).fill(0),
    topChannels: {},
    topServers: {},
    topDMs: {},
    longestStreak: 0,
    currentStreak: 0,
    avgMessagesPerDay: 0,
    firstMessage: null,
    lastMessage: null,
    emojiStats: {},
    attachmentCount: 0,
    avgMessageLength: 0,
    longestMessage: null,
    messageDates: new Set()
  };

  if (messages.length === 0) return stats;

  // Sort messages by timestamp
  const sortedMessages = [...messages].sort((a, b) =>
    new Date(a.Timestamp) - new Date(b.Timestamp)
  );

  stats.firstMessage = sortedMessages[0];
  stats.lastMessage = sortedMessages[sortedMessages.length - 1];

  let totalLength = 0;
  let longestLength = 0;

  // Process each message
  for (const msg of messages) {
    const date = new Date(msg.Timestamp);
    const year = date.getFullYear();
    const month = `${year}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    const day = date.toISOString().split('T')[0];
    const hour = date.getHours();
    const dayOfWeek = date.getDay();

    // Count by time periods
    stats.messagesByYear[year] = (stats.messagesByYear[year] || 0) + 1;
    stats.messagesByMonth[month] = (stats.messagesByMonth[month] || 0) + 1;
    stats.messagesByDay[day] = (stats.messagesByDay[day] || 0) + 1;
    stats.messagesByHour[hour]++;
    stats.messagesByDayOfWeek[dayOfWeek]++;
    stats.messageDates.add(day);

    // Message content analysis
    const content = msg.Contents || '';
    totalLength += content.length;
    if (content.length > longestLength) {
      longestLength = content.length;
      stats.longestMessage = msg;
    }

    // Extract emojis (custom and unicode)
    const customEmojis = content.match(/<a?:[a-zA-Z0-9_]+:\d+>/g) || [];
    const unicodeEmojis = content.match(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F600}-\u{1F64F}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]/gu) || [];

    [...customEmojis, ...unicodeEmojis].forEach(emoji => {
      stats.emojiStats[emoji] = (stats.emojiStats[emoji] || 0) + 1;
    });

    // Count attachments
    if (msg.Attachments && msg.Attachments.length > 0) {
      const attachmentUrls = msg.Attachments.split(' ').filter(Boolean);
      stats.attachmentCount += attachmentUrls.length;
    }
  }

  // Calculate averages
  stats.avgMessageLength = Math.round(totalLength / messages.length);

  // Calculate streaks
  const streakResult = calculateStreaks(stats.messageDates);
  stats.longestStreak = streakResult.longest;
  stats.currentStreak = streakResult.current;

  // Calculate average messages per day
  const dayCount = stats.messageDates.size;
  stats.avgMessagesPerDay = dayCount > 0 ? Math.round(messages.length / dayCount) : 0;

  // Group messages by channel from message IDs
  const channelMessages = {};
  for (const msg of messages) {
    // We'll estimate channel from the message index
    // Since messages don't have channel ID directly, we need to track during parsing
  }

  // Analyze channel/server distribution from the index
  for (const [channelId, channelName] of Object.entries(messageIndex)) {
    const isDM = channelName.startsWith('Direct Message');
    const hasServer = channelName.includes(' in ');

    if (isDM) {
      // Extract DM username
      const match = channelName.match(/Direct Message with (.+?)#/);
      if (match) {
        stats.topDMs[match[1]] = stats.topDMs[match[1]] || { count: 0, channelId };
      }
    } else if (hasServer) {
      const parts = channelName.split(' in ');
      const serverName = parts.slice(1).join(' in ');
      stats.topServers[serverName] = stats.topServers[serverName] || { count: 0, channels: [] };
    }
  }

  return stats;
}

/**
 * Calculate message streaks
 */
function calculateStreaks(messageDates) {
  if (messageDates.size === 0) return { longest: 0, current: 0 };

  const dates = Array.from(messageDates).sort();
  let longestStreak = 1;
  let currentStreak = 1;
  let tempStreak = 1;

  for (let i = 1; i < dates.length; i++) {
    const prevDate = new Date(dates[i - 1]);
    const currDate = new Date(dates[i]);
    const diffDays = Math.floor((currDate - prevDate) / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      tempStreak++;
      longestStreak = Math.max(longestStreak, tempStreak);
    } else {
      tempStreak = 1;
    }
  }

  // Calculate current streak from today
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

  if (messageDates.has(today) || messageDates.has(yesterday)) {
    const sortedDates = dates.reverse();
    currentStreak = 1;

    for (let i = 1; i < sortedDates.length; i++) {
      const prevDate = new Date(sortedDates[i - 1]);
      const currDate = new Date(sortedDates[i]);
      const diffDays = Math.floor((prevDate - currDate) / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        currentStreak++;
      } else {
        break;
      }
    }
  } else {
    currentStreak = 0;
  }

  return { longest: longestStreak, current: currentStreak };
}

/**
 * Analyze messages by channel
 */
export function analyzeChannelStats(messages, channelMap, messageIndex) {
  const channelStats = {};

  // Group messages by their channel folder (derived during parsing)
  for (const [channelId, msgs] of Object.entries(channelMap)) {
    const channelInfo = messageIndex[channelId] || `Channel ${channelId}`;

    channelStats[channelId] = {
      name: channelInfo,
      messageCount: msgs.length,
      messages: msgs
    };
  }

  // Sort by message count
  const sorted = Object.entries(channelStats)
    .sort(([, a], [, b]) => b.messageCount - a.messageCount)
    .slice(0, 20);

  return Object.fromEntries(sorted);
}

/**
 * Get year-over-year comparison
 */
export function getYearComparison(messagesByYear) {
  const years = Object.keys(messagesByYear).sort();
  if (years.length < 2) return null;

  const currentYear = years[years.length - 1];
  const previousYear = years[years.length - 2];

  const current = messagesByYear[currentYear] || 0;
  const previous = messagesByYear[previousYear] || 0;

  const change = previous > 0
    ? Math.round(((current - previous) / previous) * 100)
    : 100;

  return {
    currentYear,
    previousYear,
    currentCount: current,
    previousCount: previous,
    changePercent: change
  };
}

/**
 * Get peak activity times
 */
export function getPeakTimes(messagesByHour, messagesByDayOfWeek) {
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // Find peak hour
  const peakHourIndex = messagesByHour.indexOf(Math.max(...messagesByHour));
  const peakHour = peakHourIndex;
  const peakHourFormatted = peakHourIndex === 0 ? '12 AM'
    : peakHourIndex < 12 ? `${peakHourIndex} AM`
    : peakHourIndex === 12 ? '12 PM'
    : `${peakHourIndex - 12} PM`;

  // Find peak day
  const peakDayIndex = messagesByDayOfWeek.indexOf(Math.max(...messagesByDayOfWeek));
  const peakDay = dayNames[peakDayIndex];

  // Categorize time of day
  let timeOfDay;
  if (peakHour >= 5 && peakHour < 12) timeOfDay = 'morning person';
  else if (peakHour >= 12 && peakHour < 17) timeOfDay = 'afternoon chatter';
  else if (peakHour >= 17 && peakHour < 21) timeOfDay = 'evening enthusiast';
  else timeOfDay = 'night owl';

  return {
    peakHour,
    peakHourFormatted,
    peakDay,
    timeOfDay,
    hourData: messagesByHour,
    dayData: messagesByDayOfWeek
  };
}

/**
 * Get top emojis
 */
export function getTopEmojis(emojiStats, limit = 10) {
  return Object.entries(emojiStats)
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit)
    .map(([emoji, count]) => ({ emoji, count }));
}

/**
 * Get busiest days
 */
export function getBusiestDays(messagesByDay, limit = 5) {
  return Object.entries(messagesByDay)
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit)
    .map(([date, count]) => {
      const d = new Date(date);
      return {
        date,
        formatted: d.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        count
      };
    });
}
