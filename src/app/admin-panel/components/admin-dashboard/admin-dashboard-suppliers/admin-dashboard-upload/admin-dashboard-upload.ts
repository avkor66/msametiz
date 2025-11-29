import {Component, signal} from '@angular/core';
import {environment} from "../../../../../../environments/environment";
import {SvgIcon} from "../../../../../common-ui/svg-icon/svg-icon";
import {Dnd} from "../../../../../common-ui/directives/dnd";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-admin-dashboard-upload',
  imports: [
    SvgIcon,
    Dnd
  ],
  templateUrl: './admin-dashboard-upload.html',
  styleUrl: './admin-dashboard-upload.scss'
})
export class AdminDashboardUpload {
  private apiUploadFileExcel: string = `${environment.apiMaterialsUrl}products/upload-product-data`;
  uploadStatus: string = '';
  uploadError: string = '';
  priceItems = signal<string>("0")

  constructor(private http: HttpClient) {}

  fileBrowserHandler(event: Event) {
    const file: File | undefined = (event.target as HTMLInputElement)?.files?.[0];
    this.processFile(file);

    (event.target as HTMLInputElement).value = '';


  }

  onFileDropped(file: File) {
    this.processFile(file);
  }

  checkPrice() {
    this.http.get(`${environment.apiMaterialsUrl}products/product/count`).subscribe({
      next: (response) => {
          console.log('Данные получены, всего: ', response);
          this.priceItems.set(response.toString())
      },
      error: (error) => {
        console.error('Ошибка во время удаления:', error);
      }
    });
  }

  deletePrice() {
    this.http.delete(`${environment.apiMaterialsUrl}products/all`).subscribe({
      next: (response) => {
        console.log('Данные успешно удалены:', response);
      },
      error: (error) => {
        console.error('Ошибка во время удаления:', error);
      }
    });
  }

  processFile(file: File | null | undefined) {
    this.uploadStatus = '';
    this.uploadError = '';

    if (!file) return;

    const isExcelMime = file.type.match(/application\/vnd\.openxmlformats-officedocument\.spreadsheetml\.sheet$/);
    const fileName = file.name.toLowerCase();
    const isExcelExtension = fileName.endsWith('.xlsx');

    if (!isExcelMime && !isExcelExtension) {
      this.uploadError = 'Неверный тип файла. Пожалуйста, загрузите файл Excel (.xlsx).';
      console.error(this.uploadError);
      return;
    }

    console.log('Файл соответствует:', file.name);

    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    this.uploadStatus = 'Загрузка...';

    this.http.post(this.apiUploadFileExcel, formData).subscribe({
      next: (response) => {
        this.uploadStatus = 'Файл успешно загружен!';
        console.log('Успешный ответ сервера:', response);
      },
      error: (error) => {
        this.uploadError = 'Ошибка загрузки: ' + (error.message || 'Неизвестная ошибка');
        this.uploadStatus = '';
        console.error('Ошибка при загрузке файла:', error);
      }
    });
  }
}

interface IPriceItem {
  message: string,
  items: number
}