import {Component} from '@angular/core';
import {FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry} from 'ngx-file-drop';
import {HttpClient} from '@angular/common/http';
import {GALLERY_UPLOAD_URL} from '../../const';
import {FileUploadService} from '../../services/file.upload.service';

@Component({
  selector: 'drop-file',
  templateUrl: './drop.file.component.html',
  styleUrls: ['./drop.file.component.css']
})
export class DropFileComponent {

  constructor(private fileUploadService: FileUploadService) {}

  public files: NgxFileDropEntry[] = [];

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    this.fileUploadService.addFiles(files);
    this.fileUploadService.uploadFiles();
  }

  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }
}
