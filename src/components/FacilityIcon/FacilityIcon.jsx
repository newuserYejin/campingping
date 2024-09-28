import React from "react";
import "./FacilityIcon.style.css";
import { infoFacility } from "../../constants/info";

const FacilityIcon = ({ name, isActive  }) => {
  let iconName = "default";

  infoFacility.map((val) => {
    if (val.name === name) iconName = val.icon;
  });


 return <i className={`facility-icon icon-${iconName} ${isActive && 'on'}`}>{iconName}</i>;

};

export default FacilityIcon;
