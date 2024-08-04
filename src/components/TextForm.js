import React, { useState } from "react";

export default function TextForm(props) {
  const [text, setText] = useState(" ");

  function handleUpperCaseClick() {
    console.log("Upper case was clicked ");
    let upperCaseText = text.toUpperCase();
    setText(upperCaseText);
    props.showAlert("Converted to Uppercase ", "success");
  }

  function handleLowerCaseClick() {
    console.log("Lower case was clicked ");
    let lowerCaseText = text.toLowerCase();
    setText(lowerCaseText);
    props.showAlert("Converted to Lowercase ", "success");
  }

  function handleClearTextClick() {
    let clearText = "";
    setText(clearText);
    props.showAlert("Text is cleared ", "success");
  }

  function handleCapsClick() {
    let capsText = text.charAt(0).toUpperCase() + text.slice(1);
    setText(capsText);
    props.showAlert("Converted to First letter to caps ", "success");
  }

  function handleCapsEveryClick() {
    // Split the text into words
    let words = text.split(" ");

    // Capitalize the first letter of each word and join them back into a string
    let capitalizedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );

    // Join the words back into a single string with spaces in between
    let result = capitalizedWords.join(" ");

    setText(result);
    props.showAlert("Converted to all first letters to caps  ", "success");
  }

  function speak() {
    let msg = new SpeechSynthesisUtterance();
    msg.text = text;
    window.speechSynthesis.speak(msg);
  }

  function handleCopy() {
    var words = document.getElementById("myBox");
    words.select();
    navigator.clipboard.writeText(words.value);
    props.showAlert("Text is copied to clipboard", "success");
  }

  function handleRemoveextraSpaces() {
    let result = text.split(/[ ]+/);
    setText(result.join(" "));
    props.showAlert("Removed extra spaces ", "success");
  }

  const wordCount = (text) => {
    let regex = /\s+\S+/;
    let numOfWords = text.split(regex);
    return numOfWords.length;
  };

  function handleOnChange(event) {
    console.log("On change ");
    setText(event.target.value);
  }

  return (
    <>
      <div
        className="container"
        style={{ color: props.mode === "dark" ? "white" : "black" }}
      >
        <h1>{props.heading}</h1>
        <div className="mb-3">
          <textarea
            className="form-control"
            onChange={handleOnChange}
            value={text}
            placeholder="Enter your text here"
            id="myBox"
            rows="12"
            style={{
              backgroundColor: props.mode === "dark" ? "grey" : "white",
              color: props.mode === "dark" ? "white" : "balck",
            }}
          ></textarea>
          <br />
          <div className="container">
            <button
              className="btn btn-primary mx-3"
              onClick={handleUpperCaseClick}
            >
              Convert to Upper-case
            </button>
            <button
              className="btn btn-primary mx-3"
              onClick={handleLowerCaseClick}
            >
              Convert to Lower-case
            </button>
            <button
              className="btn btn-primary mx-3"
              onClick={handleClearTextClick}
            >
              Clear Text
            </button>
            <button className="btn btn-primary mx-3" onClick={handleCapsClick}>
              Convert First letter to caps
            </button>
            <button
              className="btn btn-primary mx-3"
              onClick={handleCapsEveryClick}
            >
              Convert all first-letter to caps
            </button>
            <button className="btn btn-primary mx-3" onClick={handleCopy}>
              Copy text
            </button>
            <button
              className="btn btn-primary mx-3 my-3"
              onClick={handleRemoveextraSpaces}
            >
              Remove extra spaces
            </button>
            <button className="btn btn-primary mx-3 my-3" onClick={speak}>
              Speak
            </button>
          </div>
        </div>
      </div>

      <div
        className="container"
        style={{ color: props.mode === "dark" ? "white" : "black" }}
      >
        <h1>Your text summary</h1>
        <p>
          {text === " " ? 0 : wordCount(text)} words , {text === " "? 0: text.length-1} characters
        </p>
        <p>
          {text === " " ? 0 * 0.008 : wordCount(text) * 0.008} minutes to read{" "}
        </p>
        <h2>Preview</h2>
        <p>
          {text.length > 0 ? text : "Enter text in text-box to get previews"}
        </p>
      </div>
    </>
  );
}
