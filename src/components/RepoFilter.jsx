// RepoFilter.jsx
import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const RepoFilter = ({ onFilterChange }) => {
  const handleFilterChange = (event) => {
    const selectedFilter = event.target.value;
    onFilterChange(selectedFilter);
  };

  return (
    <FormControl fullWidth>
      <InputLabel>Filtrar por</InputLabel>
      <Select defaultValue="" onChange={handleFilterChange}>
        <MenuItem value="">Ninguno</MenuItem>
        <MenuItem value="stars">Número de Estrellas</MenuItem>
        <MenuItem value="Date">Fecha de Creación</MenuItem>
        <MenuItem value="language">Idioma Predominante</MenuItem>
      </Select>
    </FormControl>
  );
};

export default RepoFilter;