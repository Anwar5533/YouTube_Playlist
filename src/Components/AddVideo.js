import {useContext,useEffect, useState, useRef } from "react";
import "./AddVideo.css";
import ThemeContext from "../Context/ThemeContext";


const initialState = {
    time: "3 months ago",
    channel: "Anwar Coding",
    verified: true,
    title: "",
    views: "",
};
export default function AddVideo({ dispatch,editableVideo }) {
    const Theme=useContext(ThemeContext)
    const [video, setVideo] = useState(initialState);
    const inputRef = useRef(null)

    function handleSubmit(e) {
        e.preventDefault();
        if (editableVideo){
            dispatch({ type: "UPDATE", payload: video });
        }else{
            dispatch({ type:'ADD', payload:video});
        }
        setVideo(initialState);
    }
    
    function handleChange(e) {
        setVideo({ ...video, [e.target.name]: e.target.value });
    }
    useEffect(()=>{
        if(editableVideo){
            setVideo(editableVideo);
        }
        inputRef.current.focus();
    },[editableVideo])

    return (
        <form>
            <input
            ref={inputRef}
                className={Theme}
                type="text"
                name="title"
                onChange={handleChange}
                placeholder="Title"
                value={video.title}
            ></input>
            <input
                className={Theme}
                type="text"
                name="views"
                onChange={handleChange}
                placeholder="Views"
                value={video.views}
            ></input>
            <button className={Theme} onClick={handleSubmit}>
                {editableVideo ? "Edit" : "Add"} Video
            </button>
        </form>
    );
}
