import {Student} from "../../../../common/Student";

export type IHandleFormatterService = IDeanFormatterService | ILecturerFormatterService | IUniversityWorkerService;

export interface IBaseFormatterService {
    formatReport(report: Map<number, Student>): HTMLElement;
}

export interface IDeanFormatterService extends IBaseFormatterService { }

export interface ILecturerFormatterService extends IBaseFormatterService {
    updateReport(indexes: number[]): void;
}

export interface IUniversityWorkerService extends IBaseFormatterService { }
