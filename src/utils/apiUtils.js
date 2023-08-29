export async function postApiCall(endpoint, requestData) {
    try {
      const response = await fetch(`${process.env.apiDomain}${endpoint}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData),
        
        
        
      });
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "An error occurred.");
      }
      const jsonResponse = await response.json();
  
      return jsonResponse;

    } catch (error) {
      console.log(error,'lcmllsdmc')
      throw error;
    }
  }