import { Routes, Route, Link } from 'react-router-dom';
import PhotoUpload from './PhotoUpload';
import Poetry from './Poetry';

function App() {
  return (
    <>
      <nav style={{
        backgroundColor: '#4e2e3b',
        padding: '1rem',
        display: 'flex',
        gap: '2rem',
        fontFamily: 'serif',
        justifyContent: 'center'
      }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
        <Link to="/upload-photo" style={{ color: 'white', textDecoration: 'none' }}>Upload</Link>
        <Link to="/poetry" style={{ color: 'white', textDecoration: 'none' }}>Poetry</Link>
      </nav>

      <Routes>
        <Route path="/" element={
          <div style={{
            backgroundColor: '#7b405f',
            height: '100vh',
            width: '100vw',
            fontFamily: 'serif',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '2rem',
            boxSizing: 'border-box',
          }}>
            <div style={{
              padding: '3rem',
              borderRadius: '2rem',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              textAlign: 'center',
              maxWidth: '700px',
              width: '100%',
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: `
                0 0 30px rgba(255, 192, 203, 0.25),
                0 0 60px rgba(255, 192, 203, 0.1)
              `
            }}>
              <h1 style={{
                fontSize: '4rem',
                color: '#ffffff',
                fontStyle: 'italic',
                letterSpacing: '0.1rem',
                marginBottom: '1.2rem',
                fontWeight: 600,
                textShadow: `
                  0 0 6px rgba(255, 255, 255, 0.7),
                  0 0 12px rgba(255, 192, 203, 0.6),
                  0 0 18px rgba(255, 182, 193, 0.5)
                `
              }}>
                Atelier
              </h1>
              <p style={{
                color: '#fceef5',
                fontSize: '1.2rem',
                marginBottom: '0.5rem',
                textShadow: '0 0 6px rgba(255, 255, 255, 0.4)',
              }}>
                a curated space where art comes alive
              </p>
              <p style={{
                color: '#f8f8f8',
                fontStyle: 'italic',
                fontSize: '1rem',
                textShadow: '0 0 5px rgba(255, 255, 255, 0.3)',
              }}>
                Unleash your truest form
              </p>
            </div>
          </div>
        } />
        <Route path="/upload-photo" element={<PhotoUpload />} />
        <Route path="/poetry" element={<Poetry />} />
      </Routes>
    </>
  );
}

export default App;

