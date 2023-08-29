import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '@/redux/features/counterSlice'
import  categoryReucer from '@/redux/features/categorySearch'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    cat:categoryReucer
  },
})