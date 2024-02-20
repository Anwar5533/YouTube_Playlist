
import { useContext} from 'react';
import './Video.css'
import ThemeContext from '../Context/ThemeContext';
// import VideoDispatchContext from '../Context/VideoDispatchContext';

export default function Video({title,id,channel,views,time, verified,children,dispatch, editVideo}){
    const theme = useContext(ThemeContext);
    // const dispatch = useContext(VideoDispatchContext) 

    // useEffect(()=>{
    //     const idx = setInterval(()=>{
    //         console.log('Video is playing',id)
    //     },3000)
    //     return () => {
    //         clearInterval(idx);
    //     }

    // },[id])
    return (
        <>
            <div  className={`container ${theme}`}>
                <button className="close" onClick={() => dispatch({type: 'DELETE' , payload: id})}>
                    X
                </button>
                <button className="edit" onClick={() => editVideo(id)}>
                    Edit
                </button>
                <div className="pic">
                    <img
                        src={`https://picsum.photos/id/${id}/640/360`}
                        alt="display pic"
                    />
                </div>
                <div className="title">{title}</div>
                <div className="channel">
                    {channel} {verified ? "✅" : ""}
                </div>
                <div className="views">
                    {views} views <span>.</span>
                    {time}
                </div>
                <div>{children}</div>
            </div>
        </>
    );
}