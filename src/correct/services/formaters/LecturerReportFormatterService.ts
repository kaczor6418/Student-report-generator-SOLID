import {AbstractReportFormatterService} from "./AbstractReportFormatterService";
import {ILecturerFormatterService} from "./interfaces/IHandleFormatterService";
import {Student} from "../../../common/Student";

export class LecturerReportFormatterService extends AbstractReportFormatterService implements ILecturerFormatterService {
    public formatReport(report: Map<number, Student>): HTMLElement {
        const formattedReport: HTMLElement = document.createElement('table');
        // Report formatting logic
        return formattedReport;
    }


    public updateReport(indexes: number[]): void {
        // update report logic
    }
}
