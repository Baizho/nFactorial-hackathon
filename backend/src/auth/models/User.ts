import mongoose, { Document, Schema } from 'mongoose';

enum ProgrammingSkillLevel {
  NoExperience = "No experience",
  ITStudent = "IT student",
  CompetitiveProgrammer = "Competitive programmer",
  ProfessionalDeveloper = "Professional developer",
}

export interface IUser extends Document {
  fullName: string;
  email: string;
  birthDate: string; // Format: DD-MM-YYYY
  phoneNumber: string;
  programmingSkillLevel: ProgrammingSkillLevel;
  cv?: string; // Optional: URL or base64 encoded string
  willingToParticipateOnPaidBasis: boolean;
  telegramHandle: string;
  linkedInLink: string;
  socialMediaLinks: string[]; // Array of URLs
  gitHubHandle: string;
  educationalPlacement: string; // University/College/High school
  specialtyAtUniversity: string;
  jobPlacement?: string; // Optional
  programmingExperienceDescription: string;
  pastProgrammingProjects: string;
  bestAchievements: string;
  availabilityInAlmaty: boolean;
  needAccommodationInAlmaty: boolean;
  representativeGroups: string[]; // Array of group names

}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  role: { type: String, required: true, default: "user" },
  calendly_link: { type: String, required: false },
  image: { type: String, required: true, default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" },
  descr: { type: String, required: true, default: "No description" }
});

export default mongoose.model<IUser>('User', UserSchema);
