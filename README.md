# 🏛️ GovSchemes - AI-Powered Government Scheme Platform

A comprehensive, centralized platform for discovering Indian government schemes using advanced AI technologies. This project combines modern web development with intelligent automation to help citizens easily find and access government benefits.

## 🌟 Project Overview

GovSchemes is a full-stack application that leverages AI to simplify the discovery of government schemes in India. The platform features two distinct AI-powered chatbots and multiple search interfaces to cater to different user preferences and needs.

### 🎯 Key Features

- **🤖 Dual AI Chatbot System**
  - **RAG-based Chatbot (SAHAYATA)**: General assistance with personalized responses
  - **Agentic Chatbot**: Intelligent scheme finder with real-time web scraping
- **🔍 Multiple Search Methods**
  - Keyword-based search
  - Advanced filter-based search
  - AI-powered scheme recommendations
- **📱 Modern Responsive UI**
  - Built with Next.js and Chakra UI
  - Smooth animations and transitions
  - Mobile-first design approach
- **⚡ Real-time Data Scraping**
  - Live data from myscheme.gov.in
  - Automated scheme information extraction
  - Dynamic content updates

## 🏗️ Architecture

### Frontend (my-app/)
```
my-app/
├── app/
│   ├── components/          # Reusable UI components
│   │   ├── hero.jsx        # Landing page hero section
│   │   ├── navbar.jsx      # Navigation component
│   │   ├── SchemaCard.jsx  # Scheme category cards
│   │   ├── popularSchema.jsx # Popular schemes display
│   │   ├── StepsSection.jsx # How-to-use steps
│   │   ├── FAQ.jsx         # Frequently asked questions
│   │   └── Footer.jsx      # Footer component
│   ├── chatbot/            # RAG-based chatbot
│   │   ├── ChatInterface.js # Main chat interface
│   │   └── MarkdownFormatter.js # Message formatting
│   ├── scheme-chatbot/     # Agentic chatbot
│   │   └── SchemeChatbot.js # Intelligent scheme finder
│   ├── schema/             # Scheme browsing interface
│   │   ├── page.js         # Main schemes page
│   │   ├── MainPage.js     # Category selection
│   │   ├── SchemesPage.js  # Scheme listings
│   │   ├── DetailsPage.js  # Detailed scheme view
│   │   ├── api.js          # Gemini AI integration
│   │   └── mockData.js     # Fallback data
│   ├── schema-finder/      # Advanced search interface
│   │   ├── SchemaFinderPage.jsx # Main finder interface
│   │   ├── FilterForm.jsx  # Search filters
│   │   ├── SchemeResults.jsx # Results display
│   │   └── constants.js    # Filter options
│   ├── finalChatbot.js     # Chatbot selector
│   ├── layout.js           # Root layout
│   ├── page.js             # Home page
│   └── providers.js        # Context providers
├── public/                 # Static assets
└── package.json           # Dependencies
```

### Backend (Schema/)
```
Schema/
├── src/
│   ├── graph.py           # LangGraph workflow orchestration
│   ├── models.py          # Pydantic data models
│   └── scraper.py         # Playwright web scraper
├── api.py                 # FastAPI REST endpoints
├── main.py               # CLI interface
├── pyproject.toml        # Python dependencies
└── requirements.txt      # Pip requirements
```

## 🚀 Technology Stack

### Frontend Technologies
- **Framework**: Next.js 15.3.2 (React 18)
- **UI Library**: Chakra UI 2.10.9
- **Styling**: Tailwind CSS 4.1.7
- **Animations**: Framer Motion 10.18.0
- **Icons**: Lucide React 0.511.0
- **Markdown**: React Markdown 10.1.0
- **AI Integration**: Google Generative AI 0.2.1

### Backend Technologies
- **API Framework**: FastAPI 0.124.4
- **Data Models**: Pydantic 2.12.5
- **Web Scraping**: Playwright 1.57.0
- **AI Orchestration**: LangGraph 1.0.4
- **Core AI**: LangChain Core 1.1.3
- **Server**: Uvicorn 0.38.0
- **HTML Parsing**: BeautifulSoup4 4.14.3

## 🤖 AI Components

### 1. RAG-based Chatbot (SAHAYATA)
- **Purpose**: General assistance and personalized guidance
- **Features**:
  - User profile collection (age, state, education)
  - Contextual responses based on user data
  - External API integration for enhanced responses
  - Markdown formatting support
  - Chat history management

### 2. Agentic Chatbot (Scheme Finder)
- **Purpose**: Intelligent government scheme discovery
- **Features**:
  - Real-time web scraping using Playwright
  - LangGraph workflow orchestration
  - Dual search modes (keyword & filter-based)
  - Automated scheme data extraction
  - Structured scheme information display

### 3. LangGraph Workflow
```python
# Workflow Structure
search_node → scrape_node → END

# State Management
class AgentState(TypedDict):
    query: str                    # Search query
    filter_state: str            # State filter
    filter_category: str         # Category filter
    filter_age: int              # Age filter
    scheme_urls: List[str]       # Found URLs
    scraped_data: List[SchemeDetails]  # Extracted data
```

## 📊 Data Models

