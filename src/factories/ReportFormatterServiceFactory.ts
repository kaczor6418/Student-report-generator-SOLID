import {ReportFormatterType} from "../services/reportFormaters/interfaces/ReportFormatterType";
import {DeanReportFormatterService} from "../services/reportFormaters/DeanReportFormatterService";
import {UniversityWorkerReportFormatterService} from "../services/reportFormaters/UniversityWorkerReportFormatterService";
import {LecturerReportFormatterService} from "../services/reportFormaters/LecturerReportFormatterService";
import {Student} from "../core/Student";

export class ReportFormatterServiceFactory {
    public static getReportFormatterService(type: ReportFormatterType, report: Map<number, Student>): DeanReportFormatterService | LecturerReportFormatterService | UniversityWorkerReportFormatterService {
        let formatterService: DeanReportFormatterService | LecturerReportFormatterService | UniversityWorkerReportFormatterService;
        switch (type) {
            case ReportFormatterType.DEAN:
                formatterService = new DeanReportFormatterService(report);
                break;
            case ReportFormatterType.LECTURER:
                formatterService = new LecturerReportFormatterService(report);
                break;
            case ReportFormatterType.UNIVERSITY_WORKER:
                formatterService = new UniversityWorkerReportFormatterService(report);
                break;
            default:
                throw Error('Not supported report type')
        }
        return formatterService;
    }
}
