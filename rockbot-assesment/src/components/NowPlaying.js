import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  fas,
  faThumbsUp,
  faThumbsDown,
} from "@fortawesome/free-solid-svg-icons";

const nowPlayingEndPoint = "https://api.rockbot.com/v3/engage/now_playing";
const voteUpEndPoint = "https://api.rockbot.com/v3/engage/vote_up";
const voteDownEndPoint = "https://api.rockbot.com/v3/engage/vote_down";

export default function NowPlaying({ que, setQue }) {
  const [nowPlaying, setnowPlaying] = useState({});
  const [timer, setTimer] = useState(false);

  const fetchData = () => {
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
        console.log(response.queue, "current queue");
        console.log(response.now_playing.duration, "current duration");
        setQue(response.queue);
        setnowPlaying(response.now_playing);
      });
  };

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
        console.log(data, "upvoted now playing");
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
        console.log(data, "down voted now playing");
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
        console.log(pick_id, "que pick_id");
        console.log(data, "upvoted now playing");
        return data.response;
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
        console.log(data, "down voted now playing");
        return data.response;
      });
  };

  // data is fetched when component mounts and set to state
  useEffect(() => {
    fetchData();
    // check for a change in the didUpdate value,  if state is changed rerender the component
  }, []);

  return (
    <div className="nowPlayingPage">
      <div className="rockbotHeader">
        <div>Mini Rockbot</div>
      </div>
      <div className="nowPlayingInfo">
        <img
          src={nowPlaying.artwork_small}
          className="artistImage"
          alt="Art Work"
        />
        <div className="nowPlayingDetails">
          <button onClick={() => upVoteNowPlaying()}>
            <FontAwesomeIcon icon={faThumbsUp} color="white" size="2x"/>
          </button>
          <div className="artistAndSongContainer">
            <div className="nowPlayingArtist">{nowPlaying.artist} </div>
            <div className="nowPlayingSong">{nowPlaying.song}</div>
          </div> 

          <button onClick={() => downVoteNowPlaying()} className="dislike">
            <FontAwesomeIcon icon={faThumbsDown} color="white" size="2x"/>
          </button>
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
                <div className="buttonContainer">
                <button onClick={() => upVoteQueue(queItem.pick_id)}>
                  <FontAwesomeIcon icon={faThumbsUp} color="white" size=".5x" className="quedLikeButton"/>
                </button>
                <button onClick={() => downVoteQueue(queItem.pick_id)}>
                  <FontAwesomeIcon icon={faThumbsDown}  color="white" size=".5x"/>
                </button>
                </div>
                
              </div>
            );
          })}
        </div>
      </div>

      {/* <button onClick={updateData}>update</button> */}
    </div>
  );
}
