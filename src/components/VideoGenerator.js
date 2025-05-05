import React, { useState } from 'react';
import { generateVideoIdea } from '../openai';
import { useDispatch } from 'react-redux';
import { addContentIdea } from '../redux/slices/IdeaSlice';
import { MdContentPaste } from "react-icons/md";
const tones = ['Funny', 'Serious', 'Inspirational'];
const lengths = ['Short', 'Medium', 'Long'];
//Integrated with OpenAI to generate video content ideas.
const VideoGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [tone, setTone] = useState(tones[0]);
  const [length, setLength] = useState(lengths[0]);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleGenerate = async () => {
    setLoading(true);
    setError('');
    try {
      const fullPrompt = `Generate a ${tone.toLowerCase()} ${length.toLowerCase()} video idea based on: "${prompt}".`;
      const response = await generateVideoIdea(fullPrompt);
      dispatch(addContentIdea({
        prompt,
        tone,
        length,
        idea: response,
        generatedAt: new Date().toISOString(),
      }));
      setResult(response);
    } catch (err) {
      setError('Failed to generate video idea.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=''>
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-xl rounded-xl mt-10 md:mt-20 border border-gray-200">
      <h1 className="text-3xl flex justify-center gap-0 md:gap-1 font-extrabold text-blue-600 mb-6 text-center">
      <MdContentPaste  className=' md:mt-1 text-blue-600 items-center justify-center' size={30}/> AI Video Content Generator
      </h1>

      <input
        type="text"
        className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
        placeholder="Enter your video topic..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <select
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {tones.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        <select
          value={length}
          onChange={(e) => setLength(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {lengths.map((l) => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>
      </div>

      <button
        onClick={handleGenerate}
        disabled={loading || !prompt.trim()}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-200"
      >
        {loading ? 'Generating...' : 'Generate Idea'}
      </button>

      {error && (
        <p className="text-red-500 mt-4 text-center">{error}</p>
      )}

      {result && (
        <div className="mt-6 bg-gray-100 p-4 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-xl font-bold text-gray-700 mb-2">📋 Video Idea Preview:</h2>
          <p className="text-gray-800 whitespace-pre-wrap">{result}</p>
          <button
            onClick={() => navigator.clipboard.writeText(result)}
            className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-all"
          >
            Copy Idea
          </button>
        </div>
      )}
    </div>
    </div>
  );
};

export default VideoGenerator;
