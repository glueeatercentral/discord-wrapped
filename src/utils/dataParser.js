/**
 * Discord Data Package Parser
 * Parses the Discord data export and extracts relevant information
 */

export async function parseDiscordPackage(files) {
  const data = {
    user: null,
    messages: [],
    channels: {},
    servers: {},
    messageIndex: {}
  };

  // Process uploaded files
  for (const file of files) {
    const path = file.webkitRelativePath || file.name;

    if (path.includes('Account/user.json')) {
      const content = await readFile(file);
      data.user = JSON.parse(content);
    }
    else if (path.includes('Servers/index.json')) {
      const content = await readFile(file);
      data.servers = JSON.parse(content);
    }
    else if (path.includes('Messages/index.json')) {
      const content = await readFile(file);
      data.messageIndex = JSON.parse(content);
    }
    else if (path.match(/Messages\/c?\d+\/channel\.json$/)) {
      const content = await readFile(file);
      const channelData = JSON.parse(content);
      data.channels[channelData.id] = channelData;
    }
    else if (path.match(/Messages\/c?\d+\/messages\.json$/)) {
      const content = await readFile(file);
      const messages = JSON.parse(content);
      data.messages.push(...messages);
    }
  }

  return data;
}

function readFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = (e) => reject(e);
    reader.readAsText(file);
  });
}

/**
 * Pre-bundled data loader (for when data is in public folder)
 */
export async function loadPreBundledData(basePath = '/package') {
  const data = {
    user: null,
    messages: [],
    channels: {},
    servers: {},
    messageIndex: {}
  };

  try {
    // Load servers index
    const serversRes = await fetch(`${basePath}/Servers/index.json`);
    if (serversRes.ok) {
      data.servers = await serversRes.json();
    }

    // Load messages index
    const messagesIndexRes = await fetch(`${basePath}/Messages/index.json`);
    if (messagesIndexRes.ok) {
      data.messageIndex = await messagesIndexRes.json();
    }

    // We'll load message folders dynamically based on the index
    // For now, we'll need to know the folder names

  } catch (error) {
    console.error('Error loading pre-bundled data:', error);
  }

  return data;
}

/**
 * Extract channel info from index
 */
export function getChannelInfo(channelId, messageIndex, servers) {
  const indexEntry = messageIndex[channelId] || '';

  // Parse the index entry format: "channel-name in ServerName" or "Direct Message with username"
  const isDM = indexEntry.startsWith('Direct Message');
  let channelName = indexEntry;
  let serverName = null;

  if (!isDM && indexEntry.includes(' in ')) {
    const parts = indexEntry.split(' in ');
    channelName = parts[0];
    serverName = parts.slice(1).join(' in ');
  }

  return {
    id: channelId,
    name: channelName,
    server: serverName,
    isDM
  };
}
