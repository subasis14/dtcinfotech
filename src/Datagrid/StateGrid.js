import React, { useEffect, useState } from "react";
import { Button, Grid, IconButton, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid } from "@mui/x-data-grid";

const StateDataGrid = () => {
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
      renderCell: (params) => (
        <IconButton onClick={() => handleDelete(params.id)}>
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  const rows = JSON.parse(localStorage.getItem("gridRows")) || [
    {
      id: 1,
      customId: "a",
      firstName: "John",
      lastName: "Doe",
      age: 35,
      email: "john.doe@example.com",
      phone: "123-456-7890",
      city: "New York",
      country: "USA",
      dob: "",
    },
    {
      id: 2,
      customId: "b",
      firstName: "Jane",
      lastName: "Smith",
      age: 28,
      email: "jane.smith@example.com",
      phone: "987-654-3210",
      city: "Los Angeles",
      country: "USA",
      dob: "",
    },
  ];

  const [gridRows, setGridRows] = useState(rows);
  const [nextId, setNextId] = useState(gridRows.length + 1);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleDelete = (id) => {
    const updatedRows = gridRows.filter((item) => item.customId !== id);
    setGridRows(updatedRows);
  };

  const handleFieldChange = (customId, field, value) => {
    const updatedRows = gridRows.map((row) => {
      if (row.customId === customId) {
        return { ...row, [field]: value };
      }
      return row;
    });
    setGridRows(updatedRows);
  };

  const handleAddRow = () => {
    const newRows = [
      ...gridRows,
      {
        id: nextId,
        customId: `new-${nextId}`,
        firstName: "",
        lastName: "",
        age: "",
        email: "",
        phone: "",
        city: "",
        country: "",
        dob: "",
      },
    ];
    setGridRows(newRows);
    setNextId(nextId + 1);
  };

  const handleMultiDelete = () => {
    const updatedRows = gridRows.filter(
      (row) => !selectedRows.includes(row.customId)
    );
    setGridRows(updatedRows);
    setSelectedRows([]);
  };

  const handleSelectionChange = (newSelection) => {
    setSelectedRows(newSelection);
  };

  useEffect(() => {
    localStorage.setItem("gridRows", JSON.stringify(gridRows));
  }, [gridRows]);

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
      </Grid>
      <DataGrid
        rows={gridRows}
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

export default StateDataGrid;
