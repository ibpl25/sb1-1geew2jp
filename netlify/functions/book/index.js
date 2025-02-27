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
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
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

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({
        message: 'Method not allowed',
      }),
    };
  }

  try {
    if (!event.body) {
      throw new Error('Request body is required');
    }

    const { appointmentTypeId, datetime, firstName, lastName, email, phone, notes } = JSON.parse(event.body);

    console.log('Booking request data:', { appointmentTypeId, datetime, firstName, lastName, email });

    if (!appointmentTypeId || !datetime || !firstName || !lastName || !email) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          message: 'Missing required fields',
          details: { appointmentTypeId, datetime, firstName, lastName, email }
        }),
      };
    }

    // Make request to Acuity
    const response = await fetch(`${ACUITY_BASE_URL}/appointments`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        appointmentTypeID: appointmentTypeId,
        datetime,
        firstName,
        lastName,
        email,
        phone,
        notes,
      }),
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
          message: 'Invalid response from Acuity API', 
          details: responseText.substring(0, 500) // Limit the size of the response
        }),
      };
    }

    if (!response.ok) {
      console.error('Booking error response:', responseText);
      
      return {
        statusCode: response.status,
        headers,
        body: JSON.stringify({
          message: responseData?.message || 'Failed to create appointment',
          status: response.status,
          details: responseData
        }),
      };
    }

    console.log('Booking created successfully:', responseData);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(responseData),
    };
  } catch (error) {
    console.error('Error creating appointment:', error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        message: error instanceof Error ? error.message : 'Failed to create appointment',
      }),
    };
  }
};