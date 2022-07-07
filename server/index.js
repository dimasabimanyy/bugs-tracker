const express = require("express");
const colors = require("colors");
require("dotenv").config();
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const cors = require("cors");
const port = process.env.PORT || 5000;
const connectDb = require("./config/db");

const app = express();

connectDb();

app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "DEVELOPMENT",
  })
);

app.listen(port, console.log(`Server started on port ${port}`));
