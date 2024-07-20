import axios from 'axios';
import React,{FC,useState,useEffect} from 'react'

type Props = {
  videoUrl:string;
  title:string;
}

const CoursePlayer:FC<Props> = ({videoUrl,title}) => {
  const [videoData,setVideoData]=useState({
    otp:"",
    playbackInfo:"",
  });
  useEffect(()=>{
    console.log(videoUrl)
    axios.post(`http://localhost:8000/api/v1/getVdoCipherOTP`,{
      videoId: videoUrl,
    }).then((res)=>{
      setVideoData(res.data);
    })
  },[videoUrl])
  return (
      <div style={{paddingTop:"41%", position: "relative"}}>
        {videoData.otp && videoData.playbackInfo !=="" &&(
          <iframe
            style={{
              border:0,
              position: "absolute",
              top: 0,
              left: 0,
              width: "90%",
              height: "100%",
            }}
            src={`https://player.vdocipher.com/v2/?otp=${videoData.otp}&playbackInfo=${videoData.playbackInfo}&player=2LbfnCCQLDN8thNi`}
            allow="encrypted-media"
            allowFullScreen
            id="player1"
          ></iframe>
        )}
      </div>
  )
}

export default CoursePlayer