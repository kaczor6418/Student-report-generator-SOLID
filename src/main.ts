import {StudentsReport} from "./incorrect/StudentsReport";
import {ReportType} from "./enums/ReportType";
import {GenerateReportService} from "./correct/services/generators/GenerateReportService";
import {UniversityEmailService} from "./correct/services/email/UniversityEmailService";

const studentsReport: StudentsReport = new StudentsReport([]);
const report: HTMLElement = studentsReport.getReport(ReportType.DEAN);
void GenerateReportService.generateReport('./path', report);
void UniversityEmailService.sendEmail('test@test.pl', report);
