import "./App.css";
import videoDB from "./Data/data";
import PlayButton from "./Components/PlayButton";
import Video from "./Components/Video";
import { useReducer, useState } from "react";
import AddVideo from "./Components/AddVideo";
import ThemeContext from "./Context/ThemeContext";
import VideosContext from "./Context/VideosContext";

function App() {
    const [editableVideo, setEditableVideo] = useState(null);
    const [mode,setMode] = useState('darkMode');
    const [videos, dispatch] = useReducer(videoReducer, videoDB);
    
    function videoReducer(videos, action) {
        switch (action.type) {
            case "ADD":
                return [
                    ...videos,
                    { ...action.payload, id: videos.length + 1 },
                ];
            case "DELETE":
                return videos.filter((video) => video.id !== action.payload);
            case "UPDATE":
                const index = videos.findIndex(
                    (v) => v.id === action.payload.id
                );
                const newVideos = [...videos];
                newVideos.splice(index, 1, action.payload);
                setEditableVideo(null);
                return newVideos;
            default:
                return videos;
        }
    }



    function editVideo(id) {
        setEditableVideo(videos.find((video) => video.id === id));
    }

    return (
        <ThemeContext.Provider value={mode}>
            <VideosContext.Provider value={videos}>
                
                <div className={`App ${mode}`}>
                    <button
                        onClick={() =>
                            setMode(
                                mode === "darkMode" ? "lightMode" : "darkMode"
                            )
                        }
                    >
                        Mode
                    </button>
                    <AddVideo
                        dispatch={dispatch}
                        editableVideo={editableVideo}
                    ></AddVideo>

                    {videos.map((video) => (
                        <Video
                            key={video.id}
                            title={video.title}
                            views={video.views}
                            time={video.time}
                            channel={video.channel}
                            verified={video.verified}
                            id={video.id}
                            dispatch={dispatch}
                            editVideo={editVideo}
                        >
                            <div style={{ clear: "both" }}>
                                <PlayButton
                                    onPlay={() =>
                                        console.log("Playing...", video.title)
                                    }
                                    onPause={() =>
                                        console.log("Paused...", video.title)
                                    }
                                >
                                    {video.title}
                                </PlayButton>
                            </div>
                        </Video>
                    ))}
                </div>
            </VideosContext.Provider>
        </ThemeContext.Provider>
    );
}
export default App;
