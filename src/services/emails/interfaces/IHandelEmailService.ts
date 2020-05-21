export type IHandleEmailService = IAzureEmailService | IAmazonEmailService | IGoogleEmailService;

export interface IBaseEmailService {
    sendEmail(email: string): Promise<void>;
}

export interface IAzureEmailService extends IBaseEmailService {
}

export interface IAmazonEmailService extends IBaseEmailService {}

export interface IGoogleEmailService extends IBaseEmailService { }
