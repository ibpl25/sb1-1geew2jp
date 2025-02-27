import fetch from 'node-fetch';

// Validate environment variables
const ACUITY_USER_ID = process.env.ACUITY_USER_ID;
const ACUITY_API_KEY = process.env.ACUITY_API_KEY;
const ACUITY_BASE_URL = "https://acuityscheduling.com/api/v1";

if (!ACUITY_USER_ID || !ACUITY_API_KEY) {
  throw new Error('Missing required Acuity environment variables');
}

const auth = Buffer.from(`${ACUITY_USER_ID}:${ACUITY_API_KEY}`).toString('base64');

// CORS headers for all responses
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
  'Content-Type': 'application/json'
};

export const handler = async (event) => {
  console.log('Acuity function called with path:', event.path);
  console.log('HTTP Method:', event.httpMethod);
  console.log('Query parameters:', event.queryStringParameters);
  
  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: corsHeaders,
      body: ''
    };
  }

  try {
    // Extract endpoint from path or query parameters
    const pathParts = event.path.split('/');
    const endpoint = pathParts[pathParts.length - 1]?.trim() || 
                    event.queryStringParameters?.endpoint || '';
    
    console.log('Processing endpoint:', endpoint);
    
    // Handle availability endpoint
    if (endpoint === 'availability' || event.path.includes('/availability')) {
      const { appointmentTypeID, date, timezone } = event.queryStringParameters || {};
      
      console.log('Availability request parameters:', { appointmentTypeID, date, timezone });
      
      if (!appointmentTypeID || !date || !timezone) {
        return {
          statusCode: 400,
          headers: corsHeaders,
          body: JSON.stringify({ 
            error: 'Missing required parameters for availability',
            details: 'appointmentTypeID, date, and timezone are required'
          })
        };
      }
      
      const params = new URLSearchParams({
        appointmentTypeID,
        date,
        timezone
      });
      
      console.log(`Requesting Acuity API: ${ACUITY_BASE_URL}/availability/times?${params}`);
      
      const response = await fetch(`${ACUITY_BASE_URL}/availability/times?${params}`, {
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        console.error('Acuity API error:', data);
        return {
          statusCode: response.status,
          headers: corsHeaders,
          body: JSON.stringify({ 
            error: 'Acuity API error', 
            details: data 
          })
        };
      }
      
      console.log('Acuity availability response:', 
        Array.isArray(data) ? `${data.length} items` : 'Non-array response');
      
      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify(data)
      };
    }
    
    // Handle appointments endpoint
    if (endpoint === 'appointments') {
      const { minDate, maxDate, email } = event.queryStringParameters || {};
      
      console.log('Appointments request parameters:', { minDate, maxDate, email });
      
      const params = new URLSearchParams();
      if (minDate) params.append('minDate', minDate);
      if (maxDate) params.append('maxDate', maxDate);
      if (email) params.append('email', email);
      
      console.log(`Requesting appointments with params: ${params.toString()}`);
      
      const response = await fetch(
        `${ACUITY_BASE_URL}/appointments${params.toString() ? '?' + params.toString() : ''}`,
        {
          headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      const data = await response.json();
      
      if (!response.ok) {
        console.error('Acuity API error:', data);
        return {
          statusCode: response.status,
          headers: corsHeaders,
          body: JSON.stringify({ 
            error: 'Acuity API error', 
            details: data 
          })
        };
      }
      
      console.log('Acuity appointments response received:', 
        Array.isArray(data) ? `${data.length} appointments` : 'Non-array response');
      
      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify(data)
      };
    }
    
    // Handle booking endpoint
    if (endpoint === 'book' && event.httpMethod === 'POST') {
      if (!event.body) {
        return {
          statusCode: 400,
          headers: corsHeaders,
          body: JSON.stringify({ error: 'Request body is required' })
        };
      }
      
      const bookingData = JSON.parse(event.body);
      console.log('Booking request data:', bookingData);
      
      const { appointmentTypeId, datetime, firstName, lastName, email, phone, notes } = bookingData;
      
      if (!appointmentTypeId || !datetime || !firstName || !lastName || !email) {
        return {
          statusCode: 400,
          headers: corsHeaders,
          body: JSON.stringify({ 
            error: 'Missing required fields for booking',
            details: { appointmentTypeId, datetime, firstName, lastName, email }
          })
        };
      }
      
      const response = await fetch(`${ACUITY_BASE_URL}/appointments`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          appointmentTypeID: appointmentTypeId,
          datetime,
          firstName,
          lastName,
          email,
          phone,
          notes
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        console.error('Booking failed:', data);
        return {
          statusCode: response.status,
          headers: corsHeaders,
          body: JSON.stringify({
            error: 'Booking failed',
            details: data
          })
        };
      }
      
      console.log('Booking successful:', data);
      
      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify(data)
      };
    }
    
    // Default response for unhandled paths
    return {
      statusCode: 404,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Endpoint not found', path: event.path })
    };
    
  } catch (error) {
    console.error('Acuity function error:', error);
    
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      })
    };
  }
};