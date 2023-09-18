const commonTabData = [
    { id: "all", label: "All", image: './tabAll.svg', activeImage: './tabAll.svg' },
    { id: "tattoo", label: "Tattoo", image: './tabTattoo.svg', activeImage: './activeTattoo.svg' },
    { id: "flash", label: "Flash", image: './tabFlash.svg', activeImage: './flashActive.svg' },
];

const tabs = [...commonTabData ,{ id: "artist", label: "Artist" ,image :'./tabArtist.svg'  ,activeImage:'./activeArtist.svg'} 
];
const artistTab = [...commonTabData, { id: "Information", label: "Info", image: './tabInfo.svg', activeImage: './activeArtist.svg' }];

export { tabs, artistTab };

