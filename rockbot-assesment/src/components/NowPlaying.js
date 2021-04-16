import React, { useState, useEffect } from "react";
import axios from "axios";

// TODO: [] add liking and disliking functionality 
// TODO: [] add duration timer



const nowPlayingEndPoint = "https://api.rockbot.com/v3/engage/now_playing";
const voteUpEndPoint = "https://api.rockbot.com/v3/engage/vote_up"
const voteDownEndPoint = "https://api.rockbot.com/v3/engage/vote_down"

export default function NowPlaying({ que, setQue }) {
  const [nowPlaying, setnowPlaying] = useState({});

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
        console.log(response.now_playing.duration, "current duration")
        setQue(response.queue);
        setnowPlaying(response.now_playing);
      });
  };


  const upVote = () => {
     return axios.post(voteUpEndPoint, {}, {
      headers: {
        authorization: process.env.REACT_APP_API_KEY
      },
      params: {
        pick_id: nowPlaying.pick_id
      }
    }).then(( { data }) => {
      console.log(data, "upvoted")
      return data.response
    })

  };
  const downVote = () => {
    return axios.post(voteDownEndPoint, {}, {
      headers: {
        authorization: process.env.REACT_APP_API_KEY
      },
      params: {
        pick_id: nowPlaying.pick_id
      }
    }).then(( { data }) => {
      console.log(data, "down voted")
      return data.response
    })

  };

 

  // update data function checks for the length of the current que
  // if length is not zero we set the now playing state to be the first element in the que
  // from there we update our que array and change setdidupdate state to true
  // const updateData = () => {
  //   if (que.length !== 0) {
  //     setnowPlaying(que[0]);
  //     console.log(nowPlaying);
  //     que.shift();
  //     console.log(nowPlaying.remaining)
  //   }
  // };

  // setInterval(() => {
  //    fetchData()
  // }, 10000)

  // data is fetched when component mounts and set to state
  useEffect(() => {
    fetchData();
    // check for a change in the didUpdate value,  if state is changed rerender the component
  }, []);

  return (
    <div className="nowPlayingPage">
      <div className="rockbotHeader">
        <p>Mini Rockbot</p>
      </div>
      <div className="nowPlayingInfo">
        <img
          src={nowPlaying.artwork_small}
          className="artistImage"
          alt="Art Work"
        />
        <div className="artistAndSongContainer">
          <div className="nowPlayingArtist">{nowPlaying.artist} </div>
          <div className="nowPlayingSong">{nowPlaying.song}</div>
          <button onClick={() => upVote()}>Up</button>
          <button onClick={() => downVote()}>Down</button>
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
              </div>
            );
          })}
        </div>
      </div>

      {/* <button onClick={updateData}>update</button> */}
    </div>
  );
}
