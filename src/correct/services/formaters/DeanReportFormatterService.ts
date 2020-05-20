import {AbstractReportFormatterService} from "./AbstractReportFormatterService";

export class DeanReportFormatterService extends AbstractReportFormatterService {
    formatReport(): HTMLElement {
        const formattedReport: HTMLElement = document.createElement('table');
        return formattedReport;
    }

}
