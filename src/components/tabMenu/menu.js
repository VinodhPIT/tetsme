const commonTabData = [
    { id: "all", label: "All", image: '/all.svg', activeImage: '/all-active.svg' },
    { id: "tattoo", label: "Tattoo", image: '/flame-new.svg', activeImage: '/Flame-active.svg' },
    { id: "flash", label: "Flash", image: '/bolt-new.svg', activeImage: '/bolt-active.svg' },
];

const tabs = [...commonTabData ,{ id: "artist", label: "Artist" ,image :'/colour-palette-new.svg'  ,activeImage:'/colour-palette-active.svg'} 
];
const artistTab = [...commonTabData, { id: "Information", label: "Information", image: '/Info-circle.svg', activeImage: '/Info-circle-active.svg' }];

const faqTab = [   { id: "general", label: "General", image: '/all.svg', activeImage: '/all-active.svg' },
{ id: "artist", label: "Artist", image :'/colour-palette-new.svg'  ,activeImage:'/colour-palette-active.svg'},

{ id: "tattoo", label: "TattooLovers", image: '/flame-new.svg', activeImage: '/Flame-active.svg' },]






export { tabs, artistTab,faqTab };

