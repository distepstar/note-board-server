import express, { Express } from "express";
import * as cors from "cors";
import dotenv from 'dotenv';
import { connect, ConnectOptions } from "mongoose";
import bodyParser from "body-parser";
import { defaultRouter } from "../routes";
import { getCurrentDateTime } from "../utils/datetime";
import { Kanban } from "../controllers/Kanban/index";


// mongoose
const mongooseInit = async () => {
  const options: ConnectOptions = {
    connectTimeoutMS: 5000,
  }

  process.env.MONGODB_URL && await connect(process.env.MONGODB_URL, options)
    .catch(error => console.error(error));

}

// configuration init
const globalInit = async (): Promise<{ app: Express, port: string | undefined, corsOptions: cors.CorsOptions }> => {
  // dotenv
  dotenv.config();

  const app: Express = express();
  const port: string | undefined = process.env.PORT;
  // cors
  const allowedOrigins = ["http://localhost:5173"];
  const corsOptions: cors.CorsOptions = {
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "X-Access-Token",
    ],
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) === -1) {
        let msg = "The CORS policy for this site doesn not allow access from the specific Origin";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    preflightContinue: false,
  }


  await Promise.all([mongooseInit(), Kanban.initializeKanbanDataOnServerStart()]).catch((err) => console.error(`Mongoose database init error: ${err}`));

  return { app, port, corsOptions };
}

export const main = async () => {
  const { app, port, corsOptions } = await globalInit();
  // cors settings
  app.use(cors.default(corsOptions));
  // body-parser
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());
  // default router
  app.use('/api', defaultRouter);

  // listen to port
  app.listen(port, () => {
    console.log(`⚡️  [server] ${getCurrentDateTime()}: Server is running at http://localhost:${port}`);
  });
}
