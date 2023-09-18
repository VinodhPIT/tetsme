// actions.js//
import { searchParam, prepareRequest2 } from "@/helpers/helper";
import { postApiCall ,getApiCall } from "@/utils/apiUtils";

export const fetchCategoryData = async (params) => {
  try {
    const reposneCategory = await postApiCall(
      `/${params.category}/search`,
      searchParam(params)
    );


  
    return reposneCategory; // Return the actual data


    }
   catch (error) {
    console.log(error ,"Error")
   
    return [];
  }
};



export const getStyles = async () => {
  try {
    const reposneStyles = await postApiCall(
      `/style/search`,
      prepareRequest2({
        sort: "alphabetical",
        page_no: 0,
        paginator_count: 40,
        search_key: "",
      })
    );

    return reposneStyles;
  } catch (error) {
    // Handle error if needed
    return [];
  }
};





export async function fetchMultiData(param) {
try {
  const tattooFetch = await fetch(`${process.env.apiDomain}/tattoo/search`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(searchParam(param))
  });



  const flashFetch = await fetch(`${process.env.apiDomain}/flash/search`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(searchParam(param))
  });





  const artistsFetch = await fetch(`${process.env.apiDomain}/artist/search`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(searchParam(param))
  });

  const [tattooRes, flashRes, artistsRes] = await Promise.all([
    tattooFetch,
    flashFetch,
    artistsFetch,
  ]);

  const [tattoosResult, flashesResult, artistsResult] = await Promise.all([
    tattooRes.json(),
    flashRes.json(),
    artistsRes.json(),
  ]);

  const shuffledResults = [
    ...tattoosResult.rows.hits,
    ...flashesResult.rows.hits,
    ...artistsResult.rows.hits,
  ];
 
           const resultsCount =
            tattoosResult.rows.total.value +
            flashesResult.rows.total.value +
            artistsResult.rows.total.value


  return {
    data: shuffledResults,
    totalCount:resultsCount
  };
  
} catch (error) {
  console.log(error ,"Error")

}

 
}






export const fetchTattooDetail = async (params) => {
  try {
    const reponse = await getApiCall(`/tattoo/detail?tattoo_uid=${params}`);
    return reponse;
    }
   catch (error) {

    return [];
  }
};


export const fetchArtistDetail = async (slug) => {
 
  try {
    const reponse = await getApiCall(`/artist/detail/${slug}`);
    return reponse;
    }
   catch (error) {

    return [];
  }
};
