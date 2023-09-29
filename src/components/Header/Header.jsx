import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { setCurrentLang } from "../../store/slices/language";
import { useNavigate } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import WatchListIcon from "@mui/icons-material/Favorite";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import InputBase from "@mui/material/InputBase";

const Header = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const language = useSelector((state) => state.languageSlice.currentLang);
  const availableLanguages = useSelector(
    (state) => state.languageSlice.availableLang
  );

  const handleLanguageChange = (event) => {
    dispatch(setCurrentLang(event.target.value));
  };

  const handleWatchlistClick = (event) => {
    navigate('/watchlist')
  };

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "var(--primary-color)", boxShadow: "none" }}
    >
      <Toolbar>
        <Button
          edge="start"
          sx={{
            color: "var(--header-text-color)",
            fontSize: "1.2rem",
          }}
          onClick={()=>{navigate('/')}}
        >
          Watch X
        </Button>
        <div style={{ marginLeft: "auto"}}>
          <Select
            value={language}
            onChange={handleLanguageChange}
            sx={{ color: "var(--header-text-color)", fontSize: ".8rem" }}
            IconComponent={KeyboardArrowDownIcon}
            input={<InputBase/>}
          >
            {availableLanguages.map((lang) => (
              <MenuItem key={lang} value={lang}>
                {lang}
              </MenuItem>
            ))}
          </Select>

          <IconButton
            edge="end"
            onClick={handleWatchlistClick}
            sx={{
              color: "var(--header-text-color)",
              fontSize: ".8rem",
              marginLeft: "10px",
            }}
          >
            <WatchListIcon sx={{ marginRight: "8px" }} /> watchlist
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
