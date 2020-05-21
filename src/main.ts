import {EmailServiceType} from "./services/emails/interfaces/EmailServiceType";
import {IHandleEmailService} from "./services/emails/interfaces/IHandelEmailService";
import {EmailServiceFactory} from "./factories/EmailServiceFactory";

const email: string = 'test@test.pl';
const data: HTMLElement = document.createElement('table');
const emailServiceType: EmailServiceType = EmailServiceType.GOOGLE;

const emailService: IHandleEmailService = EmailServiceFactory.getEmailService(emailServiceType, data);

void emailService.sendEmail(email);
