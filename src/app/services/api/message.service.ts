import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class MessageService {
    messages: string[] = [];

    add(type_message: string, message: string, details: string) {
        this.messages.push(type_message, message, details);
    }

    clear() {
        this.messages = [];
    }
}