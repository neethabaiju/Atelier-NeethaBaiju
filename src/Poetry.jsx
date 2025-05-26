import { useState, useEffect } from 'react';

function Poetry() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [font, setFont] = useState('serif');
  const [poems, setPoems] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) return alert('Please enter both title and poem');

    const newPoem = { title, content, font };
    const res = await fetch('http://localhost:4000/api/poems', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPoem),
    });

    if (res.ok) {
      const saved = await res.json();
      setPoems([saved, ...poems]);
      setTitle('');
      setContent('');
      setFont('serif');
    } else {
      alert('Upload failed!');
    }
  };

  const fetchPoems = async () => {
    try {
      const res = await fetch('http://localhost:4000/api/poems');
      const data = await res.json();
      setPoems(data);
    } catch (err) {
      console.error('Error fetching poems:', err);
    }
  };

  useEffect(() => {
    fetchPoems();
  }, []);

  return (
    <div style={{
      backgroundColor: '#fff0f5',
      padding: '3rem',
      fontFamily: 'serif',
      minHeight: '100vh',
    }}>
      <h2 style={{
        fontSize: '2.5rem',
        color: '#7b405f',
        marginBottom: '1.5rem'
      }}>📝 Poetry</h2>

      <form onSubmit={handleSubmit} style={{
        maxWidth: '600px',
        marginBottom: '3rem'
      }}>
        <input
          type="text"
          placeholder="Poem Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            width: '100%',
            padding: '1rem',
            marginBottom: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc',
            fontFamily: 'inherit'
          }}
        />
        <textarea
          rows={6}
          placeholder="Write your poem here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{
            width: '100%',
            padding: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc',
            fontFamily: 'inherit'
          }}
        />
        <select
          value={font}
          onChange={(e) => setFont(e.target.value)}
          style={{
            padding: '0.5rem',
            borderRadius: '6px',
            border: '1px solid #ccc',
            fontFamily: 'inherit',
            marginTop: '1rem',
            marginBottom: '1rem'
          }}
        >
          <option value="serif">Serif (classic)</option>
          <option value="sans-serif">Sans-serif (clean)</option>
          <option value="cursive">Cursive (whimsical)</option>
          <option value="monospace">Monospace (typewriter)</option>
        </select>

        <button type="submit" style={{
          marginTop: '0.5rem',
          padding: '0.75rem 1.5rem',
          backgroundColor: '#7b405f',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}>
          Upload Poem
        </button>
      </form>

      <div>
        {poems.map((poem) => (
          <div key={poem._id} style={{
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '1rem',
            marginBottom: '2rem',
            boxShadow: '0 0 10px rgba(0,0,0,0.05)'
          }}>
            <h3 style={{ color: '#7b405f' }}>{poem.title}</h3>
            <p style={{
              whiteSpace: 'pre-wrap',
              fontFamily: poem.font || 'serif',
              fontSize: '1.1rem'
            }}>
              {poem.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Poetry;
