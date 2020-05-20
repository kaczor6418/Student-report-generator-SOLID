import {AbstractReportFormatterService} from "./AbstractReportFormatterService";

export class LecturerReportFormatterService extends AbstractReportFormatterService {
    formatReport(): HTMLElement {
        const formattedReport: HTMLElement = document.createElement('table');
        return formattedReport;
    }

}
