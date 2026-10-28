# Nashik Explorer 🗺️

**Discover Nashik, one destination at a time.**

Nashik Explorer is a full-stack tourism website designed to help visitors discover temples, historical landmarks, forts, waterfalls, museums, vineyards, and other attractions across Nashik, Maharashtra, India.

The platform brings destination information, interactive maps, and travel-planning details together in one place, making it easier to explore the city and its surroundings.

🌐 **Live Demo:** [explore-nashik.onrender.com](https://explore-nashik.onrender.com/)

## ✨ Features

- **Explore 33 Destinations:** Browse a curated collection of places across Nashik.
- **Interactive Map:** View destinations on a Leaflet-powered map with clickable markers and destination details.
- **Search and Filtering:** Find places using the search bar and category filters.
- **Detailed Destination Pages:** Explore individual pages containing destination information, images, and travel details.
- **Travel Planning:** View estimated distances and travel durations from three reference points:
  - CBS Nashik (Central Bus Stand)
  - Nashik Airport
  - Nashik Road Railway Station
- **Visit Information:** Find details such as recommended visiting periods and entry information where available.
- **Google Maps Integration:** Open destination locations and access directions through Google Maps.
- **Responsive Interface:** Browse destinations through a dedicated web interface.
- **About Page:** Learn more about the project.

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React, JavaScript, HTML, CSS |
| Build Tool | Vite |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas, MongoDB, Mongoose |
| Maps | Leaflet, OpenStreetMap |
| Deployment | Render |

## 📂 Project Structure

```text
nashik-explorer/
├── client/
│   ├── public/
│   │   └── images/
│   └── src/
│       ├── components/
│       ├── pages/
│       │   ├── Home.jsx
│       │   ├── Places.jsx
│       │   ├── PlaceDetails.jsx
│       │   ├── MapPage.jsx
│       │   └── About.jsx
│       └── App.jsx
├── server/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── seed.js
│   └── ...
├── .env.example
├── .gitignore
└── README.md
```

*Note: The structure above highlights the main application areas. Individual filenames and folders may vary as the project evolves.*

## 🚀 Getting Started

Follow these steps to run Nashik Explorer locally.

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) and npm
- [Git](https://git-scm.com/)
- A MongoDB database, such as [MongoDB Atlas](https://www.mongodb.com/atlas)

### 1. Clone the repository

```bash
git clone https://github.com/Kaiye-08/nashik-explorer.git
cd nashik-explorer
```

### 2. Configure the backend

Navigate to the server directory and install its dependencies:

```bash
cd server
npm install
```

Create a `.env` file inside the `server` directory and configure the environment variables expected by the backend.

For example, if your server uses these variable names:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Use your own MongoDB connection string and the variable names required by your server configuration. Never commit credentials or secrets to GitHub.

### 3. Seed the database

If you want to populate your database with the project's destination data, run the seed script from the `server` directory:

```bash
node seed.js
```

Ensure your MongoDB connection is configured before running the script.

### 4. Start the backend

From the `server` directory, run the command configured in your server's `package.json`. For example, if your project uses Node's standard entry point:

```bash
node server.js
```

If your entry file or npm script has a different name, use the corresponding command.

### 5. Set up the frontend

Open a second terminal in the repository root and run:

```bash
cd client
npm install
npm run dev
```

Vite will display the local development URL in your terminal. Open that URL in your browser.

Make sure the frontend API configuration points to your local backend while developing locally.

## 🗺️ Application Pages

| Page | Description |
|---|---|
| Home | Introduces the destination explorer and featured places. |
| Places | Browse and search the destination collection. |
| Map | Explore destinations through an interactive map and clickable markers. |
| Destination Details | View information about a selected destination. |
| About | Learn about Nashik Explorer. |

## 🗄️ Database

Nashik Explorer uses MongoDB to store destination information.

Each destination record can contain information such as:

- Destination name and URL slug
- Category and descriptions
- Address and geographic coordinates
- Distances and estimated travel durations from reference locations
- Recommended visiting period
- Entry information
- Image references and featured status

The `server/seed.js` script populates or updates destination records using their slugs.

## 🌐 Deployment

The live application is available at:

**[https://explore-nashik.onrender.com/](https://explore-nashik.onrender.com/)**

The project is deployed using Render. The frontend is hosted as a static site, while the backend and database configuration support the application's data requests.

## ⚠️ Notes

- Destination information, coordinates, distances, and travel durations should be independently verified before being relied upon for travel decisions.
- Travel durations are estimates and may differ from actual journey times.
- Local development requires the appropriate backend environment variables and database access.
- Keep database credentials and other secrets in environment variables rather than committing them to the repository.

## 👩‍💻 Author

**Kaiye-08**
---

Built to make exploring Nashik easier, one destination at a time. ❤️
