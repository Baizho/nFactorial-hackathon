
const { GoogleGenerativeAI } = require("@google/generative-ai");

import User from "../application";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);


const systemPromptCheckApplication = `
Return your response in russian except for the decision.
You are an AI designed to evaluate applicants for the largest bootcamp in Central Asia. Your primary goal is to autonomously assess each applicant based on a variety of criteria and provide a decision. The bootcamp receives over 4000 applications annually but has only 10 Admission Mentors. Your assessments will help speed up the evaluation process.
There are 75 scholarship available for students to participate in this bootcamp.
The acceptance rate is 3% for people who are applying for a scholarship, 15% for those who are willing to pay to participate.
It is not neccessary for applicants experience to be related to AI, it is important for them to show potential in programming itself.
### Input Data Structure
You will receive the following information in json for each applicant:
{
    "fullName": "Full name of the user",
    "email": "Email of the user",
    "birthDate": "Birth date in format DD.MM.YYYY",
    "phoneNumber": "Phone number of the user",
    "programmingSkillLevel": "One of the predefined skill levels: NoExperience, SelfStudy, ITStudent, CompetitiveProgrammer, ProfessionalDeveloper",
    "cv": "Optional URL or base64 encoded string of the user's CV",
    "willingToParticipateOnPaidBasis": "Boolean indicating willingness to participate on a paid basis or get  scholarship",
    "telegramHandle": "Telegram handle of the user",
    "linkedInLink": "LinkedIn profile URL of the user",
    "socialMediaLinks": "social media profile URLs",
    "gitHubHandle": "GitHub handle of the user",
    "educationalPlacement": "Educational institution (University/College/High school)",
    "specialtyAtUniversity": "User's specialty at university",
    "jobPlacement": "Optional job placement (company name)",
    "programmingExperienceDescription": "Description of the user's programming experience",
    "pastProgrammingProjects": "Description of past programming projects",
    "bestAchievements": "Description of the user's best achievements",
    "ideas": "User's ideas for AI startups",
    "favAI": "User's favorite AI applications",
    "availabilityInAlmaty": "Boolean indicating availability in Almaty",
    "needAccommodationInAlmaty": "Boolean indicating need for accommodation in Almaty",
    "representativeGroups": "Group the applicant belongs to",
    "feedback": "Feedback about the user",
    "isApprovedByAI": "Indicates whether the user is approved by AI"
  }
1. if the user is not available in ALmaty, it means he should get rejected immediantly.
2. If the user has little information or if the information is not understandable, reject it immediantly.

### Evaluation Criteria

Your evaluation should be based on the following criteria:

1. Programming Skill Level: Assess the applicant's programming skill level.
2. Programming Experience: Evaluate the detailed description of the applicant's programming experience.
3. Past Programming Projects:  Consider the complexity and relevance of the applicant's past programming projects.
4. Achievements: Look at the significance and impact of the applicant's achievements.
5. Ideas for AI Startups: Assess the creativity and feasibility of the applicant's ideas for AI startups.
6. Commitment: Consider the applicant's willingness to participate on a paid basis or if they are capable of achieving a scholarship, their availability in Almaty for the summer, and whether they need accommodation.
7. Social Media and Professional Profiles: Review the applicant's LinkedIn, GitHub, and other social media profiles to understand their professional network and contributions.
8. Representative Groups: Give special consideration to applicants who belong to specific groups (e.g., informatics teachers, professors in regional areas).
9. Feedback: Learn from feedback provided by mentors and reviewers to improve your evaluations and avoid repeating mistakes.
Remember that the answer could be "not sure" if you think that you need a professional mentors help in making the decision. Give this answer if it is really required.
Remember to base your response based on all criterias, do not focus too much on one skill.
### Output Format

For each applicant, provide a decision in the following format:

- Decision: "yes", "no", or "not sure"
- Comments: Provide a detailed explanation of your decision, especially if the decision is "not sure". Include considerations about their skill level, experience, projects, achievements, commitment, and any special circumstances.

Here are examples of rejected students, take this into consideration because accepted students should have better applications:
{
    "fullName": "",
    "email": "",
    "birthDate": "",
    "phoneNumber": "",
    "programmingSkillLevel": "SelfStudy",
    "cv": "",
    "willingToParticipateOnPaidBasis": "",
    "telegramHandle": "@Black_ali567",
    "linkedInLink": "",
    "socialMediaLinks": "https://www.instagram.com/bidano5?igsh=MXdhZWU0MGRhOGxzYw==",
    "gitHubHandle": "",
    "educationalPlacement": "РФМШ",
    "specialtyAtUniversity": "",
    "jobPlacement": "",
    "programmingExperienceDescription": "Обучался программированию с лета 10 класса.Проходил курсы на Udemy по машинному обучению а также посещал оффлайн занятия в КазНУ от Samsung по Big Data",
    "pastProgrammingProjects": "",
    "bestAchievements": "Проходил стажировку в Jusan bank в отделе кредитования, организовывал турнир на 200 человек среди школ Алматы, прошел на финальный этап AITU Icode 2024",
    "ideas": "",
    "favAI": "",
    "availabilityInAlmaty": "",
    "needAccommodationInAlmaty": "",
    "representativeGroups": "",
    "feedback": "",
    "isApprovedByAI": ""
}

{
    "fullName": "",
    "email": "Qserik",
    "birthDate": "",
    "phoneNumber": "",
    "programmingSkillLevel": "ProfessionalDeveloper",
    "cv": "",
    "willingToParticipateOnPaidBasis": "",
    "telegramHandle": "Qserik",
    "linkedInLink": "",
    "socialMediaLinks": "",
    "gitHubHandle": "Serik96",
    "educationalPlacement": "Казгу",
    "specialtyAtUniversity": "Геоинформатика",
    "jobPlacement": "Астер",
    "programmingExperienceDescription": "React, vue",
    "pastProgrammingProjects": "",
    "bestAchievements": "Занял первое место по шахматам в соревнованиях",
    "ideas": "",
    "favAI": "",
    "availabilityInAlmaty": "",
    "needAccommodationInAlmaty": "",
    "representativeGroups": "",
    "feedback": "",
    "isApprovedByAI": ""
  }

  {
    "fullName": "",
    "email": "",
    "birthDate": "",
    "phoneNumber": "",
    "programmingSkillLevel": "SelfStudy",
    "cv": "",
    "willingToParticipateOnPaidBasis": "",
    "telegramHandle": "@lilulsus",
    "linkedInLink": "https://www.linkedin.com/in/ilyas-karim-link?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    "socialMediaLinks": "",
    "gitHubHandle": "CHOCOLATE-KZ",
    "educationalPlacement": "IITU University",
    "specialtyAtUniversity": "Software engineer",
    "jobPlacement": "",
    "programmingExperienceDescription": "Здравствуйте, меня зовут Ильяс. Я хочу стать разработчиком. Это моя мечта и цель на данном этапе жизни. Идея стать программистом пришла мне в голову еще когда я был в школе. С тех пор я непрерывно обучаюсь и прокачиваю себя в IT сфере. Попробовал себя в web-design, product-design, frontend, backend. Изучал JS, PHP, SQL, Python, C++.\n\nВ марте 2022 года участвовал в Олимпиаде WorldSkillsKazakhstan и занял 3-е место.\n\nТакже моей главной мечтой является поработать с профессионалами и получать регулярный feedback от них , а также их наставление. У меня огромное желание обучаться и изучать.",
    "pastProgrammingProjects": "Сайты, интернет-магазины, телеграмм боты, паркинг сайтов",
    "bestAchievements": "Попробовал себя в web-design, product-design, frontend, backend. Изучал JS, PHP, SQL, Python, C++.\n\nВ марте 2022 года участвовал в Олимпиаде WorldSkillsKazakhstan и занял 3-е место.\n\nБыл тим-лидом клуба IT в колледже. Руководил проектом для колледжа.",
    "ideas": "",
    "favAI": "",
    "availabilityInAlmaty": "",
    "needAccommodationInAlmaty": "",
    "representativeGroups": "",
    "feedback": "",
    "isApprovedByAI": ""
  }

`;

const genModelCheck = genAI.getGenerativeModel({ model: "gemini-1.5-flash", systemInstruction: systemPromptCheckApplication, generationConfig: { "response_mime_type": "application/json" } });
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
async function checkUserApplication(user: User | undefined | null | void) {
  // console.log(user);
  const feedbackByMentor: any[] = [];
  if (!user) return null;
  if (!user.email) return null;
  const email = user.email;
  if (!email) return null;
  // const user = await getUserByEmailService(email);
  const client = await auth.getClient();
  const sheets = google.sheets({ version: 'v4', auth: client });

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
  const feedbackIndex = headers.indexOf('feedbackByMentor');

  if (feedbackIndex === -1) {
    headers.push('isApprovedByAI');
  }

  for (let i = 1; i < rows.length; i += 1) {
    feedbackByMentor.push(rows[i][feedbackIndex === -1 ? headers.length - 1 : feedbackIndex]);
  }

  const res = await genModelCheck.generateContent(`
        Here is the users information:
        ${JSON.stringify(user)}.

        Here is data of how mentors gave feedback to students that you made the decision of "not sure". 
        Take these feedback into consideration when looking at the users:
    `);
  const feedback = await res.response;
  return JSON.parse(feedback.text());
}


export { checkUserApplication }
