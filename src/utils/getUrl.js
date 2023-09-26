export const getUrl = (term, catgy, style, lat, lon, router) => {
  let url = `/search?term=${term}&category=${catgy}`;

  if (style !== "") {
    url += `&style=${style}`;
  }

  if (catgy == "artist" && lat !== "") {
    url += `&lon=${lon}&lat=${lat}`;
  }

  return router.push(url);
};
