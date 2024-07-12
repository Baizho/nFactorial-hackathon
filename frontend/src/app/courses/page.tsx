'use client';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { JSX, SVGProps, useEffect, useState } from "react";
import axiosInstance from "@/axiosInstance";
import User, { useUser } from "@/context/AuthContext";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Separator } from "@radix-ui/react-separator";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Props {

}

const userApplication = (props: Props) => {
  const router = useRouter();
  const email = useUser().user.email;
  const [user, setUser] = useState<User | undefined>();
  const [response, setResponse] = useState(user?.taskResponse);
  console.log(email);
  useEffect(() => {
    if (!email) {
      router.push("/login");
      return;
    }
    const getData = async () => {
      const res = await axiosInstance.post("/userEmail", {
        email: email
      });
      const user = res.data;
      // console.log(user);
      setUser(user);
    }
    getData();
  }, []);

  const handleResponseChange = (response: string) => {
    setResponse(response)
  };

  const handleSendResponse = async (email: string) => {
    console.log("here");
    const res = await axiosInstance.post("/taskResponse", { email: email, githubLink: response })
      .then((res) => {
        console.log("Response sent successfully:", res.data);
        setResponse("");
      })
      .catch((error) => {
        console.error("Failed to send response:", error);
      });
    console.log("here it is");
    const getData = async () => {
      console.log("user getting");
      const res = await axiosInstance.post("/userEmail", {
        email: email
      });
      console.log("user is upadted");
      const user = res.data;
      // console.log(user);
      setUser(user);
    }
    getData();
  };

  if (!user) {
    return <div className='text-center'>Your application is loading</div>
  }
  return (
    <div className="w-full max-w-4xl mx-auto py-10 px-4 md:px-6">
      <div className="flex items-center gap-6">
        <Avatar className="h-20 w-20">
          <AvatarImage src="/placeholder-user.jpg" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className="grid gap-1">
          <h1 className="text-2xl font-bold">{user.fullName}</h1>
          <p className="text-muted-foreground">{user.email} {user.birthDate}</p>
        </div>
      </div>
      <div className="grid gap-2">
        <div className='text-lg text-black font-bold'>Round 1</div>
        <div className="grid gap-2 text-muted-foreground">
          <div>
            <span className="font-medium">Approval Status: </span>
            {user.isApprovedByAI === "yes" && <span className='text-green-500 font-bold text-lg'>Approved</span>}
            {user.isApprovedByAI === "not sure" && <span className='text-yellow-400 font-bold text-lg'>Not sure (wait for mentor to check)</span>}
            {user.isApprovedByAI === "no" && <span className='text-red-500 font-bold text-lg'>Rejected</span>}
          </div>
          <div>
            <span className="font-medium">Comments: </span>
            <span>
              {user.commentsByAI}
            </span>
          </div>
          <div>
            <span className="font-medium">Feedback from Mentor: </span>
            <span>
              {!user.feedbackByMentor && user.isApprovedByAI === "not sure" && <span>Waiting for Mentor feedback...</span>}
              {!user.feedbackByMentor && user.isApprovedByAI === "yes" && <span>You already got accepted without mentor feedback!</span>}
              {!user.feedbackByMentor && user.isApprovedByAI === "no" && <span>You already got rejected without mentor feedback!</span>}
              {user.feedbackByMentor && <span>{user.feedbackByMentor}</span>}
            </span>
          </div>
        </div>
        {user.isApprovedByAI === "yes" && (
          <>
            <div className='text-lg text-black font-bold'>Round 2</div>
            <div className="grid gap-2 text-muted-foreground">
              <div>
                <span className="font-medium">Task Response Status: </span>
                {!user.task && <span className='text-yellow-500 font-bold text-lg'>Awaiting to receive a task</span>}
                {user.task && user.taskResponse && <span className='text-green-500 font-bold text-lg'>Task Sent</span>}
                {user.task && !user.taskResponse && <span className='text-red-500 font-bold text-lg'>Awaiting task submission</span>}
              </div>
              <div>
                <span className="font-medium">Task Link: </span>
                <span className='text-black font-semibold'>{user.task}</span>
              </div>
              <div>
                <span className="font-medium">Task response Github Link: </span>
                {user.taskResponse && <span className='text-black'>{user.taskResponse}</span>}
                {!user.taskResponse && (
                  <>
                    <Input
                      defaultValue={user.taskResponse}
                      onChange={(e) => handleResponseChange(e.target.value)}
                      placeholder="Enter response"
                      className="bg-white text-black mr-2 border-[2px]"
                    />
                    <Button onClick={() => handleSendResponse(user.email)} className="bg-[#4caf50] text-white">
                      Send Response
                    </Button>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>
      <Separator className="my-6" />
      <div className="grid md:grid-cols-2 gap-8">
        <div className="grid gap-6">
          <div className="grid gap-2">
            <div className='flex flex-col gap-y-4'>
              <h2 className="text-lg font-semibold">Contact Information</h2>
              <div className="grid gap-y-3 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <PhoneIcon className="w-5 h-5" />
                  <span>{user.phoneNumber}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 text-white">
                    <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.22l15.54-6c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.16.73-.59.91-1.19.56L12 16.3l-2.56 2.45c-.31.31-.57.57-1.16.57z" />
                  </svg>
                  <span>{user.telegramHandle}</span>
                </div>
                <div className="flex items-center gap-2">
                  <LinkedinIcon className="w-5 h-5" />
                  <span>{user.linkedInLink}</span>
                </div>
                <div className="flex items-center gap-2">
                  <GitlabIcon className="w-5 h-5" />
                  <span>{user.gitHubHandle}</span>
                </div>
                <div className="flex items-center gap-2">
                  <TextIcon className="w-5 h-5" />
                  <span>Social Media links: {user.socialMediaLinks}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-y-4">
            <h2 className="text-lg font-semibold">Educational Background</h2>
            <div className="grid gap-y-3 text-muted-foreground">
              <div>
                <span className="font-medium">{user.educationalPlacement}</span>
                <span> - {user.specialtyAtUniversity}</span>
              </div>
              <div>
                <span className="font-medium">Job Placement: </span>
                <span>{user.jobPlacement}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="grid gap-6">
          <div className="flex flex-col gap-y-3">
            <h2 className="text-lg font-semibold">Interests &amp; Ideas</h2>
            <div className="grid gap-2 text-muted-foreground">
              <div>
                <span className="font-medium">Ideas: </span>
                <span>
                  {user.ideas}
                </span>
              </div>
              <div>
                <span className="font-medium">Favorite AI: </span>
                <span>{user.favAI}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-y-3">
            <h2 className="text-lg font-semibold">Availability</h2>
            <div className="grid gap-2 text-muted-foreground">
              <div>
                <span className="font-medium">Willing to Participate on Paid Basis: </span>
                <span>{user.willingToParticipateOnPaidBasis ? "Yes" : "No"}</span>
              </div>
              <div>
                <span className="font-medium">Availability in Almaty: </span>
                <span>{user.availabilityInAlmaty ? "Yes" : "No"}</span>
              </div>
              <div>
                <span className="font-medium">Need for Accommodation: </span>
                <span>{user.needAccommodationInAlmaty ? "Yes" : "No"}</span>
              </div>
              <div>
                <span className="font-medium">Representative Groups: </span>
                <span>{user.representativeGroups}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-4 w-full mt-5">
        <h2 className="text-lg font-semibold">Programming Skills &amp; Experience</h2>
        <div className="grid gap-y-3 text-muted-foreground">
          <div>
            <span className="font-medium">Skill Level: </span>
            <span>{user.programmingSkillLevel}</span>
          </div>
          <div>
            <span className="font-medium">Programming Experience Description: </span>
            <span>{user.programmingExperienceDescription}</span>
          </div>
          <div>
            <span className="font-medium">Past Projects: </span>
            <span>
              {user.pastProgrammingProjects}
            </span>
          </div>
          <div>
            <span className="font-medium">Best Achievements: </span>
            <span>
              {user.bestAchievements}
            </span>
          </div>
        </div>
      </div>
      <Separator className="my-6" />
      <div className="grid gap-4">
        <h2 className="text-lg font-semibold">CV</h2>
        <div className="flex items-center gap-4">
          <FileIcon className="w-6 h-6" />
          <Link href="#" className="hover:underline" prefetch={false}>
            Download John's CV
          </Link>
        </div>
      </div>
    </div>
  )
}

export default userApplication;

function FileIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  )
}


function GitlabIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 13.29-3.33-10a.42.42 0 0 0-.14-.18.38.38 0 0 0-.22-.11.39.39 0 0 0-.23.07.42.42 0 0 0-.14.18l-2.26 6.67H8.32L6.1 3.26a.42.42 0 0 0-.1-.18.38.38 0 0 0-.26-.08.39.39 0 0 0-.23.07.42.42 0 0 0-.14.18L2 13.29a.74.74 0 0 0 .27.83L12 21l9.69-6.88a.71.71 0 0 0 .31-.83Z" />
    </svg>
  )
}


function LinkedinIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}


function PhoneIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}


function TextIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 6.1H3" />
      <path d="M21 12.1H3" />
      <path d="M15.1 18H3" />
    </svg>
  )
}


function XIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}