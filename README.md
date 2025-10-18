# SafeRide - Designated Driver Service

SafeRide is a mobile-first designated driver service that connects users who can't drive their vehicles with verified, background-checked drivers. The driver arrives at the user's location, drives the user's own car to their specified destination, ensuring both the user and their vehicle arrive safely.

## 🚗 Problem Statement

Users experiencing temporary driving incapacity (due to fatigue, medical conditions, substance influence, or lack of a valid license) need a safe, reliable, and immediate way to get themselves and their own vehicle home. Existing solutions like ride-sharing separate the user from their vehicle, creating a logistical problem for the next day.

## ✨ Features

### User App
- **Authentication**: JWT-based login with email verification via SendGrid
- **Trip Request**: Request trips with pickup and drop-off locations
- **Driver & ETA**: View assigned driver details and real-time ETA
- **Trip Tracking**: Real-time trip progress tracking on map
- **Payment**: Integrated payment gateway (Stripe/M-Pesa simulation)
- **Rating System**: Rate and review drivers after trip completion

### Driver App
- **Onboarding**: Sign up and upload KYC documents (license, ID) via Cloudinary
- **Availability Toggle**: Simple online/offline status management
- **Trip Management**: Receive, accept, and manage nearby trip requests
- **Status Updates**: Update trip progress (Arrived, Started, Ended)
- **Earnings**: View payout summaries and transaction history

### Admin Dashboard
- **Driver Verification**: Verify and approve/reject driver profiles
- **Trip Monitoring**: View all active and completed trips
- **User Management**: Manage users, drivers, disputes, and refunds

## 🛠 Tech Stack

### Backend
- **Framework**: Flask with Flask-RESTful
- **Database**: PostgreSQL with SQLAlchemy ORM
- **Authentication**: JWT with Flask-JWT-Extended
- **File Upload**: Cloudinary with image resizing
- **Email**: SendGrid for verification emails
- **API Docs**: Swagger/OpenAPI with Flasgger

### Frontend
- **Framework**: React 18 with Vite
- **Routing**: React Router v6
- **Styling**: Tailwind CSS (Uber-like design)
- **Forms**: Formik with Yup validation
- **HTTP Client**: Axios
- **State Management**: React Context API

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Node.js 16+
- PostgreSQL
- SendGrid API Key
- Cloudinary Account

### Backend Setup

1. **Clone and navigate to backend**
```bash
cd backend
```

2. **Create virtual environment**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install dependencies**
```bash
pip install -r requirements.txt
```

4. **Environment variables**
```bash
cp .env.example .env
# Edit .env with your actual values
```

5. **Database setup**
```bash
flask db init
flask db migrate -m "Initial migration"
flask db upgrade
```

6. **Run the server**
```bash
python app.py
```

### Frontend Setup

1. **Navigate to frontend**
```bash
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment variables**
```bash
cp .env.example .env
# Edit .env with your API URL
```

4. **Start development server**
```bash
npm run dev
```

## 📱 Usage

1. **Access the app**: Open http://localhost:5173
2. **Sign up**: Create account as user or driver
3. **For Users**: Request a trip and track your driver
4. **For Drivers**: Complete onboarding and start accepting trips
5. **For Admins**: Access admin dashboard to manage drivers

## 🔧 API Documentation

Once the backend is running, visit http://localhost:5000/apidocs for interactive API documentation.

### Key Endpoints

- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /auth/protected` - Protected route example
- `POST /api/trips` - Create trip request
- `PUT /api/trips/{id}/status` - Update trip status
- `POST /api/upload` - Upload driver documents
- `GET /api/admin/drivers` - List drivers (admin only)

## 🚀 Deployment

### Frontend (Vercel)
```bash
npm run build
vercel --prod
```

### Backend (Render)
1. Connect GitHub repository
2. Set environment variables
3. Deploy using render.yaml configuration

### Environment Variables

**Backend:**
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET_KEY` - Secret key for JWT tokens
- `SENDGRID_API_KEY` - SendGrid API key for emails
- `CLOUDINARY_URL` - Cloudinary configuration

**Frontend:**
- `VITE_API_URL` - Backend API base URL

## 🏗 Architecture

### Database Schema
- **Users**: Authentication and profile data
- **DriverProfiles**: Driver-specific information and documents
- **Trips**: Trip requests and status tracking
- **Relationships**: Proper foreign keys and constraints

### Security Features
- JWT authentication with role-based access control
- Password hashing with Werkzeug
- File upload validation and resizing
- CORS configuration for cross-origin requests

### Code Organization
```
backend/
├── app/           # Flask app factory
├── models/        # Database models
├── routes/        # API endpoints
├── services/      # Business logic
└── utils/         # Helper functions

frontend/
├── src/
│   ├── components/  # Reusable components
│   ├── pages/       # Page components
│   ├── context/     # React context
│   ├── hooks/       # Custom hooks
│   └── services/    # API calls
```

## 🎨 Design System

The UI follows Uber's design principles with:
- **Dark theme** with professional aesthetics
- **Mobile-first** responsive design
- **Consistent spacing** and typography
- **Intuitive navigation** with clear CTAs
- **Loading states** and error handling

## 🧪 Testing

### Backend Testing
```bash
pytest tests/
```

### Frontend Testing
```bash
npm test
```

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For support, email support@saferide.com or create an issue in the repository.

---

**SafeRide** - Your Car. Our Driver. 🚗✨