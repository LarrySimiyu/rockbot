import React, { useState, useEffect } from "react";
import axios from "axios";



// const ENDPOINT = "https://s.rockbot.com/temp/now_playing.json";
const topArtistsEndPoint = "https://api.rockbot.com/v3/engage/top_artists"



export default function Leaderboard({que, setQue}) {
  const [topArtists, setTopArtists] = useState([]);
  const [topDJs, setTopDjs] = useState([]);

  const fetchData = () => {
    return axios.get(topArtistsEndPoint, {
      headers: {
        authorization: process.env.REACT_APP_API_KEY
      }
    }).then(({ data }) => {
      console.log("something")
      console.log(data, "updated return");
      return data.response;
    });
  };

  const handleQueue = (artist) => {
    console.log(artist)
    

  }

 

  useEffect(() => {
    fetchData().then((response) => {
      setTopArtists(response);
      setTopDjs(response.aTopDJs);
    });
  }, []);

  return (
    <div className="leaderBoard">
      <div className="rockbotHeader">
        <p>Mini Rockbot</p>
      </div>
      <div className="topArtistsSection">
        <div className="topArtistsHeader">Top Artists</div>

        <div className="topArtistsContainer">
          {topArtists.filter((artist, idx) => idx < 5).map((artist) => {
            return (
              <img
                src={artist.artwork_small}
                className="topArtistImage"
                alt="Top Artist"
                onClick={() => handleQueue(artist)}
                key={artist.artist_id}
              />
            );
          })}
        </div>
      </div>

      {/* <div className="topDJsSection">
        <div className="topDJsHeader">Top DJ's</div>

        <div className="topDJsContainer">
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
      </div> */}
    </div>
  );
}
