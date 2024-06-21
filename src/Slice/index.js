import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rows: [
    {
      id: 1,
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      DOB: "",
      Gender: "",
    },
  ],
  editingRowId: null,
  newRow: {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    DOB: "",
    Gender: "",
  },
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setEditingRowId(state, action) {
      state.editingRowId = action.payload;
    },
    setNewRow(state, action) {
      state.newRow = action.payload;
    },
    updateRow(state, action) {
      const { id, updatedRow } = action.payload;
      state.rows = state.rows.map((row) =>
        row.id === id ? { ...row, ...updatedRow } : row
      );
      state.editingRowId = null;
    },
  },
});

export const { setEditingRowId, setNewRow, updateRow } = dataSlice.actions;

export default dataSlice.reducer;
