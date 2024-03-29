import { Injectable } from '@angular/core';
import { Report } from '../model/report.model';
import { Subject, retry } from 'rxjs';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { ReportService } from './report.service';
import { state } from '@angular/animations';



@Injectable({
  providedIn: 'root'
})
export class FileService {

  reportsUploaded$: Subject<Report[]> = new Subject<Report[]>();

  constructor() { }

  downloadFileNow(data: string, filename: string, type: string) {
    const blob = new Blob([data], { type: type });
    Filesystem.checkPermissions().then(status => {
      console.log(status);
      if(status as any === 'granted') {
        
      }
    })

    this.writeFile(blob, filename).then((response => console.log(response))); 

  }

  private async writeFile(data: Blob, filename: string) {
    return await Filesystem.writeFile({
      path: filename,
      data: data,
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
    });
  };

  downloadReports(reports: ReadonlyArray<Report>) {
    console.log('REPORTS', reports);
    const jsonReports = JSON.stringify(reports);
    console.log('REPORTS as json', jsonReports);

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
