'use client'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { JSX, SVGProps, useEffect, useState } from "react";
import adminInstance from "@/adminInstance";
import Link from "next/link";

export default function MainContent({ openModal }: any) {
  const [users, setUsers] = useState<any[]>([]);
  const [tasks, setTasks] = useState<{ [key: string]: string }>({});
  const [responses, setResponses] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    adminInstance.get("/user/all")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setUsers(res.data);
        } else {
          console.error("Expected an array but got:", res.data);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch users:", error);
      });
  }, []);

  useEffect(() => {
    users.forEach((user) => {
      adminInstance.post("/getResponseTask", { email: user.email })
        .then((res) => {
          setResponses((prevResponses) => ({ ...prevResponses, [user.email]: res.data.response || "" }));
        })
        .catch((error) => {
          console.error(`Failed to fetch response for ${user.email}:`, error);
        });
    });
  }, [users]);

  const handleTaskChange = (email: string, task: string) => {
    setTasks(prevTasks => ({ ...prevTasks, [email]: task }));
  };

  const handleAssignTask = (email: string) => {
    const task = tasks[email];
    adminInstance.post("/assignTask", { email, task })
      .then((res) => {
        console.log("Task assigned successfully:", res.data);
        setTasks(prevTasks => ({ ...prevTasks, [email]: "" })); // Clear the input after task is assigned
      })
      .catch((error) => {
        console.error("Failed to assign task:", error);
      });
  };

  return (
    <div className="flex flex-col h-screen bg-[#1a1a1a] text-white">
      <header className="bg-[#2b2b2b] py-4 px-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">User Management</h1>
        <h3>Text this <Link className="text-blue-400 font-bold" href="https://t.me/nfactorial_ai_bot" target="_blank">Telegram Bot</Link> to recieve updates of users</h3>
      </header>
      <main className="flex-1 overflow-auto p-6">
        <div className="bg-[#2b2b2b] rounded-lg shadow-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name and Email</TableHead>
                <TableHead>AI Approved?</TableHead>
                <TableHead>Actions</TableHead>
                <TableHead>Response</TableHead>
                <TableHead>Profile</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                users.map((user: any, index) =>
                  <TableRow key={index}>
                    <TableCell>{user.fullName} {user.email}</TableCell>
                    <TableCell>
                      {
                        user.isApprovedByAI === "yes" ? <Badge className="bg-[#4caf50] text-white px-2 py-1 rounded-full">YES</Badge> :
                          user.isApprovedByAI === "not sure" ? <Badge className="bg-yellow-800 text-white px-2 py-1 rounded-full">NOT SURE</Badge> :
                            <Badge className="bg-transparent border border-red-800 text-red-800 px-2 py-1 rounded-full">NO</Badge>
                      }
                    </TableCell>
                    <TableCell>
                      {
                        user.isApprovedByAI === "yes" && (
                          <>
                            <input
                              value={tasks[user.email] || ""}
                              onChange={(e) => handleTaskChange(user.email, e.target.value)}
                              placeholder="Enter task"
                              className="bg-gray-300 text-black mr-2"
                            />
                            <Button onClick={() => handleAssignTask(user.email)} className="bg-[#4caf50] text-white">
                              Assign Task
                            </Button>
                          </>
                        )}
                    </TableCell>
                    <TableCell>
                      <textarea
                        value={user.taskResponse}
                        readOnly
                        className="bg-gray-300 text-black border-none"
                        rows={1}
                      />
                    </TableCell>
                    <TableCell>

                      <Link href={`/admin/${user.email}`}>
                        <Button onClick={() => handleAssignTask(user.email)} className="bg-blue-400 text-white">
                          Go to profile
                        </Button>
                      </Link>
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
