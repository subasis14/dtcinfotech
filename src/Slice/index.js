// gridSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rows: JSON.parse(localStorage.getItem("gridRows")) || [
    {
      id: 1,
      customId: "a",
      firstName: "Subasish",
      lastName: "Chakraborty",
      age: 35,
      email: "subasish.chakraborty@gmail.com",
      phone: "8088156985",
      city: "Agartala",
      country: "India",
      dob: "23/01/1991",
    },
    {
      id: 2,
      customId: "b",
      firstName: "Nabarun",
      lastName: "Singh",
      age: 28,
      email: "nabarun.singh@gmail.com",
      phone: "7676542747",
      city: "Kolkata",
      country: "India",
      dob: "05/07/1998",
    },
  ],
  nextId: 3,
  selectedRows: [],
  searchText: "",
};

export const gridSlice = createSlice({
  name: "grid",
  initialState,
  reducers: {
    setRows: (state, action) => {
      state.rows = action.payload;
    },
    setNextId: (state, action) => {
      state.nextId = action.payload;
    },
    setSelectedRows: (state, action) => {
      state.selectedRows = action.payload;
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    addRow: (state) => {
      const newRows = [
        ...state.rows,
        {
          id: state.nextId,
          customId: `new-${state.nextId}`,
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
      state.rows = newRows;
      state.nextId += 1;
    },
    deleteRow: (state, action) => {
      state.rows = state.rows.filter(
        (item) => item.customId !== action.payload
      );
    },
    updateRow: (state, action) => {
      const { customId, field, value } = action.payload;
      state.rows = state.rows.map((row) =>
        row.customId === customId ? { ...row, [field]: value } : row
      );
    },
    deleteSelectedRows: (state) => {
      state.rows = state.rows.filter(
        (row) => !state.selectedRows.includes(row.customId)
      );
      state.selectedRows = [];
    },
  },
});

export const {
  setRows,
  setNextId,
  setSelectedRows,
  setSearchText,
  addRow,
  deleteRow,
  updateRow,
  deleteSelectedRows,
} = gridSlice.actions;

export default gridSlice.reducer;
