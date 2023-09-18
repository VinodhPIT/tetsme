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
    throw error;
  }
}




export async function getApiCall(endpoint) {
  try {
    const response = await fetch(`${process.env.apiDomain}${endpoint}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      },
    });
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || "An error occurred.");
    }
    const jsonResponse = await response.json();
    return jsonResponse;

  } catch (error) {
    console.log(error,'Error')
    throw error;
  }
}