// Enhanced API service for Gemini API calls with improved response handling

export const callGeminiAPI = async (prompt, apiKey) => {
  const api = apiKey || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

  if (!api) {
    throw new Error('API key not found. Please check your environment variables or enter a key.');
  }

  // Debugging: Log key presence (don't log the full key for security)
  console.log('Calling Gemini API with key present:', !!api);

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemma-3n-e2b-it:generateContent?key=${api}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: prompt
        }]
      }],
      generationConfig: {
        temperature: 0.2,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
      }
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`API call failed: ${response.status} - ${errorData.error?.message || response.statusText}`);
  }

  const data = await response.json();

  if (!data.candidates || data.candidates.length === 0) {
    throw new Error('No response generated from Gemini API.');
  }

  return data.candidates[0].content.parts[0].text;
};
export const searchSchemesAPI = async (formData, apiKey) => {
  // Create a more detailed prompt with specific instructions for better formatting
  const prompt = `Find Indian government schemes based on these criteria:
  - Category: ${formData.category || 'Any'}
  - State: ${formData.state || 'Any'}
  - Beneficiary Type: ${formData.beneficiaryType || 'Any'}
  - Level: ${formData.level || 'Any'}
  - Age Group: ${formData.ageGroup || 'Any'}
  - Income Range: ${formData.incomeRange || 'Any'}
  
  Please provide 6-8 relevant government schemes in JSON format with the following structure:
  [
    {
      "name": "Scheme Name",
      "description": "Brief description (2-3 lines)",
      "category": "Category",
      "level": "National/State/etc",
      "beneficiary": "Target beneficiary",
      "launchYear": "Year",
      "ministry": "Responsible Ministry",
      "eligibility": "Key eligibility criteria",
      "benefits": "Main benefits offered",
      "iconType": "agriculture|education|health|women|social|employment|housing|rural|financial|digital|environment|business",
      "color": "blue|green|purple|orange|teal|red|amber|indigo"
    }
  ]
  
  For iconType, choose the most appropriate category from the options.
  For color, assign a color that matches the scheme's category.
  Only return valid JSON, no additional text.`;

  try {
    const response = await callGeminiAPI(prompt, apiKey);

    if (!response) {
      throw new Error('API returned empty response');
    }

    // Clean the response to extract JSON
    const jsonMatch = response.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      const schemes = JSON.parse(jsonMatch[0]);

      // Add default values for any missing fields
      return schemes.map(scheme => ({
        iconType: 'social',
        color: 'blue',
        ...scheme
      }));
    } else {
      throw new Error('Invalid response format');
    }
  } catch (error) {
    console.error('Search schemes error:', error);
    throw error;
  }
};

export const getSchemeDetailsAPI = async (scheme, apiKey) => {
  const prompt = `Provide detailed information about the Indian government scheme "${scheme.name}" in a well-structured format.

  Please organize your response into the following distinct sections, each with its own clear heading:
  
  ## Key Takeaways
  - Provide 4-5 bullet points summarizing the most important aspects of the scheme
  - Focus on eligibility, benefits, and application process
  - Highlight any recent changes or updates
  
  ## Overview
  Provide a comprehensive overview of the scheme including its purpose, objectives, and background.
  
  ## Eligibility Criteria
  - List all eligibility requirements in bullet points
  - Include income limits, age restrictions, geographical coverage
  - Mention any special categories or exceptions
  - Include any documentation needed to prove eligibility
  
  ## Benefits and Coverage
  - Detail all financial and non-financial benefits
  - Include subsidy amounts, loan details, or other assistance provided
  - Explain coverage periods and renewal processes
  - Mention any limitations or caps on benefits
  
  ## Application Process
  - Provide a step-by-step guide to applying for the scheme
  - Include online and offline application methods
  - Mention verification processes and timelines
  - Include links to application portals if available
  
  ## Required Documents
  - List all documents needed for application in bullet points
  - Specify any special formats or attestation requirements
  - Include information about where to obtain these documents
  
  ## Timeline and Deadlines
  - Provide key dates and deadlines
  - Include application windows and processing times
  - Mention any seasonal or periodic aspects of the scheme
  
  ## Budget and Financial Details
  - Include information about the scheme's budget allocation
  - Mention any recent financial changes or updates
  
  ## Success Stories and Impact
  - Share statistics about the scheme's reach and impact
  - Include any notable success stories or case studies
  
  ## Contact Information
  - Provide official website links
  - Include helpline numbers and email addresses
  - Mention physical offices or centers where applicable
  
  Format your response using proper markdown with ## for main sections and ### for subsections.
  Use bullet points (- ) for lists.
  Highlight important information with **bold text**.
  Keep the information factual, concise, and well-organized for easy navigation.`;

  try {
    const response = await callGeminiAPI(prompt, apiKey);
    return response;
  } catch (error) {
    console.error('Get scheme details error:', error);
    throw error;
  }
};