# Basal_AI

Welcome to **Basal_AI** – a simple, modern job application platform for recruiters and applicants.

---

## 🚀 Features

- **For Applicants:**  
  - Apply for jobs with a clean, easy-to-use form.
  - Get instant feedback on your application status.

- **For Recruiters:**  
  - View all applications in a responsive dashboard.
  - Filter applications by status.
  - Accept applications with a single click.
  - Receive real-time notifications when new applications arrive.

- **Real-time Updates:**  
  - Uses Socket.io for instant recruiter notifications.
  - No page refresh needed to see new applications.

- **Responsive Design:**  
  - Works great on desktop and mobile.
  - Minimal, distraction-free UI.

---

## 🛠️ Tech Stack

- **Frontend:** React, CSS
- **Backend:** Node.js, Express
- **Real-time:** Socket.io
- **API:** RESTful endpoints for applications

---

## 📦 Project Structure

```
frontend/
  ├── public/
  ├── src/
  │   ├── components/
  │   ├── pages/
  │   │   ├── ApplyPage.jsx / .css
  │   │   └── RecruiterPage.jsx / .css
  |   |   |___Login.jsx/.css
  |   |   |___Signup.jsx/.css
  │   ├── services/
  │   │   └── api.js
  │   ├── socket.js
  │   └── App.jsx
  └── README.md
```

---

## 🖥️ Getting Started

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/Basal_AI.git
   cd Basal_AI
   ```

2. **Install dependencies:**
   ```sh
   cd frontend
   npm install
   ```

3. **Start the frontend:**
   ```sh
   npm start
   ```

4. **Start the backend:**  
   *(Assuming backend is in `/backend` and uses Node.js)*
   ```sh
   cd ../backend
   npm install
   npm start
   ```

5. **Visit:**  
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📲 Usage

- **Applicants:**  
  Go to the application page, fill out the form, and submit your application.

- **Recruiters:**  
  Log in to the recruiter dashboard to see all applications.  
  Get notified instantly when a new application is submitted.

---

## 💡 Customization

- Update styles in `ApplyPage.css` and `RecruiterPage.css` for your brand.
- Edit socket events in `socket.js` and backend for custom real-time features.

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📧 Contact

For questions or support, open an issue or contact the maintainer.

---

**Enjoy using Basal_AI!**