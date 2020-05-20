import {ReportType} from "../../../enums/ReportType";
import {IHandleFormatterService} from "./interfaces/IHandleFormatterService";

export abstract class AbstractReportFormatterService implements IHandleFormatterService{
    private reportType: ReportType;

    public abstract formatReport(): HTMLElement;

    constructor(reportType: ReportType) {
        this.reportType = reportType;
    }
}
