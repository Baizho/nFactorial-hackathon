import { Request, Response } from 'express';
import User from '../application';
import { checkUserApplication } from '../gemini/gemini';


// Load the service account key JSON file.

const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');


enum ProgrammingSkillLevel {
  NoExperience = "Нет опыта, не программирую",
  SelfStudy = "Обучаюсь самостоятельно используя онлайн курсы",
  ITStudent = "Имею хорошие базовые навыки студента IT",
  CompetitiveProgrammer = "Спортивный программист",
  ProfessionalDeveloper = "Профессиональный разработчик",
}


const initialUser = {
  fullName: "",
  email: "",
  birthDate: "",// Format: DD.MM.YYYY
  phoneNumber: "",
  programmingSkillLevel: ProgrammingSkillLevel.NoExperience,
  cv: "", // Optional: URL or base64 encoded ""
  willingToParticipateOnPaidBasis: false,
  telegramHandle: "",
  linkedInLink: "",
  socialMediaLinks: "",
  gitHubHandle: "",
  educationalPlacement: "", // University/College/High school
  specialtyAtUniversity: "",
  jobPlacement: "", // Optional
  programmingExperienceDescription: "",
  pastProgrammingProjects: "",
  bestAchievements: "",
  ideas: "",
  favAI: "",
  availabilityInAlmaty: false,
  needAccommodationInAlmaty: false,
  representativeGroups: "",
  isApprovedByAI: "",
  commentsByAI: "",
  feedbackByMentor: "",
  task: "",
  taskResponse: "",
};


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
async function getUserByEmailService(email: string): Promise<User | undefined | null | void> {
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
          async function getData() {
            const formQuestion = initialUser;
            await headers.forEach((header, index) => {
              formQuestion[header] = matchingRow[index];
            });
            // console.log(formQuestion);
            return formQuestion;
          }
          const formQuestion: User = await getData();
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
      console.log("Checking user application for email:", email);
      const user = await getUserByEmailService(email);
      if (!user) {
        return res.status(500).json({ error: "User not found" });
      }
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
          return res.status(404).json({ error: "No data found in spreadsheet" });
        }

        // Find the index of the row with the matching email
        const headers = rows[0];
        const emailIndex = headers.indexOf('email');
        const decisionIndex = headers.indexOf('isApprovedByAI');
        const commentIndex = headers.indexOf('commentsByAI');

        const rowIndex = rows.findIndex(row => row[emailIndex] === email);
        if (rowIndex === -1) {
          console.log('No user found with that email.');
          return res.status(404).json({ error: "No user found with that email" });
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
          range: `users!A1:AB${rows.length}`, // Adjust range to cover all rows
          valueInputOption: 'RAW',
          resource: {
            values: rows,
          },
        });

        console.log('User decision updated successfully.');
        res.status(201).json(feedback);
      } catch (error) {
        console.error('Error updating user decision:', error);
        res.status(500).json({ error: "Internal server error while updating user decision" });
      }
    } catch (err: any) {
      console.error('Error checking user application:', err);
      res.status(500).json({ error: "Error checking user application" });
    }
  }


  async assignTask(req: Request, res: Response) {
    const { email, task } = req.body;
    try {
      console.log("checkig user");
      // const user = await getUserByEmailService(email);
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
        const taskIndex = headers.indexOf('task');


        const rowIndex = rows.findIndex(row => row[emailIndex] === email);
        if (rowIndex === -1) {
          console.log('No user found with that email.');
          return;
        }

        // If task column does not exist, add it
        if (taskIndex === -1) {
          headers.push('task');
        }

        // Update the task column
        rows[rowIndex][taskIndex === -1 ? headers.length - 1 : taskIndex] = task;

        // Update the sheet with the new data
        await sheets.spreadsheets.values.update({
          spreadsheetId,
          range: `users!A1:AB${rows.length}`, // Adjust range to cover all rows
          valueInputOption: 'RAW',
          resource: {
            values: rows,
          },
        });

        console.log('User task updated successfully.');
      } catch (error) {
        console.error('Error updating user task:', error);
      }

    } catch (err: any) {
      res.status(500).json({ error: "assigning task failed" });
    }
  }

  async getAssignTask(req: Request, res: Response) {
    const { email } = req.body;
    try {
      console.log("checkig user");
      // const user = await getUserByEmailService(email);
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
        const taskIndex = headers.indexOf('task');


        const rowIndex = rows.findIndex(row => row[emailIndex] === email);
        if (rowIndex === -1) {
          console.log('No user found with that email.');
          return;
        }

        res.status(200).json(rows[rowIndex][taskIndex]);

        console.log('User task returned  successfully.');
      } catch (error) {
        console.error('Error getting user task:', error);
      }

    } catch (err: any) {
      res.status(500).json({ error: "getting task failed" });
    }
  }

  async taskResponse(req: Request, res: Response) {
    const { email, githubLink } = req.body;
    try {
      console.log("checkig user");
      // const user = await getUserByEmailService(email);
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
        const taskResponseIndex = headers.indexOf('taskResponse');


        const rowIndex = rows.findIndex(row => row[emailIndex] === email);
        if (rowIndex === -1) {
          console.log('No user found with that email.');
          return;
        }

        // If task column does not exist, add it
        if (taskResponseIndex === -1) {
          headers.push('taskResponse');
        }

        // Update the task column
        rows[rowIndex][taskResponseIndex === -1 ? headers.length - 1 : taskResponseIndex] = githubLink;

        // Update the sheet with the new data
        await sheets.spreadsheets.values.update({
          spreadsheetId,
          range: `users!A1:AB${rows.length}`, // Adjust range to cover all rows
          valueInputOption: 'RAW',
          resource: {
            values: rows,
          },
        });

        console.log('User task response updated successfully.');
        res.status(201).json({ message: "ok" });
      } catch (error) {
        console.error('Error updating user task response:', error);
      }

    } catch (err: any) {
      res.status(500).json({ error: "assigning task response failed" });
    }
  }
  async getTaskResponse(req: Request, res: Response) {
    const { email } = req.body;
    try {
      console.log("checkig user");
      // const user = await getUserByEmailService(email);
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
        const taskResponseIndex = headers.indexOf('taskResponse');


        const rowIndex = rows.findIndex(row => row[emailIndex] === email);
        if (rowIndex === -1) {
          console.log('No user found with that email.');
          return;
        }


        res.status(200).json(rows[rowIndex][taskResponseIndex]);

        console.log('User task response returned successfully.');
      } catch (error) {
        console.error('Error getting user task response:', error);
      }

    } catch (err: any) {
      res.status(500).json({ error: "getting task response failed" });
    }
  }

  async feedbackByMentor(req: Request, res: Response) {
    const { email, feedback } = req.body;
    try {
      console.log("checkig user");
      // const user = await getUserByEmailService(email);
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
        const feedbackIndex = headers.indexOf('feedbackByMentor');


        const rowIndex = rows.findIndex(row => row[emailIndex] === email);
        if (rowIndex === -1) {
          console.log('No user found with that email.');
          return;
        }

        // If task column does not exist, add it
        if (feedbackIndex === -1) {
          headers.push('feedbackByMentor');
        }

        // Update the task column
        rows[rowIndex][feedbackIndex === -1 ? headers.length - 1 : feedbackIndex] = feedback;

        // Update the sheet with the new data
        await sheets.spreadsheets.values.update({
          spreadsheetId,
          range: `users!A1:AB${rows.length}`, // Adjust range to cover all rows
          valueInputOption: 'RAW',
          resource: {
            values: rows,
          },
        });

        console.log('User task response updated successfully.');
        res.status(201).json({ message: "ok" });
      } catch (error) {
        console.error('Error updating user task response:', error);
      }

    } catch (err: any) {
      res.status(500).json({ error: "assigning task response failed" });
    }
  }

  async getFeedbackByMentor(req: Request, res: Response) {
    const { email } = req.body;
    try {
      console.log("checkig user");
      // const user = await getUserByEmailService(email);
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
        const feedbackIndex = headers.indexOf('feedbackByMentor');


        const rowIndex = rows.findIndex(row => row[emailIndex] === email);
        if (rowIndex === -1) {
          console.log('No user found with that email.');
          return;
        }


        res.status(200).json(rows[rowIndex][feedbackIndex]);

        console.log('User task response returned successfully.');
      } catch (error) {
        console.error('Error getting user task response:', error);
      }

    } catch (err: any) {
      res.status(500).json({ error: "getting task response failed" });
    }
  }
  async changeAnswer(req: Request, res: Response) {
    const { email, answer } = req.body;
    try {
      console.log("checkig user");
      // const user = await getUserByEmailService(email);
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
        const aiIndex = headers.indexOf('isApprovedByAI');


        const rowIndex = rows.findIndex(row => row[emailIndex] === email);
        if (rowIndex === -1) {
          console.log('No user found with that email.');
          return;
        }

        // If task column does not exist, add it
        if (aiIndex === -1) {
          headers.push('feedbackByMentor');
        }

        // Update the task column
        rows[rowIndex][aiIndex === -1 ? headers.length - 1 : aiIndex] = answer;

        // Update the sheet with the new data
        await sheets.spreadsheets.values.update({
          spreadsheetId,
          range: `users!A1:AB${rows.length}`, // Adjust range to cover all rows
          valueInputOption: 'RAW',
          resource: {
            values: rows,
          },
        });

        console.log('User task response updated successfully.');
        res.status(201).json({ message: "ok" });
      } catch (error) {
        console.error('Error updating user task response:', error);
      }

    } catch (err: any) {
      res.status(500).json({ error: "assigning task response failed" });
    }
  }
}

export default UserController;