### Scheme Details Structure
```python
class SchemeDetails(BaseModel):
    title: str                   # Scheme name
    url: str                     # Official URL
    description: Optional[str]   # Scheme overview
    eligibility: Optional[str]   # Eligibility criteria
    benefits: Optional[str]      # Scheme benefits
    application_process: Optional[str]  # How to apply
    documents_required: Optional[str]   # Required documents
```

### API Response Structure
```python
class ScrapedData(BaseModel):
    query: Optional[str]         # Search query used
    filter_state: Optional[str]  # State filter applied
    filter_category: Optional[str]  # Category filter applied
    filter_age: Optional[int]    # Age filter applied
    schemes: List[SchemeDetails] # Found schemes
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ and npm/yarn
- Python 3.12+
- UV package manager (recommended) or pip

### Frontend Setup
```bash
cd my-app
npm install
npm run dev
```
The frontend will be available at `http://localhost:3000`

### Backend Setup
```bash
cd Schema

# Using UV (recommended)
uv sync

# Or using pip
pip install -r requirements.txt

# Install Playwright browsers
playwright install

# Start the API server
uv run python api.py
# or
python api.py
```
The API will be available at `http://localhost:8001`

### Environment Variables
Create `.env.local` in the my-app directory:
```env
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
```

## 🔌 API Endpoints

### POST /scrape
Scrapes government schemes based on search criteria.

**Request Body:**
```json
{
  "query": "education scholarship",           // For keyword search
  "filter_state": "Gujarat",                // For filter search
  "filter_category": "Education & Learning", // For filter search
  "filter_age": 20                          // For filter search
}
```

**Response:**
```json
{
  "query": "education scholarship",
  "filter_state": null,
  "filter_category": null,
  "filter_age": null,
  "schemes": [
    {
      "title": "PM Scholarship Scheme",
      "url": "https://www.myscheme.gov.in/schemes/...",
      "description": "Scholarship for meritorious students...",
      "eligibility": "Students with 85% marks...",
      "benefits": "₹2,500 per month...",
      "application_process": "Apply online through...",
      "documents_required": "Mark sheets, income certificate..."
    }
  ]
}
```

## 🎨 UI Components

### Key Components
- **Hero Section**: Landing page with search introduction
- **Schema Categories**: Interactive category cards
- **Popular Schemes**: Trending government schemes
- **Steps Section**: How-to-use guide
- **FAQ Section**: Common questions and answers
- **Dual Chatbot Interface**: AI assistant selection

### Design Features
- **Responsive Design**: Mobile-first approach
- **Smooth Animations**: Framer Motion integration
- **Modern UI**: Chakra UI components
- **Accessibility**: ARIA labels and keyboard navigation
- **Loading States**: Skeleton screens and spinners

## 🔍 Search Capabilities

### 1. Keyword Search
- Natural language queries
- Real-time scheme matching
- Relevance-based results

### 2. Filter-based Search
- **State Selection**: All Indian states and UTs
- **Category Filtering**: 15+ scheme categories
- **Age-based Filtering**: Age-appropriate schemes
- **Advanced Combinations**: Multiple filter support

### 3. AI-powered Recommendations
- Personalized suggestions based on user profile
- Context-aware scheme matching
- Smart filtering and ranking

## 🚦 Usage Examples

### Starting a Keyword Search
1. Open the application
2. Click on the chatbot icon
3. Select "AGENTIC CHATBOT"
4. Choose "Keyword" mode
5. Type: "scholarship for engineering students"
6. Get relevant schemes with full details

### Using Filter Search
1. Access the Agentic Chatbot
2. Select "Filters" mode
3. Set State: "Maharashtra"
4. Set Category: "Education & Learning"
5. Set Age: "22"
6. Click "FIND SCHEMES"
7. Browse filtered results

### RAG Chatbot Interaction
1. Click chatbot icon
2. Select "RAG CHATBOT"
3. Fill user profile (age, state, education)
4. Ask questions like "What schemes are available for students in Gujarat?"
5. Get personalized responses

## 🔧 Development

### Running in Development Mode
```bash
# Frontend (with hot reload)
cd my-app
npm run dev

# Backend (with auto-reload)
cd Schema
uv run python api.py
```

### Building for Production
```bash
# Frontend
cd my-app
npm run build
npm start

# Backend
cd Schema
uv run python api.py
```

## 📈 Performance Features

- **Lazy Loading**: Dynamic component imports
- **Caching**: Intelligent data caching
- **Optimized Scraping**: Efficient Playwright usage
- **Responsive Images**: Next.js image optimization
- **Code Splitting**: Automatic bundle optimization

## 🛡️ Security Features

- **Input Validation**: Pydantic model validation
- **CORS Configuration**: Secure cross-origin requests
- **Rate Limiting**: API request throttling
- **Data Sanitization**: XSS prevention
- **Secure Headers**: Security-first configuration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **MyScheme.gov.in**: Official government scheme portal
- **Google Gemini AI**: AI-powered responses
- **LangChain/LangGraph**: AI workflow orchestration
- **Playwright**: Web scraping capabilities
- **Next.js & Chakra UI**: Frontend framework and components

## 📞 Support

For support, email [quantumabhishek713@gmail.com] or create an issue in the repository.

---

**Built with ❤️ for the citizens of India to easily discover and access government schemes.**