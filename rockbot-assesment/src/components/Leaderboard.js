import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router";

const topArtistsEndPoint = "https://api.rockbot.com/v3/engage/top_artists";
const requestArtistEndPoint =
  "https://api.rockbot.com/v3/engage/request_artist";
const searchArtistEndPoint = "https://api.rockbot.com/v3/engage/search_artists";

export default function Leaderboard({ que, setQue }) {
  const [topArtists, setTopArtists] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState();
  const [searchInput, setSearchInput] = useState("");

  const [searchResults, setSearchResults] = useState([]);

  const fetchData = () => {
    return axios
      .get(topArtistsEndPoint, {
        headers: {
          authorization: process.env.REACT_APP_API_KEY,
        },
      })
      .then(({ data }) => {
        console.log(data.response, "updated return");
        return data.response;
      });
  };

  const handleQueue = (artist) => {
    console.log(artist.artist_id, "artist id");
    setSelectedArtist(artist.artist_id);
  };

  const handleSearchInput = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSubmitSearch = (event) => {
    event.preventDefault();

    return axios
      .get(searchArtistEndPoint, {
        headers: {
          authorization: process.env.REACT_APP_API_KEY,
        },
        params: {
          query: searchInput,
        },
      })
      .then(({ data }) => {
        console.log(data.response, " successfully submitted search");
        setSearchInput("");
        return data.response;
      })
      .then((response) => {
        setSearchResults(response);
      });
  };

  const requestArtist = () => {
    console.log(selectedArtist, "selected artist");

    return axios
      .post(
        requestArtistEndPoint,
        {},
        {
          headers: {
            Authorization: process.env.REACT_APP_API_KEY,
          },
          params: {
            artist_id: selectedArtist,
          },
        }
      )
      .then(({ data }) => {
        console.log(data, "qued artist");
        return data;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  };

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
          {topArtists
            .filter((artist, idx) => idx < 5)
            .map((artist) => {
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
      <div className="searchContainer">
        <form onSubmit={handleSubmitSearch}>
          <input onChange={handleSearchInput} value={searchInput} />
        </form>
        <div className="searchResults">
          {searchResults.map((artist, idx) => {
            return (
              <div 
              key={artist.artist_id} 
              onClick={() => handleQueue(artist)}
              >
                <img src={artist.artwork_small} alt="Artist Profile" />
                {artist.artist}
              </div>
            );
          })}
        </div>
      </div>
      <button onClick={() => requestArtist()}>Request Artist</button>
    </div>
  );
}
