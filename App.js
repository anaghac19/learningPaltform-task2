import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import "./App.css";

const socket = io("http://localhost:5000");

const App = () => {
  const { id: docId } = useParams();
  const [content, setContent] = useState("");

  useEffect(() => {
    socket.emit("join-document", docId);

    socket.on("load-document", (document) => {
      setContent(document);
    });

    socket.on("receive-changes", (changes) => {
      setContent((prev) => prev + changes);
    });

    return () => {
      socket.disconnect();
    };
  }, [docId]);

  const handleChange = (e) => {
    const changes = e.target.value;
    setContent(changes);
    socket.emit("send-changes", changes);
  };

  const handleSave = () => {
    socket.emit("save-document", content);
    alert("Document saved!");
  };

  return (
    <div className="App">
      <textarea
        className="editor"
        value={content}
        onChange={handleChange}
      ></textarea>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default App;
