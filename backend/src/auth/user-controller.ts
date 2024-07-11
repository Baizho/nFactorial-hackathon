import { Request, Response } from 'express';
import User from '../application';
import { checkUserApplication } from '../gemini/gemini';

// Load the service account key JSON file.
const serviceAccount = require('../../third-container-429109-j6-15facf76dc65.json');

const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');



// Create an authorized client.
const auth = new google.auth.GoogleAuth({
  credentials: serviceAccount,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

// Specify the spreadsheet ID and range.
const spreadsheetId = process.env.SpreadSheetId;
async function getUserByEmailService(email: string): Promise<User | undefined | null | void | {}> {
  const range = "users"; // Adjust the range as needed.
  console.log("authorizd");
  try {
    console.log("authorizd");
    const client = await auth.getClient();
    console.log("authorizd");
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

        // Find the row with the matching email
        const matchingRow = dataRows.find(row => {
          const emailIndex = headers.indexOf('email');
          return row[emailIndex] === email;
        });

        if (matchingRow) {
          // Map the matching row to a FormQuestions object
          const formQuestion = {};
          await headers.forEach((header, index) => {
            formQuestion[header] = matchingRow[index];
          });
          console.log(formQuestion);
          return formQuestion;
        } else {
          console.log('No user found with that email.');
        }
      } else {
        console.log('No data found.');
      }
    } catch (error) {
      console.error('Error reading spreadsheet:', error);
    }
  } catch (err: any) {
    console.error('Not found', err);
  }
}

class UserController {



  async getUserByEmail(req: Request, res: Response) {
    const { email } = req.body;
    const range = "users"; // Adjust the range as needed.
    // console.log("getting users");
    try {
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

          // Find the row with the matching email
          const matchingRow = dataRows.find(row => {
            const emailIndex = headers.indexOf('email');
            return row[emailIndex] === email;
          });

          if (matchingRow) {
            // Map the matching row to a FormQuestions object
            const formQuestion = {};
            await headers.forEach((header, index) => {
              formQuestion[header] = matchingRow[index];
            });
            return res.status(200).json(formQuestion);
          } else {
            return res.status(404).json({ error: 'No user found with that email.' });
          }
        } else {
          return res.status(404).json({ error: 'No data found.' });
        }
      } catch (error) {
        console.error('Error reading spreadsheet:', error);
        return res.status(500).json({ error: 'Internal server error.' });
      }
    } catch (err: any) {
      console.error('Not found', err);
    }
  }

  async checkUserApplication(req: Request, res: Response) {
    const { email } = req.body;
    try {
      console.log("checkig user");
      const user = await getUserByEmailService(email);
      console.log(user);
      const feedback = await checkUserApplication(user);

      const client = await auth.getClient();
      const sheets = google.sheets({ version: 'v4', auth: client });

      try {
        // Read the existing data
        const response = await sheets.spreadsheets.values.get({
          spreadsheetId,
          range: 'users', // Fetch all data from the sheet
        });

        const rows = response.data.values;
        if (!rows.length) {
          console.log('No data found.');
          return;
        }

        // Find the index of the row with the matching email
        const headers = rows[0];
        const emailIndex = headers.indexOf('email');
        const decisionIndex = headers.indexOf('isApprovedByAI');
        const commentIndex = headers.indexOf('commentsByAI');


        const rowIndex = rows.findIndex(row => row[emailIndex] === email);
        if (rowIndex === -1) {
          console.log('No user found with that email.');
          return;
        }

        // If decision column does not exist, add it
        if (decisionIndex === -1) {
          headers.push('isApprovedByAI');
        }


        // Update the decision column
        rows[rowIndex][decisionIndex === -1 ? headers.length - 1 : decisionIndex] = feedback.Decision;

        // If comment column does not exist, add it
        if (commentIndex === -1) {
          headers.push('commentsByAI');
        }
        rows[rowIndex][commentIndex === -1 ? headers.length - 1 : commentIndex] = feedback.Comments;

        // Update the sheet with the new data
        await sheets.spreadsheets.values.update({
          spreadsheetId,
          range: `users!A1:Z${rows.length}`, // Adjust range to cover all rows
          valueInputOption: 'RAW',
          resource: {
            values: rows,
          },
        });

        console.log('User decision updated successfully.');
      } catch (error) {
        console.error('Error updating user decision:', error);
      }
      res.status(201).json(feedback);
    } catch (err: any) {
      res.status(500).json({ error: "error checking user application" });
    }
  }

  async assignTask(req: Request, res: Response) {

  }
}

export default UserController;
