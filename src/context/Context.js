import React, { createContext, useContext, useReducer  ,createServerContext} from "react";
import {searchReducer} from '@/context/Reducers'

const Inckd = createContext();

const Context = ({ children }) => {
  

  const [state, dispatch] = useReducer(searchReducer, {
    query: '',
  });


  // const [state, dispatch] = useReducer(searchReducer, {
  //   categoryCollection: [],
  //   categoryType:"",
  //   pageCount: 0,
  //   styleType: "",
  //   productCount: "",
  //   latitude: "",
  //   longitude: "",
  //   isLoading:false
  // });

  return <Inckd.Provider  value={{state,dispatch}}>{children}</Inckd.Provider>;
};

export default Context;

export const InckState =() =>{

return useContext(Inckd)


}



// Context.js

 // Context.js
// import React, { createContext, useContext, useReducer } from 'react';
// import { searchReducer } from '@/context/Reducers';
// import {fetchCategoryData} from '@/pages/action/action'

// const Inckd = createContext();

// export const ContextProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(searchReducer, {
//     categoryCollection: [],
//     categoryType: '',
//     pageCount: 0,
//     styleType: '',
//     productCount: '',
//     latitude: '',
//     longitude: '',
//     isLoading: false,
//   });

//   const fetchCategory = async () => {
//     const categoryData = await fetchCategoryData();
//     dispatch({ type: 'FETCHCATEGORY', payload: categoryData });
//   };


//   return (
//     <Inckd.Provider value={{ state, fetchCategory }}>
//       {children}
//     </Inckd.Provider>
//   );
// };

// export const useInckdState = () => {
//   return useContext(Inckd);
// };


