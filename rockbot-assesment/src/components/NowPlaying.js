import React, { useState, useEffect } from "react";
import axios from "axios";

// React fontawesome icons must be installed before running application
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";

const nowPlayingEndPoint = "https://api.rockbot.com/v3/engage/now_playing";
const voteUpEndPoint = "https://api.rockbot.com/v3/engage/vote_up";
const voteDownEndPoint = "https://api.rockbot.com/v3/engage/vote_down";

export default function NowPlaying({ que, setQue }) {
  const [nowPlaying, setnowPlaying] = useState({});

  // To fetch now plasying data, set authorization header API KEY from .env
  // Params requires a key of queue and a value of 1 for response object to return
  // queued artists and songs

  const fetchNowPlayingData = () => {
    return axios
      .get(nowPlayingEndPoint, {
        headers: {
          authorization: process.env.REACT_APP_API_KEY,
        },
        params: {
          queue: 1,
        },
      })
      .then(({ data }) => {
        let response = data.response;
        return response;
      })
      .then((response) => {
        // After receiving data, state is set
        setQue(response.queue);
        setnowPlaying(response.now_playing);
      });
  };

  // Voting requires an authorization header along side a pick_id passed into params
  // as a value to target speciic song

  // On page reload updated data (likes and dislikes) will be displayed

  const upVoteNowPlaying = () => {
    return axios
      .post(
        voteUpEndPoint,
        {},
        {
          headers: {
            authorization: process.env.REACT_APP_API_KEY,
          },
          params: {
            pick_id: nowPlaying.pick_id,
          },
        }
      )
      .then(({ data }) => {
        return data.response;
      });
  };

  const downVoteNowPlaying = () => {
    return axios
      .post(
        voteDownEndPoint,
        {},
        {
          headers: {
            authorization: process.env.REACT_APP_API_KEY,
          },
          params: {
            pick_id: nowPlaying.pick_id,
          },
        }
      )
      .then(({ data }) => {
        return data.response;
      });
  };

  const upVoteQueue = (pick_id) => {
    return axios
      .post(
        voteUpEndPoint,
        {},
        {
          headers: {
            authorization: process.env.REACT_APP_API_KEY,
          },
          params: {
            pick_id: pick_id,
          },
        }
      )
      .then(({ data }) => {
        console.log(data.response, "just upvoted");
        let response = data.response;

        setQue(response.queue);
        setnowPlaying(response.now_playing);

        return response;
      });
  };

  const downVoteQueue = (pick_id) => {
    return axios
      .post(
        voteDownEndPoint,
        {},
        {
          headers: {
            authorization: process.env.REACT_APP_API_KEY,
          },
          params: {
            pick_id: pick_id,
          },
        }
      )
      .then(({ data }) => {
        return data.response;
      });
  };

  // When compnent mounts data is immediately fetched for rendering
  useEffect(() => {
    fetchNowPlayingData();

    setInterval(() => {
      fetchNowPlayingData();
    }, 30000);
  }, []);
  return (
    <div className="nowPlayingPage">
      <div className="rockbotHeader">
        <div>Mini Rockbot</div>
      </div>
      <div className="nowPlayingInfo">
        <img
          src={nowPlaying?.artwork_small}
          className="nowPlayingArtistImage"
          alt="Art Work"
        />
        <div className="nowPlayingDetails">
          <button onClick={() => upVoteNowPlaying()}>
            <FontAwesomeIcon icon={faThumbsUp} color="white" size="2x" />
          </button>
          <div className="artistAndSongContainer">
            <div className="nowPlayingArtist">{nowPlaying.artist} </div>
            <div className="nowPlayingSong">{nowPlaying.song}</div>
          </div>

          <button onClick={() => downVoteNowPlaying()} className="dislike">
            <FontAwesomeIcon icon={faThumbsDown} color="white" size="2x" />
          </button>
        </div>
      </div>

      <div className="comingUpSection">
        <p className="comingUpHeader">Coming Up</p>
        <div className="queItemsContainer">
          {que.map((queItem, idx) => {
            return (
              <div className="quedItem" key={idx}>
                <div className="quedArtistAndSongContainer">
                  <div className="quedArtist">{queItem.artist}</div>
                  <div className="quedSong">{queItem.song}</div>
                </div>
                <div className="buttonContainer">
                  <button onClick={() => upVoteQueue(queItem.pick_id)}>
                    <FontAwesomeIcon
                      icon={faThumbsUp}
                      color="white"
                      size="1x"
                      className="quedLikeButton"
                    />
                  </button>
                  <div className="quedLikes"> + {queItem.likes}</div>

                  <button onClick={() => downVoteQueue(queItem.pick_id)}>
                    <FontAwesomeIcon
                      icon={faThumbsDown}
                      color="white"
                      size="1x"
                    />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
