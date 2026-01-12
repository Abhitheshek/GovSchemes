"use client"

export const callGeminiAPI = async (prompt) => {
  const api = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

  if (!api) {
    throw new Error('API key not found. Please check your environment variables.');
  }

  try {
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
      throw new Error(`API call failed: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();

    if (!data.candidates || data.candidates.length === 0) {
      throw new Error('No response generated. Please try again.');
    }

    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Gemini API Error:', error);
    return null;
  }
};

export const getSchemePrompts = {
  state: `Generate 6 real Indian state government schemes in JSON format. Include actual schemes like Rythu Bandhu, Kalia Yojana, etc.
  Format the response as a valid JSON array with the following structure:
  [
    {
      "name": "Scheme Name",
      "state": "State Name",
      "description": "Brief description (25-30 words)",
      "beneficiaries": "Target group",
      "budget": "Budget allocation with ₹ symbol",
      "launchYear": "Year",
      "status": "Active/Proposed/Under Review",
      "category": "Agriculture/Healthcare/Education/Employment/Housing",
      "bannerImage": "URL to scheme banner image",
      "highlights": [
        {
          "icon": "award/target/users/chart",
          "title": "Key Highlight",
          "value": "Statistical value"
        }
      ]
    }
  ]
  Ensure the JSON is properly formatted with no trailing commas and valid syntax.`,

  national: `Generate 6 real Indian central government schemes in JSON format. Include actual schemes like PM-KISAN, Ayushman Bharat, etc.
  Format the response as a valid JSON array with the following structure:
  [
    {
      "name": "Scheme Name",
      "ministry": "Ministry Name",
      "description": "Brief description (25-30 words)",
      "beneficiaries": "Target group",
      "budget": "Budget allocation with ₹ symbol",
      "launchYear": "Year",
      "status": "Active/Proposed/Under Review",
      "category": "Agriculture/Healthcare/Education/Employment/Housing",
      "bannerImage": "URL to scheme banner image",
      "highlights": [
        {
          "icon": "award/target/users/chart",
          "title": "Key Highlight",
          "value": "Statistical value"
        }
      ]
    }
  ]
  Ensure the JSON is properly formatted with no trailing commas and valid syntax.`,

  scholarship: `Generate 6 real Indian scholarship programs in JSON format. Include actual scholarships like INSPIRE, Merit-cum-Means, etc.
  Format the response as a valid JSON array with the following structure:
  [
    {
      "name": "Scholarship Name",
      "provider": "Organization",
      "description": "Brief description (25-30 words)",
      "eligibility": "Eligibility criteria",
      "amount": "Scholarship amount with ₹ symbol",
      "deadline": "Application deadline",
      "status": "Active/Proposed/Under Review",
      "category": "Merit/Need-based/Research/Sports/Cultural",
      "bannerImage": "URL to scheme banner image",
      "highlights": [
        {
          "icon": "award/target/users/chart",
          "title": "Key Highlight",
          "value": "Statistical value"
        }
      ]
    }
  ]
  Ensure the JSON is properly formatted with no trailing commas and valid syntax.`,

  financial: `Generate 6 real Indian financial aid schemes in JSON format. Include actual schemes like PMMY, Stand-Up India, etc.
  Format the response as a valid JSON array with the following structure:
  [
    {
      "name": "Scheme Name",
      "type": "Loan/Grant/Subsidy",
      "description": "Brief description (25-30 words)",
      "target": "Target group",
      "maxAmount": "Maximum amount with ₹ symbol",
      "provider": "Implementing agency",
      "status": "Active/Proposed/Under Review",
      "category": "Business/Education/Housing/Agriculture",
      "bannerImage": "URL to scheme banner image",
      "interestRate": "Interest rate if applicable",
      "repaymentPeriod": "Repayment period if applicable",
      "highlights": [
        {
          "icon": "award/target/users/chart",
          "title": "Key Highlight",
          "value": "Statistical value"
        }
      ]
    }
  ]
  Ensure the JSON is properly formatted with no trailing commas and valid syntax.`
};

export const getSchemeDetailsPrompt = (schemeName) => `Generate details for "${schemeName}" scheme in valid JSON format.

Return ONLY a JSON object with this exact structure (no extra text):
{
  "overview": {
    "description": "Detailed overview (100-150 words)",
    "highlights": [
      {"title": "Key Point 1", "value": "Value 1"},
      {"title": "Key Point 2", "value": "Value 2"}
    ]
  },
  "objectives": [
    {"title": "Main Objective", "description": "Description"}
  ],
  "eligibility": {
    "criteria": [
      {"title": "Eligibility 1", "description": "Details"}
    ],
    "requiredDocuments": [
      {"name": "Document 1", "description": "Purpose"}
    ]
  },
  "benefits": [
    {"title": "Benefit 1", "description": "Details", "value": "Amount"}
  ],
  "process": {
    "applicationSteps": [
      {"step": 1, "title": "Step 1", "description": "Details"}
    ],
    "timeline": {
      "applicationStart": "Date",
      "applicationEnd": "Date",
      "processingTime": "Duration"
    }
  },
  "statistics": {
    "overview": {
      "totalBeneficiaries": "2.5 Cr",
      "totalDisbursement": "₹50,000 Cr",
      "successRate": "85%"
    },
    "yearlyData": [
      {
        "year": "2023",
        "beneficiaries": "2.2 Cr",
        "disbursement": "₹45,000 Cr",
        "growth": "12%"
      }
    ],
    "stateWiseData": [
      {
        "state": "Maharashtra",
        "beneficiaries": "25 Lakh",
        "disbursement": "₹5,000 Cr",
        "implementation": "90%"
      }
    ]
  },
  "resources": {
    "guidelines": [
      {
        "title": "Scheme Guidelines PDF",
        "description": "Complete scheme guidelines",
        "url": "https://example.gov.in/guidelines.pdf",
        "format": "PDF",
        "size": "2.5 MB"
      }
    ],
    "faqs": [
      {
        "question": "How to apply?",
        "answer": "Visit the official portal and fill the application form",
        "category": "Application"
      }
    ],
    "successStories": [
      {
        "title": "Success Story 1",
        "description": "Brief success story",
        "location": "State/District",
        "impact": "Positive impact achieved"
      }
    ]
  },
  "support": {
    "helpline": {"number": "1800-XXX-XXXX", "hours": "9 AM - 6 PM"},
    "onlineSupport": {"email": "support@scheme.gov.in", "website": "https://scheme.gov.in"}
  }
}

Ensure valid JSON syntax with proper quotes and no trailing commas.`;