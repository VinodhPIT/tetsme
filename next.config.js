

/** @type {import('next').NextConfig} */
const nextConfig = {
  
  images: {
      domains:['storage.googleapis.com'],
    },
   env: {
    
     //apiDomain: 'https://apiadmin.inckd.com/web/api',
     apiDomain: 'https://admin.inckd.com/web/api',
    googlePlacesApiKey: 'AIzaSyDo8sjdevbkqLGUx_DFpFlYlQFb1FpRAIo',

      
    },
    

  
    // experimental: {
    //   serverActions: true,
    // },
    
}
module.exports = nextConfig
