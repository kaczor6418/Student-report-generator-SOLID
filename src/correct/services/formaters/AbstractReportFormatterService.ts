import {ReportType} from "../../../enums/ReportType";
import {Student} from "../../../common/Student";
import {IBaseFormatterService} from "./interfaces/IHandleFormatterService";

export abstract class AbstractReportFormatterService implements IBaseFormatterService {
    private reportType: ReportType;

    protected formattedReport: HTMLElement;

    public abstract formatReport(report: Map<number, Student>): HTMLElement;

    constructor(reportType: ReportType) {
        this.reportType = reportType;
    }
}
