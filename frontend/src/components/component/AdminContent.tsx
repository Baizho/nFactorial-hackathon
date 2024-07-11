import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { JSX, SVGProps, useEffect, useState } from "react";
import adminInstance from "@/adminInstance";

export default function MainContent({ openModal }: any) {
  const [users, setUsers] = useState<any[]>([]);

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

  return (
    <div className="flex flex-col h-screen bg-[#1a1a1a] text-white">
      <header className="bg-[#2b2b2b] py-4 px-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">User Management</h1>
        <div className="flex items-center gap-2"></div>
      </header>
      <main className="flex-1 overflow-auto p-6">
        <div className="bg-[#2b2b2b] rounded-lg shadow-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name and Email</TableHead>
                <TableHead>AI Approved?</TableHead>
                <TableHead>Actions</TableHead>
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
                          user.isApprovedByAI === "yes" ? <Badge className="bg-[#4caf50] text-white px-2 py-1 rounded-full">Assign a Task</Badge> :
                          user.isApprovedByAI === "not sure" ? <Badge className="bg-yellow text-white px-2 py-1 rounded-full">Help an AI</Badge> : <></>
                        } 
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
