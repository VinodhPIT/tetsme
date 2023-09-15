const Parameters = {
   sort: "newest",
   page_no: 0,
   paginator_count: 32,
   search_key: " ",
   style:  "",
   latitude:"",
   longitude:"",
   category:"", 
   call:false
};

export { Parameters }; // Named export




const tabs = [
    { id: "all", label: "All" ,image :'./tabAll.svg'  ,activeImage:'./tabAll.svg'},
    { id: "tattoo", label: "Tattoo" , image :'./tabTattoo.svg'  ,activeImage:'./activeTattoo.svg'},
    { id: "flash", label: "Flash" ,image :'./tabFlash.svg'  ,activeImage:'./flashActive.svg'} ,
    { id: "artist", label: "Artist" ,image :'./tabArtist.svg'  ,activeImage:'./activeArtist.svg'} 
];

export { tabs }; // Named export