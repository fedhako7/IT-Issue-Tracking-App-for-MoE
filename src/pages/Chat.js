
import "./chat.css";
import Message from "../components/messages/Message";
import { useState, useEffect, useRef } from "react";
import axios from 'axios';
import Conversation from "../components/conversation/Conversation";
import { io } from "socket.io-client";

const Chat = () => {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser).others : null;
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const socket = useRef();
  const scrollRef = useRef();
   const baseUrl = "https://it-issue-tracking-api.onrender.com/api"

  useEffect(() => {
    socket.current = io("wss://socket-server-real-time-chat.onrender.com");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        message: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    if (arrivalMessage && currentChat?.members.includes(arrivalMessage.sender)) {
      setMessages((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    if (user?._id) {
      socket.current.emit("addUser", user._id);
      socket.current.on("getUsers", (users) => {
        console.log("Connected users:", users);
      });
    }
  }, [user]);

  useEffect(() => {
    if (user && user._id) {
      fetchConversations();
    }
  }, [user]);

  const fetchConversations = async () => {
    try {
      const res = await axios.get(`${baseUrl}/conversations/${user._id}`);
      setConversations(res.data);
    } catch (error) {
      console.error("Error fetching conversations:", error);
    }
  };

  const createConversation = async () => {
    const receiverId = document.getElementById("receiver").value;
    try {
      const response = await axios.post(`${baseUrl}/conversations/newconv`, {
        senderID: user._id,
        recieverID: receiverId,
      });

      if (response.data.message === "Conversation already exists between these users.") {
        alert(response.data.message);
        setCurrentChat(response.data.conversation);
        setIsModalOpen(false);
        return;
      }

      setCurrentChat(response.data);
      setConversations((prev) => [...prev, response.data]);
      setIsModalOpen(false); // Close modal after creation
    } catch (error) {
      console.error("Error creating conversation:", error);
    }
  };

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(`${baseUrl}/messages/${currentChat._id}`);
        setMessages(res.data);
      } catch (error) {
        console.log("Error fetching messages:", error);
      }
    };

    if (currentChat) {
      getMessages();
    }
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const messageObj = {
      sender: user._id,
      message: newMessage,
      conversationId: currentChat ? currentChat._id : null,
    };

    if (!currentChat || !currentChat.members) {
      alert("Please select a conversation to send a message.");
      return;
    }

    const receiverId = currentChat.members.find((member) => member !== user._id);
    if (!receiverId) {
      alert("Unable to determine receiver. Please select a valid conversation.");
      return;
    }

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post(`${baseUrl}/messages`, messageObj);
      setMessages((prevMessages) => [...prevMessages, res.data]);
      setNewMessage("");
    } catch (error) {
      console.log("Error sending message:", error);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${baseUrl}/users`);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="full_container w-full font-sans">
      <div className="UserList mt-3 pt-4">
        <div className="mt-3">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={openModal}
          >
            Create
          </button>
        </div>
        {conversations.map((c) => (
  <div
    key={c._id}
    onClick={() => setCurrentChat(c)}
    className={`conversation ${currentChat?._id === c._id ? "active" : ""}`}
  >
    <Conversation conversation={c} currentUser={user} />
  </div>
))}

      </div>
      <div className="chatBox w-full h-screen">
        <div className="chatBox-wrapper">
          {currentChat ? (
            <>
              <div className="messages-container">
                {messages.map((m) => (
                  <div key={m._id} ref={scrollRef}>
                    <Message message={m} own={m.sender === user._id} />
                  </div>
                ))}
              </div>
              <div className="message-input">
                <textarea
                  className="w-[80%] h-[90px] p-3 border border-gray-300 focus:outline-none rounded-md focus:border-blue-400"
                  placeholder="write something..."
                  onChange={(e) => setNewMessage(e.target.value)}
                  value={newMessage}
                ></textarea>
                <button
                  className="bg-slate-800 px-3 py-2 text-white rounded-lg"
                  onClick={handleSubmit}
                >
                  Send
                </button>
              </div>
            </>
          ) : (
            <span className="empty-chat">Open a conversation to start</span>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Select Receiver</h2>
            <select id="receiver" className="border border-gray-300 rounded-md" defaultValue="">
              <option value="" disabled>Select Receiver</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                 {user.firstName} ({user.department})
                </option>
              ))}
            </select>
            <div className="modal-buttons mt-4">
              <button
                onClick={createConversation}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mr-2"
              >
                Save
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
