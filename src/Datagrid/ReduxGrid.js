import React, { useEffect } from "react";
import { IconButton, TextField, Grid, Button } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import {
  setSelectedRows,
  setSearchText,
  addRow,
  deleteRow,
  updateRow,
  deleteSelectedRows,
} from "../Slice";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "../hooks/useDebounce";

const DataGridTable = () => {
  const columns = [
    { field: "id", headerName: "ID", width: 100, editable: true },
    {
      field: "firstName",
      headerName: "First Name",
      width: 150,

      renderCell: (params) => (
        <TextField
          type="text"
          variant="filled"
          value={params.row.firstName}
          onChange={(e) => {
            let regex = /^[a-zA-Z\s]*$/;
            if (regex.test(e.target.value)) {
              handleFieldChange(params.id, "firstName", e.target.value);
            } else {
              e.target.value = "";
            }
          }}
        />
      ),
    },
    {
      field: "lastName",
      headerName: "Last Name",
      width: 150,
      renderCell: (params) => (
        <TextField
          type="text"
          variant="filled"
          value={params.row.lastName}
          onChange={(e) => {
            let regex = /^[a-zA-Z\s]*$/;
            if (regex.test(e.target.value)) {
              handleFieldChange(params.id, "lastName", e.target.value);
            } else {
              e.target.value = "";
            }
          }}
        />
      ),
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 100,
      renderCell: (params) => (
        <TextField
          type="number"
          variant="filled"
          value={params.row.age}
          onChange={(e) => {
            if (e.target.value >= 0 || e.target.value === "") {
              handleFieldChange(params.id, "age", e.target.value);
            } else {
              e.target.value = "";
            }
          }}
        />
      ),
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      renderCell: (params) => (
        <TextField
          type="email"
          variant="filled"
          value={params.row.email}
          onChange={(e) => {
            handleFieldChange(params.id, "email", e.target.value);
          }}
        />
      ),
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 150,
      renderCell: (params) => (
        <TextField
          type="number"
          variant="filled"
          value={params.row.phone}
          onChange={(e) => {
            let phoneValue = e.target.value;
            if (phoneValue >= 0) {
              if (phoneValue.toString().length <= 10) {
                handleFieldChange(params.id, "phone", e.target.value);
              } else {
                e.target.value = "";
              }
            } else {
              e.target.value = "";
            }
          }}
        />
      ),
    },
    {
      field: "city",
      headerName: "City",
      width: 150,
      sortable: false,
      resizable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <TextField
          type="text"
          variant="filled"
          value={params.row.city}
          onChange={(e) => {
            handleFieldChange(params.id, "city", e.target.value);
          }}
        />
      ),
    },
    {
      field: "country",
      headerName: "Country",
      width: 150,
      sortable: false,
      resizable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <TextField
          type="text"
          variant="filled"
          value={params.row.country}
          onChange={(e) => {
            handleFieldChange(params.id, "country", e.target.value);
          }}
        />
      ),
    },
    {
      field: "dob",
      headerName: "Date Of Birth",
      width: 150,
      renderCell: (params) => (
        <TextField
          type="date"
          variant="filled"
          defaultValue={params.row.name}
          onChange={(e) => {
            handleFieldChange(params.id, "dob", e.target.value);
          }}
        />
      ),
    },
    {
      field: "actions",
      headerName: "Action",
      width: 150,
      sortable: false,
      resizable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <IconButton onClick={() => handleDelete(params.id)}>
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  const dispatch = useDispatch();
  const gridRows = useSelector((state) => state.grid.rows);
  const nextId = useSelector((state) => state.grid.nextId);
  const selectedRows = useSelector((state) => state.grid.selectedRows);
  const searchText = useSelector((state) => state.grid.searchText);
  const debounceText = useDebounce(searchText, 300);

  useEffect(() => {
    localStorage.setItem("gridRows", JSON.stringify(gridRows));
  }, [gridRows]);

  const handleDelete = (customId) => {
    dispatch(deleteRow(customId));
  };

  const handleFieldChange = (customId, field, value) => {
    dispatch(updateRow({ customId, field, value }));
  };

  const handleAddRow = () => {
    dispatch(addRow());
  };

  const handleMultiDelete = () => {
    dispatch(deleteSelectedRows());
  };

  const handleSelectionChange = (newSelection) => {
    dispatch(setSelectedRows(newSelection));
  };

  const handleSearchTextChange = (e) => {
    dispatch(setSearchText(e.target.value));
  };

  const filterRows = () => {
    return gridRows.filter((row) =>
      Object.values(row).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(debounceText.toLowerCase())
      )
    );
  };
  return (
    <div style={{ height: 400, width: "100%" }}>
      <Grid container alignItems="center" spacing={2}>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAddRow}
          >
            Add Row
          </Button>
        </Grid>
        <Grid item>
          <IconButton
            disabled={selectedRows.length === 0}
            onClick={handleMultiDelete}
          >
            <DeleteIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            value={searchText}
            onChange={handleSearchTextChange}
          />
        </Grid>
      </Grid>
      <DataGrid
        rows={filterRows()}
        columns={columns}
        getRowId={(row) => row.customId}
        pageSize={5}
        checkboxSelection
        disableSelectionOnClick
        selectionModel={selectedRows}
        onRowSelectionModelChange={(GridRowSelectedParams) => {
          handleSelectionChange(GridRowSelectedParams);
        }}
      />
    </div>
  );
};

export default DataGridTable;
