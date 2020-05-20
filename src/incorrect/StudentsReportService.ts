import {StudentData} from "../interfaces/StudentData";
import {Student} from "../common/Student";
import {SaveFileService} from "../common/SaveFileService";
import {UniversityEmailService} from "../common/UniversityEmailService";
import {ReportType} from "../enums/ReportType";

export class StudentsReportService {
    private report: Map<number, Student> = new Map<number, Student>();

    constructor(students: StudentData[]) {
        this.createReport(students);
    }

    private createReport(students: StudentData[]): void {
        // create report logic
    }

    private formatReport(type: ReportType): HTMLElement {
        const formattedReport = document.createElement('table');
        switch (type) {
            case ReportType.DEAN:
                // Logic responsible for generating REPORT for dean
                break;
            case ReportType.LECTURER:
                // Logic responsible for generating report for lecturer
                break;
            case ReportType.UNIVERSITY_WORKER:
                // Logic responsible for generating report for university worker
                break;
            default:
                throw Error('Not supported report type')
        }
        // create formatted report
        return formattedReport;
    }

    public generateReport(email: string, type: ReportType): Promise<void> {
        const preparedReport: HTMLElement = this.formatReport(type);
        void SaveFileService.saveFile(preparedReport);
        void UniversityEmailService.sendEmail(email, preparedReport);
        return Promise.resolve();
    }
}
