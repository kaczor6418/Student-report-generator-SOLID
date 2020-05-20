import {ReportType} from "../../enums/ReportType";
import {DeanReportFormatterService} from "../services/formaters/DeanReportFormatterService";
import {UniversityWorkerReportFormatterService} from "../services/formaters/UniversityWorkerReportFormatterService";
import {LecturerReportFormatterService} from "../services/formaters/LecturerReportFormatterService";
import {IHandleFormatterService} from "../services/formaters/interfaces/IHandleFormatterService";

export class ReportFormatterFactory {
    public static getReportFormatter(type: ReportType): IHandleFormatterService {
        let formatterService: IHandleFormatterService;
        switch (type) {
            case ReportType.DEAN:
                formatterService = new DeanReportFormatterService(type);
                break;
            case ReportType.LECTURER:
                formatterService = new LecturerReportFormatterService(type);
                break;
            case ReportType.UNIVERSITY_WORKER:
                formatterService = new UniversityWorkerReportFormatterService(type);
                break;
            default:
                throw Error('Not supported report type')
        }
        return formatterService;
    }
}
