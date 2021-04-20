import "./App.css";

import "./styling/RequestComponentStyling/Requests.css";

import "./styling/NowPlayingComponentStyling/NowPlayingSection.css";
import "./styling/NowPlayingComponentStyling/QuedMusicSection.css";
import "./styling/NowPlayingComponentStyling/RockbotHeader.css";
import "./styling/NowPlayingComponentStyling/TabBar.css";

import Navigation from "./components/Navigation";
import Paths from "./components/Paths";

function App() {

  return (
    <div className="mainContainer">
      <div className="displayedContent">
        <Paths />
        <Navigation />
      </div>
    </div>
  );
}

export default App;
