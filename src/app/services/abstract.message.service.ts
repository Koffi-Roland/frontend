import { Injectable } from '@angular/core';
import { MessageService } from './api/message.service';


@Injectable()
export class AbstractMessageService {

    constructor(public messageService: MessageService) {
    }

    //Persos

    //Delete Confirmation En
    message = 'Do you want to delete this record?';
    header = 'Delete Confirmation';
    icon = 'fa fa-trash';

    //Success fr
    showFrAddSuccessMessage() {
        this.showSuccess('Message de succes', 'Ajout effectuer avec succes');
    }
    showFrUpdateSuccessMessage() {
        this.showSuccess('Message de succes', 'Modification effectuer avec succes');
    }
    showFrDeleteSuccessMessage() {
        this.showSuccess('Message de succes', 'Suppression effectuer avec succes');
    }

    //Echec fr
    showFrAddErrorMessage() {
        this.showError('Message d\'erreur', 'Echec de l\'ajout');
    }
    showFrUpdateErrorMessage() {
        this.showError('Message d\'erreur', 'Echec de la modification');
    }
    showFrDeleteErrorMessage() {
        this.showError('Message d\'erreur', 'Echec de la suppression');
    }
    showFrExistErrorMessage() {
        this.showError("Message d\'erreur", "Une structure possedant la meme denomination existe deja");
    }

    //Success en
    showEnAddSuccessMessage() {
        this.showSuccess('Success Message', 'Recording perform successfully');
    }
    showEnUpdateSuccessMessage() {
        this.showSuccess('Success Message', 'Editing perform successfully');
    }
    showEnDeleteSuccessMessage() {
        this.showSuccess('Success Message', 'Deleting perform successfully');
    }

    //Echec en
    showEnAddErrorMessage() {
        this.showError('Error message', 'Adding failed');
    }
    showEnUpdateErrorMessage() {
        this.showError('Error message', 'Editing failed');
    }
    showEnDeleteErrorMessage() {
        this.showError('Error message', 'Deleting failed');
    }




    //Prototypes
    showSuccess(summary: string, detail: string) {
        this.showViaService('success', summary, detail);
    }

    showInfo(summary: string, detail: string) {
        this.showViaService('info', summary, detail);
    }

    showWarn(summary: string, detail: string) {
        this.showViaService('warn', summary, detail);
    }

    showError(summary: string, detail: string) {
        this.showViaService('error', summary, detail);
    }

    showViaService(type_message: string, message: string, detail: string) {
        this.messageService.add(type_message, message, detail);
    }
}