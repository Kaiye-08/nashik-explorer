const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const placeRoutes = require("./routes/placeRoutes");

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Nashik Explorer API is running!"
    });
});

app.get("/api/test", (req, res) => {
    res.json({
        message: "Hello from the Nashik Explorer backend!"
    });
});

app.use("/api/places", placeRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});