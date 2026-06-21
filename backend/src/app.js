const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors")

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

// require all the routes here
const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")

// using all the routes here 
app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)

// Serve static frontend files in production
if (process.env.NODE_ENV === "production") {
    const path = require("path");
    app.use(express.static(path.join(__dirname, "../../frontend/dist")));

    // Handle client-side routing (React Router)
    app.get("*splat", (req, res, next) => {
        if (req.path.startsWith("/api")) {
            return next(); // Don't intercept API requests
        }
        res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
    });
}

module.exports = app;


