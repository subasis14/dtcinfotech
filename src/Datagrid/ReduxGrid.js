import React from "react";
import { IconButton, MenuItem, TextField } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { useSelector, useDispatch } from "react-redux";
import { setEditingRowId, setNewRow, updateRow } from "../Slice";
import { DataGrid } from "@mui/x-data-grid";

const DataGridTable = () => {
  const rows = useSelector((state) => state.data.rows);
  const editingRowId = useSelector((state) => state.data.editingRowId);
  const newRow = useSelector((state) => state.data.newRow);
  const dispatch = useDispatch();

  const handleSave = (id) => {
    console.log(newRow);
    dispatch(updateRow({ id, updatedRow: newRow }));
  };

  const handleChange = (e, id, field) => {
    const { value } = e.target;
    if (field === "phone" && value.length > 10) {
      return;
    }
    console.log(value);
    dispatch(setNewRow({ ...newRow, [field]: value }));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "first_name",
      headerName: "First Name",
      width: 150,
      editable: true,
      renderCell: (params) => (
        <TextField
          type="text"
          variant="standard"
          value={params.row.first_name}
          onChange={(e) => {
            e.preventDefault();
            alert("22");
          }}
        />
      ),
    },

    {
      field: "last_name",
      headerName: "Last Name",
      width: 150,
      editable: true,
    },
    { field: "email", headerName: "Email", width: 200, editable: true },
    { field: "phone", headerName: "Phone", width: 150, editable: true },
    {
      field: "DOB",
      headerName: "DOB",
      width: 150,
      editable: true,
    },
    {
      field: "Gender",
      headerName: "Gender",
      width: 150,
      editable: true,
      renderCell: (params) =>
        params.row.isEditing ? (
          <TextField
            name="Gender"
            value={params.row.Gender}
            onChange={(e) => handleChange(e, params.row.id, "Gender")}
            select
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </TextField>
        ) : (
          <div>{params.value}</div>
        ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,

      renderCell: (params) =>
        params.row.isEditing ? (
          <IconButton onClick={() => handleSave(params.row.id)}>
            <SaveIcon />
          </IconButton>
        ) : (
          <IconButton onClick={() => handleSave(params.row.id)}>
            <EditIcon />
          </IconButton>
        ),
    },
  ];
  const [selectionModel, setSelectionModel] = React.useState([]);
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        getRowId={(row) => row.id}
        checkboxSelection
        disableSelectionOnClick
        onSelectionModelChange={(newSelectionModel) => {
          setSelectionModel(newSelectionModel);
        }}
        selectionModel={selectionModel}
      />
    </div>
  );
};

export default DataGridTable;
