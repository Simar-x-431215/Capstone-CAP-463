export class FileUpload {
  id: string;
  file: File;
  name: string;
  url: string;
  progress: number;
  createdAt: Date;

  constructor(file: File) {
    this.file = file;
    this.name = '';
    this.url = '';
    this.id = '';
    this.progress = 0;
    this.createdAt = new Date();
  }
} 