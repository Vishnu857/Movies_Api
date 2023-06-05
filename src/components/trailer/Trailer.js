import "./Trailer.css";
import React from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import ReactPlayer from "react-player";

const Trailer = () => {
  let params = useParams();
  let key = params.ytTrailerId;
  const navigate = useNavigate();
  const handleEnded = () => {
    navigate("/");
  };

  return (
    <div className="react-player-container">
      {key != null ? (
        <ReactPlayer
          playing={true}
          controls={true}
          onEnded={handleEnded} // Pass the function handleEnded as the onEnded prop
          url={`https://www.youtube.com/watch?v=${key}`}
          width="100%"
          height="100%"
        />
      ) : null}
    </div>
  );
};

export default Trailer;
