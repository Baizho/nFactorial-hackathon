'use client'
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { JSX, SVGProps, useState } from "react"
import axiosInstance from "@/axiosInstance"

interface Message {
  content: string,
  role: "user" | "assistant";
}

export default function Component() {
  const [messages, setMessages] = useState<Message[]>([{ content: "Hey! Ask me anything about Impact admission or consultation!", role: "assistant" }]);
  const [messageText, setMessageText] = useState("");

  const handleSend = async () => {
    setMessages((prevMessages) => [...prevMessages, { content: messageText, role: "user" }]);
    const res = await axiosInstance.post("/gpt", {
      messages: messages
    })
    console.log(res.data);
    setMessages((prevMessages) => [...prevMessages, { content: res.data.response, role: 'assistant' }]);
    setMessageText("");
  }

  return (
    <div className="flex flex-col w-full h-screen text-black">
      <div className="flex-1 overflow-y-auto px-6 py-8 space-y-4 h-[60%]">
        {messages.map((message, index) => {
          if (message.role === "assistant") {
            return (
              <div key={index} className="flex items-start gap-4">
                <Avatar className="w-10 h-10 bg-[#3b3b3b] border-[#4b4b4b]">
                  <AvatarImage src="/chat-impact.png" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="border-[1px] px-4 py-3 rounded-lg max-w-[70%] relative">
                  <p>{message.content}</p>
                </div>
              </div>
            )
          } else {
            return (
              <div key={index} className="flex items-start gap-4 justify-end">
                <div className="border-[1px] px-4 py-3 rounded-lg max-w-[70%] relative">
                  <p>{message.content}</p>
                </div>
                <Avatar className="w-10 h-10 bg-[#3b3b3b] border-[#4b4b4b]">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>YO</AvatarFallback>
                </Avatar>
              </div>
            )
          }
        })}
      </div>
      <footer>
        <div className=" px-6 py-4 flex items-center gap-4  ">
          <Textarea
            value={messageText}
            onChange={(e) => { setMessageText(e.currentTarget.value) }}
            placeholder="Type your message..."
            className=" border-[#4b4b4b] rounded-lg flex-1 resize-none"
          />
          <Button variant="ghost" size="icon" className="hover:bg-gray-100" onClick={handleSend}>
            <SendIcon className="w-5 h-5" />
          </Button>
        </div>
      </footer>
    </div>
  )
}

function SendIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  )
}