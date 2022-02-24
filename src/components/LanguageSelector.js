import React from "react";
import { withTranslation } from "react-i18next";
import { changeLanguage } from "../api/apiCall";

const LanguageSelector = (props) => {
  const onChangeLanguage = (language) => {
    const { i18n } = props;
    i18n.changeLanguage(language);
    changeLanguage(language);
  };
  return (
    <div className="container">
      <img
        style={{ width: "100px", cursor: "pointer" }}
        src="https://icons.iconarchive.com/icons/wikipedia/flags/256/TR-Turkey-Flag-icon.png"
        alt="tr"
        onClick={() => onChangeLanguage("tr")}
      ></img>
      <img
        style={{ width: "100px", cursor: "pointer" }}
        src="https://images.thdstatic.com/productImages/db985bd3-d47b-4b1a-a270-a1bd84e55b62/svn/seasonal-designs-house-flags-rf3n-64_1000.jpg"
        alt="en"
        onClick={() => onChangeLanguage("en")}
      ></img>
    </div>
  );
};

export default withTranslation()(LanguageSelector);
