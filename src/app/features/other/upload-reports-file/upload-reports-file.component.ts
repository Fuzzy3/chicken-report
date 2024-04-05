import { Component, ElementRef, ViewChild } from '@angular/core';
import { FileService } from '@core/services/file.service';
import { ReportService } from '@core/services/report.service';


@Component({
  selector: 'app-upload-reports-file',
  standalone: true,
  imports: [],
  templateUrl: './upload-reports-file.component.html',
  styleUrl: './upload-reports-file.component.scss'
})
export class UploadReportsFileComponent {

  
    @ViewChild('fileUpload')
    fileUpload: ElementRef;

    file: File | undefined;

    constructor(private fileService: FileService, private reportService: ReportService) {
      
    }
  
    onFileSelected(event: any) {
      if (event.target.files && event.target.files[0]) {
        this.file = event.target.files[0];
      }
    }
  
    uploadSelectedFile() {
      if(this.file) {
        console.log('here');
        this.fileService.uploadReportsFile(this.file);
        this.fileUpload.nativeElement.value = '';
      }
    }

    saveReports() {
      this.fileService.downloadReports(this.reportService.getReports());  
    }

  }
  