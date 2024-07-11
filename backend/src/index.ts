import "dotenv/config";
import express from "express";
import connectDB from "./db";
import cors from 'cors';
import { gpt } from './openai/openai';
import authRouter from "./auth/auth-router";
import coursesRouter from "./courses/course-router";
import adminRouter from "./admin/admin-router";
import userRouter from "./auth/user-router";
import fileUpload from "express-fileupload"


const app = express();
app.use(cors());
app.use(express.json());
app.post("/gpt", gpt);
app.use(adminRouter);
app.use(userRouter);
app.use("/", authRouter);
app.use("/courses", coursesRouter);

// connectDB();

const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

// Load the service account key JSON file.
const serviceAccount = require('../third-container-429109-j6-15facf76dc65.json');

// Create an authorized client.
const auth = new google.auth.GoogleAuth({
  credentials: serviceAccount,
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

// Specify the spreadsheet ID and range.
const spreadsheetId = '1aPKWjE2bBLMb8_Z29H9QM1omAel7isfQQKg2-suDfzc';
const range = "users!A2:V2"; // Adjust the range as needed.

async function readSpreadsheet() {
  const client = await auth.getClient();
  const sheets = google.sheets({ version: 'v4', auth: client });

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const rows = response.data.values;
    if (rows.length) {
      // Extract headers
      const headers = rows[0];
      // Extract data rows
      const dataRows = rows.slice(1);

      // Map rows to FormQuestions objects
      const formQuestionsArray = dataRows.map(row => {
        const formQuestion = {};
        headers.forEach((header, index) => {
          formQuestion[header] = row[index];
        });
        return formQuestion;
      });

      // Log the resulting objects
      console.log('Mapped FormQuestions:', formQuestionsArray);
    } else {
      console.log('No data found.');
    }
  } catch (error) {
    console.error('Error reading spreadsheet:', error);
  }
}

readSpreadsheet();


app.listen(process.env.PORT, () => {
  console.log("server running at http://localhost:5000");
});
