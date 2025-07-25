// src/components/YoutubeLinkModal.jsx
import React, { useState } from 'react';
import { isValidYoutubeURL, extractYoutubeVideoID } from '../utils/YoutubeUtils';

const YoutubeLinkModal = ({ isOpen, onClose, onSubmit }) => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (isValidYoutubeURL(url)) {
      const videoId = extractYoutubeVideoID(url);
      onSubmit(videoId);
      setUrl('');
      setError('');
      onClose();
    } else {
      setError('❌ Invalid YouTube URL');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 shadow-xl w-[90%] max-w-md">
        <h2 className="text-xl font-bold mb-4 text-center">Enter YouTube Link</h2>
        <input
          type="text"
          className="w-full p-2 border rounded mb-2"
          placeholder="https://www.youtube.com/watch?v=..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <div className="flex justify-end gap-2">
          <button className="bg-gray-300 px-4 py-1 rounded" onClick={onClose}>Cancel</button>
          <button className="bg-blue-600 text-white px-4 py-1 rounded" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default YoutubeLinkModal;
