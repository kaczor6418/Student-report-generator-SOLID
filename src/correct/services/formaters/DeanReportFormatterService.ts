import {AbstractReportFormatterService} from "./AbstractReportFormatterService";
import {IDeanFormatterService} from "./interfaces/IHandleFormatterService";
import {Student} from "../../../common/Student";

export class DeanReportFormatterService extends AbstractReportFormatterService implements IDeanFormatterService {
    public formatReport(report: Map<number, Student>): HTMLElement {
        const formattedReport: HTMLElement = document.createElement('table');
        // Report formatting logic
        return formattedReport;
    }
}
