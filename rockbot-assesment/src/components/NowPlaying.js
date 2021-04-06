import React, {useState, useEffect }from 'react'
import axios from 'axios'


const ENDPOINT = "https://s.rockbot.com/temp/now_playing.json"


export default function NowPlaying(){
    const [musicData, setMusicData] = useState([])
    const [que, setQue] = useState([])
    const [nowPlaying, setnowPlaying] = useState({})

    const fetchData = () => {
        return axios
            .get(ENDPOINT).then(({ data }) => {
                console.log(data)
                return data
            })
        
    }

    // update current playing based off interval - 30000
 // update current que after removing first element
   
   const updateData = () => {
   
    if(que.length !== 0) {
        setnowPlaying(que[0])
        console.log(nowPlaying)
        que.shift()
    }


  
}

    useEffect(() => {
        fetchData().then((response) => {
            setMusicData(response)
            setQue(response.aQueue)
            setnowPlaying(response.aNowPlaying)


            console.log(que.length)
            if(que.length !== 0){
                setInterval(() => {
                    console.log("print")
                    updateData()
                }, 5000);
          
            }
        })
        
    }, [])



    return (
        <div>
            <h1>Now Playing</h1>
            <p>{nowPlaying.sArtist} :             {nowPlaying.sSong}
</p>
            <p></p>
            <h1>Coming Up</h1>
            {que.map((queItem) => {
                return <p>{queItem.sArtist} : {queItem.sSong} : {queItem.iLikes}</p>
            })}

            {/* <button onClick={updateData}>update</button> */}

            

        </div>
    )
}