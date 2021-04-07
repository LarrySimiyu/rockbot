import React, { useState, useEffect } from "react";
import axios from "axios";

const ENDPOINT = "https://s.rockbot.com/temp/now_playing.json";

export default function NowPlaying() {
  const [musicData, setMusicData] = useState([]);
  const [que, setQue] = useState([]);
  const [nowPlaying, setnowPlaying] = useState({});

  const fetchData = () => {
    return axios.get(ENDPOINT).then(({ data }) => {
      console.log(data);
      return data;
    });
  };

  // update current playing based off interval - 30000
  // update current que after removing first element

  const updateData = () => {
    if (que.length !== 0) {
      let interval = setInterval(() => {
          console.log(que, que.length, "current Q")
        setnowPlaying(que[0]);
        console.log(nowPlaying);
        que.shift();

        if (que.length === 0) {
          clearInterval(interval);
        }
      }, 2000);
    }
  };

  useEffect(() => {
    fetchData().then((response) => {
      setMusicData(response);
      setQue(response.aQueue);
      setnowPlaying(response.aNowPlaying);

      console.log(que.length);
    
    });
    console.log(que.length);

  }, []);

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
        <div className="artistAndSong">
          <p className="artistAndSongText">
            {nowPlaying.sArtist} <br></br>
            {nowPlaying.sSong}
          </p>
        </div>
      </div>

      <div className="comingUpSection">
        <p className="comingUpHeader">Coming Up</p>
        <div className="queItemsContainer">
          {que.map((queItem) => {
            return (
              <div className="quedItems">
                <div className="quedArtistAndSong">
                  <span className="quedArtist">{queItem.sArtist}</span>{" "}
                  <br></br>
                  {queItem.sSong}
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
