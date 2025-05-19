import React from "react";
import PropTypes from "prop-types";

const Avatar = ({ selected, setSelected }) => {
  const defaultAvatars = [
    require("../assets/avatar1.png"),
    require("../assets/avatar2.png"),
    require("../assets/avatar3.png"),
    require("../assets/avatar4.png"),
    require("../assets/avatar5.png"),
    require("../assets/avatar6.png"),
    require("../assets/avatar7.png"),
    require("../assets/avatar8.png"),
    require("../assets/avatar9.png"),
    require("../assets/avatar10.png"),
  ];

  return (
    <div className="w-full flex justify-center items-center mt-6 flex-wrap gap-4">
      {defaultAvatars.map((url, index) => (
        <img
          key={index}
          src={url}
          alt={`Avatar ${index + 1}`}
          onClick={() => setSelected(url)}
          className={`w-16 h-16 rounded-full object-cover cursor-pointer border-2 transition-all duration-200 ${
            selected === url ? "border-blue-500" : "border-transparent"
          }`}
        />
      ))}
    </div>
  );
};

Avatar.propTypes = {
  selected: PropTypes.string,
  setSelected: PropTypes.func.isRequired,
};

export default Avatar;
