import { useState } from 'react';
import OpenAI from 'openai';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const appendMessage = (text, sender) => {
    setMessages([...messages, { text, sender }]);
  };

  const openai = new OpenAI({
    dangerouslyAllowBrowser: true,
  });

  const handleSendMessage = async () => {
    appendMessage(inputText, 'user');

    // Llamar a la API de OpenAI para obtener una respuesta
    try {
      const stream = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: inputText }],
        stream: true,
      });
      messages.push({
        text: stream.data.choices[0].message.content,
        sender: 'bot',
      });
      setInputText('');
    } catch (error) {
      if (JSON.stringify(error.type) !== 'insufficient_quota') {
        appendMessage(
          'lo sentimos pero se ha superado la cuota para preguntas',
          'bot'
        );
      } else {
        appendMessage('Lo siento, no pude entender tu mensaje.', 'bot');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
      <div className="mb-4 h-48 overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-2 ${
              message.sender === 'user' ? 'text-right' : 'text-left'
            }`}>
            <span
              className={`inline-block px-3 py-1 rounded-md ${
                message.sender === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-black'
              }`}>
              {message.text}
            </span>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="flex-1 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
          Enviar
        </button>
      </div>
    </div>
  );
};

export default Chat;
