import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUploadedVideo } from "../redux/slices/VedioSlice";

const CLIENT_ID = process.env.REACT_APP_YOUTUBE_API_CLIENT_KEY;
const SCOPES = "https://www.googleapis.com/auth/youtube.upload";

//Social Media Publishing Part. Implemented YouTube Shorts publishing functionality.
function VideoUpload() {
  const [videoFile, setVideoFile] = useState(null);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [privacyStatus, setPrivacyStatus] = useState("private");
  const [tags, setTags] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.onload = () => {
      window.tokenClient = window.google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: (tokenResponse) => {
          if (tokenResponse.access_token) {
            setIsSignedIn(true);
            window.accessToken = tokenResponse.access_token;
          } else {
            console.error("Token error:", tokenResponse);
          }
        },
      });
    };
    document.body.appendChild(script);
  }, []);

  const handleSignIn = () => {
    if (window.tokenClient) {
      window.tokenClient.requestAccessToken();
    } else {
      alert("Google login client not initialized.");
    }
  };

  const handleSignOut = () => {
    setIsSignedIn(false);
    window.accessToken = null;
  };

  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const uploadVideo = () => {
    if (!videoFile) {
      alert("Please select a video file.");
      return;
    }

    const accessToken = window.accessToken;
    if (!accessToken) {
      alert("Access token not found. Please sign in again.");
      return;
    }

    setIsUploading(true);

    const metadata = {
      snippet: {
        title,
        description,
        ...(tags && { tags: tags.split(",").map(tag => tag.trim()) }),
      },
      status: {
        privacyStatus,
      },
    };

    const reader = new FileReader();
    reader.readAsArrayBuffer(videoFile);
    reader.onload = () => {
      const videoData = new Blob([reader.result], { type: videoFile.type });

      const boundary = "boundary_string";
      const delimiter = `\r\n--${boundary}\r\n`;
      const closeDelimiter = `\r\n--${boundary}--`;

      const body = new Blob(
        [
          delimiter,
          "Content-Type: application/json; charset=UTF-8\r\n\r\n",
          JSON.stringify(metadata),
          delimiter,
          `Content-Type: ${videoFile.type}\r\n\r\n`,
          videoData,
          closeDelimiter,
        ],
        { type: `multipart/related; boundary=${boundary}` }
      );

      fetch("https://www.googleapis.com/upload/youtube/v3/videos?part=snippet,status&uploadType=multipart", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": `multipart/related; boundary=${boundary}`,
        },
        body: body,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Upload Success:", data);
          alert("Video uploaded successfully!");
          dispatch(addUploadedVideo({
            id: data.id,
            title: data.snippet.title,
            description: data.snippet.description,
          }));
        })
        .catch((err) => {
          console.error("Upload Error:", err);
          alert("Upload failed.");
        })
        .finally(() => {
          setIsUploading(false);
        });
    };
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-center font-semibold text-3xl sm:text-4xl mb-6">
        Sign in With <span className="text-blue-600">Google</span>
      </h1>

      <div className="flex flex-col sm:flex-row items-center justify-center bg-zinc-800 rounded-xl shadow-lg p-4 sm:p-6 mb-8 space-y-4 sm:space-y-0 sm:space-x-4">
        <h2 className="font-bold text-xl sm:text-2xl md:text-3xl text-amber-500 text-center sm:text-left">
          Upload Your Video On
        </h2>
        <img
          src="./youtubelogo.png"
          alt="YouTube Logo"
          className="h-14 sm:h-16 md:h-20"
        />
      </div>
      {!isSignedIn ? (
        <div className="flex justify-center">
          <button
            onClick={handleSignIn}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition"
          >
            Sign in with Google
          </button>
        </div>
      ) : (
        <>
          <div className="flex justify-end mb-4">
            <button
              onClick={handleSignOut}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow"
            >
              Sign out
            </button>
          </div>

          <div className="space-y-4 mb-6">
            <input
              type="text"
              placeholder="Video Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows={4}
            />
            <input
              type="text"
              placeholder="Tags (comma separated)"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <select
              value={privacyStatus}
              onChange={(e) => setPrivacyStatus(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="private">Private</option>
              <option value="public">Public</option>
              <option value="unlisted">Unlisted</option>
            </select>
            <input
              type="file"
              accept="video/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          <button
            onClick={uploadVideo}
            disabled={isUploading}
            className={`w-full py-3 text-white font-semibold rounded-lg shadow-md transition ${isUploading ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
              }`}
          >
            {isUploading ? "Uploading..." : "Upload Video"}
          </button>
        </>
      )}
    </div>
  );
}

export default VideoUpload;
