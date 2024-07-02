"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import ChatWindow from '@/components/main/ChatWindow';
import ConversationsList from '@/components/main/ConversationsList';

const MainBody = () => {

  const [conversationId, setConversationId] = useState(null);
  const [messages, setMessages] = useState([]); // State to store messages
  const [loading, setLoading] = useState(false);



  const handleNewMessage = (newMessage) => {
    console.log('Adding new message:', newMessage);
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };



  const handleNewChat = async () => {
    try {
      // Optional: Set loading state before making the request
      setLoading(true);
  
      const response = await axios.post('http://localhost:3000/api/start_conversation');
      const { data } = response;
      const fetchingID = data.conversationId;
  
      // Update state to trigger re-render
      setConversationId(fetchingID);
      setMessages([]); // Clear previous messages
  
      // Optional: Reset loading state after successful response
      setLoading(false);
    } catch (error) {
      console.error('Error starting new conversation:', error);
      // Optional: Reset loading state on error
      setLoading(false);
    }
  };
  const handleSelectConversation = (id) => {
    setConversationId(id);
  };

  console.log("messages", messages)
  return (
    <div className="h-screen bg-gray-200 flex overflow-hidden">
      <aside className="bg-white w-64 h-screen fixed p-4">
        <div className="space-y-4">
          <div className="relative px-4 py-3 flex items-center space-x-4 rounded-lg text-white bg-slate-500">
            <i className="fas fa-home text-white"></i>
            <span className="-mr-1 font-medium">CodeBox 3.5</span>
          </div>
          <button
            onClick={handleNewChat}
            className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group text-white bg-slate-400 w-56"
          >
            <i className="fas fa-wallet"></i>
            <span className='text-white bg-slate-400'>Create new chat</span>
            <FontAwesomeIcon icon={faPlusCircle} className="ml-2 text-slate-600 text-lg" />
          </button>
        </div>
        <ConversationsList conversationId={conversationId} onSelectConversation={handleSelectConversation} />
      </aside>
      <main className="sm:ml-64 ml-0 lg:ml-64 lg:pl-4 lg:flex lg:flex-col lg:w-3/4 xl:w-3/4 mx-2 pt-5">
          <ChatWindow
            conversationId={conversationId}
            onNewMessage={handleNewMessage}
          />
      </main>
    </div>
  );
};

export default MainBody;
