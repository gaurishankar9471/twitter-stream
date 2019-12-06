import React from "react";
import "./App.css";
import TwitterStreamListView from "./components/TwitterStreamListView";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      {/*Render TwitterStreamListView Component*/}
      <TwitterStreamListView />
    </div>
  );
}

export default App;
