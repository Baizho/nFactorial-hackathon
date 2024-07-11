import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { JSX, SVGProps, useEffect, useState } from "react"
import adminInstance from "@/adminInstance";

export default function MainContent({ openModal }: any) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    adminInstance.get("/user/all").then((res) => setUsers(res.data));
  }, []);

  const addMentor = (id: string) => {
    adminInstance.post("/user/role", {
      id,
      role: "mentor",
    }).then(() => adminInstance.get("/user/all").then((res) => {
      console.log(res.data);
      setUsers(res.data)
    }))
  }

  const removeMentor = (id: string) => {
    adminInstance.post("/user/role", {
      id,
      role: "user",
    }).then(() => adminInstance.get("/user/all").then((res) => setUsers(res.data)))
  }

  return (
    <div className="flex flex-col h-screen bg-[#1a1a1a] text-white">
      <div className="flex flex-col h-screen bg-[#1a1a1a] text-white">
        <header className="bg-[#2b2b2b] py-4 px-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">User Management</h1>
          <div className="flex items-center gap-2">

          </div>
        </header>
        <main className="flex-1 overflow-auto p-6">
          <div className="bg-[#2b2b2b] rounded-lg shadow-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Mentor</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {
                  users.map((user: any, index) =>
                    <TableRow key={index}>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        {
                          user.role === "mentor" ? <Badge className="bg-[#4caf50] text-white px-2 py-1 rounded-full">Mentor</Badge> :
                            <Badge className="bg-transparent border border-[#4caf50] text-[#4caf50] px-2 py-1 rounded-full">
                              Not a Mentor
                            </Badge>
                        }
                      </TableCell>
                      <TableCell>
                        {
                          user.role === "mentor" ? <Button className="bg-[#f44336] hover:bg-[#e53935]" onClick={() => removeMentor(user._id)}>
                            Remove Mentor
                          </Button> : <Button className="bg-[#4caf50] hover:bg-[#43a047]" onClick={() => addMentor(user._id)}>Add Mentor</Button>
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
