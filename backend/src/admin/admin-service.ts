import User from "../application";

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

class AdminService {

  async getAllUsers(): Promise<User[] | void | undefined> {
    try {
      const range = "users"; // Adjust the range as needed.
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

            // Map rows to FormQuestions objects
            const formQuestionsArray = await dataRows.map(row => {
              const formQuestion = {};
              headers.forEach((header, index) => {
                formQuestion[header] = row[index];
              });
              return formQuestion;
            });

            // Log the resulting objects
            console.log('Mapped FormQuestions:', formQuestionsArray);
            return formQuestionsArray;
          } else {
            console.log('No data found.');
          }
        } catch (error) {
          console.error('Error reading spreadsheet:', error);
        }
      } catch (err: any) {
        console.error('Not found', err);
      }
    } catch (error) {
      console.error('Failed to fetch users:', error);
      throw error;
    }
  }

  async getUserByEmail(email: string): Promise<User | undefined | null | void | {}> {
    const range = "users"; // Adjust the range as needed.
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
}

export default new AdminService();
