import React, { useState, useEffect } from "react";
import axios from "axios";

const ENDPOINT = "https://s.rockbot.com/temp/now_playing.json";

export default function NowPlaying() {
  const [musicData, setMusicData] = useState([]);
  const [que, setQue] = useState([]);
  const [nowPlaying, setnowPlaying] = useState({});
  const [didUpdate, setdidUpdate] = useState(false)

  const fetchData = () => {
    return axios.get(ENDPOINT).then(({ data }) => {
      console.log(data);
      return data;
    });
  };

 // update data function checks for the length of the current que
 // if length is not zero we set the now playing state to be the first element in the que
 // from there we update our que array and change setdidupdate state to true
  const updateData = () => {
    if (que.length !== 0) {
        setnowPlaying(que[0]);
        console.log(nowPlaying);
        que.shift();
        setdidUpdate(true)
    }
  };



  // data is fetched when component mounts and set to state
  useEffect(() => {
    fetchData().then((response) => {
      setMusicData(response);
      setQue(response.aQueue);
      setnowPlaying(response.aNowPlaying);

// interval timer calls updateData function every 30 seconds
      let interval = setInterval(() => {
          updateData()
      }, 30000)
      clearInterval(interval)


    
    });
    setdidUpdate(false)
    // check for a change in the didUpdate value,  if state is changed rerender the component
  }, [didUpdate]);



  

  return (
    <div className="nowPlayingPage">
      <div className="rockbotHeader">
        <p>Mini Rockbot</p>
      </div>
      <div className="nowPlayingInfo">
        <img
          src={nowPlaying.sArtwork}
          className="artistImage"
          alt="Art Work"
        ></img>
        <div className="artistAndSongContainer">
            <div className="nowPlayingArtist">{nowPlaying.sArtist} </div>
            <div className="nowPlayingSong">{nowPlaying.sSong}</div>
        </div>
      </div>

      <div className="comingUpSection">
        <p className="comingUpHeader">Coming Up</p>
        <div className="queItemsContainer">
          {que.map((queItem) => {
            return (
              <div className="quedItems">
                <div className="quedArtistAndSongContainer">
                    <div className="quedArtist">{queItem.sArtist}</div>
                    <div className="quedSong">{queItem.sSong}</div>
                </div>
                <div className="quedLikes"> + {queItem.iLikes}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* <button onClick={updateData}>update</button> */}
    </div>
  );
}
