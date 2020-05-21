import {
    AmazonEmailService,
    AzureEmailService,
    GoogleEmailService
} from "./correct/services/email/UniversityEmailService";

const email: string = 'test@test.pl';
const data: HTMLElement = document.createElement('table');

const azureEmailService: AzureEmailService = new AmazonEmailService();
const amazonEmailService: AmazonEmailService = new AmazonEmailService();
const googleEmailService: GoogleEmailService = new AmazonEmailService();

void azureEmailService.sendEmail(email, data);
void amazonEmailService.sendEmail(email, data);
void googleEmailService.sendEmail(email, data);
