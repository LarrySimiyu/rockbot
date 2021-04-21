# Instructions To Start Application

1. In terminal `cd` into project folder `rockbot-assesment`
2. In project folder run `npm install`
3. `GET` and `POST` requests require `headers` with `authorization` key and a unique `API KEY` as a value
    
    ```
    headers: {
          authorization: process.env.REACT_APP_API_KEY,
        }
        
    ```
4. Create a file in the root folder with the name `.env`
5. Add `REACT_APP_API_KEY=API KEY`, make sure there are no spaces and no single or double quotation marks.        
6. Run `npm start`
