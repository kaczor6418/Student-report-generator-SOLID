import {IBaseEmailService} from "./interfaces/IHandelEmailService";

export abstract class AbstractEmailService implements IBaseEmailService {
    protected data: unknown;

    public abstract sendEmail(email:string): Promise<void>;

    constructor(data: unknown) {
        this.data = data;
    }
}
