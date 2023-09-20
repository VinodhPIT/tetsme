import React from "react";

import All from '@/components/all/index'
import Flash from '@/components/flash/index'
import Artist from '@/components/artist/index'
import Tattoo from '@/components/tattoo/index'


import ArtistAll from '@/components/artistGallery/artistAll'
import ArtistFlash from '@/components/artistGallery/artistFlash'
import ArtistInfo from '@/components/artistGallery/artistInfo'
import ArtistTattoo from '@/components/artistGallery/artistTattoo'




export   function renderCategoryComponent(tab, categoryCollection) {
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




  export   function renderArtistGallery(tab,getAll ,tattooList,flashList ,artistProfile) {
  switch (tab) {
    case "all":
      return <ArtistAll  data={getAll}  />;
    case "tattoo":
      return <ArtistTattoo data={tattooList}  />;
    case "Information":
      return <ArtistInfo data={artistProfile}   />;
    case "flash":
      return <ArtistFlash data={flashList}   />;
    default:
      return null;
  }
}
