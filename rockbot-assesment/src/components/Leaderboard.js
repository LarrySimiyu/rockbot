import React, { useState, useEffect } from "react";
import axios from "axios";

const ENDPOINT = "https://s.rockbot.com/temp/now_playing.json";

export default function Leaderboard() {
  const [topArtists, setTopArtists] = useState([]);
  const [topDJs, setTopDjs] = useState([]);

  const fetchData = () => {
    return axios.get(ENDPOINT).then(({ data }) => {
      console.log(data);
      return data;
    });
  };

  useEffect(() => {
    fetchData().then((response) => {
      setTopArtists(response.aTopArtists);
      setTopDjs(response.aTopDJs);
    });
  }, []);
  return (
    <div className="leaderBoard">
      <div className="rockbotHeader">
        <p>Mini Rockbot</p>
      </div>
      <div className="topDJsHeader">Top DJ's</div>
      <div>
        {topArtists.map((artist) => {
          return (
            //   <div className="artist">{artist.sArtist}</div>
            <img
              src={artist.sArtistImage}
              className="topArtistImage"
              alt="Top Artist"
            ></img>
          );
        })}
      </div>
      P<div className="topArtistsHeader">Top Artists</div>
      <div>
        {topDJs.map((dj) => {
          return (
            <img
              src={dj.sArtistImage}
              className="topDjImage"
              alt="Top DJ"
            ></img>
          );
        })}
      </div>
    </div>
  );
}
