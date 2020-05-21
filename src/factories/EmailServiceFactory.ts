import {EmailServiceType} from "../services/emails/interfaces/EmailServiceType";
import {IHandleEmailService} from "../services/emails/interfaces/IHandelEmailService";
import {AzureEmailService} from "../services/emails/AzureEmailService";
import {AmazonEmailService} from "../services/emails/AmazonEmailService";
import {GoogleEmailService} from "../services/emails/GoogleEmailService";


export class EmailServiceFactory {
    public static getEmailService(type: EmailServiceType, data: unknown): IHandleEmailService {
        let emailService: IHandleEmailService;
        switch (type) {
            case EmailServiceType.AZURE:
                emailService = new AzureEmailService(data);
                break;
            case EmailServiceType.AMAZON:
                emailService = new AmazonEmailService(data);
                break;
            case EmailServiceType.GOOGLE:
                emailService = new GoogleEmailService(data);
                break;
            default:
                throw Error('Not supported emails service type')
        }
        return emailService;
    }
}
