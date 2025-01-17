
import dotenv from 'dotenv';

dotenv.config();


const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');



// Create an authorized client.
const auth = new google.auth.GoogleAuth({
  credentials: {
    type: process.env.type,
    project_id: process.env.project_id,
    private_key_id: process.env.private_key_id,
    private_key: process.env.private_key,
    client_email: process.env.client_email,
    client_id: process.env.client_id,
    auth_uri: process.env.auth_uri,
    token_uri: process.env.token_uri,
    auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
    client_x509_cert_url: process.env.client_x509_cert_url,
    universe_domain: process.env.universe_domain,
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

// Specify the spreadsheet ID and range.
const spreadsheetId = process.env.SpreadSheetId;

class AuthService {
  async loginUser(email, birthDate) {
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
        return null;
      }

      // Find the index of the relevant columns
      const headers = rows[0];
      const emailIndex = headers.indexOf('email');
      const birthDateIndex = headers.indexOf('birthDate');

      if (emailIndex === -1 || birthDateIndex === -1) {
        console.error('Required columns not found in the sheet.');
        return null;
      }

      // Find the row with the matching email and birth date
      console.log("finding row");
      console.log(rows);
      const userRow = rows.find(row => row[emailIndex] === email && row[birthDateIndex] === birthDate);
      if (!userRow) {
        return null;
      }

      // Map the user row to an object
      const user = {};
      console.log("found row");
      headers.forEach((header, index) => {
        user[header] = userRow[index];
      });
      console.log("user succesfully registed");
      return user;
    } catch (error) {
      console.error('Error reading spreadsheet:', error);
      return null;
    }
  }
}

export default AuthService;
