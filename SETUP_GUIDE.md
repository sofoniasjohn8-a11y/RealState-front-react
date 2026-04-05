# Real Estate Frontend - Setup Guide

## 📋 Project Overview

This is a React-based real estate website with complete authentication (Login & Register) and property listing features.

## 📁 Project Structure

```
src/
├── pages/
│   ├── Home.jsx          # Landing page with features
│   ├── Login.jsx         # User login page
│   ├── Register.jsx      # User registration page
├── styles/
│   ├── Home.css          # Home page styling
│   ├── Auth.css          # Login & Register styling
│   ├── PropertyList.css   # Properties page styling
├── App.js                # Main routing setup
├── PropertyList.jsx      # Property listings page
├── App.css               # Global styles
└── index.js              # Entry point
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm start
```

The app will open at `http://localhost:3000`

## 🔐 Authentication Pages

### Login Page (`/login`)

- Email and password input fields
- Error handling and validation
- "Forgot Password" link
- Link to Sign Up page
- Stores auth token in localStorage
- API Endpoint: `POST /api/auth/login`

**Expected Backend Response:**

```json
{
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

### Register Page (`/register`)

- First name, Last name inputs
- Email with validation
- Phone number (optional)
- Password with confirmation
- Terms & Conditions checkbox
- Form validation
- API Endpoint: `POST /api/auth/register`

**Expected Backend Response:**

```json
{
  "message": "Registration successful",
  "userId": 1
}
```

## 🏠 Home Page (`/`)

- Landing page with navigation
- Feature highlights
- Call-to-action buttons for Login/Register
- Shows different UI for authenticated users

## 📍 Properties Page (`/properties`)

- Displays all available properties
- Property cards with:
  - Image (or placeholder)
  - Title
  - Description
  - Location, Bedrooms, Bathrooms
  - Price
  - View Details button
- Authentication required
- Auto-redirect to login if not authenticated
- API Endpoint: `GET /properties`

**Expected Backend Response:**

```json
[
  {
    "id": 1,
    "title": "Modern Apartment",
    "description": "Spacious apartment in downtown",
    "location": "123 Main St, City",
    "bedrooms": 2,
    "bathrooms": 1,
    "price": 250000,
    "image": "image_url"
  }
]
```

## 🔧 Backend API Configuration

### Update API Base URL

Edit the following files and replace `http://localhost:8080/RealEstateBackend` with your backend URL:

1. [src/pages/Login.jsx](src/pages/Login.jsx) - Line 20
2. [src/pages/Register.jsx](src/pages/Register.jsx) - Line 56
3. [src/PropertyList.jsx](src/PropertyList.jsx) - Line 23

**Example:**

```javascript
// Before
const response = await axios.post('http://localhost:8080/RealEstateBackend/api/auth/login', {...})

// After
const response = await axios.post('http://your-backend-url/api/auth/login', {...})
```

## 🎨 Styling

- **Color Scheme**: Purple gradient (#667eea to #764ba2)
- **Font**: Segoe UI, Tahoma
- **Responsive**: Mobile, Tablet, Desktop
- **Components**: Cards, Buttons, Forms, Navbars

All CSS files are in the `src/styles/` folder:

- `Auth.css` - Login and Register pages
- `Home.css` - Home page and general styles
- `PropertyList.css` - Property listings

## 📱 Features

### Implemented

- ✅ Login page with email/password
- ✅ Register page with validation
- ✅ Home landing page
- ✅ Property listings display
- ✅ Responsive design
- ✅ Navigation & routing
- ✅ Local storage for auth tokens
- ✅ Protected routes (redirects to login)
- ✅ Logout functionality

### To Add (Optional)

- 🔲 Forgot password flow
- 🔲 Email verification
- 🔲 Profile page
- 🔲 Favorites/Wishlist
- 🔲 Property detail page
- 🔲 Search & filters
- 🔲 User dashboard
- 🔲 Admin panel

## 🔌 Dependencies

- **react** - UI library
- **react-router-dom** - Routing
- **axios** - HTTP client
- **react-scripts** - Build tools

## 🛠️ Available Scripts

```bash
# Start development server
npm start

# Build for production
npm build

# Run tests
npm test
```

## 🐛 Troubleshooting

### "Cannot find module" errors

```bash
npm install
```

### Routes not working

Make sure `<Router>` is in `App.js` and all components are imported correctly.

### API calls fail

1. Check backend is running
2. Verify backend URL is correct
3. Check CORS settings on backend
4. Use browser DevTools > Network tab to debug

### LocalStorage not working

- Check browser's private mode
- Clear browser cache and cookies
- Verify cookies are enabled

## 📝 Example Backend Servlet (Java)

```java
@WebServlet("/api/auth/login")
public class LoginServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String email = request.getParameter("email");
        String password = request.getParameter("password");

        // Validate credentials
        if(isValidUser(email, password)) {
            response.setContentType("application/json");
            response.getWriter().write("{\"token\": \"jwt_token\", \"user\": {...}}");
        }
    }
}
```

## 🚀 Deployment

### Frontend (Vercel/Netlify)

1. Build the project: `npm build`
2. Deploy the `build` folder
3. Update API endpoints to production backend

### Backend Configuration for Production

Update API URLs in components to use production endpoints.

## 📞 Support

For issues or questions about this frontend, check:

1. Browser console (F12)
2. Network tab for API failures
3. Backend logs for server errors

---

**Happy Coding! 🎉**
