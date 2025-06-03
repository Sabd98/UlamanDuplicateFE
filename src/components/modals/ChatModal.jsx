import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiMessageCircle, FiSend } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const ChatModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1); 
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [messages, setMessages] = useState([]);
  const [isAgentTyping, setIsAgentTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  const formattedTime = currentDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isAgentTyping]);

  // Initial bot message
  useEffect(() => {
    if (step === 3) {
      setTimeout(() => {
        setMessages([
          {
            id: 1,
            text: `Hi ${
              name || "Visitor"
            } at ${formattedTime} on ${formattedDate}! Thank you for reaching out to Ulaman Eco Luxury Retreat. How may I assist you today?`,
            sender: "bot",
            timestamp: new Date(),
          },
        ]);
      }, 1000);
    }
  }, [step]);

  const handleStartChat = () => {
    setStep(2);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) newErrors.name = "This field cannot be empty";

    if (!email.trim()) {
      newErrors.email = "This field cannot be empty";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (phone && !/^\d{8,15}$/.test(phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    return newErrors;
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length === 0) {
      setErrors({});
      setStep(3);
    } else {
      setErrors(formErrors);
    }
  };

  const handleSendMessage = () => {
    if (message.trim() === "") return;

    // Add user message
    const newUserMessage = {
      id: messages.length + 1,
      text: message,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages([...messages, newUserMessage]);
    setMessage("");

    // Simulate agent typing
    setIsAgentTyping(true);

    // Simulate bot response after delay
    setTimeout(() => {
      setIsAgentTyping(false);

      const botResponses = [
        "Thank you for your message! Our team will get back to you shortly.",
        "I've noted your inquiry. One of our agents will contact you soon.",
        "We appreciate your patience. Our reservation team is reviewing your request.",
      ];

      const randomResponse =
        botResponses[Math.floor(Math.random() * botResponses.length)];

      const newBotMessage = {
        id: messages.length + 2,
        text: randomResponse,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, newBotMessage]);
    }, 2000);
  };

  const handleWhatsappRedirect = () => {
    // In a real implementation, this would redirect to your WhatsApp
    window.open("https://wa.me/yournumber", "_blank");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col"
            initial={{ scale: 0.9, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 50 }}
            transition={{ type: "spring", damping: 25 }}
          >
            {/* Header */}
            <div className="bg-gray-900 text-white p-4 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold">Diamond Reconversions</h3>
                <p className="text-sm opacity-80">Start a conversation</p>
              </div>
              <button
                onClick={onClose}
                className="text-xl p-2 hover:bg-gray-800 rounded-full"
              >
                <FiX />
              </button>
            </div>

            {/* Step 1: Initial View */}
            {step === 1 && (
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex-1 flex items-center justify-center">
                  <FiMessageCircle className="text-6xl text-gray-300 mb-6" />
                </div>
                <p className="text-center mb-6">Check your favorite channel</p>
                <button
                  onClick={handleStartChat}
                  className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Start Chat
                </button>
              </div>
            )}

            {/* Step 2: Form View */}
            {step === 2 && (
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold mb-4">
                  Hi! Please fill out the form below to start chatting with the
                  next available agent.
                </h3>

                <form
                  onSubmit={handleSubmitForm}
                  className="space-y-4 flex-1 flex flex-col"
                >
                  <div>
                    <h4 className="font-bold mb-2">Basic Information</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm mb-1">Name*</label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className={`w-full p-3 border ${
                            errors.name ? "border-red-500" : "border-gray-300"
                          } rounded-lg`}
                          placeholder="Your name"
                        />
                        {errors.name && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm mb-1">Email*</label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className={`w-full p-3 border ${
                            errors.email ? "border-red-500" : "border-gray-300"
                          } rounded-lg`}
                          placeholder="your.email@example.com"
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.email}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm mb-1">Phone</label>
                        <div className="flex">
                          <select className="border border-gray-300 rounded-l-lg p-3 bg-gray-100">
                            <option>+852</option>
                            <option>+62</option>
                            <option>+1</option>
                          </select>
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className={`flex-1 p-3 border ${
                              errors.phone
                                ? "border-red-500"
                                : "border-gray-300"
                            } rounded-r-lg`}
                            placeholder="Phone number"
                          />
                        </div>
                        {errors.phone && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto">
                    <button
                      type="submit"
                      className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      Start Chat
                    </button>

                    <p className="text-center mt-4 text-gray-600">
                      or leave your messages on WhatsApp
                    </p>
                  </div>
                </form>
              </div>
            )}

            {/* Step 3: Chat Interface */}
            {step === 3 && (
              <div className="flex-1 flex flex-col">
                {/* Chat Header */}
                <div className="border-b p-4">
                  <h3 className="text-xl font-bold">Ulaman Reservations</h3>
                  <p className="text-gray-600">Bot</p>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`mb-4 ${
                        msg.sender === "bot" ? "text-left" : "text-right"
                      }`}
                    >
                      <div className="text-xs text-gray-500 mb-1">
                        {msg.sender === "bot"
                          ? "Ulaman Eco Luxury Retreat"
                          : "You"}{" "}
                        •{" "}
                        {msg.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                      <div
                        className={`inline-block p-3 rounded-lg max-w-xs ${
                          msg.sender === "bot"
                            ? "bg-white border border-gray-200"
                            : "bg-blue-500 text-white"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}

                  {isAgentTyping && (
                    <div className="mb-4 text-left">
                      <div className="text-xs text-gray-500 mb-1">
                        Ulaman Eco Luxury Retreat • Typing...
                      </div>
                      <div className="inline-block p-3 rounded-lg bg-white border border-gray-200">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"
                            style={{ animationDelay: "0.4s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="border-t p-4 bg-white">
                  <div className="flex">
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="flex-1 border border-gray-300 rounded-l-lg p-3 resize-none"
                      placeholder="Type message here"
                      rows={1}
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={message.trim() === ""}
                      className={`bg-blue-500 text-white p-3 rounded-r-lg ${
                        message.trim() === ""
                          ? "opacity-50"
                          : "hover:bg-blue-600"
                      }`}
                    >
                      <FiSend />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Waiting View */}
            {step === 4 && (
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold mb-2">
                  Continue the conversation
                </h3>
                <p className="text-gray-600 mb-6">
                  Expect a reply within a few minutes
                </p>

                <div className="flex items-start mb-6 p-4 bg-gray-100 rounded-lg">
                  <div className="mr-3 mt-1">
                    <div className="bg-gray-300 border-2 border-dashed rounded-xl w-10 h-10" />
                  </div>
                  <div>
                    <h4 className="font-bold">Ulaman Eco Luxury Retreat</h4>
                    <p className="text-gray-600 truncate">
                      Hi {name} at {formattedTime} on {formattedDate}! Thank you
                      for reaching out...
                    </p>
                  </div>
                </div>

                <div className="mt-auto">
                  <p className="text-center mb-4">
                    Chat on your favorite channel
                  </p>

                  <button
                    onClick={handleWhatsappRedirect}
                    className="w-full flex items-center justify-center bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <FaWhatsapp className="mr-2 text-xl" />
                    WhatsApp
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChatModal;
