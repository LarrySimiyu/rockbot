import React, { useState, useEffect } from "react";
import axios from "axios";

const nowPlayingEndPoint = "https://api.rockbot.com/v3/engage/now_playing"

export default function NowPlaying( {que, setQue}) {


  const [nowPlaying, setnowPlaying] = useState({});
  const [didUpdate, setdidUpdate] = useState(false);

  const fetchData = () => {
    return axios.get(nowPlayingEndPoint, {
      headers: {
        authorization: process.env.REACT_APP_API_KEY
      },
      params: {
        queue: 1
      }
    }).then(({ data }) => {
      return data.response;
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
      setdidUpdate(true);
    }
  };

    // setInterval(() => {
       // fetchData()
    // }, 30000)

  // data is fetched when component mounts and set to state
  useEffect(() => {
    fetchData().then((response) => {
      console.log(response.queue, "current queue")
      setQue(response.queue);
      setnowPlaying(response.now_playing);

      // interval timer calls updateData function every 30 seconds
      // let interval = setInterval(() => {
      //   updateData();
      // }, 30000);
      // clearInterval(interval);
    });
        // check for a change in the didUpdate value,  if state is changed rerender the component

    setdidUpdate(false);
  }, [didUpdate]);

  return (
    <div className="nowPlayingPage">
      <div className="rockbotHeader">
        <p>Mini Rockbot</p>
      </div>
      <div className="nowPlayingInfo">
        <img
          src={nowPlaying.artwork_small}
          className="artistImage"
          alt="Art Work"
        />
        <div className="artistAndSongContainer">
          <div className="nowPlayingArtist">{nowPlaying.artist} </div>
          <div className="nowPlayingSong">{nowPlaying.song}</div>
        </div>
      </div>

      <div className="comingUpSection">
        <p className="comingUpHeader">Coming Up</p>
        <div className="queItemsContainer">
          {que.map((queItem, idx) => {
            return (
              <div className="quedItems" key={idx}>
                <div className="quedArtistAndSongContainer">
                  <div className="quedArtist">{queItem.artist}</div>
                  <div className="quedSong">{queItem.song}</div>
                </div>
                <div className="quedLikes"> + {queItem.likes}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* <button onClick={updateData}>update</button> */}
    </div>
  );
}
