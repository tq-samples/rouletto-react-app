import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";
import { styled } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItemText from "@mui/material/ListItemText";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { FormControl } from "@mui/material";
import Button from "@mui/material/Button";
import useSound from "use-sound";
import RollSound from "./roll.mp3";
import StopSound from "./stop.mp3";

const backgroundColors = ["#ff8f43", "#70bbe0", "#0b3351", "#A1341B"];
// const backgroundColors = ["#ff8f43", "#70bbe0", "#0b3351", "#f9dd50"];
// const backgroundColors = ["#000000", "#FF3232"];
// const backgroundColors = [
//   "#A1341B",
//   "#B3ED58",
//   "#ED6040",
//   "#2860ED",
//   "#2347A1",
// ];
const textColors = ["#FFFFFF"];
// const textColors = ["#0b3351"];
const outerBorderColor = "#eeeeee";
const outerBorderWidth = 10;
const innerBorderColor = "#30261a";
const innerBorderWidth = 0;
const innerRadius = 0;
const radiusLineColor = "#eeeeee";
const radiusLineWidth = 8;
const fontSize = 19;
const textDistance = 60;

export default function Roulette() {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [personList, setPersonList] = useState<string[]>([]);
  const [userName, setUserName] = useState("");
  const [roulettoData, setRoulettoData] = useState<any[]>([]);
  const [isRoulettoDisplayed, setRoulettoDisplay] = useState(false);

  const [playRollSound, { sound }] = useSound(RollSound);
  const [playStopSound] = useSound(StopSound);

  const startRouletto = () => {
    setRoulettoDisplay(true);
    handleSpinClick();
    sound.loop(true);
    playRollSound();
  };

  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handlePersonAddEvent = () => {
    if (userName) {
      setPersonList([...personList, userName]);
      setUserName("");
    }
  };

  const handleDeletePerson = (event: string) => {
    let newPersonList = personList.filter((item: string) => {
      if (item === event) return null;
      return item;
    });
    setPersonList(newPersonList);
  };

  const handleSpinClick = () => {
    let roulettoData = personList.map((userName: string) => {
      return { option: userName };
    });
    setRoulettoData(roulettoData);
    const newPrizeNumber = Math.floor(Math.random() * roulettoData.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  const reset = () => {
    setRoulettoData([]);
    setPersonList([]);
    setRoulettoDisplay(false);
  };

  const Demo = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));

  return (
    <React.Fragment>
      <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
        候補者を入力してください。
      </Typography>
      <Box sx={{ width: "100%" }}>
        <Grid container spacing={2}>
          <Grid item xs={8} lg={3}>
            <FormControl fullWidth>
              <TextField
                id="inputPerson"
                label="候補者"
                variant="standard"
                value={userName}
                onChange={handleUserNameChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.keyCode === 13) {
                    handlePersonAddEvent();
                  }
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={2} lg={2}>
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
              size="large"
              edge="start"
              onClick={handlePersonAddEvent}
            >
              <PersonAddAlt1Icon />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
      <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
        候補者リスト
      </Typography>

      <Grid xs={12} lg={5} justifyContent="center">
        <Demo>
          <List>
            {personList.map((value) => {
              return (
                <ListItem
                  divider={true}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDeletePerson(value)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemText primary={value} />
                </ListItem>
              );
            })}
          </List>
        </Demo>
      </Grid>

      <>
        {isRoulettoDisplayed ? (
          <Grid container justifyContent="center">
            <Wheel
              mustStartSpinning={mustSpin}
              prizeNumber={prizeNumber}
              data={roulettoData}
              backgroundColors={backgroundColors}
              textColors={textColors}
              fontSize={fontSize}
              outerBorderColor={outerBorderColor}
              outerBorderWidth={outerBorderWidth}
              innerRadius={innerRadius}
              innerBorderColor={innerBorderColor}
              innerBorderWidth={innerBorderWidth}
              radiusLineColor={radiusLineColor}
              radiusLineWidth={radiusLineWidth}
              // perpendicularText
              textDistance={textDistance}
              onStopSpinning={() => {
                sound.loop(false);
                setMustSpin(false);
                playStopSound();
              }}
            />
          </Grid>
        ) : (
          <p></p>
        )}
      </>
      <Grid container spacing={2}>
        <Grid item container xs={6} justifyContent="flex-end">
          <Button variant="contained" onClick={startRouletto}>
            Go!
          </Button>
        </Grid>
        <Grid item container xs={6} justifyContent="flex-start">
          <Button variant="contained" onClick={reset}>
            Reset
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
