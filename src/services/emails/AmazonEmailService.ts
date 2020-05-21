import {AbstractEmailService} from "./AbstractEmailService";
import {IAmazonEmailService} from "./interfaces/IHandelEmailService";

export class AmazonEmailService extends AbstractEmailService implements IAmazonEmailService {
    public sendEmail(email:string): Promise<void> {
        // Send emails logic
        return Promise.resolve();
    }
}
