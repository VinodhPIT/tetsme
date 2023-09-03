export const prepareRequest = () => {
  const request = {
    sort: "newest",
    page_no: "0",
    paginator_count: 30,
    search_key: "",
  };

  // if (parameters.location && parameters.category == 'artists') {
  //   request.longitude = parameters.location.lon || parameters.location.lon
  //   request.latitude = parameters.location.lat || parameters.location.lat
  // }

  // request.style = parameters.style ? [parameters.style] : []

  return request;
};

export const prepareRequest1 = (parameters) => {
  const request = {
    sort: "newest",
    page_no: parameters.page || "0",
    paginator_count: parameters.category === "all" ? 10 : 32,
    search_key: parameters.term,
  };

  if (parameters.location && parameters.category == "artists") {
    request.longitude = parameters.location.lon || parameters.location.lon;
    request.latitude = parameters.location.lat || parameters.location.lat;
  }

  request.style = parameters.style ? [parameters.style] : [];

  return request;
};

export const prepareRequest2 = (parameters) => {
  const request = {
    sort: parameters.sort,
    page_no: "0",
    paginator_count: parameters.paginator_count,
    search_key: "",
  };

  // if (parameters.location && parameters.category == 'artists') {
  //   request.longitude = parameters.location.lon || parameters.location.lon
  //   request.latitude = parameters.location.lat || parameters.location.lat
  // }

  // request.style = parameters.style ? [parameters.style] : []

  return request;
};

export const searchParam = (parameters) => {
  

  const request = {
    sort: "newest",
    page_no: parameters.page_no,
    paginator_count: parameters.category === "all" ? 10 : 25,
    search_key: parameters.search_key,
  };

  if (parameters.latitude && parameters.category == 'artist') {
    request.longitude = parameters.longitude
    request.latitude = parameters.latitude
  }
  request.style = parameters.style ? [parameters.style] : [];

  
  return request;
};





export const addAdsToResults = async (results) => {
  if (results.length < 15) {
    return results;
  }
  const adsCount = Math.floor(results.length / 15) - 1;
  for (let i = 0; i <= adsCount; i++) {
    const randomizedIndex = Math.floor(Math.random() * 15);
    results.splice((i + 1) * 15 - randomizedIndex, 0, { _index: "ad" });
  }
  return results;
};
