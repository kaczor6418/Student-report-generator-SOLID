class UniversityEmailService {
    public static sendEmail(email: string, data: unknown): Promise<void> {
        // Send email logic
        return Promise.resolve();
    }
}

export class AzureEmailService {
    public sendEmail(email: string, data: unknown): Promise<void> {
        // Send email via Azure logic
        return Promise.resolve();
    }
}

export class AmazonEmailService {
    public sendEmail(email: string, data: unknown): Promise<void> {
        // Send email via Amazon logic
        return Promise.resolve();
    }
}

export class GoogleEmailService {
    public sendEmail(email: string, data: unknown): Promise<void> {
        // Send email via Google logic
        return Promise.resolve();
    }
}
