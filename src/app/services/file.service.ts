import { Injectable } from '@angular/core';
import { Report } from '../model/report.model';
import { Subject, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  reportsUploaded$: Subject<Report[]> = new Subject<Report[]>();

  constructor() { }

  downloadFileNow(data: string, filename: string, type: string) {
    const blob = new Blob([data], { type: type });
    console.log('save');
    if ((window.navigator as any).msSaveOrOpenBlob) {
      (window.navigator as any).msSaveBlob(blob, filename);
    } else {
      const link = document.createElement('a');
      link.setAttribute('href', URL.createObjectURL(blob));
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  downloadReports(reports: Report[]) {
    const jsonReports = JSON.stringify(reports);
    this.downloadFileNow(jsonReports, 'reports.json', 'text/json');
  }

  uploadReportsFile(file: File) {
    var reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = () => {
      console.log(reader.result);
      if(typeof reader.result === 'string') {
        const reports: Report[] = JSON.parse(reader.result);
        reports.forEach(report => {
          if(typeof report.date === 'string') {
            report.date = new Date(Date.parse(report.date));
          }
        });
        this.reportsUploaded$.next(reports);
      }
    } // read file as data url
    
  }

  getReportsUploaded$() {
    return this.reportsUploaded$.asObservable();
  }
}
