import React, { useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Grid,
  Button,
  FormControl,
  Tab,
  TextField,
  List,
  ListItem,
  ListItemText,
  Typography,
  IconButton,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Wheel } from "react-custom-roulette";
import useSound from "use-sound";
import RollSound from "./roll.mp3";
import StopSound from "./stop.mp3";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import DivideTeam from "./DivideTeam";
import SortMember from "./SortMember";

//custom hooks
import { useMembers } from "../hooks/useMembers";

const backgroundColors = ["#ff8f43", "#70bbe0", "#0b3351", "#A1341B"];
const textColors = ["#FFFFFF"];
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
  // variables & hooks
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [userName, setUserName] = useState("");

  const [playRollSound, { sound }] = useSound(RollSound);
  const [playStopSound] = useSound(StopSound);

  const { width, height } = useWindowSize();
  const [confetti, setConfetti] = useState(false);

  const processing = useRef(false);
  const inputRef = useRef(null);
  const [inputError, setInputError] = useState(false);
  const [inputErrorText, setInputErrorText] = useState("");

  const [value, setValue] = useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const startRouletto = () => {
    if (processing.current) return;
    processing.current = true;
    handleSpinClick();
    startRoll();
  };

  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handlePersonAddEvent = () => {
    if (userName === "") {
      setInputError(true);
      setInputErrorText("入力必須です");
      return;
    } else if (members.findIndex(({ option }) => option === userName) !== -1) {
      setInputError(true);
      setInputErrorText("同じ名前が存在します");
      return;
    }
    setUserName("");
    setInputError(false);
    setInputErrorText("");
    addMember({ option: userName });
  };

  const handleDeletePerson = (index: number) => {
    deleteMember(index);
  };

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * members.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  const reset = () => {
    setMembers([]);
  };

  const Demo = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));

  const [members, { setMembers, addMember, deleteMember }] = useMembers();

  const startRoll = async () => {
    setConfetti(false);
    playRollSound();
  };

  const startCountdown = async () => {
    setConfetti(false);
    playRollSound();
    for (let i = 0; i < 5; i++) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
    playStopSound();
    setConfetti(true);
  };

  return (
    <React.Fragment>
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={5}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            候補者を入力してください。
          </Typography>
          <Box sx={{ width: "100%" }}>
            <Grid container spacing={2}>
              <Grid item xs={7}>
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
                    error={inputError}
                    inputRef={inputRef}
                    helperText={inputErrorText}
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

          <Grid item xs={8} justifyContent="center">
            <Demo>
              <List>
                {members.map((v, i) => {
                  return (
                    <ListItem
                      key={v.option}
                      divider={true}
                      secondaryAction={
                        <IconButton edge="end" aria-label="delete" onClick={() => handleDeletePerson(i)}>
                          <DeleteIcon />
                        </IconButton>
                      }
                    >
                      <ListItemText primary={v.option} />
                    </ListItem>
                  );
                })}
              </List>
            </Demo>
          </Grid>
        </Grid>
        <Grid item xs={7}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList onChange={handleChange} centered>
                <Tab value="1" label="ルーレット" />
                <Tab value="2" label="チーム決め" />
                <Tab value="3" label="順番決め" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <Grid container spacing={2} direction="column" alignItems="center">
                <Grid item xs={2}>
                  <Button variant="contained" onClick={startRouletto} sx={{ mr: 2 }}>
                    Go!
                  </Button>
                  <Button variant="contained" onClick={reset}>
                    Reset
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  {members.length > 0 && (
                    <Wheel
                      mustStartSpinning={mustSpin}
                      prizeNumber={prizeNumber}
                      data={members}
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
                        setConfetti(true);
                        processing.current = false;
                      }}
                    />
                  )}
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value="2">
              <DivideTeam members={members} backgroundColors={backgroundColors} />
            </TabPanel>
            <TabPanel value="3">
              {members.length > 0 && <SortMember members={members} startCountdown={startCountdown} />}
            </TabPanel>
          </TabContext>
        </Grid>
      </Grid>
      {confetti && <Confetti width={width} height={height} recycle={false} />}
    </React.Fragment>
  );
}
