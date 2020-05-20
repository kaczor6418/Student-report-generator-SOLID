import {AbstractReportFormatterService} from "./AbstractReportFormatterService";
import {IHandleFormatterService} from "./interfaces/IHandleFormatterService";

export class DeanReportFormatterService extends AbstractReportFormatterService implements IHandleFormatterService {
    public formatReport(): HTMLElement {
        const formattedReport: HTMLElement = document.createElement('table');
        // Report formatting logic
        return formattedReport;
    }
}
