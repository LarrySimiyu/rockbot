import React, { useState, useEffect } from "react";
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
            onClick={() => requestArtist()}
            className={
              selectedArtist !== null ? "filledRequestButton" : "requestButton"
            }
          >
            Request Artist
          </button>
        </div>

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
