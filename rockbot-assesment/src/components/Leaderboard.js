import React, { useState, useEffect } from "react";
import axios from "axios";



const topArtistsEndPoint = "https://api.rockbot.com/v3/engage/top_artists"
const requestArtistEndPoint = "https://api.rockbot.com/v3/engage/request_artist"


export default function Leaderboard({que, setQue}) {
  const [topArtists, setTopArtists] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState()

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
    console.log(artist.artist_id, "artist id")
    console.log(process.env.REACT_APP_API_KEY)
    setSelectedArtist(artist.artist_id)


  }

  const requestArtist=()=> {
    console.log(selectedArtist, "final selection")

     return axios.post(requestArtistEndPoint, {}, {
      headers: {
        Authorization: process.env.REACT_APP_API_KEY
      },
      params: {
        artist_id: selectedArtist
      }
    }).then(( { data }) => {
      console.log(data, "qued artist")
      return data
    }).catch(error => {
      console.log(error)
      return error
    })
  }

 

  useEffect(() => {
    fetchData().then((response) => {
      setTopArtists(response);
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
      <button onClick={() => requestArtist()}>Request Artist</button>

    </div>
  );
}
