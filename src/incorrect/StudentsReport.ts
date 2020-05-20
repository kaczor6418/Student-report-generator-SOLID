import {StudentData} from "../interfaces/StudentData";
import {Student} from "../common/Student";
import {ReportType} from "../enums/ReportType";
import {ReportFormatterFactory} from "../correct/factories/ReportFormatterFactory";
import {IHandleFormatterService} from "../correct/services/formaters/interfaces/IHandleFormatterService";

export class StudentsReport {
    private report: Map<number, Student> = new Map<number, Student>();

    constructor(students: StudentData[]) {
        this.createReport(students);
    }

    private createReport(students: StudentData[]): void {
        // create report logic
    }

    public getReport(type: ReportType): HTMLElement {
        const reportFormatter: IHandleFormatterService = ReportFormatterFactory.getReportFormatter(type);
        return reportFormatter.formatReport();
    }
}
