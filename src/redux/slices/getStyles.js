import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { searchParam } from "@/helpers/helper";
import { postApiCall } from "@/utils/apiUtils";

export const getStyles = createAsyncThunk("styles", async () => {
  const reponse = await fetch(`${process.env.apiDomain}/style/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sort: "alphabetical",
      page_no: 0,
      paginator_count: 100,
      search_key: "",
    }),
  });

  if (!reponse.ok) {
    const errorResponse = await reponse.json();
    throw new Error(errorResponse.message || "An error occurred.");
  }
  const jsonResponse = await reponse.json();


  return jsonResponse;
});

const styleSlice = createSlice({
  name: "styles",
     initialState: {
    styleCollection: [],
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getStyles.pending, (state, action) => {
        state.styleCollection = [];
      })
      .addCase(getStyles.fulfilled, (state, action) => {
        console.log(action.payload.rows, "c',c'sdc");

        // state.styleCollection = action.payload
        state.styleCollection = [...action.payload.rows.hits]
      })
      .addCase(getStyles.rejected, (state, action) => {
        state.styleCollection = [];
      });
  },
});
export default styleSlice.reducer;
