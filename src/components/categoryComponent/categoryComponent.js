import React from "react";

import All from '@/components/all/index'
import Flash from '@/components/flash/index'
import Artist from '@/components/artist/index'
import Tattoo from '@/components/tattoo/index'



function renderCategoryComponent(tab, categoryCollection) {
  switch (tab) {
    case "all":
      return <All data={categoryCollection} />;
    case "tattoo":
      return <Tattoo data={categoryCollection}  />;
    case "artist":
      return <Artist data={categoryCollection}  />;
    case "flash":
      return <Flash data={categoryCollection} />;
    default:
      return null;
  }
}
export default renderCategoryComponent;
