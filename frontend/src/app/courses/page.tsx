'use client';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { JSX, SVGProps, useEffect, useState } from "react";
import adminInstance from "@/adminInstance";

export default function TaskManagement({ openModal }: any) {
  const [users, setUsers] = useState<any[]>([]);
  const [tasks, setTasks] = useState<{ [key: string]: string[] }>({});
  const [responses, setResponses] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    adminInstance.get("/user/all")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setUsers(res.data);
          res.data.forEach((user: any) => fetchAssignedTasks(user.email));
        } else {
          console.error("Expected an array but got:", res.data);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch users:", error);
      });
  }, []);

  const fetchAssignedTasks = (email: string) => {
    adminInstance.post("/getAssignTask", { email })
      .then((res) => {
        setTasks(prevTasks => ({ ...prevTasks, [email]: res.data.tasks || [] }));
      })
      .catch((error) => {
        console.error("Failed to fetch assigned tasks:", error);
      });
  };

  const handleResponseChange = (email: string, taskResponse: string) => {
    setResponses(prevResponses => ({ ...prevResponses, [email]: taskResponse }));
  };

  const handleSendResponse = (email: string) => {
    const response = responses[email];
    adminInstance.post("/taskResponse", { email, response })
      .then((res) => {
        console.log("Response sent successfully:", res.data);
        setResponses(prevResponses => ({ ...prevResponses, [email]: "" })); // Clear the input after response is sent
      })
      .catch((error) => {
        console.error("Failed to send response:", error);
      });
  };

  return (
    <div className="flex flex-col h-screen bg-[#1a1a1a] text-white">
      <header className="bg-[#2b2b2b] py-4 px-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Task Management</h1>
      </header>
      <main className="flex-1 overflow-auto p-6">
        <div className="bg-[#2b2b2b] rounded-lg shadow-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name and Email</TableHead>
                <TableHead>Assigned Tasks</TableHead>
                <TableHead>Response</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                users.map((user: any, index) =>
                  <TableRow key={index}>
                    <TableCell>{user.fullName} {user.email}</TableCell>
                    <TableCell>
                      {
                        tasks[user.email]?.map((task: string, taskIndex: number) => (
                          <p key={taskIndex}>{task}</p>
                        )) || "No tasks assigned"
                      }
                    </TableCell>
                    <TableCell>
                      <input
                        value={responses[user.email] || ""}
                        onChange={(e) => handleResponseChange(user.email, e.target.value)}
                        placeholder="Enter response"
                        className="bg-[#2b2b2b] text-white mr-2"
                      />
                      <Button onClick={() => handleSendResponse(user.email)} className="bg-[#4caf50] text-white">
                        Send Response
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              }
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
}

function SearchIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
