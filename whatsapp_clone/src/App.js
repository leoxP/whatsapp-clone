import React from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <div className="app__body">
        <Router>
          <Sidebar />
          <Routes>
            <Route
              path="/rooms/:roomId" //dynamic values for roomId
              element={
                <>
                  <Chat />
                </>
              }
            />
            <Route 
              path="/" 
            />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
