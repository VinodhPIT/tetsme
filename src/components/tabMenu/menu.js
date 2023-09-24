const commonTabData = [
    { id: "all", label: "All", image: '/tabAll.svg', activeImage: '/activeAll.svg' },
    { id: "tattoo", label: "Tattoo", image: '/tabTattoo.svg', activeImage: '/activeTattoo.svg' },
    { id: "flash", label: "Flash", image: '/tabFlash.svg', activeImage: '/flashActive.svg' },
];

const tabs = [...commonTabData ,{ id: "artist", label: "Artist" ,image :'/tabArtist.svg'  ,activeImage:'/activeArtist.svg'} 
];
const artistTab = [...commonTabData, { id: "Information", label: "Information", image: '/tabInfo.svg', activeImage: '/activeInfo.svg' }];

const faqTab = [   { id: "general", label: "General", image: '/tabAll.svg', activeImage: '/activeAll.svg' },
{ id: "artist", label: "Artist", image :'/tabArtist.svg'  ,activeImage:'/activeArtist.svg'},

{ id: "tattoo", label: "TattooLovers", image: '/tabTattoo.svg', activeImage: '/activeTattoo.svg' },]






export { tabs, artistTab,faqTab };

