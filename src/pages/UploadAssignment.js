import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadAssignment } from '../services/assignmentService';
import Navbar from '../components/Navbar';

const UploadAssignment = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subject, setSubject] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await uploadAssignment({
        title,
        description,
        subject,
        dueDate,
        priority,
        file
      });
      setSuccess(true);
      setTimeout(() => navigate('/dashboard'), 1200);
    } catch (err) {
      setError(err.message || 'Failed to upload assignment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen w-full bg-gradient-to-br from-blue-900 via-indigo-900 to-gray-900 flex items-center justify-center p-4">
        <div className="w-full max-w-lg flex flex-col items-center justify-center">
          <div className="bg-white/90 shadow-xl rounded-2xl p-8 w-full">
            <h2 className="text-blue-900 text-2xl font-bold mb-6">Upload Assignment</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <label className="text-gray-700 font-medium">Assignment Title</label>
              <input
                type="text"
                placeholder="Assignment Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="bg-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <label className="text-gray-700 font-medium">Subject</label>
              <input
                type="text"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                className="bg-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <label className="text-gray-700 font-medium">Due Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
                className="bg-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <label className="text-gray-700 font-medium">Priority</label>
              <select value={priority} onChange={e => setPriority(e.target.value)} className="bg-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              <label className="text-gray-700 font-medium">Description</label>
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="bg-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <label className="text-gray-700 font-medium">Attachment</label>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                required
                className="bg-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-5 py-2 font-semibold shadow transition" disabled={loading}>{loading ? 'Uploading...' : 'Submit'}</button>
              {error && <div className="text-red-500 mt-2">{error}</div>}
              {success && <div className="text-green-600 mt-2">Assignment uploaded!</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadAssignment; 