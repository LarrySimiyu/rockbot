import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const topArtistsEndPoint = "https://api.rockbot.com/v3/engage/top_artists";
const requestArtistEndPoint =
  "https://api.rockbot.com/v3/engage/request_artist";
const searchArtistEndPoint = "https://api.rockbot.com/v3/engage/search_artists";

export default function Request({ que, setQue }) {
  const [topArtists, setTopArtists] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const history = useHistory();

  // To fetch top artists, pass API key to authorization header.
  const fetchTopArtists = () => {
    return axios
      .get(topArtistsEndPoint, {
        headers: {
          authorization: process.env.REACT_APP_API_KEY,
        },
      })
      .then(({ data }) => {
        return data.response;
      });
  };

  // HandleQueue accepts artist data and
  // sets the current selected artist from their artist_id
  const handleQueue = (artist) => {
    selectedArtist === artist.artist_id
      ? setSelectedArtist(null)
      : setSelectedArtist(artist.artist_id);
  };

  const handleSearchInput = (event) => {
    setSearchInput(event.target.value);
  };

  // To search for music, pass authorization header API key with params containing the user searchInput
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
        setSearchInput("");
        return data.response;
      })
      .then((response) => {
        setSearchResults(response);
      });
  };

  // Requested artist is passed by passing the current selected artist state into params key artist_id
  const requestArtist = () => {
    console.log(selectedArtist);
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
        history.push("/");
        return data;
      })
      .catch((error) => {
        return error;
      });
  };

  useEffect(() => {
    fetchTopArtists().then((response) => {
      setTopArtists(response);
    });
  }, []);

  return (
    <div className="requestsPage">
      <div className="rockbotHeader">
        <p>Mini Rockbot</p>
      </div>
      <div className="artistsSection">
        <form onSubmit={handleSubmitSearch} className="artistSearchContainer">
          <input
            onChange={handleSearchInput}
            value={searchInput}
            className="artistSearchInput"
            placeholder="Search Music"
          />
        </form>
        <div className="artistsHeaderContainer">
          <div className="artistsHeader">Top Artists</div>
          <button
            disabled={selectedArtist === null ? true : false}
            onClick={() => requestArtist()}
            className={
              selectedArtist !== null ? "filledRequestButton" : "requestButton"
            }
          >
            Request Artist
          </button>
        </div>

        {/* 
          Conditionaly render request page based off search result length.
          When search result state has yet to be set to any value, by default request component
          will render topArtists
        */}
        {searchResults.length > 0 ? (
          <div className="artistsContainer">
            {searchResults.map((artist) => {
              return (
                <div className="artistInfo" key={artist.artist_id}>
                  <img
                    src={artist.artwork_small}
                    alt="Artist"
                    onClick={() => handleQueue(artist)}
                    className={
                      selectedArtist === artist.artist_id
                        ? "selectedArtistImage"
                        : "artistImage"
                    }
                  />
                  <div className="artistName">{artist.artist}</div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="artistsContainer">
            {topArtists.map((artist) => {
              return (
                <div className="artistInfo" key={artist.artist_id}>
                  <img
                    src={artist.artwork_small}
                    alt="Artist"
                    onClick={() => handleQueue(artist)}
                    className={
                      selectedArtist === artist.artist_id
                        ? "selectedArtistImage"
                        : "artistImage"
                    }
                  />
                  <div className="artistName">{artist.artist}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
