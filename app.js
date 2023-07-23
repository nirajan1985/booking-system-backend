const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");

const roomRoutes = require("./routes/rooms");
const bookingRoutes = require("./routes/bookings");

const cors = require("cors");

const db = require("./models");

const app = express();

app.use(cors());

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        connectSrc: ["'self'", "http://localhost:3000"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        upgradeInsecureRequests: [],
      },
    },
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up routes
app.use("/api/rooms", roomRoutes);
app.use("/api/bookings", bookingRoutes);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(err.stack);
});

// sync all models with database
db.sequelize
  .sync()
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) => {
    console.log("Error syncing with database:", error);
  });
