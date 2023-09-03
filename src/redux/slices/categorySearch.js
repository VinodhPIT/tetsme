import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { searchParam } from "@/helpers/helper";
import { postApiCall } from "@/utils/apiUtils";

export const catgeorySearch = createAsyncThunk("category", async (params) => {
  const reposneCategory = await postApiCall(
    `/${params.category}/search`,
    searchParam(params)
  );

  return reposneCategory; // Return the actual data
});

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categoryCollection: [],
  },
  reducers: {






    
  },
  extraReducers: (builder) => {
    builder
      .addCase(catgeorySearch.pending, (state, action) => {
        state.categoryCollection = [];
      })
      .addCase(catgeorySearch.fulfilled, (state, action) => {
        state.categoryCollection = [
          ...state.categoryCollection,
          ...action.payload.rows.hits,
        ];
      })
      .addCase(catgeorySearch.rejected, (state, action) => {
        state.categoryCollection = [];
      });
  },
});
export default categorySlice.reducer;
