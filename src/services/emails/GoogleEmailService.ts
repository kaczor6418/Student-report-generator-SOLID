import {AbstractEmailService} from "./AbstractEmailService";
import {IGoogleEmailService} from "./interfaces/IHandelEmailService";

export class GoogleEmailService extends AbstractEmailService implements IGoogleEmailService {
    public sendEmail(email:string): Promise<void> {
        // Send emails logic
        return Promise.resolve();
    }
}
