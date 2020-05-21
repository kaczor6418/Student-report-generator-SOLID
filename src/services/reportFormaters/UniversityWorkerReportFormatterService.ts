import {AbstractReportFormatterService} from "./AbstractReportFormatterService";
import {IUniversityWorkerReportFormatterService} from "./interfaces/IHandleReportFormatterService";

export class UniversityWorkerReportFormatterService extends AbstractReportFormatterService implements IUniversityWorkerReportFormatterService {
    public formatReport(): HTMLElement {
        const formattedReport: HTMLElement = document.createElement('table');
        // Report formatting logic
        return formattedReport;
    }
}
