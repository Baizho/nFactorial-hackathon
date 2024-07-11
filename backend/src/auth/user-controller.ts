import { Request, Response } from 'express';

// Load the service account key JSON file.
const serviceAccount = require('../../third-container-429109-j6-15facf76dc65.json');

const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');



// Create an authorized client.
const auth = new google.auth.GoogleAuth({
  credentials: serviceAccount,
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

// Specify the spreadsheet ID and range.
const spreadsheetId = process.env.SpreadSheetId;


class UserController {

  async getUserByEmail(req: Request, res: Response) {
    const { email } = req.body;
    const range = "users"; // Adjust the range as needed.
    console.log("getting users");
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


}

export default UserController;
