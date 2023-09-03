import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import category from "@/redux/slices/categorySearch";
import styles from "@/redux/slices/getStyles";

const combinedReducer = combineReducers({
  category,
  styles,
});

const masterReducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state

      category: {
        categoryCollection: action.payload.category.categoryCollection,
      },
      styles: {
        getStyles: action.payload.styles.styleCollection,
      },
    };
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

export const makeStore = () =>
  configureStore({
    reducer: masterReducer,
  });

export const wrapper = createWrapper(makeStore, { debug: true });
