import fetch from 'node-fetch';

// Validate environment variables
const ACUITY_USER_ID = process.env.ACUITY_USER_ID;
const ACUITY_API_KEY = process.env.ACUITY_API_KEY;
const ACUITY_BASE_URL = 'https://acuityscheduling.com/api/v1';

if (!ACUITY_USER_ID || !ACUITY_API_KEY) {
  throw new Error('Missing required Acuity environment variables');
}

const auth = Buffer.from(`${ACUITY_USER_ID}:${ACUITY_API_KEY}`).toString('base64');

export const handler = async (event) => {
  // Universal CORS Headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json',
  };

  // Handle CORS Preflight Requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers,
      body: '',
    };
  }

  try {
    // Get query parameters from the URL
    const { appointmentTypeID, date, timezone } = event.queryStringParameters || {};
    
    console.log('Received Request with params:', { 
      appointmentTypeID, 
      date, 
      timezone,
      path: event.path,
      queryParams: event.queryStringParameters
    });

    if (!appointmentTypeID || !date || !timezone) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: 'Missing required parameters',
          details: 'appointmentTypeID, date, and timezone are required',
          receivedPath: event.path,
          receivedQuery: event.queryStringParameters
        }),
      };
    }

    // Build query string for Acuity API
    const params = new URLSearchParams({
      appointmentTypeID,
      date,
      timezone,
    });

    console.log(`Requesting Acuity API: ${ACUITY_BASE_URL}/availability/times?${params.toString()}`);

    // Make request to Acuity API
    const response = await fetch(`${ACUITY_BASE_URL}/availability/times?${params.toString()}`, {
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
    });

    const responseText = await response.text();
    let responseData;
    
    try {
      responseData = JSON.parse(responseText);
    } catch (e) {
      console.error('Failed to parse Acuity response as JSON:', responseText);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'Invalid response from Acuity API', 
          details: responseText.substring(0, 500) // Limit the size of the response
        }),
      };
    }

    if (!response.ok) {
      console.error('Acuity API Error:', responseText);
      return {
        statusCode: response.status,
        headers,
        body: JSON.stringify({ 
          error: 'Acuity API error', 
          details: responseData || responseText 
        }),
      };
    }

    console.log('Acuity Availability Response:', 
      Array.isArray(responseData) ? `${responseData.length} items` : 'Non-array response');

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(responseData),
    };
  } catch (error) {
    console.error('Error Fetching Availability:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Failed to fetch availability', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      }),
    };
  }
};