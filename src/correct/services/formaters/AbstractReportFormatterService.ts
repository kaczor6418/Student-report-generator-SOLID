import {ReportType} from "../../../enums/ReportType";

export abstract class AbstractReportFormatterService {
    private reportType: ReportType;

    public abstract formatReport(): HTMLElement;

    constructor(reportType: ReportType) {
        this.reportType = reportType;
    }
}
