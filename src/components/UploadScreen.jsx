import { useState, useRef, useCallback } from 'react';

export default function UploadScreen({ onFilesSelected }) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);

    const items = e.dataTransfer.items;
    if (items) {
      const files = [];
      const promises = [];

      for (const item of items) {
        if (item.kind === 'file') {
          const entry = item.webkitGetAsEntry?.();
          if (entry) {
            promises.push(traverseFileTree(entry, files));
          }
        }
      }

      Promise.all(promises).then(() => {
        if (files.length > 0) {
          onFilesSelected(files);
        }
      });
    }
  }, [onFilesSelected]);

  const handleClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback((e) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      onFilesSelected(files);
    }
  }, [onFilesSelected]);

  return (
    <div className="upload-container">
      <div className="logo-container animate-fade-in-up">
        <svg width="80" height="60" viewBox="0 0 127.14 96.36" style={{ marginBottom: '1rem' }}>
          <path fill="#5865F2" d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/>
        </svg>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.5rem' }}>
          Discord Wrapped
        </h1>
        <p style={{ opacity: 0.7, marginBottom: '2rem' }}>
          Discover your Discord story
        </p>
      </div>

      <div
        className={`upload-box animate-fade-in-up delay-200 ${isDragging ? 'dragging' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <div className="upload-icon">
          {isDragging ? '📂' : '📁'}
        </div>
        <h2 className="upload-title">
          {isDragging ? 'Drop it here!' : 'Upload Your Data Package'}
        </h2>
        <p className="upload-subtitle">
          Drag and drop your Discord data package folder, or click to browse
        </p>
        <button className="upload-button" type="button">
          Select Folder
        </button>
        <input
          ref={fileInputRef}
          type="file"
          webkitdirectory=""
          directory=""
          multiple
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      </div>

      <div className="animate-fade-in-up delay-400" style={{ marginTop: '2rem', maxWidth: '400px', textAlign: 'center' }}>
        <p style={{ fontSize: '0.85rem', opacity: 0.6, lineHeight: 1.6 }}>
          Your data never leaves your device. All processing happens locally in your browser.
        </p>
      </div>

      <div className="animate-fade-in-up delay-600" style={{ marginTop: '2rem' }}>
        <details style={{ maxWidth: '400px', textAlign: 'left' }}>
          <summary style={{ cursor: 'pointer', opacity: 0.7, fontSize: '0.9rem' }}>
            How to get your Discord data package?
          </summary>
          <ol style={{ marginTop: '1rem', paddingLeft: '1.5rem', opacity: 0.7, fontSize: '0.85rem', lineHeight: 1.8 }}>
            <li>Open Discord Settings</li>
            <li>Go to Privacy & Safety</li>
            <li>Scroll down to "Request all of my Data"</li>
            <li>Wait for the email from Discord (can take up to 30 days)</li>
            <li>Download and extract the package</li>
            <li>Upload the "package" folder here</li>
          </ol>
        </details>
      </div>
    </div>
  );
}

async function traverseFileTree(entry, files) {
  if (entry.isFile) {
    return new Promise((resolve) => {
      entry.file((file) => {
        // Add the full path to the file
        Object.defineProperty(file, 'webkitRelativePath', {
          value: entry.fullPath,
          writable: false
        });
        files.push(file);
        resolve();
      });
    });
  } else if (entry.isDirectory) {
    const reader = entry.createReader();
    return new Promise((resolve) => {
      reader.readEntries(async (entries) => {
        const promises = entries.map(e => traverseFileTree(e, files));
        await Promise.all(promises);
        resolve();
      });
    });
  }
}
