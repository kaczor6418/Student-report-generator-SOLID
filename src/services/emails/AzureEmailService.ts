import {AbstractEmailService} from "./AbstractEmailService";
import {IAzureEmailService} from "./interfaces/IHandelEmailService";

export class AzureEmailService extends AbstractEmailService implements IAzureEmailService {
    public sendEmail(email:string): Promise<void> {
        // Send emails logic
        return Promise.resolve();
    }
}
