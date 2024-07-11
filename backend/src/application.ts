enum ProgrammingSkillLevel {
    NoExperience = "Нет опыта, не программирую",
    SelfStudy = "Обучаюсь самостоятельно используя онлайн курсы",
    ITStudent = "Имею хорошие базовые навыки студента IT",
    CompetitiveProgrammer = "Спортивный программист",
    ProfessionalDeveloper = "Профессиональный разработчик",
}
export default interface User {
    fullName: string;
    email: string;
    birthDate: string; // Format: DD.MM.YYYY
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
    ideas: string,
    favAI: string,
    availabilityInAlmaty: boolean;
    needAccommodationInAlmaty: boolean;
    representativeGroups: string[];
    isApprovedByAI: string;
    commentsByAI: string;
    feedbackByMentor: string;
    task: string;
    taskResponse: string;
}