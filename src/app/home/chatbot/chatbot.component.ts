// src/app/home/chatbot/chatbot.component.ts
import { Component } from '@angular/core';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss'],
  imports: [
    NgClass,
    FormsModule,
    NgIf,
    NgForOf
  ]
})
export class ChatbotComponent {
  userMessage = ''; // Stores the user's message
  messages: { text: string; isUser: boolean }[] = []; // Stores the chat history
  isChatOpen = false; // Tracks whether the chat window is open

  // Predefined responses for the chatbot (related to AI-Solutions)
  private responses: { [key: string]: string } = {
    hello: 'Hello! Welcome to AI-Solutions. How can I assist you today?',
    hi: 'Hi there! How can I help you with our AI-driven solutions?',
    'how are you': 'I am just a bot, but I am here to help you with all your AI-related queries!',
    'what can you do': 'I can provide information about our AI-powered tools, virtual assistant, rapid prototyping, and employee experience analytics. What would you like to know?',
    'what services do you offer':
      'We offer AI-powered solutions such as:\n1. AI Virtual Assistant\n2. Rapid Prototyping\n3. Employee Experience Analytics\nWhich one are you interested in?',
    'ai virtual assistant':
      'Our AI Virtual Assistant provides instant answers and support to your queries. It can help streamline your workflows and improve productivity.',
    'rapid prototyping':
      'Our Rapid Prototyping service allows you to quickly and affordably develop prototypes for your business needs. It’s perfect for testing ideas before full-scale implementation.',
    'employee experience analytics':
      'Our Employee Experience Analytics tool helps you proactively address issues impacting your digital workforce. It provides insights to improve employee satisfaction and productivity.',
    'how do i get started':
      'To get started, please visit our "Contact Us" page or reach out to our team directly. We’ll guide you through the process!',
    'contact us': 'You can contact us by visiting the "Contact Us" page on our website or sending an email to support@ai-solutions.com.',
    'what is ai':
      'AI (Artificial Intelligence) refers to the simulation of human intelligence in machines that are programmed to think, learn, and make decisions. Our solutions leverage AI to empower industries.',
    bye: 'Goodbye! Feel free to reach out if you have more questions. Have a great day!',
    default: "I'm sorry, I didn't understand that. Can you please rephrase or ask a question about our AI-driven solutions?",



  'tell me about your team':
    'Our team consists of experienced AI engineers, data scientists, and industry experts dedicated to delivering cutting-edge solutions.',
  'what industries do you serve':
    'We serve a wide range of industries, including healthcare, finance, retail, and manufacturing. How can we assist your industry?',
  'do you offer custom solutions':
    'Yes, we offer custom AI solutions tailored to your specific business needs. Let us know your requirements, and we’ll create a solution for you!',
  'what is rapid prototyping':
    'Rapid prototyping is a process of quickly creating a working model of a product to test and refine ideas before full-scale production.',
  'what is employee experience analytics':
    'Employee Experience Analytics involves using data to understand and improve the experiences of employees in the workplace.',

};

  // Toggle the chat window
  toggleChat(): void {
    this.isChatOpen = !this.isChatOpen;
  }

  // Send a message from the user
  sendMessage(): void {
    if (this.userMessage.trim() === '') return; // Ignore empty messages

    // Add the user's message to the chat history
    this.messages.push({ text: this.userMessage, isUser: true });

    // Get the chatbot's response
    const response = this.getResponse(this.userMessage.toLowerCase());
    this.messages.push({ text: response, isUser: false });

    this.userMessage = ''; // Clear the input field
  }

  // Get the chatbot's response based on the user's message
  private getResponse(message: string): string {
    for (const key in this.responses) {
      if (message.includes(key)) {
        return this.responses[key];
      }
    }
    return this.responses['default'];
  }
}
