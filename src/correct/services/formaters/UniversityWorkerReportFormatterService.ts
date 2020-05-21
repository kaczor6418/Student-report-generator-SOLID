import {AbstractReportFormatterService} from "./AbstractReportFormatterService";
import {IUniversityWorkerService} from "./interfaces/IHandleFormatterService";
import {Student} from "../../../common/Student";

export class UniversityWorkerReportFormatterService extends AbstractReportFormatterService implements IUniversityWorkerService{
    public formatReport(report: Map<number, Student>): HTMLElement {
        const formattedReport: HTMLElement = document.createElement('table');
        // Report formatting logic
        return formattedReport;
    }
}
