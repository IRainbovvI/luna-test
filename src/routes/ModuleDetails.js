import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import EditModal from "../components/EditModal";
import { Button, Tooltip } from "@mui/material";
import { io } from "socket.io-client";
import HistoricalChart from "../components/HistoricalChart";

const ModuleDetails = () => {
  const [module, setModule] = useState({});
  const [temperature, setTemperature] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const { moduleId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://localhost:3001/modules/" + moduleId
      );
      if (response.data) {
        setModule(response.data);
      }
    };

    fetchData();

    const socket = io("http://localhost:3001");

    socket.on("connect", () => {
      console.log("Connected to WebSocket");
    });

    socket.on("moduleUpdate", (data) => {
      const item = data.find((el) => el.id === moduleId);
      if (item) {
        setTemperature(item.temperature);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [moduleId]);

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleModalSave = async (moduleEdit) => {
    const response = await axios.patch(
      "http://localhost:3001/modules/" + moduleEdit.id,
      { ...moduleEdit, targetTemperature: Number(moduleEdit.targetTemperature) }
    );
    if (response.status === 200) {
      setModule(moduleEdit);
    }
    setModalOpen(false);
  };

  return (
    <>
      <Card sx={{ minWidth: 200, margin: 2 }}>
        <CardContent>
          <Box display="flex">
            <Typography variant="h5" component="div" mr={2}>
              {module.name}
            </Typography>
            <Chip
              label={module.available ? "Available" : "Not Available"}
              color={module.available ? "success" : "error"}
            />
          </Box>

          <Typography mb={2} color="gray">
            ID: {module.id}
          </Typography>
          <Typography variant="body2">{module.description}</Typography>
          <Box sx={{ mt: 2, mb: 2 }}>
            <Typography variant="body1">
              Target Temperature: {module.targetTemperature}°C
            </Typography>
            {temperature && (
              <Typography
                variant="body1"
                color={
                  Math.abs(temperature - module.targetTemperature) <= 0.5
                    ? "green"
                    : "red"
                }
              >
                Current Temperature: {temperature}°C
              </Typography>
            )}
          </Box>

          {module.available ? (
            <Button
              onClick={() => {
                setModalOpen(true);
              }}
            >
              Edit Module
            </Button>
          ) : (
            <Tooltip title="You can't edit unavailable modules" arrow>
              <span>
                <Button
                  onClick={() => {
                    setModalOpen(true);
                  }}
                  disabled
                >
                  Edit Module
                </Button>
              </span>
            </Tooltip>
          )}
        </CardContent>
      </Card>
      <HistoricalChart moduleId={moduleId} />
      <EditModal
        open={modalOpen}
        handleClose={handleModalClose}
        module={module}
        handleSave={handleModalSave}
      ></EditModal>
    </>
  );
};

export default ModuleDetails;
