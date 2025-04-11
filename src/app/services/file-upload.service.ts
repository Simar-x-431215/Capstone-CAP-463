import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FileUpload } from '../models/file-upload.model';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private basePath = '/uploads';

  constructor(
    private storage: AngularFireStorage,
    private db: AngularFirestore
  ) { }

  // Upload a CV file to Firebase Storage
  pushFileToStorage(fileUpload: FileUpload): Observable<number | undefined> {
    const filePath = `${this.basePath}/${new Date().getTime()}_${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
          this.saveFileData(fileUpload);
        });
      })
    ).subscribe();

    return uploadTask.percentageChanges();
  }

  // Save file metadata to Firestore
  private saveFileData(fileUpload: FileUpload): void {
    const fileData = {
      name: fileUpload.name,
      url: fileUpload.url,
      createdAt: new Date().toISOString(),
      size: fileUpload.file.size,
      type: fileUpload.file.type
    };
    
    this.db.collection('cv-files').add(fileData);
  }

  // Get a list of files from Firestore
  getFiles(limit: number): Observable<any[]> {
    return new Observable(observer => {
      this.db.collection('cv-files', ref => 
        ref.orderBy('createdAt', 'desc').limit(limit)
      ).get().subscribe({
        next: (querySnapshot) => {
          const files = querySnapshot.docs.map(doc => {
            const data = doc.data() as FileUpload;
            return {
              ...data,
              id: doc.id
            };
          });
          observer.next(files);
          observer.complete();
        },
        error: (error) => {
          observer.error(error);
        }
      });
    });
  }

  // Delete a file from both Storage and Firestore
  deleteFile(fileUpload: FileUpload): void {
    this.deleteFileStorage(fileUpload.name);
    this.deleteFileData(fileUpload.id);
  }

  // Delete file from Storage
  private deleteFileStorage(name: string): void {
    const storageRef = this.storage.ref(this.basePath);
    storageRef.child(name).delete();
  }

  // Delete file metadata from Firestore
  private deleteFileData(id: string): void {
    this.db.collection('cv-files').doc(id).delete();
  }
} 