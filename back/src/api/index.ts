import serverless from "serverless-http";
import "reflect-metadata";
import { AppDataSource } from "../config/dataSource";
import { preLoadCategories } from "../helpers/preLoadCategories";
import { preLoadProducts } from "../helpers/preLoadProducts";
import app from "../server";

let initialized = false;

// Handler para Vercel
const handler = async (req: any, res: any) => {
  if (!initialized) {
    console.log("Initializing DB...");
    await AppDataSource.initialize();
    await preLoadCategories();
    await preLoadProducts();
    initialized = true;
    console.log("DB ready");
  }

  const expressHandler = serverless(app);
  return expressHandler(req, res);
};

export default handler;
