export default function LoadingScreen({ message }) {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p className="loading-text">{message || 'Processing...'}</p>
      <p className="loading-subtext">This may take a moment for large data packages</p>
    </div>
  );
}
