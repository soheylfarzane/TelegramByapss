async function handleRequest(request) {
	const url = new URL(request.url);
  
	// Change the hostname to 'api.telegram.org'
	url.hostname = 'api.telegram.org';
  
	// Create a new request with the modified URL
	const newRequest = new Request(url.toString(), request);
  
	// Fetch and return the response from the new URL
	try {
	  const response = await fetch(newRequest);
	  return response;
	} catch (error) {
	  // Handle errors, if any
	  return new Response('Internal Server Error', {
		status: 500,
		headers: {
		  'content-type': 'text/plain',
		},
	  });
	}
  }
  
  addEventListener('fetch', (event) => {
	event.respondWith(handleRequest(event.request));
  });
