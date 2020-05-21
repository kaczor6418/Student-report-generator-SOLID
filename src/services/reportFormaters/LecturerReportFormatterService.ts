import {AbstractReportFormatterService} from "./AbstractReportFormatterService";
import {ILecturerReportFormatterService} from "./interfaces/IHandleReportFormatterService";

export class LecturerReportFormatterService extends AbstractReportFormatterService implements ILecturerReportFormatterService {
    public formatReport(): HTMLElement {
        const formattedReport: HTMLElement = document.createElement('table');
        // Report formatting logic
        return formattedReport;
    }


    public updateReport(indexes: number[]): void {
        // update report logic
    }
}
