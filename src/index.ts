import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import recipeRoutes from "./routes/recipes";

const app = express();

let server: any;

// setup cors. test, new feature 1, feature 2, test commit 4

app.use(
  cors({
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
  })
);

// setup body parser.

app.use(bodyParser.json({ limit: "100kb" }));

// load all routes.

app.use("/recipes", recipeRoutes);

async function startServer() {
  try {
    // Load express app to listen on config port.
    const port = 3000
    server = app.listen(port, () => {
      console.log(`Service ready on :${port}`)
    });
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    process.exit(1);
  }
}

function stop() {
  console.log("Stopping server");
  server.close();
}

export { server, startServer, stop };

startServer();
