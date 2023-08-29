export async function getServerSideProps(context) {
    if (context.query.category === "all") {
      
      try {
     
        const tattooFetch = fetch(`${process.env.apiDomain}/tattoo/search`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(prepareRequest(context.parameters)),
        })
  
  
  
  
        const flashFetch = fetch(`${process.env.apiDomain}/flash/search`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(prepareRequest(context.parameters)),
        })
        const artistsFetch = fetch(`${process.env.apiDomain}/artist/search`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(prepareRequest(context.parameters)),
        })
      
  
  
        Promise.all([tattooFetch, flashFetch, artistsFetch])
          .then((res) => Promise.allSettled(res.map((el) => el.json())))
          .then((data) => {
             console.log(data ,"haiiilmlc;mcl;" )
            // @ts-ignore TO-DO fix types
            const tattoosResult = data[0].value
            // @ts-ignore
  
            const flashesResult = data[1].value
            // @ts-ignore
  
            const artistsResult = data[2].value
  
  
  
            const shuffledResults = [
              ...tattoosResult.rows.hits,
              ...flashesResult.rows.hits,
              ...artistsResult.rows.hits,
            ]
         
            const results = {
              data:
                shuffledResults
                 
            }
            console.log(results,"dknckdc")
  
            return {
              props: {
                data: results,
                initialTab: context.query.category,
              },
            };
  
          })
  
         
     
      } 
      
      
      
      
      catch (error) {
        return {
          props: {
            data: null,
          },
        };
      }
    } 

  }
  