import {SaveFileService} from "../../common/SaveFileService";

export class GenerateReportService {
    public static generateReport(path: string, report: HTMLElement): Promise<void> {
        void SaveFileService.saveFile(report, path);
        return Promise.resolve();
    }
}
