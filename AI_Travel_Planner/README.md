# 🌍 AI Travel Planner

An intelligent travel planning application that generates personalized itineraries using AI. Plan your perfect trip with smart recommendations for destinations, hotels, and daily activities.

![AI Travel Planner](https://img.shields.io/badge/React-19.1.0-blue) ![Vite](https://img.shields.io/badge/Vite-7.0.4-green) ![Firebase](https://img.shields.io/badge/Firebase-12.0.0-orange) ![Gemini AI](https://img.shields.io/badge/Gemini-AI-purple)

## 🚀 Live Demo

**🌐 [Visit AI Travel Planner](https://trip-planner-website-self.vercel.app)**

## ✨ Features

### 🎯 Core Features
- **🤖 AI-Powered Trip Generation** - Personalized itineraries using Google Gemini AI
- **📍 Smart Location Search** - Real-time location autocomplete with Geoapify API
- **🏨 Hotel Recommendations** - Curated hotel suggestions with ratings and pricing
- **📅 Daily Itineraries** - Detailed day-by-day plans with attractions and activities
- **🔐 Google Authentication** - Secure login with Google OAuth
- **💾 Trip Management** - Save, view, and manage your travel plans
- **📱 Responsive Design** - Optimized for desktop, tablet, and mobile devices

### 🎨 User Experience
- **🖼️ Dynamic Images** - Beautiful destination photos from Pexels API
- **⚡ Real-time Updates** - Instant feedback and loading states
- **🎨 Modern UI** - Clean, intuitive interface with Tailwind CSS
- **🔔 Smart Notifications** - Toast notifications for user actions
- **📊 Budget Planning** - Choose from Cheap, Moderate, or Luxury options
- **👥 Group Planning** - Solo, Couple, Family, or Friends trip options

## 🛠️ Tech Stack

### Frontend
- **⚛️ React 19.1.0** - Modern React with latest features
- **⚡ Vite 7.0.4** - Lightning-fast build tool
- **🎨 Tailwind CSS 4.1.11** - Utility-first CSS framework
- **🧭 React Router 7.7.0** - Client-side routing
- **🎭 Radix UI** - Accessible component primitives
- **🎯 Lucide React** - Beautiful icons

### Backend & Services
- **🔥 Firebase 12.0.0** - Database and authentication
- **🤖 Google Gemini AI** - Trip generation and recommendations
- **📍 Geoapify API** - Location search and geocoding
- **🖼️ Pexels API** - High-quality destination images
- **🔐 Google OAuth** - Secure authentication

### Development Tools
- **📦 ESLint** - Code linting and formatting
- **🔧 Vite Plugins** - React and Tailwind CSS integration
- **📱 PostCSS** - CSS processing
- **🎯 Path Aliases** - Clean import statements

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Git**

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/ai-travel-planner.git
cd ai-travel-planner/AI_Travel_Planner
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory:

```env
# Gemini AI API Key (Get from: https://aistudio.google.com/)
VITE_GEMINI_API_KEY=your_gemini_api_key_here

# Geoapify API Key (Get from: https://www.geoapify.com/)
VITE_GEOAPIFY_API_KEY=your_geoapify_api_key_here

# Google OAuth Client ID (Get from: https://console.cloud.google.com/)
VITE_GOOGLE_AUTH_CLIENT_ID=your_google_client_id_here

# Pexels API Key (Get from: https://www.pexels.com/api/)
VITE_PEXELS_API_KEY=your_pexels_api_key_here

# Firebase Configuration (Get from: https://console.firebase.google.com/)
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### 4. Start Development Server
```bash
npm run dev
# or
yarn dev
```

Visit `http://localhost:5173` to see your application running! 🎉

## 🔧 API Setup Guide

### 🤖 Google Gemini AI API
1. Visit [Google AI Studio](https://aistudio.google.com/)
2. Sign in with your Google account
3. Click "Get API Key" and create a new key
4. Copy the API key to your `.env.local` file

### 📍 Geoapify API
1. Visit [Geoapify](https://www.geoapify.com/)
2. Create a free account
3. Go to your dashboard and create a new project
4. Copy the API key to your `.env.local` file

### 🔐 Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add your domain to authorized origins
6. Copy the Client ID to your `.env.local` file

### 🖼️ Pexels API
1. Visit [Pexels API](https://www.pexels.com/api/)
2. Create a free account
3. Generate an API key
4. Copy the API key to your `.env.local` file

### 🔥 Firebase Setup
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Firestore Database
4. Get your configuration from Project Settings
5. Copy all Firebase config values to your `.env.local` file

## 📁 Project Structure

```
AI_Travel_Planner/
├── public/
│   ├── logo.svg
│   ├── air.jpg
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── custom/
│   │   │   ├── Header.jsx
│   │   │   └── Hero.jsx
│   │   └── ui/
│   │       ├── button.jsx
│   │       ├── dialog.jsx
│   │       ├── input.jsx
│   │       └── sonner.jsx
│   ├── constants/
│   │   └── options.js
│   ├── create-trip/
│   │   └── index.jsx
│   ├── my-trips/
│   │   └── index.jsx
│   ├── service/
│   │   ├── AIModel.jsx
│   │   ├── firebase.config.jsx
│   │   └── GlobalApi.jsx
│   ├── view-trip/
│   │   └── [tripId]/
│   │       ├── index.jsx
│   │       └── component/
│   │           ├── InfoSection.jsx
│   │           ├── Hotels.jsx
│   │           ├── PlacesToVisit.jsx
│   │           └── Footer.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env.local
├── package.json
├── vite.config.js
└── README.md
```

## 🎯 How It Works

### 1. **🔐 Authentication**
- Users sign in with Google OAuth
- Secure session management with localStorage
- Protected routes for authenticated users

### 2. **📍 Destination Search**
- Real-time location autocomplete
- Powered by Geoapify API
- Smart suggestions with country information

### 3. **🎨 Trip Customization**
- Choose destination, duration, budget, and travel companions
- Budget options: Cheap, Moderate, Luxury
- Travel types: Solo, Couple, Family, Friends

### 4. **🤖 AI Trip Generation**
- Google Gemini AI processes user preferences
- Generates comprehensive itineraries
- Includes hotels, attractions, and daily plans

### 5. **💾 Data Storage**
- Trips saved to Firebase Firestore
- User-specific trip management
- Real-time data synchronization

### 6. **🖼️ Visual Enhancement**
- Dynamic images from Pexels API
- Destination and hotel photos
- Fallback images for better UX

## 📱 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

## 🌐 Deployment

### Vercel Deployment (Recommended)

1. **Connect Repository**
   ```bash
   # Push your code to GitHub
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Visit [Vercel](https://vercel.com/)
   - Import your GitHub repository
   - Add environment variables in Vercel dashboard
   - Deploy automatically

3. **Environment Variables in Vercel**
   - Go to Project Settings → Environment Variables
   - Add all variables from your `.env.local` file
   - Redeploy to apply changes

### Other Deployment Options
- **Netlify** - Drag and drop build folder
- **Firebase Hosting** - Use Firebase CLI
- **GitHub Pages** - Static site deployment

## 🔒 Security Best Practices

- ✅ **Environment Variables** - All API keys stored securely
- ✅ **Firebase Rules** - Database access controls
- ✅ **OAuth Authentication** - Secure Google login
- ✅ **Input Validation** - Form data sanitization
- ✅ **HTTPS Only** - Secure data transmission

## 🐛 Troubleshooting

### Common Issues

**🔴 API Key Errors**
```bash
# Check environment variables
console.log(import.meta.env.VITE_GEMINI_API_KEY)

# Restart development server
npm run dev
```

**🔴 Firebase Connection Issues**
- Verify Firebase configuration
- Check Firestore rules
- Ensure project ID is correct

**🔴 Location Search Not Working**
- Verify Geoapify API key
- Check network connectivity
- Review browser console for errors

**🔴 Build Errors**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines
- Follow existing code style
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation if needed

## 📄 License

This project is licensed under the **ISC License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google Gemini AI** - Powerful AI trip generation
- **Geoapify** - Reliable location services
- **Pexels** - Beautiful stock photography
- **Firebase** - Robust backend infrastructure
- **Vercel** - Seamless deployment platform
- **React Community** - Amazing ecosystem and support

## 📞 Support

- **📧 Email**: [your-email@example.com](mailto:your-email@example.com)
- **🐛 Issues**: [GitHub Issues](https://github.com/yourusername/ai-travel-planner/issues)
- **💬 Discussions**: [GitHub Discussions](https://github.com/yourusername/ai-travel-planner/discussions)

---

**Made with ❤️ by [Your Name](https://github.com/yourusername)**

⭐ **Star this repository if you found it helpful!**
