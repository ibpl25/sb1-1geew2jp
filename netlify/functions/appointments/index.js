import fetch from 'node-fetch';

const ACUITY_USER_ID = process.env.ACUITY_USER_ID;
const ACUITY_API_KEY = process.env.ACUITY_API_KEY;
const ACUITY_BASE_URL = 'https://acuityscheduling.com/api/v1';

if (!ACUITY_USER_ID || !ACUITY_API_KEY) {
  throw new Error('Missing required Acuity environment variables');
}

const auth = Buffer.from(`${ACUITY_USER_ID}:${ACUITY_API_KEY}`).toString('base64');

export const handler = async (event) => {
  // Add CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers,
      body: '',
    };
  }

  try {
    // Get query parameters
    const { minDate, maxDate, email } = event.queryStringParameters || {};

    console.log('Appointments request parameters:', { minDate, maxDate, email });

    // Build query string
    const params = new URLSearchParams();
    if (minDate) params.append('minDate', minDate);
    if (maxDate) params.append('maxDate', maxDate);
    if (email) params.append('email', email);

    console.log(`Requesting Acuity API: ${ACUITY_BASE_URL}/appointments${params.toString() ? '?' + params.toString() : ''}`);

    // Make request to Acuity
    const response = await fetch(
      `${ACUITY_BASE_URL}/appointments${params.toString() ? '?' + params.toString() : ''}`,
      {
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/json',
        },
      }
    );

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
          message: 'Invalid response from Acuity API', 
          details: responseText.substring(0, 500) // Limit the size of the response
        }),
      };
    }

    if (!response.ok) {
      console.error('Acuity API error:', responseText);
      
      return {
        statusCode: response.status,
        headers,
        body: JSON.stringify({
          message: responseData?.message || 'Failed to fetch appointments',
          status: response.status,
          details: responseData
        }),
      };
    }

    console.log('Acuity appointments response received:', 
      Array.isArray(responseData) ? `${responseData.length} appointments` : 'Non-array response');

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(responseData),
    };
  } catch (error) {
    console.error('Error fetching appointments:', error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        message: error instanceof Error ? error.message : 'Failed to fetch appointments',
      }),
    };
  }
};