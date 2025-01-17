import "dotenv/config";
import express from "express";
import connectDB from "./db";
import cors from 'cors';
import authRouter from "./auth/auth-router";
import coursesRouter from "./courses/course-router";
import adminRouter from "./admin/admin-router";
import userRouter from "./auth/user-router";
import fileUpload from "express-fileupload"
const TelegramBot = require('node-telegram-bot-api');

const { google } = require('googleapis');
const app = express();

const corsOptions = {
  origin: 'https://n-factorial-hackathon-front.vercel.app',
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(adminRouter);
app.use(userRouter);
app.use("/", authRouter);
app.use("/courses", coursesRouter);

// connectDB();
const bot = new TelegramBot('7417108536:AAHZhiJ-uxvcR_U0eOiqIFzluuwUK2tEuoU', { polling: true });

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

const sheets = google.sheets({ version: 'v4', auth });

const spreadsheetId = '1aPKWjE2bBLMb8_Z29H9QM1omAel7isfQQKg2-suDfzc';


bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const userName = msg.chat.username || 'Unknown';

  // Save user to Google Sheets
  const request = {
    spreadsheetId,
    range: 'mentors!A1:B1', // Adjust the range as needed
    valueInputOption: 'RAW',
    insertDataOption: 'INSERT_ROWS',
    resource: {
      values: [[chatId, userName]],
    },
  };

  try {
    await sheets.spreadsheets.values.append(request);
    bot.sendMessage(chatId, 'Welcome! You have been registered.');
  } catch (error) {
    console.error('Error saving user to Google Sheets:', error);
    bot.sendMessage(chatId, 'There was an error registering you.');
  }
});

app.post('/notify-admin', async (req, res) => {
  const { email, fullName } = req.body;

  const message = `User ${fullName} (${email}) who is approved by AI has pressed the "Check Your Application" button. Please send them a task.`;

  try {
    // Retrieve all users from Google Sheets
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'mentors!A:B', // Adjust the range as needed
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      return res.status(404).send('No users found.');
    }

    // Send message to each user
    const sendMessages = rows.map(async (row) => {
      const chatId = row[0];
      return bot.sendMessage(chatId, message);
    });

    await Promise.all(sendMessages);
    res.status(200).send('Notifications sent to all users.');
  } catch (error) {
    console.error('Error sending notifications:', error);
    res.status(500).send('Failed to send notifications.');
  }
});
app.listen(process.env.PORT, () => {
  console.log("server running at http://localhost:5000");
});
