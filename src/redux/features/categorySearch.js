import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { searchParam } from "@/helpers/helper";
import { postApiCall } from "@/utils/apiUtils"
//  import { addAdsToResults } from "../../helpers/helper";
// import {createWrapper, HYDRATE} from 'next-redux-wrapper';

export const catgeorySearch = createAsyncThunk("category", async (category) => {
  console.log(category, "get Category");

  const reposneCategory = await postApiCall(
    `/${category}/search`,
    searchParam({
      sort: "newest",
      page_no: 0,
      paginator_count: 32,
      search_key: "",
    })
  );

  return reposneCategory; // Return the actual data
});

const getcategory = createSlice({
  name: "category",
  initialState: {
    categoryCollection: [],
    addAds: [],
    loading: false,
    tattoo: [],
    hi:'cdcviodh'
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(catgeorySearch.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(catgeorySearch.fulfilled, (state, action) => {
        state.loading = false;
        // console.log(action.payload.rows.total.value,"Total Value")

        // console.log(action.payload.rows.page_no,"Page Number")

        console.log(action.payload,",ccdcdccdl;c,")

        state.categoryCollection = action.payload.rows.hits;
      })
      .addCase(catgeorySearch.rejected, (state, action) => {
        console.log(catgeorySearch.rejected, "faileddaaavino,");
        state.loading = false;
        state.categoryCollection = [];
      });
  },
});

export default getcategory.reducer;
