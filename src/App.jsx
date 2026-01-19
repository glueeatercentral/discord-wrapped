import { useState, useCallback } from 'react';
import UploadScreen from './components/UploadScreen';
import LoadingScreen from './components/LoadingScreen';
import WrappedPresentation from './components/WrappedPresentation';
import { parseDiscordPackage } from './utils/dataParser';
import { analyzeMessages, getPeakTimes, getTopEmojis, getBusiestDays, getYearComparison } from './utils/statsAnalyzer';
import { analyzeLinguistics, getCommunicationStyle } from './utils/linguisticAnalyzer';

function App() {
  const [stage, setStage] = useState('upload'); // upload, loading, wrapped
  const [loadingMessage, setLoadingMessage] = useState('');
  const [wrappedData, setWrappedData] = useState(null);

  const handleFilesSelected = useCallback(async (files) => {
    setStage('loading');
    setLoadingMessage('Reading files...');

    try {
      // Parse the Discord package
      setLoadingMessage('Parsing Discord data...');
      const rawData = await parseDiscordPackage(files);

      if (rawData.messages.length === 0) {
        alert('No messages found in the data package. Please make sure you selected the correct folder.');
        setStage('upload');
        return;
      }

      // Analyze statistics
      setLoadingMessage('Analyzing your messages...');
      await sleep(300);
      const stats = analyzeMessages(rawData.messages, rawData.messageIndex, rawData.servers);

      // Analyze linguistics
      setLoadingMessage('Discovering your writing patterns...');
      await sleep(300);
      const linguistics = analyzeLinguistics(rawData.messages);

      // Get derived stats
      setLoadingMessage('Generating your Wrapped...');
      await sleep(300);
      const peakTimes = getPeakTimes(stats.messagesByHour, stats.messagesByDayOfWeek);
      const topEmojis = getTopEmojis(stats.emojiStats, 10);
      const busiestDays = getBusiestDays(stats.messagesByDay, 5);
      const yearComparison = getYearComparison(stats.messagesByYear);
      const communicationStyle = getCommunicationStyle(linguistics);

      // Build wrapped data
      const wrapped = {
        user: rawData.user,
        stats,
        linguistics,
        peakTimes,
        topEmojis,
        busiestDays,
        yearComparison,
        communicationStyle,
        servers: rawData.servers,
        messageIndex: rawData.messageIndex
      };

      setWrappedData(wrapped);
      setStage('wrapped');
    } catch (error) {
      console.error('Error processing data:', error);
      alert('Error processing your Discord data. Please try again.');
      setStage('upload');
    }
  }, []);

  const handleReset = useCallback(() => {
    setStage('upload');
    setWrappedData(null);
  }, []);

  return (
    <>
      {stage === 'upload' && <UploadScreen onFilesSelected={handleFilesSelected} />}
      {stage === 'loading' && <LoadingScreen message={loadingMessage} />}
      {stage === 'wrapped' && <WrappedPresentation data={wrappedData} onReset={handleReset} />}
    </>
  );
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default App;
