import {searchParam} from '@/helpers/helper'
import { useRouter } from 'next/router'



// export const searchReducer = async (state, action) => {
//     switch (action.type) {
//     case "FETCHCATEGORY" :
//       await fetch(`${process.env.apiDomain}/tattoo/search`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//          body: JSON.stringify(searchParam({
//             sort: "newest",
//             page_no: 0,
//             paginator_count: 32,
//             search_key: "",
//           })),
//       }) .then((res) => res.json())
//       .then((e)=>{

// console.log(e,"dcl;mldc;slc;s")


//         return {...state ,categoryCollection:[e.rows.hits]}
//       })
//       default:
//         return state;
//     }
//   };
   export const searchReducer = (state, action) => {
    switch (action.type) {
      case "ADD_TO_CART":

       console.log(action.payload,"dcmsdmcl;sml;c")

        // router.push(`/search?term=${''}&category=${action.payload }`)

        return { ...state, query: action.payload };
    
      default:
        return state;
    }
  };