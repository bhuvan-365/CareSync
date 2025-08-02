import { useState, useRef, useEffect } from 'react';
import './AIChat.css';

const materialSymbols = {
  keyboard_arrow_down: 'keyboard_arrow_down',
  sentiment_satisfied: 'sentiment_satisfied',
  attach_file: 'attach_file',
  close: 'close',
  arrow_upward: 'arrow_upward'
};

function AIChat() {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: 'Hey there 👋 <br> How can I help you today?',
      attachment: null
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [isBotThinking, setIsBotThinking] = useState(false);
  const [userMedicalData, setUserMedicalData] = useState(null);
  const chatBodyRef = useRef(null);
  const fileInputRef = useRef(null);

  const API_KEY = "AIzaSyCmifq4Ydzl_OoK05PJNYnyenivhg3nVzA";
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

  // Function to generate system prompt with current medical data
  const getSystemPrompt = () => {
    return {
      role: "model",
      parts: [{
        text: `You are MediAI, a medical assistant. Strict rules:
1. ONLY answer health/medical questions
2. For non-medical queries, respond: "I specialize in health questions only"
3. Max 7 lines per response
4. ${userMedicalData ? `Use patient data if relevant:` : `Give general medical advice`}  
5. Keep answers clear and actionable
6. Never say "I can't help" - redirect to health topics
7. Always suggest consulting a doctor

${userMedicalData ? `
Patient Context:  
- Name: ${userMedicalData.name || 'Not provided'}  
- Conditions: ${userMedicalData.disorders?.join(', ') || 'None'}  
- Meds: ${userMedicalData.medicines?.map(m => `${m.name} (${m.dosage})`).join(', ') || 'None'}` : ''}`
      }],
    };
  };

  const chatHistory = useRef([getSystemPrompt()]);

  // Fetch user medical data from localStorage
  useEffect(() => {
    const fetchUserMedicalData = () => {
      try {
        const loggedInUser = JSON.parse(localStorage.getItem('loggedinUser'));
        const usersData = JSON.parse(localStorage.getItem('users'));
        
        if (loggedInUser && usersData) {
          const currentUserData = usersData.find(user => 
            user.username === loggedInUser.username || 
            user.email === loggedInUser.email
          );
          
          if (currentUserData?.medicalInfo) {
            console.log('Loaded medical data:', currentUserData.medicalInfo);
            setUserMedicalData(currentUserData.medicalInfo);
            setMessages([{
              type: 'bot',
              text: `Welcome ${currentUserData.medicalInfo.name || ''} 👋<br>
              I see you have:<br>
              - Conditions: ${currentUserData.medicalInfo.disorders?.join(', ') || 'None'}<br>
              - Medications: ${currentUserData.medicalInfo.medicines?.map(m => `${m.name} (${m.dosage})`).join(', ') || 'None'}<br>
              How can I help with your health questions today?`,
              attachment: null
            }]);
          }
        }
      } catch (error) {
        console.error("Error fetching user medical data:", error);
      }
    };

    fetchUserMedicalData();
  }, []);

  // Update system prompt when medical data changes
  useEffect(() => {
    chatHistory.current = [
      getSystemPrompt(),
      ...chatHistory.current.slice(1)
    ];
  }, [userMedicalData]);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    scrollToBottom();
    return () => document.head.removeChild(link);
  }, [messages]);

  const scrollToBottom = () => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setFilePreview(event.target.result);
      setFile({
        data: event.target.result.split(",")[1],
        mime_type: selectedFile.type
      });
    };
    reader.readAsDataURL(selectedFile);
  };

  const removeFile = () => {
    setFile(null);
    setFilePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const generateBotResponse = async (userMessage) => {
    // First check if question is health-related
    const healthKeywords = [
      'pain', 'medicine', 'doctor', 'symptom', 'diagnos', 'treatment',
      'health', 'medical', 'illness', 'disease', 'condition', 'pharma',
      'pill', 'hospital', 'blood', 'test', 'x-ray', 'scan', 'ache',
      'fever', 'cough', 'headache', 'allerg', 'prescription', 'dosage'
    ];
    
    const isHealthQuestion = healthKeywords.some(keyword => 
      userMessage.toLowerCase().includes(keyword)
    );

    if (!isHealthQuestion) {
      setMessages(prev => [
        ...prev,
        {
          type: 'bot',
          text: "I specialize in health and medical questions only. How can I help with your health concerns today?",
          attachment: null
        }
      ]);
      return;
    }

    setIsBotThinking(true);
    
    // Ensure we have latest medical context
    chatHistory.current = [
      getSystemPrompt(),
      ...chatHistory.current.slice(1)
    ];

    chatHistory.current.push({
      role: "user",
      parts: [
        { 
          text: `PATIENT QUESTION (USE THEIR MEDICAL DATA IN RESPONSE):
          Patient Name: ${userMedicalData?.name || 'Not provided'}
          Conditions: ${userMedicalData?.disorders?.join(', ') || 'None'}
          Medications: ${userMedicalData?.medicines?.map(m => `${m.name} (${m.dosage})`).join(', ') || 'None'}
          Question: ${userMessage}`
        },
        ...(file ? [{ inline_data: file }] : [])
      ],
    });

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: chatHistory.current
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error?.message || "Failed to get response");

      const apiResponseText = data.candidates[0].content.parts[0].text
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .trim();
      
      chatHistory.current.push({
        role: "model",
        parts: [{ text: apiResponseText }]
      });

      setMessages(prev => [
        ...prev,
        {
          type: 'bot',
          text: apiResponseText,
          attachment: null
        }
      ]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [
        ...prev,
        {
          type: 'bot',
          text: "Sorry, I encountered an error. Please try again later.",
          attachment: null,
          isError: true
        }
      ]);
    } finally {
      setIsBotThinking(false);
      setFile(null);
      setFilePreview(null);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    const message = inputMessage.trim();
    if (!message && !file) return;

    setMessages(prev => [
      ...prev,
      {
        type: 'user',
        text: message,
        attachment: filePreview
      }
    ]);

    setInputMessage('');
    removeFile();
    generateBotResponse(message);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  return (
    <div className="chatbot-popup">
      <div className="chat-header">
        <div className="header-info">
          <svg className="chatbot-logo" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 1024 1024">
            <path d="M738.3 287.6H285.7c-59 0-106.8 47.8-106.8 106.8v303.1c0 59 47.8 106.8 106.8 106.8h81.5v111.1c0 .7.8 1.1 1.4.7l166.9-110.6 41.8-.8h117.4l43.6-.4c59 0 106.8-47.8 106.8-106.8V394.5c0-59-47.8-106.9-106.8-106.9zM351.7 448.2c0-29.5 23.9-53.5 53.5-53.5s53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5-53.5-23.9-53.5-53.5zm157.9 267.1c-67.8 0-123.8-47.5-132.3-109h264.6c-8.6 61.5-64.5 109-132.3 109zm110-213.7c-29.5 0-53.5-23.9-53.5-53.5s23.9-53.5 53.5-53.5 53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5zM867.2 644.5V453.1h26.5c19.4 0 35.1 15.7 35.1 35.1v121.1c0 19.4-15.7 35.1-35.1 35.1h-26.5zM95.2 609.4V488.2c0-19.4 15.7-35.1 35.1-35.1h26.5v191.3h-26.5c-19.4 0-35.1-15.7-35.1-35.1zM561.5 149.6c0 23.4-15.6 43.3-36.9 49.7v44.9h-30v-44.9c-21.4-6.5-36.9-26.3-36.9-49.7 0-28.6 23.3-51.9 51.9-51.9s51.9 23.3 51.9 51.9z"></path>
          </svg>
          <h2 className="logo-text">MediAI</h2>
        </div>
      </div>

      <div className="chat-body" ref={chatBodyRef}>
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.type === 'bot' ? 'bot-message' : 'user-message'}`}>
            {message.type === 'bot' && (
              <svg className="bot-avatar" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 1024 1024">
                <path d="M738.3 287.6H285.7c-59 0-106.8 47.8-106.8 106.8v303.1c0 59 47.8 106.8 106.8 106.8h81.5v111.1c0 .7.8 1.1 1.4.7l166.9-110.6 41.8-.8h117.4l43.6-.4c59 0 106.8-47.8 106.8-106.8V394.5c0-59-47.8-106.9-106.8-106.9zM351.7 448.2c0-29.5 23.9-53.5 53.5-53.5s53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5-53.5-23.9-53.5-53.5zm157.9 267.1c-67.8 0-123.8-47.5-132.3-109h264.6c-8.6 61.5-64.5 109-132.3 109zm110-213.7c-29.5 0-53.5-23.9-53.5-53.5s23.9-53.5 53.5-53.5 53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5zM867.2 644.5V453.1h26.5c19.4 0 35.1 15.7 35.1 35.1v121.1c0 19.4-15.7 35.1-35.1 35.1h-26.5zM95.2 609.4V488.2c0-19.4 15.7-35.1 35.1-35.1h26.5v191.3h-26.5c-19.4 0-35.1-15.7-35.1-35.1zM561.5 149.6c0 23.4-15.6 43.3-36.9 49.7v44.9h-30v-44.9c-21.4-6.5-36.9-26.3-36.9-49.7 0-28.6 23.3-51.9 51.9-51.9s51.9 23.3 51.9 51.9z"></path>
              </svg>
            )}
            <div className="message-text" dangerouslySetInnerHTML={{ __html: message.text }} style={message.isError ? { color: '#ff0000' } : {}} />
            {message.attachment && <img src={message.attachment} className="attachment" alt="User attachment" />}
          </div>
        ))}
        {isBotThinking && (
          <div className="message bot-message thinking">
            <svg className="bot-avatar" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 1024 1024">
              <path d="M738.3 287.6H285.7c-59 0-106.8 47.8-106.8 106.8v303.1c0 59 47.8 106.8 106.8 106.8h81.5v111.1c0 .7.8 1.1 1.4.7l166.9-110.6 41.8-.8h117.4l43.6-.4c59 0 106.8-47.8 106.8-106.8V394.5c0-59-47.8-106.9-106.8-106.9zM351.7 448.2c0-29.5 23.9-53.5 53.5-53.5s53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5-53.5-23.9-53.5-53.5zm157.9 267.1c-67.8 0-123.8-47.5-132.3-109h264.6c-8.6 61.5-64.5 109-132.3 109zm110-213.7c-29.5 0-53.5-23.9-53.5-53.5s23.9-53.5 53.5-53.5 53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5zM867.2 644.5V453.1h26.5c19.4 0 35.1 15.7 35.1 35.1v121.1c0 19.4-15.7 35.1-35.1 35.1h-26.5zM95.2 609.4V488.2c0-19.4 15.7-35.1 35.1-35.1h26.5v191.3h-26.5c-19.4 0-35.1-15.7-35.1-35.1zM561.5 149.6c0 23.4-15.6 43.3-36.9 49.7v44.9h-30v-44.9c-21.4-6.5-36.9-26.3-36.9-49.7 0-28.6 23.3-51.9 51.9-51.9s51.9 23.3 51.9 51.9z"></path>
            </svg>
            <div className="message-text">
              <div className="thinking-indicator">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="chat-footer">
        <form onSubmit={handleSendMessage} className="chat-form">
          <textarea
            placeholder="Message..."
            className="message-input"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            required
          />
          <div className="chat-controls  cvc">
            <button type="button" className="material-symbols-rounded clc">
              <span className="material-symbol">{materialSymbols.sentiment_satisfied}</span>
            </button>
          
            <div className={`upd file-upload-wrapper ${filePreview ? 'file-uploaded' : ''}`} >
              <input
                type="file"
                accept="image/*"
                id="file-input"
                ref={fileInputRef}
                onChange={handleFileChange}
                hidden
              />
              {filePreview && <img src={filePreview} alt="Preview" />}
              <button
                type="button"
                id="file-upload"
                className="material-symbols-rounded clc"
                onClick={() => fileInputRef.current.click()}
              >
                <span className="material-symbol">{materialSymbols.attach_file}</span>
              </button>
              <button
                type="button"
                id="file-cancel"
                className="material-symbols-rounded "
                onClick={removeFile}
              >
                <span className="material-symbol">{materialSymbols.close}</span>
              </button>
            </div>
            <button
              type="submit"
              id="send-message"
              className="material-symbols-rounded clc"
              style={{ display: (inputMessage.trim() || filePreview) ? 'block' : 'none' }}
            >
              <span className="material-symbol">{materialSymbols.arrow_upward}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AIChat;