// Import necessary modules (optional, depending on your setup)

export async function GET(request) {
  return new Response(JSON.stringify({ operation_code: 1 }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST(request) {
  try {
    const { data } = await request.json();

    // Input validation: Ensure 'data' is an array
    if (!Array.isArray(data)) {
      throw new Error("Invalid input: 'data' should be an array");
    }

    // Separate numbers and alphabets
    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item));

    // Find the highest lowercase alphabet
    const lowercaseAlphabets = alphabets.filter(item => item === item.toLowerCase());
    const highestLowercase = lowercaseAlphabets.length > 0 
      ? [lowercaseAlphabets.sort().reverse()[0]]
      : [];

    // Define the response payload
    const responsePayload = {
      is_success: true,
      user_id: "john_doe_17091999", // Replace with dynamic user_id if needed
      email: "john@xyz.com",        // Replace with dynamic email if needed
      roll_number: "ABCD123",       // Replace with dynamic roll number if needed
      numbers: numbers,
      alphabets: alphabets,
      highest_lowercase_alphabet: highestLowercase,
    };

    return new Response(JSON.stringify(responsePayload), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    // Handle exceptions and return error response
    return new Response(JSON.stringify({ is_success: false, error: error.message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
