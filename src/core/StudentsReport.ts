import {StudentData} from "../common/interfaces/StudentData";
import {Student} from "./Student";
import {ReportFormatterType} from "../services/reportFormaters/interfaces/ReportFormatterType";
import {ReportFormatterServiceFactory} from "../factories/ReportFormatterServiceFactory";
import {IHandleReportFormatterService} from "../services/reportFormaters/interfaces/IHandleReportFormatterService";
import {EmailServiceType} from "../services/emails/interfaces/EmailServiceType";
import {EmailServiceFactory} from "../factories/EmailServiceFactory";
import {IHandleEmailService} from "../services/emails/interfaces/IHandelEmailService";
import {GenerateReportService} from "../services/generators/GenerateReportService";

export class StudentsReport {
    private report: Map<number, Student> = new Map<number, Student>();
    private reportFormatterService: IHandleReportFormatterService;
    private emailService: IHandleEmailService;

    constructor(students: StudentData[], reportFormatterType: ReportFormatterType, emailServiceType: EmailServiceType) {
        this.createReport(students);
    }

    private initializeServices(reportFormatterType: ReportFormatterType, emailServiceType: EmailServiceType) {
        this.reportFormatterService = ReportFormatterServiceFactory.getReportFormatterService(reportFormatterType, this.report);
        this.emailService = EmailServiceFactory.getEmailService(emailServiceType, this.reportFormatterService.formatReport())
    }

    private createReport(students: StudentData[]): void {
        // create report logic
    }

    public getReport(): HTMLElement {
        return this.reportFormatterService.formatReport();
    }

    public generateAndSendReport(path: string, email: string): Promise<void> {
        const formattedReport: HTMLElement = this.getReport();
        void GenerateReportService.generateReport(path, formattedReport);
        void this.emailService.sendEmail(email);
        return Promise.resolve();
    }
}
