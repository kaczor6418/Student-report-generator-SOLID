import {AbstractReportFormatterService} from "./AbstractReportFormatterService";
import {IHandleFormatterService} from "./interfaces/IHandleFormatterService";

export class LecturerReportFormatterService extends AbstractReportFormatterService implements IHandleFormatterService {
    public formatReport(): HTMLElement {
        const formattedReport: HTMLElement = document.createElement('table');
        // Report formatting logic
        return formattedReport;
    }

}
