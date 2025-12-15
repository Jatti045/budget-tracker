// Vercel Serverless Handler for Express App
// This file is automatically used by Vercel to handle HTTP requests

import { Request, Response } from "express";
import app from "../src/server";

// Export the app directly as the default handler for Vercel
export default app;
