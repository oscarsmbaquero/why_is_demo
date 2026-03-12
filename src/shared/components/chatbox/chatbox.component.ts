import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../../core/services/themeService/theme-service.service';
import { ChatService } from '../../../core/services/chatService/chat.service';
import { NavbarService } from '../../../core/services/navbarService/navbar.service';

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

@Component({
  selector: 'app-chatbox',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbox.component.html',
  styleUrl: './chatbox.component.css'
})
export class ChatboxComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  
  readonly themeService = inject(ThemeService);
  private chatService = inject(ChatService);
  private navbarService = inject(NavbarService);
  
  messages: Message[] = [
    {
      text: '¡Hola! Soy un asistente virtual de WHY? IA. ¿En qué puedo ayudarte hoy?',
      isUser: false,
      timestamp: new Date()
    }
  ];
  
  newMessage = '';
  isTyping = false;
  showDatePicker = false;
  showTimePicker = false;
  selectedDate = '';
  selectedTime = '';

  ngOnInit() {
    this.scrollToTop();
  }

    scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      // Agregar mensaje del usuario
      this.messages.push({
        text: this.newMessage,
        isUser: true,
        timestamp: new Date()
      });
      
      this.newMessage = '';
      this.scrollToBottom();
      
      // Llamar al API
      this.isTyping = true;
      this.chatService.sendMessage(this.messages, 'general')
        .subscribe({
          next: (response) => {
            this.messages.push({
              text: response.content,
              isUser: false,
              timestamp: new Date()
            });
            this.isTyping = false;
            this.scrollToBottom();
            this.showDatePicker = this.shouldAskForDate(response.content);
            this.showTimePicker = this.shouldAskForTime(response.content);
          },
          error: (error) => {
            console.error('Error al obtener respuesta:', error);
            this.messages.push({
              text: 'Lo siento, hubo un error al procesar tu mensaje. Por favor, intenta de nuevo.',
              isUser: false,
              timestamp: new Date()
            });
            this.isTyping = false;
            this.scrollToBottom();
          }
        });
    }
  }

  submitDate() {
    if (!this.selectedDate) {
      return;
    }

    const formattedDate = this.selectedDate.replace(/-/g, '/');
    this.newMessage = `Mi fecha es ${formattedDate}`;
    this.showDatePicker = false;
    this.selectedDate = '';
    this.sendMessage();
  }

  submitTime() {
    if (!this.selectedTime) {
      return;
    }

    this.newMessage = `Mi hora es ${this.selectedTime}`;
    this.showTimePicker = false;
    this.selectedTime = '';
    this.sendMessage();
  }

  private shouldAskForDate(content: string): boolean {
    const words = this.getNormalizedWords(content);
    return words.includes('fecha');
  }

  private shouldAskForTime(content: string): boolean {
    const words = this.getNormalizedWords(content);
    return words.includes('hora');
  }

  private getNormalizedWords(content: string): string[] {
    return content
      .toLowerCase()
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .split(/[^a-z0-9]+/)
      .filter(Boolean);
  }

  scrollToBottom() {
    setTimeout(() => {
      const chatMessages = document.querySelector('.chat-messages');
      if (chatMessages) {
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }
    }, 100);
  }

  closeChat() {
    this.close.emit();
  }
}
