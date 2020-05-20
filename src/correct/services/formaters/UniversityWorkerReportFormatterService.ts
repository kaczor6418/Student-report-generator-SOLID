import {AbstractReportFormatterService} from "./AbstractReportFormatterService";

export class UniversityWorkerReportFormatterService extends AbstractReportFormatterService {
    formatReport(): HTMLElement {
        const formattedReport: HTMLElement = document.createElement('table');
        return formattedReport;
    }

}
