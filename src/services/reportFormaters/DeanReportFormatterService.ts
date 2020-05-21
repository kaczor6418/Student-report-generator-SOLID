import {AbstractReportFormatterService} from "./AbstractReportFormatterService";
import {IDeanReportFormatterService} from "./interfaces/IHandleReportFormatterService";

export class DeanReportFormatterService extends AbstractReportFormatterService implements IDeanReportFormatterService {
    public formatReport(): HTMLElement {
        const formattedReport: HTMLElement = document.createElement('table');
        // Report formatting logic
        return formattedReport;
    }
}
