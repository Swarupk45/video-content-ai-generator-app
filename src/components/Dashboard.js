import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentVideo } from '../redux/slices/VedioSlice';
import { RxDashboard } from "react-icons/rx";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { FcIdea } from "react-icons/fc";

const Dashboard = () => {
  const videos = useSelector((state) => state.video.uploadedVideos);
  const currentVideo = useSelector((state) => state.video.currentVideo);
  const ideas = useSelector((state) => state.idea.contentIdeas);

  const dispatch = useDispatch();

  const handlePlayVideo = (video) => {
    dispatch(setCurrentVideo(video));
  };

  return (
    <div className="flex bg-gradient-to-br from-gray-100 to-white">
  <main className="flex-1 px-4 py-6 md:px-10 md:py-8">
    <h1 className="text-4xl font-extrabold text-gray-800 mb-8 flex gap-2 "><RxDashboard className='mt-2' size={30}/> Dashboard</h1>

    {/* Uploaded Videos Section. Uploaded Videos will show Here.*/}
    <section>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4 flex gap-1"><MdOutlineOndemandVideo size={30} className='mt-1'/> Uploaded Videos</h2>
      {videos.length === 0 ? (
        <p className="text-gray-500 italic">No videos uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div
              key={video.id}
              className="bg-white rounded-xl shadow-lg p-5 hover:shadow-xl transition duration-200"
            >
              <h3 className="text-xl font-semibold mb-1 text-gray-800">{video.title}</h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{video.description}</p>
              <div className="aspect-video mb-4 overflow-hidden rounded-lg">
                <iframe
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
              <button
                onClick={() => handlePlayVideo(video)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
              >
                ▶️ Play Video
              </button>
            </div>
          ))}
        </div>
      )}
    </section>

    {/* Current Video Section */}
    {currentVideo && (
      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-700 mb-3">
          ▶️ Now Playing: <span className="text-blue-600">{currentVideo.title}</span>
        </h2>
        <div className="aspect-video rounded-lg overflow-hidden shadow-md">
          <iframe
            src={`https://www.youtube.com/embed/${currentVideo.id}`}
            title={currentVideo.title}
            className="w-full h-full"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </section>
    )}

    {/* Generated Ideas Section.Generated Ideas will show Here.*/}
    <section className="mt-12">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4 flex gap-2"><FcIdea size={30}/> Generated Ideas</h2>
      {ideas.length === 0 ? (
        <p className="text-gray-500 italic">No ideas generated yet.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {ideas.map((idea, i) => (
            <div
              key={i}
              className="bg-white p-5 rounded-xl shadow hover:shadow-md transition duration-200"
            >
              <p className="text-gray-800 mb-2"><strong>Idea:</strong> {idea.idea}</p>
              <p className="text-sm text-gray-600 mb-1"><strong>Prompt:</strong> {idea.prompt}</p>
              <p className="text-xs text-gray-500">
                {idea.tone} | {idea.length} | {new Date(idea.generatedAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  </main>
</div>

  );
};

export default Dashboard;
