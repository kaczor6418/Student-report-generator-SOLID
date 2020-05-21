import {Student} from "../../core/Student";
import {IBaseReportFormatterService} from "./interfaces/IHandleReportFormatterService";

export abstract class AbstractReportFormatterService implements IBaseReportFormatterService {
    protected report: Map<number, Student>;

    public abstract formatReport(): HTMLElement;

    constructor(formatReport: Map<number, Student>) {
        this.report = formatReport;
    }
}
