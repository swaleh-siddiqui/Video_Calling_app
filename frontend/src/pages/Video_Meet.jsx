import React, { useEffect, useRef, useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./Video_Meet.css"

const server_url = "http://localhost:8080";

let connections = {};

const peerConfigConnections = {
    "iceServers" : [
        {"urls" : "stun:stun.l.google.com:19302"}
    ]
}

function Video_Meet() {

  let socketRef = useRef();
  let socketIdRef = useRef();  
  let localVideoRef = useRef();
  let videoRef = useRef();

  let [videoAvailable, setVideoAvailable] = useState(true);
  let [audioAvailable, setAudioAvailable] = useState(true); 
  let [video, setVideo] = useState([]);
  let [videos, setVideos] = useState([]);
  let [audio, setAudio] = useState();
  let [screen, setScreen] = useState();
  let [showModel, setShowModel]  = useState();
  let [screenAvailable, setScreenAvailable] = useState();
  let [messages, setMessages] = useState([]);
  let [message, setMessage] = useState("");
  let [newMessages, setNewMessages] = useState(0);
  let [askForUsername, setAskForUsername] = useState(true);
  let [username, setUsername] = useState("");

  const getPermissions = async () => {
    try{
        const videoPermissions = await navigator.mediaDevices.getUserMedia({video:true});
        if (videoPermissions){
            setVideoAvailable(true);
        }
        else{
            setVideoAvailable(false);
        }
        const audioPermissions = await navigator.mediaDevices.getUserMedia({audio:true});
        if (audioPermissions){
            setAudioAvailable(true);
        }
        else{
            setAudioAvailable(false);
        }
        if (navigator.mediaDevices.getDisplayMedia){
            setScreenAvailable(true);
        }
        else{
            setScreenAvailable(false);
        }

        if (videoAvailable || audioAvailable){
            const userMediaStream = await navigator.mediaDevices.getUserMedia({video : videoAvailable, audio : audioAvailable});
            if (userMediaStream){
                window.localStream = userMediaStream;
                if (localVideoRef.current){
                    localVideoRef.current.srcObject = userMediaStream;
                }
            }
        }
    }
    catch (err) {
        console.log(err);
    }
  }

  let getUserMediaSuccess = (stream) => {

  }

  let getUserMedia = () => {
    if ((video && videoAvailable) || (audio && audioAvailable)){
        navigator.mediaDevices.getUserMedia({video:video, audio:audio})
        .then(getUserMediaSuccess)
        .then((stream) => {})
        .catch((e) => {
            console.log(e);
        })
    }
    else{
        try{
            let tracks = localVideoRef.current.srcObject.getTracks();
            tracks.forEach((track) => {
                track.stop();
            })
        }
        catch (e) {
            consol.log(e);
        }
    }
  }

  useEffect(() => {
    getPermissions();
  }, []);

  useEffect(() => {
    if (video !== undefined && audio !== undefined){
        getUserMedia();
    }
  }, [audio, video]);

  let gotMessageFromServer = (fromId, message) => {

  }

  let addMessage = () => {

  }

  let connectToSocketServer = () => {
    socketRef.current = io.connect(server_url, {secure : false});
    socketRef.current.on("signal", gotMessageFromServer);
    socketRef.current.on("connect", () => {
        socketRef.current.emit("join-call", window.location.href);
        socketIdRef.current = socketRef.current.id;
        socketRef.current.on("chat-message", addMessage);
        socketRef.current.on("user-left", (id) => {
            setVideo((videos) => {
                videos.filter((video) => {
                    video.socketId !== id;
                })
            })
        });
        socketRef.current.on("user-joined", (id, clients) => {
            clients.forEach((socketListId) => {
                connections[socketListId] = new RTCPeerConnection(peerConfigConnections);
                connections[socketListId].onicecandidate = (event) => {
                    if (event.candidate != null){
                        socketRef.current.emit("signal", socketListId, JSON.stringify({"ice" : event.candidate}))
                    }
                }
                connections[socketListId].onaddstream = (event) => {
                    let videoExist = videoRef.current(find(video => video.socketId === socketListId));
                    if (videoExist){
                        setVideos((videos) => {
                            const updateVideos = videos.map((video => {
                                video.socketId === socketListId ? {...video, stream : event.stream} : video;
                            }))
                            videoRef.current = updateVideos;
                            return updateVideos;
                        })
                    }
                    else{
                        let newVideo = {
                            socketId : socketListId,
                            stream : event.stream,
                            autoPlay : true,
                            playsinline : true
                        }
                        setVideos((videos) => {
                            const  updateVideos = [...videos, newVideo];
                            videoRef.current = updateVideos;
                            return updateVideos;
                        })
                    }
                }
                if (window.localStream !== undefined && window.localStream !== null){
                    connections[socketListId].addStream(window.localStream);
                }
                else{
                    // blacksilence
                }
            })
            if (id === socketIdRef.current){
                for (let id2 in connections){
                    if (id2 === socketIdRef.current) continue
                    try{
                        connections[id2].addStream(window.localStream)
                    }
                    catch (e){
                        console.log(e);
                    }
                    connections[id2].createOffer().then((description) => {
                        connections[id2].setLocalDescription(description)
                        .then(() => {
                            socketRef.current.emit("signal", JSON.stringify({"sdp" : connections[id2].localDescription}));
                        })
                        .catch((e) => console.log(e))
                    })
                }
            }
        })
    })
  }

  let getMedia = () => {
    setVideo(videoAvailable);
    setAudio(audioAvailable);
    connectToSocketServer();
  }

  let connect = () => {
    setAskForUsername(false);
    getMedia();
  }

  return (
    <div className='video-component'>
    {askForUsername === true ? 
        <>
        <div className='askusername-container'>
            <TextField id="outlined-basic" label="Username" value={username} onChange={e => setUsername(e.target.value)} variant="outlined" />
            <Button variant="contained" onClick={connect}>Connect</Button>
        </div>
        <div className="video-pre">
            <video ref={localVideoRef} autoPlay muted></video>
        </div>
        </>
        :
        <div></div>
    }
    </div>
  )
}

export default Video_Meet


