import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCurrentLang } from "../../store/slices/language";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import WatchListIcon from "@mui/icons-material/Favorite";
import Badge from '@mui/material/Badge';
import { useTheme } from '@mui/material/styles';

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import InputBase from "@mui/material/InputBase";
import ThemeToggle from "../ThemeToggler/ThemeToggle";


const Header = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const language = useSelector((state) => state.languageSlice.currentLang);
  const availableLanguages = useSelector(
    (state) => state.languageSlice.availableLang
  );

  const count = useSelector((state) => state.watchlistSlice.count);

  const handleLanguageChange = (event) => {
    dispatch(setCurrentLang(event.target.value));
    window.location.reload();
  };

  const handleWatchlistClick = (event) => {
    navigate('/watchlist')
  };

  const handleLogoClick = () => {
    navigate('/');
  }

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: theme.palette.primary.main, boxShadow: "none" }}
    >
      <Toolbar>
        <Button
          edge="start"
          onClick={handleLogoClick}
          sx={{
            color: theme.palette.text.secondary,
            fontSize: "1.2rem",
          }}
        >
          Watch X
        </Button>
        <div style={{ marginLeft: "auto"}}>
          <ThemeToggle/>
          <Select
            value={language}
            onChange={handleLanguageChange}
            sx={{ color: theme.palette.text.secondary, fontSize: ".8rem" }}
            IconComponent={KeyboardArrowDownIcon}
            input={<InputBase/>}
          >
            {availableLanguages.map((lang) => (
              <MenuItem key={lang} value={lang} sx={{color: theme.palette.background.staticDark}}>
                {lang}
              </MenuItem>
            ))}
          </Select>

          <IconButton
            edge="end"
            onClick={handleWatchlistClick}
            sx={{
              color: theme.palette.text.secondary,
              fontSize: ".8rem",
              marginLeft: "10px",
            }}
          >
            watchlist
            <Badge badgeContent={count}>
            <WatchListIcon sx={{ marginLeft: "8px" }} />
            </Badge>
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;