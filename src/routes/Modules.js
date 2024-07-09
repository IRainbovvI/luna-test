import {
  Box,
  Button,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";

const Modules = () => {
  const [modules, setModules] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:3001/modules");
      if (response.data) {
        setModules(response.data);
      } else {
        setModules([]);
      }
    };
    fetchData();

    const socket = io("http://localhost:3001");

    socket.on("connect", () => {
      console.log("Connected to WebSocket");
    });

    socket.on("moduleUpdate", (data) => {
      setModules((prevModules) =>
        prevModules.map((module) => {
          const item = data.find((el) => el.id === module.id);
          return item
            ? { ...module, currentTemperature: item.temperature }
            : module;
        })
      );
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Box marginTop={1}>
      <List>
        {modules &&
          modules.map((item) => (
            <ListItem key={item.id} divider>
              <ListItemText
                sx={{ maxWidth: "70%", wordBreak: "break-all" }}
                primary={item.name}
                secondary={
                  item.currentTemperature ? (
                    <>
                      Target temperature: {item.targetTemperature}°C /{" "}
                      <Typography
                        display="inline-block"
                        variant="body2"
                        color={
                          Math.abs(
                            item.currentTemperature - item.targetTemperature
                          ) <= 0.5
                            ? "green"
                            : "red"
                        }
                      >
                        Current temperature: {item.currentTemperature}°C
                      </Typography>
                    </>
                  ) : (
                    `Target temperature: ${item.targetTemperature}°C`
                  )
                }
              />

              <ListItemSecondaryAction
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Box display="inline-block" mr={2}>
                  <Chip
                    label={item.available ? "Available" : "Not Available"}
                    color={item.available ? "success" : "error"}
                  />
                </Box>
                <Button
                  component={Link}
                  to={"modules/" + item.id}
                  variant="contained"
                  color="primary"
                >
                  Details
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
      </List>
    </Box>
  );
};

export default Modules;
