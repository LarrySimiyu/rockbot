import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router";

const topArtistsEndPoint = "https://api.rockbot.com/v3/engage/top_artists";
const requestArtistEndPoint =
  "https://api.rockbot.com/v3/engage/request_artist";
const searchArtistEndPoint = "https://api.rockbot.com/v3/engage/search_artists";

export default function Leaderboard({ que, setQue }) {
  const [topArtists, setTopArtists] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);

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
    selectedArtist === artist.artist_id
      ? setSelectedArtist(null)
      : setSelectedArtist(artist.artist_id);
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
        <form onSubmit={handleSubmitSearch} className="artistSearchContainer">
          <input
            onChange={handleSearchInput}
            value={searchInput}
            className="artistSearchInput"
            placeholder="Search Music"
          />
        </form>
        <div className="topArtistHeaderContainer">
          <div className="topArtistsHeader">Top Artists</div>
          <button
            onClick={() => requestArtist()}
            className={
              selectedArtist !== null ? "filledRequestButton" : "requestButton"
            }
          >
            Request Artist
          </button>
        </div>

        {searchResults.length > 0 ? (
          <div className="topArtistsContainer">
            {searchResults.map((artist) => {
              return (
                <div className="topArtistInfo" key={artist.artist_id}>
                  <img
                    src={artist.artwork_small}
                    alt="Top Artist"
                    onClick={() => handleQueue(artist)}
                    className={
                      selectedArtist === artist.artist_id
                        ? "selectedArtistImage"
                        : "topArtistImage"
                    }
                  />
                  <div className="topArtistName">{artist.artist}</div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="topArtistsContainer">
            {topArtists.map((artist) => {
              return (
                <div className="topArtistInfo" key={artist.artist_id}>
                  <img
                    src={artist.artwork_small}
                    alt="Top Artist"
                    onClick={() => handleQueue(artist)}
                    className={
                      selectedArtist === artist.artist_id
                        ? "selectedArtistImage"
                        : "topArtistImage"
                    }
                  />
                  <div className="topArtistName">{artist.artist}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
