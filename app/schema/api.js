"use client"

export const callGeminiAPI = async (prompt) => {
  const api = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  
  if (!api) {
    throw new Error('API key not found. Please check your environment variables.');
  }
  
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${api}`, {
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

export const getSchemeDetailsPrompt = (schemeName) => `Generate comprehensive details for the Indian government scheme "${schemeName}" in JSON format.
Format the response as a valid JSON object with the following structure:
{
  "overview": {
    "description": "Detailed overview of the scheme (150-200 words)",
    "bannerImage": "URL to a relevant banner image",
    "videoUrl": "URL to an explainer video (YouTube)",
    "highlights": [
      {
        "icon": "award/target/users/chart",
        "title": "Key Highlight 1",
        "value": "Statistical value or short text"
      }
    ],
    "tags": ["Tag1", "Tag2", "Tag3"],
    "rating": {
      "score": "4.5/5",
      "count": "Number of ratings",
      "distribution": [5, 4, 3, 2, 1]
    }
  },
  "objectives": [
    {
      "title": "Objective title",
      "description": "Detailed description",
      "icon": "target/chart/users/building",
      "metrics": {
        "target": "Target value",
        "achieved": "Achieved value",
        "percentage": "Achievement percentage"
      }
    }
  ],
  "eligibility": {
    "summary": "Brief summary of eligibility requirements",
    "criteria": [
      {
        "title": "Criterion title",
        "description": "Detailed description",
        "icon": "check/user/id/home",
        "importance": "Required/Optional"
      }
    ],
    "exclusions": [
      "Category or condition that makes applicants ineligible"
    ],
    "requiredDocuments": [
      {
        "name": "Document name",
        "description": "Document description",
        "format": "PDF/Image/Physical",
        "icon": "file/image/card",
        "sampleUrl": "URL to sample document if available"
      }
    ],
    "verificationProcess": {
      "steps": ["Step 1", "Step 2", "Step 3"],
      "timeline": "Expected verification time",
      "authorities": ["Authority 1", "Authority 2"]
    }
  },
  "benefits": [
    {
      "title": "Benefit title",
      "description": "Benefit description",
      "value": "Monetary value or quantity if applicable",
      "icon": "cash/percentage/shield/star",
      "conditions": ["Condition 1", "Condition 2"],
      "duration": "Benefit duration",
      "disbursementMethod": "How the benefit is provided"
    }
  ],
  "process": {
    "summary": "Brief overview of the application process",
    "applicationSteps": [
      {
        "step": 1,
        "title": "Step title",
        "description": "Step description",
        "icon": "edit/upload/check/clock",
        "estimatedTime": "Time required for this step",
        "tips": ["Tip 1", "Tip 2"]
      }
    ],
    "timeline": {
      "applicationStart": "2024-01-01",
      "applicationEnd": "2024-12-31",
      "processingTime": "30 days",
      "disbursementSchedule": "Monthly/Quarterly/Yearly",
      "renewalProcess": "Process for renewal if applicable",
      "keyDates": [
        {
          "date": "2024-03-01",
          "event": "Important milestone",
          "description": "Description of the milestone"
        }
      ]
    },
    "onlinePortal": {
      "url": "Application portal URL",
      "supportedBrowsers": ["Chrome", "Firefox", "Safari"],
      "mobileApp": {
        "available": true,
        "platforms": ["Android", "iOS"],
        "features": ["Feature 1", "Feature 2"]
      },
      "accessibilityFeatures": ["Feature 1", "Feature 2"],
      "languages": ["Language 1", "Language 2"]
    },
    "offlineProcess": {
      "locations": ["Location type 1", "Location type 2"],
      "documents": ["Document 1", "Document 2"],
      "timings": "Office hours"
    }
  },
  "statistics": {
    "overview": {
      "totalBeneficiaries": "Number with unit (e.g., 2.5 Cr)",
      "totalDisbursement": "Amount with unit (e.g., ₹50,000 Cr)",
      "successRate": "Percentage",
      "satisfaction": "Percentage",
      "growthRate": "Year-over-year growth percentage",
      "costPerBeneficiary": "Average cost per beneficiary"
    },
    "demographics": {
      "gender": {"male": "Percentage", "female": "Percentage", "other": "Percentage"},
      "age": {"0-18": "Percentage", "19-35": "Percentage", "36-60": "Percentage", "60+": "Percentage"},
      "location": {"urban": "Percentage", "rural": "Percentage", "tribal": "Percentage"},
      "income": {"low": "Percentage", "middle": "Percentage", "high": "Percentage"}
    },
    "yearlyData": [
      {
        "year": "2023",
        "beneficiaries": "Number",
        "disbursement": "Amount",
        "growth": "Percentage",
        "budget": "Amount",
        "utilization": "Percentage",
        "impact": {
          "metric1": "Value",
          "metric2": "Value"
        }
      }
    ],
    "stateWiseData": [
      {
        "state": "State name",
        "beneficiaries": "Number",
        "disbursement": "Amount",
        "implementation": "Percentage",
        "ranking": "National ranking",
        "growthRate": "Percentage"
      }
    ],
    "impactMetrics": [
      {
        "metric": "Metric name",
        "baseline": "Baseline value",
        "current": "Current value",
        "target": "Target value",
        "description": "Description of the impact"
      }
    ]
  },
  "support": {
    "helpline": {
      "number": "Toll-free number",
      "hours": "Operating hours",
      "languages": ["Language 1", "Language 2"],
      "averageWaitTime": "Average wait time",
      "commonIssues": ["Issue 1", "Issue 2"]
    },
    "offices": [
      {
        "type": "Head Office/Regional Office",
        "address": "Full address",
        "phone": "Contact number",
        "email": "Email address",
        "coordinates": {"latitude": "Value", "longitude": "Value"},
        "timings": "Office hours",
        "services": ["Service 1", "Service 2"]
      }
    ],
    "onlineSupport": {
      "email": "Support email",
      "responseTime": "Average response time",
      "chatbot": {
        "url": "Chatbot URL if available",
        "available24x7": true,
        "languages": ["Language 1", "Language 2"]
      },
      "socialMedia": {
        "twitter": "Handle",
        "facebook": "Page URL",
        "instagram": "Handle",
        "youtube": "Channel URL"
      },
      "mobileApp": {
        "name": "App name",
        "android": "Play Store URL",
        "ios": "App Store URL"
      }
    },
    "grievanceRedressal": {
      "process": ["Step 1", "Step 2"],
      "timeline": "Expected resolution time",
      "escalationMatrix": [
        {
          "level": "Level 1",
          "authority": "Authority name",
          "contact": "Contact details"
        }
      ]
    }
  },
  "resources": {
    "guidelines": [
      {
        "title": "Document title",
        "description": "Brief description",
        "url": "Download URL",
        "format": "PDF/DOC",
        "size": "File size",
        "lastUpdated": "Last update date",
        "language": "Document language"
      }
    ],
    "faqs": [
      {
        "question": "FAQ question",
        "answer": "Detailed answer",
        "category": "Application/Eligibility/Benefits",
        "tags": ["Tag1", "Tag2"]
      }
    ],
    "successStories": [
      {
        "title": "Story title",
        "description": "Brief story",
        "location": "State/District",
        "impact": "Impact metrics",
        "imageUrl": "Story image URL",
        "videoUrl": "Video URL if available",
        "testimonial": "Quote from beneficiary",
        "year": "Year"
      }
    ],
    "tutorials": [
      {
        "title": "Tutorial title",
        "description": "Brief description",
        "type": "Video/Text/Interactive",
        "url": "Tutorial URL",
        "duration": "Duration if applicable"
      }
    ],
    "relatedSchemes": [
      {
        "name": "Related scheme name",
        "relationship": "Complementary/Similar/Prerequisite",
        "description": "Brief description of relationship"
      }
    ]
  },
  "updates": {
    "latestNews": [
      {
        "date": "2024-01-15",
        "title": "Update title",
        "description": "Brief description",
        "source": "Source name",
        "url": "News URL"
      }
    ],
    "upcomingChanges": [
      {
        "effectiveDate": "2024-06-01",
        "title": "Change title",
        "description": "Description of upcoming change",
        "impact": "Impact on beneficiaries"
      }
    ],
    "versionHistory": [
      {
        "version": "2.0",
        "date": "2023-04-01",
        "changes": ["Change 1", "Change 2"],
        "impact": "Impact of changes"
      }
    ]
  }
}
Ensure the JSON is properly formatted with no trailing commas and valid syntax. Provide realistic data for all fields, using actual information about the scheme where available.`;