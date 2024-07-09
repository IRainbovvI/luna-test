import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";

const EditModal = ({ open, handleClose, module, handleSave }) => {
  const [moduleEdit, setModuleEdit] = useState({
    id: "",
    name: "",
    description: "",
    available: false,
    targetTemperature: 0,
  });

  useEffect(() => {
    if (module) {
      setModuleEdit({
        id: module.id,
        name: module.name,
        description: module.description,
        available: module.available,
        targetTemperature: module.targetTemperature,
      });
    }
  }, [module]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setModuleEdit((prevModule) => ({
      ...prevModule,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave(moduleEdit);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Module</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            required
            value={moduleEdit.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            required
            multiline
            type="text"
            fullWidth
            variant="outlined"
            value={moduleEdit.description}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="targetTemperature"
            label="Target Temperature"
            type="number"
            InputProps={{
              endAdornment: <InputAdornment position="end">°C</InputAdornment>,
            }}
            inputProps={{ min: 0, max: 40, step: 0.1 }}
            fullWidth
            variant="outlined"
            value={moduleEdit.targetTemperature}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditModal;
