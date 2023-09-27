import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import CircularProgressWithLabel from "./CircularProgressWithLabel";

export default function MovieCard() {
  return (
    <Card
      sx={{
        maxWidth: 345,
        position: "relative",
        boxShadow: "none",
        borderRadius: "10px",
        "@media (max-width:600px)": {
          width: "auto",
          margin: "0 auto",
        },
      }}
    >
      <IconButton
        sx={{
          position: "absolute",
          top: "2%",
          right: "5%",
          backgroundColor: "#fff",
          opacity: "0.5",
          ":hover": {
            backgroundColor: "#ddd",
            opacity: "1",
          },
        }}
      >
        <MoreHorizIcon sx={{ fontSize: 14 }} />
      </IconButton>
      <figure>
        <img
          src="https://image.tmdb.org/t/p/w500/1qCq228LsNtUseCnNE7Naw6NBUz.jpg"
          style={{ width: "100%", borderRadius: "10px" }}
        />
      </figure>
      <CardContent sx={{ position: "relative" }}>
        <CircularProgressWithLabel value={30} />
        <Typography
          gutterBottom
          variant="h6"
          component="h6"
          sx={{ fontSize: "0.874rem", fontWeight: "bold", mt: 2 }}
        >
          La Science des rêves
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Sep 25, 2017
          <FavoriteBorderOutlinedIcon sx={{ color: "var(--primary-color)" }} />
        </Typography>
      </CardContent>
    </Card>
  );
}
