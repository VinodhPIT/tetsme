

import React from "react";


const Tattoo = React.lazy(() => import("@/components/tattoo/index"));
const Artist = React.lazy(() => import("@/components/artist/index"));
const Flash = React.lazy(() => import("@/components/flash/index"));
const All = React.lazy(() => import("@/components/all/page"));



function renderCategoryComponent(tab ,categoryCollection ,loading) {
    switch (tab) {
      case "all":
        return (
          <React.Suspense
            fallback={<div style={{ color: "red" }}>Loading Tattoo...</div>}
          >
            <All data={categoryCollection} loading={loading}  />
          </React.Suspense>
        );

      case "tattoo":
        return (
          <React.Suspense
            fallback={<div style={{ color: "red" }}>Loading Tattoo...</div>}
          >
            <Tattoo data={categoryCollection} loading={loading} />
          </React.Suspense>
        );
      case "artist":
        return (
          <React.Suspense fallback={<div>Loading Artist...</div>}>
            <Artist data={categoryCollection}  loading={loading} />
          </React.Suspense>
        );
      case "flash":
        return (
          <React.Suspense
            fallback={
              <div style={{ color: "red", fontSize: "12px" }}>
                Loading Flash...
              </div>
            }
          >
            <Flash data={categoryCollection} loading={loading} />
          </React.Suspense>
        );
      default:
        return null;
    }
  }
  export default renderCategoryComponent;