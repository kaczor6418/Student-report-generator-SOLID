import {EmailServiceType} from "./services/emails/interfaces/EmailServiceType";
import {ReportFormatterType} from "./services/reportFormaters/interfaces/ReportFormatterType";
import {StudentsReport} from "./core/StudentsReport";

const email: string = 'test@test.pl';
const path: string = './test';
const reportFormatterType: ReportFormatterType = ReportFormatterType.LECTURER;
const emailServiceType: EmailServiceType = EmailServiceType.GOOGLE;

const studentReport: StudentsReport = new StudentsReport([], reportFormatterType, emailServiceType);
void studentReport.generateAndSendReport(path, email);
