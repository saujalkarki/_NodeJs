const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const morgan = require("morgan");

const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

//Middlewares
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(morgan("tiny"));
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log("Hello this is the first middleware");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// tour router
app.use("/api/v1/tours", tourRouter);

// user router
app.use("/api/v1/users", userRouter);

// Server
const port = process.env.PORT || 3216;
const URI = process.env.MONGO_URI;

const { connectdb } = require("./dbConfig/dbConfig");
connectdb(URI);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
