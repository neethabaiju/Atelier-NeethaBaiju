import { useState, useEffect } from 'react';

function PhotoUpload() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [caption, setCaption] = useState('');
  const [uploads, setUploads] = useState([]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSelectedImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedImage) return alert('Please select an image.');

    const newEntry = { image: selectedImage, caption };

    try {
      const res = await fetch('http://localhost:4000/api/uploads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEntry),
      });

      if (res.ok) {
        alert('Uploaded!');
        setCaption('');
        setSelectedImage(null);
        fetchUploads();
      } else {
        alert('Upload failed.');
      }
    } catch (err) {
      console.error(err);
      alert('Server error.');
    }
  };

  const fetchUploads = async () => {
    try {
      const res = await fetch('http://localhost:4000/api/uploads');
      const data = await res.json();
      setUploads(data);
    } catch (err) {
      console.error('Error fetching uploads:', err);
    }
  };

  useEffect(() => {
    fetchUploads();
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'serif', color: '#222' }}>
      <h2>📸 Upload a Photo</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: 400 }}>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <textarea placeholder="Write a caption..." value={caption} onChange={(e) => setCaption(e.target.value)} />
        <button type="submit">Upload</button>
      </form>

      <hr style={{ margin: '2rem 0' }} />

      <div>
        <h3>🖼️ Uploaded Images</h3>
        {uploads.length === 0 && <p>No uploads yet.</p>}
        {uploads.map((upload) => (
          <div key={upload._id} style={{ marginBottom: '2rem' }}>
            <img src={upload.image} alt="uploaded" style={{ maxWidth: '100%', borderRadius: '8px' }} />
            <p><i>{upload.caption}</i></p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PhotoUpload;
