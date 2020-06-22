export type IHandleReportFormatterService = IDeanReportFormatterService | ILecturerReportFormatterService | IUniversityWorkerReportFormatterService;

export interface IBaseReportFormatterService {
    formatReport(): HTMLElement;
}

export interface UniversityAdministrator {
    updateReport(indexes: number[]): void;
}

export interface IDeanReportFormatterService extends IBaseReportFormatterService { }

export interface ILecturerReportFormatterService extends IBaseReportFormatterService, UniversityAdministrator {}

export interface IUniversityWorkerReportFormatterService extends IBaseReportFormatterService { }
