import React, { useState, useEffect } from 'react';
import { Upload, X, Image, Video } from 'lucide-react';
import './MediaUpload.css';
import supabase from './SupabaseClient';

const MediaUpload = () => {
  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('photo');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    file: null
  });

  useEffect(() => {
    fetchUploads();
  }, []);

  const fetchUploads = async () => {
    try {
      const { data, error } = await supabase
        .from('uploads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUploads(data);
    } catch (err) {
      console.error('Error fetching uploads:', err);
      setError('Failed to load uploads');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let fileUrl = null;
      const folder = activeTab === 'photo' ? 'photos' : 'videos';

      if (formData.file) {
        const fileExt = formData.file.name.split('.').pop();
        const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('media')
          .upload(fileName, formData.file);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
          .from('media')
          .getPublicUrl(fileName);

        fileUrl = data.publicUrl;
      }

      const { data, error: insertError } = await supabase
        .from('uploads')
        .insert([{
          title: formData.title,
          description: formData.description,
          photo_url: activeTab === 'photo' ? fileUrl : null,
          video_url: activeTab === 'video' ? fileUrl : null
        }])
        .select()
        .single();

      if (insertError) throw insertError;

      setUploads(prev => [data, ...prev]);
      setFormData({ 
        title: '', 
        description: '', 
        file: null 
      });
      e.target.reset();

    } catch (error) {
      console.error('Error adding upload:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, photoUrl, videoUrl) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    try {
      const { error: deleteError } = await supabase
        .from('uploads')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;

      if (photoUrl) {
        const photoPath = photoUrl.split('/').pop();
        await supabase.storage
          .from('media')
          .remove([`photos/${photoPath}`]);
      }

      if (videoUrl) {
        const videoPath = videoUrl.split('/').pop();
        await supabase.storage
          .from('media')
          .remove([`videos/${videoPath}`]);
      }

      setUploads(uploads.filter(upload => upload.id !== id));

    } catch (error) {
      console.error('Error deleting upload:', error);
      setError('Failed to delete upload');
    }
  };

  return (
    <div className="media-upload">
      <header className="media-header">
        <h1>Media Gallery</h1>
        <p>Upload and manage your media files</p>
      </header>

      {error && (
        <div className="error-message">
          <span>{error}</span>
          <button onClick={() => setError(null)}><X size={16} /></button>
        </div>
      )}

      <div className="upload-container">
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'photo' ? 'active' : ''}`}
            onClick={() => setActiveTab('photo')}
          >
            <Image size={20} />
            <span>Photos</span>
          </button>
          <button 
            className={`tab ${activeTab === 'video' ? 'active' : ''}`}
            onClick={() => setActiveTab('video')}
          >
            <Video size={20} />
            <span>Videos</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="upload-form">
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter title"
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter description"
              rows="3"
            />
          </div>

          <div className="form-group">
            <label>Upload {activeTab === 'photo' ? 'Photo' : 'Video'}</label>
            <div className="file-drop-zone">
              <input
                type="file"
                name="file"
                accept={activeTab === 'photo' ? 'image/*' : 'video/*'}
                onChange={handleFileChange}
                required
              />
              <div className="drop-zone-content">
                <Upload size={24} />
                <span>Drag & drop or click to upload</span>
                <span className="file-type">
                  {activeTab === 'photo' ? 'Supports: JPG, PNG, GIF' : 'Supports: MP4, WebM'}
                </span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="submit-button"
          >
            {loading ? 'Uploading...' : `Upload ${activeTab === 'photo' ? 'Photo' : 'Video'}`}
          </button>
        </form>
      </div>

      <div className="media-grid">
        {uploads.map((upload) => (
          <div key={upload.id} className="media-card">
            <button
              onClick={() => handleDelete(upload.id, upload.photo_url, upload.video_url)}
              className="delete-button"
              aria-label="Delete"
            >
              <X size={16} />
            </button>

            <div className="media-content">
              {upload.photo_url && (
                <img
                  src={upload.photo_url}
                  alt={upload.title}
                  className="media-preview"
                />
              )}
              {upload.video_url && (
                <video controls className="media-preview">
                  <source src={upload.video_url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>

            <div className="media-info">
              <h3>{upload.title}</h3>
              <p>{upload.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaUpload;