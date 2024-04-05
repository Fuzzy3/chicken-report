import { Report } from "./report.model";

export interface ReportsByWeek {
    week: number,
    eggs: number,
    reports: Report[]
}