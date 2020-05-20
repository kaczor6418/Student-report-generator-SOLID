import {StudentData} from "../interfaces/StudentData";
import {Student} from "../common/Student";
import {ReportType} from "../enums/ReportType";
import {AbstractReportFormatterService} from "../correct/services/formaters/AbstractReportFormatterService";
import {ReportFormatterFactory} from "../correct/factories/ReportFormatterFactory";

export class StudentsReport {
    private report: Map<number, Student> = new Map<number, Student>();

    constructor(students: StudentData[]) {
        this.createReport(students);
    }

    private createReport(students: StudentData[]): void {
        // create report logic
    }

    public getReport(type: ReportType): HTMLElement {
        const reportFormatter: AbstractReportFormatterService = ReportFormatterFactory.getReportFormatter(type);
        return reportFormatter.formatReport();
    }
}
