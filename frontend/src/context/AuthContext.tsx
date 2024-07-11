"use client";
import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect,
    useRef,
} from "react";
import { useRouter } from "next/navigation";

import axios from "axios";
import axiosInstance from "@/axiosInstance";



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
    representativeGroups: [],
    isApprovedByAI: "",
    commentsByAI: "",
    feedbackByMentor: "",
    task: "",
    taskResponse: "",
};
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
    socialMediaLinks: string;
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
    isApprovedByAI?: string;
    commentsByAI?: string;
    feedbackByMentor?: string;
    task?: string;
    taskResponse?: string;
}

interface UserContextType {
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User>>;
    loginUser: (email: string, password: string) => Promise<void>;
    LogoutUser: () => void;
}

export const UserContext = createContext<UserContextType | undefined>(
    undefined
);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const router = useRouter();
    const [user, setUser] = useState<User>(initialUser);

    const loginUser = async (email: string, password: string) => {
        console.log("Logging User");
        try {
            const res = await axiosInstance.post("/loginUser", {
                email: email,
                birthDate: password,
            });
            setUser(res.data);
            router.push("/profile")
        } catch (err) {
            console.log("error loggin in", err);
        }
    };

    const LogoutUser = () => {
        setUser(initialUser);
        router.push("/");
    };

    const valueToShare = {
        user,
        setUser,
        loginUser,
        LogoutUser,
    };

    return (
        <UserContext.Provider value={valueToShare}>{children}</UserContext.Provider>
    );
};

// Custom hook for using the User context
const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a BooksProvider");
    }
    return context;
};

export { AuthProvider, useUser };
