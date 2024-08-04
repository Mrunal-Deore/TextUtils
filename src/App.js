import "./App.css";
import Navbar from "./components/Navbar";
import TextForm from "./components/TextForm";
import React, { useState } from "react";
import Alert from "./components/Alert";
import About from "./components/About";
import { BrowserRouter,Routes, Route } from "react-router-dom";

function App() {
  const [mode, setMode] = useState("light");
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });

    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

  function toggleMode() {
    if (mode === "dark") {
      setMode("light");
      document.body.style.backgroundColor = "white";
      showAlert("Light mode has been enabled", "success");
    } else {
      setMode("dark");
      document.body.style.backgroundColor = "#08014a";
      showAlert("Dark mode has been enabled", "success");
    }
  }
  return (
    <>
      <BrowserRouter>
        <Navbar
          title="AuroraBake"
          aboutText="Aurora's"
          toggleMode={toggleMode}
          mode={mode}
        />
        <Alert alert={alert} />
        <div className="container my-3" mode={mode}>
          <Routes>
            <Route exact path="/about" element={<About />} />
            </Routes>
            
            <Routes>
            <Route exact path="/" element={
              <TextForm
                showAlert={showAlert}
                heading="Enter your text here to analyze"
                mode={mode}
              />} />
            </Routes>
        </div>
    </BrowserRouter></>
  );
}

export default App;
