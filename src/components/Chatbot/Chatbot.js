import React, { useState, useRef, useEffect } from "react";
import { FaRobot, FaExpand, FaCompress } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import "./Chatbot.css";

const ALLOWED_ROLES = ["system", "user", "assistant"];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const chatWindowRef = useRef(null);
  const [showNotification, setShowNotification] = useState(false);

  const API_TOKEN = process.env.REACT_APP_CHATBOT_API_TOKEN;
  const API_URL = "https://api.novita.ai/v3/openai/chat/completions";
  const MODEL = "deepseek/deepseek-r1-turbo";
  const MAX_TOKENS = 2048;

  // On component mount, load messages from localStorage and filter out any invalid ones.
  useEffect(() => {
    const savedMessages = JSON.parse(localStorage.getItem("chatHistory"));
    if (savedMessages && Array.isArray(savedMessages)) {
      const filtered = savedMessages.filter((msg) =>
        ALLOWED_ROLES.includes(msg.role)
      );
      setMessages(filtered);
    }
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  }, []);

  // Save messages to localStorage when they change.
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("chatHistory", JSON.stringify(messages));
    }
  }, [messages]);

  // Scroll to the bottom when new messages are added.
  useEffect(() => {
    if (chatWindowRef.current)
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
  }, [messages]);

  const toggleChatbot = () => setIsOpen(!isOpen);
  const toggleFullScreen = () => setIsFullScreen(!isFullScreen);

  // Limit conversation history to the last 10 messages.
  const getRecentMessages = (msgs, limit = 10) =>
    msgs.slice(Math.max(msgs.length - limit, 0));

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Create a new user message (role must be "user")
    const userMessage = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];
    // Append new message to full history for display
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      if (!API_TOKEN) throw new Error("API Token is missing.");

      let botResponse = "";
      const lowerCaseInput = input.toLowerCase();

      // Predefined responses for simple greetings.
      if (["hi", "hello"].includes(lowerCaseInput)) {
        botResponse = "Hello! How can I assist you with algorithms today? 😊";
      } else if (lowerCaseInput === "what's up?") {
        botResponse =
          "I'm here to help you with algorithms and computer science concepts! 😊";
      } else {
        // Only send the most recent messages to keep context fresh.
        const recentMessages = getRecentMessages(updatedMessages);
        const formattedMessages = recentMessages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        }));

        console.log("Sending messages:", formattedMessages);

        const requestBody = {
          model: MODEL,
          messages: formattedMessages,
          stream: false,
          max_tokens: MAX_TOKENS,
        };

        console.log("Request Body:", JSON.stringify(requestBody));

        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_TOKEN}`,
          },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`API Error: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        botResponse =
          data?.choices?.[0]?.message?.content ||
          "Sorry, I didn't get that.";

        // Clean up the bot response.
        botResponse = botResponse.replace(/<think>[\s\S]*?<\/think>/g, "").trim();
        botResponse = filterInappropriateContent(botResponse);
        botResponse = preventInternalInfoLeaks(botResponse);
      }

      // Use "assistant" as the role for bot responses.
      const botMessage = { role: "assistant", content: botResponse };
      setMessages((prev) => [...prev, botMessage]);

    } catch (error) {
      console.error("Error:", error.message);
      const errorMsg = { role: "assistant", content: `Error: ${error.message}` };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const filterInappropriateContent = (response) => {
    const inappropriateKeywords = [
      "sex",
      "porn",
      "violence",
      "hate",
      "drugs",
      "suicide",
    ];
    inappropriateKeywords.forEach((keyword) => {
      if (response.toLowerCase().includes(keyword)) {
        response =
          "Sorry, I can only assist with algorithms and computer science concepts.";
      }
    });
    return response;
  };

  const preventInternalInfoLeaks = (response) => {
    const internalInfoKeywords = [
      "model",
      "API",
      "openai",
      "deepseek",
      "system",
      "AI",
    ];
    internalInfoKeywords.forEach((keyword) => {
      if (response.toLowerCase().includes(keyword)) {
        response =
          "I am AlgoBot, here to help you with algorithms or any computer science-related questions.";
      }
    });
    return response;
  };

  const showMessage = () => {
    if (!isOpen) {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  return (
    <div className={`chatbot-container ${isOpen ? "open" : ""} ${isFullScreen ? "full-screen" : ""}`}>
      <button className="chatbot-toggle" onClick={showMessage}>
        <FaRobot />
      </button>
      <div className={`chatbot-notification ${showNotification ? "" : "hidden"}`}>
        <p>Ask me anything about algorithms! 😊</p>
      </div>
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h3>Ask AlgoBot</h3>
            <div className="chatbot-header-buttons">
              <button onClick={toggleFullScreen}>
                {isFullScreen ? <FaCompress /> : <FaExpand />}
              </button>
              <button onClick={toggleChatbot}>&times;</button>
            </div>
          </div>
          <div className="chatbot-messages" ref={chatWindowRef}>
            {messages.map((msg, index) => (
              <div key={index} className={`chatbot-message ${msg.role}`}>
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>
            ))}
            {loading && <div className="chatbot-message assistant">Typing...</div>}
          </div>
          <div className="chatbot-input">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything about algorithms..."
              rows={1}
            />
            <button onClick={sendMessage} disabled={loading}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
