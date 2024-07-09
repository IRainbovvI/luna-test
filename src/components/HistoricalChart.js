import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";

const fetchHistoricalData = async (moduleId, start, stop, mode) => {
  const response = await axios.get(
    `http://localhost:3001/modules/${moduleId}/history`,
    {
      params: { start, stop, mode },
    }
  );
  return response.data;
};

const formatDateTime = (date) => {
  return new Date(date).toISOString().slice(0, -8);
};

const HistoricalChart = ({ moduleId }) => {
  const [data, setData] = useState([]);
  const [mode, setMode] = useState("daily");
  const [start, setStart] = useState(new Date("2024-01-01T00:00:00.000Z"));
  const [stop, setStop] = useState(new Date());

  useEffect(() => {
    const getData = async () => {
      const historicalData = await fetchHistoricalData(
        moduleId,
        start.toISOString(),
        stop.toISOString(),
        mode
      );
      setData(historicalData);
    };
    getData();
  }, [moduleId, start, stop, mode]);

  return (
    <Card sx={{ minWidth: 200, margin: 2 }}>
      <CardHeader title="Historical Data" />
      <CardContent>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <TextField
            label="Start Date"
            type="datetime-local"
            value={formatDateTime(start)}
            onChange={(e) => setStart(new Date(e.target.value))}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="End Date"
            type="datetime-local"
            value={formatDateTime(stop)}
            onChange={(e) => setStop(new Date(e.target.value))}
            InputLabelProps={{ shrink: true }}
          />
          <FormControl>
            <InputLabel>Mode</InputLabel>
            <Select value={mode} onChange={(e) => setMode(e.target.value)}>
              <MenuItem value="hourly">Hourly</MenuItem>
              <MenuItem value="daily">Daily</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="temperature"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default HistoricalChart;
