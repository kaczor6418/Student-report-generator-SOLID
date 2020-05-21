export type IHandleReportFormatterService = IDeanReportFormatterService | ILecturerReportFormatterService | IUniversityWorkerReportFormatterService;

export interface IBaseReportFormatterService {
    formatReport(): HTMLElement;
}

export interface IDeanReportFormatterService extends IBaseReportFormatterService { }

export interface ILecturerReportFormatterService extends IBaseReportFormatterService {
    updateReport(indexes: number[]): void;
}

export interface IUniversityWorkerReportFormatterService extends IBaseReportFormatterService { }
