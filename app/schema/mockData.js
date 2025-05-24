"use client"

export const getMockSchemes = (category) => {
  const mockData = {
    state: [
      { 
        name: "Rythu Bandhu", 
        state: "Telangana", 
        description: "Financial assistance program providing investment support to farmers at the beginning of each crop season", 
        beneficiaries: "Small & Marginal Farmers", 
        budget: "₹12,000 Crores", 
        launchYear: "2018",
        status: "Active",
        category: "Agriculture",
        imageUrl: "https://img.etimg.com/thumb/width-640,height-480,imgsize-225294,resizemode-75,msid-64049263/rythu-bandhu-scheme-telangana-to-spend-rs-12000-crore-annually-for-farmers.jpg"
      },
      { 
        name: "Kalia Yojana", 
        state: "Odisha", 
        description: "Comprehensive livelihood support for farmers including financial assistance, crop loans, and life insurance", 
        beneficiaries: "Farmers & Landless", 
        budget: "₹10,180 Crores", 
        launchYear: "2019",
        status: "Active",
        category: "Agriculture",
        imageUrl: "https://gumlet.assettype.com/barandbench/2022-03/8c8d4b8d-4dd1-4f2e-a7f9-b2a3f3a0a0a0/KALIA_Scheme.jpg"
      }
    ],
    national: [
      { 
        name: "PM-KISAN", 
        ministry: "Agriculture & Farmers Welfare", 
        description: "Direct income support scheme providing financial assistance to all landholding farmer families", 
        beneficiaries: "Small & Marginal Farmers", 
        budget: "₹65,000 Crores", 
        launchYear: "2019",
        status: "Active",
        category: "Agriculture",
        imageUrl: "https://pmkisan.gov.in/Images/pmkisan-home.jpg"
      },
      { 
        name: "Ayushman Bharat", 
        ministry: "Health & Family Welfare", 
        description: "Flagship health insurance scheme providing coverage of ₹5 lakh per family for secondary and tertiary care", 
        beneficiaries: "Poor & Vulnerable Families", 
        budget: "₹6,400 Crores", 
        launchYear: "2018",
        status: "Active",
        category: "Healthcare",
        imageUrl: "https://www.ayushmanbharat.in/assets/images/about-img.jpg"
      }
    ],
    scholarship: [
      { 
        name: "INSPIRE Scholarship", 
        provider: "DST", 
        description: "Scholarship program to attract talented students towards pursuing careers in science research", 
        eligibility: "Top 1% in Class XII", 
        amount: "₹80,000/year", 
        deadline: "November 30",
        educationLevel: "Undergraduate",
        category: "Merit-based",
        imageUrl: "https://www.inspireawards-dst.gov.in/images/inspire-logo.png"
      },
      { 
        name: "Merit-cum-Means Scholarship", 
        provider: "UGC", 
        description: "Financial assistance for economically weaker students pursuing technical and professional courses", 
        eligibility: "Family income < ₹2.5 LPA", 
        amount: "₹12,000/year", 
        deadline: "October 31",
        educationLevel: "Undergraduate",
        category: "Need-based",
        imageUrl: "https://scholarships.gov.in/public/Content/img/ministry-social-justice.jpg"
      }
    ],
    financial: [
      { 
        name: "PMMY (Mudra Loan)", 
        type: "Loan", 
        description: "Micro-finance initiative providing loans up to ₹10 lakhs to non-corporate, non-farm small businesses", 
        target: "Small Business Owners", 
        maxAmount: "₹10 Lakhs", 
        provider: "Banks & NBFCs",
        interestRate: "8-12%",
        repaymentPeriod: "3-5 years",
        category: "Business",
        imageUrl: "https://www.mudra.org.in/images/mudra-logo.png"
      },
      { 
        name: "Stand-Up India", 
        type: "Loan", 
        description: "Facilitates bank loans between ₹10 lakh and ₹1 crore for SC/ST and women entrepreneurs", 
        target: "SC/ST/Women", 
        maxAmount: "₹1 Crore", 
        provider: "Scheduled Banks",
        interestRate: "8-11%",
        repaymentPeriod: "7 years",
        category: "Business",
        imageUrl: "https://www.standupmitra.in/images/sui-logo.png"
      }
    ]
  };
  return mockData[category] || [];
};

export const getMockDetails = () => ({
  overview: "This is a comprehensive government scheme designed to provide financial assistance and support to eligible beneficiaries across India. The program aims to address socio-economic challenges by offering direct benefits, subsidies, and resources to targeted populations. It represents a significant initiative in the government's broader welfare strategy to promote inclusive growth and development.",
  objectives: [
    "Provide financial assistance to target beneficiaries to improve their economic condition",
    "Improve living standards of economically weaker sections through direct support mechanisms",
    "Promote inclusive growth and development by reducing economic disparities",
    "Reduce poverty and inequality through targeted interventions and support systems"
  ],
  eligibility: [
    "Indian citizen with valid proof of nationality",
    "Age between 18-60 years with valid age proof documentation",
    "Annual family income below specified limit (typically ₹2.5 lakhs per annum)",
    "Valid identification documents including Aadhaar card and income certificate"
  ],
  benefits: [
    "Direct cash transfer to beneficiary bank accounts on a quarterly basis",
    "Subsidized services including healthcare, education, and essential commodities",
    "Priority access to government facilities and expedited processing of applications",
    "Additional support for vulnerable groups including women, children, and differently-abled"
  ],
  applicationProcess: [
    "Visit nearest government office or official portal to obtain application form",
    "Fill application form with required personal and financial details",
    "Submit necessary documents including identity proof, income certificate, and bank details",
    "Verification by concerned authorities through field visits and document scrutiny",
    "Approval and benefit disbursement through direct bank transfer"
  ],
  documents: [
    "Aadhaar Card (mandatory for identity verification)",
    "Income Certificate issued by competent authority",
    "Bank Account Details with IFSC code for direct benefit transfer",
    "Residence Proof such as utility bills or rental agreement",
    "Identity Proof including voter ID or passport"
  ],
  timeline: {
    applicationStart: "January 1, 2024",
    applicationEnd: "March 31, 2024",
    processingTime: "30-45 days",
    disbursementTime: "Within 15 days of approval"
  },
  contact: {
    website: "https://www.india.gov.in",
    helpline: "1800-111-555",
    email: "support@gov.in",
    officeAddress: "Ministry of Social Justice, Shastri Bhawan, New Delhi - 110001"
  },
  statistics: {
    beneficiariesCovered: "2.5 Crore",
    totalBudget: "₹50,000 Crores",
    statesImplemented: "28 States & 8 UTs",
    successRate: "87%"
  },
  faqs: [
    {
      question: "How can I check my application status?",
      answer: "You can check your application status by visiting the official website and entering your application reference number or by calling the helpline."
    },
    {
      question: "What happens if my application is rejected?",
      answer: "If your application is rejected, you will receive a notification with reasons. You can appeal the decision within 30 days by submitting additional documentation."
    },
    {
      question: "How frequently are benefits disbursed?",
      answer: "Benefits are typically disbursed on a quarterly basis directly to the registered bank account of the beneficiary."
    }
  ]
});