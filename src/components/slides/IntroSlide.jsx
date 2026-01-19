export default function IntroSlide({ data }) {
  const username = data.user?.global_name || data.user?.username || 'Discord User';

  return (
    <>
      <div className="animate-bounce-in" style={{ marginBottom: '2rem' }}>
        <svg width="100" height="75" viewBox="0 0 127.14 96.36">
          <path fill="white" d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/>
        </svg>
      </div>

      <p className="slide-label animate-fade-in-up delay-100">Your Year in Review</p>

      <h1 className="animate-fade-in-up delay-200" style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '1rem' }}>
        Discord Wrapped
      </h1>

      <p className="animate-fade-in-up delay-300" style={{ fontSize: '1.25rem', opacity: 0.9, marginBottom: '2rem' }}>
        Welcome back, <strong>{username}</strong>
      </p>

      <p className="animate-fade-in-up delay-400" style={{ fontSize: '1rem', opacity: 0.7 }}>
        Let's dive into your Discord journey
      </p>

      <div className="animate-fade-in-up delay-500" style={{ marginTop: '3rem', opacity: 0.6, fontSize: '0.85rem' }}>
        Press <kbd style={{ background: 'rgba(255,255,255,0.2)', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>→</kbd> or <kbd style={{ background: 'rgba(255,255,255,0.2)', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>Space</kbd> to continue
      </div>
    </>
  );
}
