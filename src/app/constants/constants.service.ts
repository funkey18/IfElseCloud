import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AppCookieServiceService } from '../services/app-cookie-service.service';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {

  public HOME_URL = environment.serverUrl;
  public IMPORT_FILE_EXTNS = ["xlsx", "xls"];
  public FILE_SIZE = 190 * 1024;
  public IMG_EXTNS = ['jpg', 'JPG', 'jpeg', 'JPEG', 'png', 'PNG'];
  public FILE_EXTNS = ['jpg', 'JPG', 'jpeg', 'JPEG', 'png', 'PNG', 'pdf', 'PDF'];
  public KG_ADMIN_USER = 'KG_ADMIN_USER';

  constructor(private appCookieService: AppCookieServiceService, private http: HttpClient) { }

  public MESSAGES: any = {
    'ERROR': "Could not perform the request",
    'UNAUTHORIZED': "You're not authorized to access this page",
    'FORBIDDEN': "You don't have permission to access this page"
  }

  public RESPONSE_CODES: any = {
    'SUCCESS': '200'
  }

  // Server Url
  public SERVER_URLS: any = {

    GET_MEMBERS_LIST: '64mb.io',

  }

  public VALIDATION_PATTERNS: any = {
    'EMAIL': '^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$',
    'MOBILE': '(^$|[0-9]{10})',
    'ZIP_CODE': '(^$|[0-9]{6})'
  }



  public getSession(): any | null {
    return this.appCookieService.getSessionData(this.KG_ADMIN_USER);
  }

  public setSession(data: any): void {
    this.appCookieService.setSessionData(this.KG_ADMIN_USER, data, 1);
  }

  public clearSession(): void {
    this.appCookieService.clearSessionData(this.KG_ADMIN_USER);
  }

  public getAuthHeader() {
  const user = this.getSession();
  if (user) {
    return 'Bearer ' + (user && (user.sessionToken || user['session-token']) ? (user.sessionToken || user['session-token']) : '');
  } else {
    return '';
  }
}


  public convertToBase64(file: File): Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => result.next(reader.result!.toString());
    return result;
  }

  public hasPermission(...args: string[]) {
    let hasPermission = false;
    const user = this.getSession();
    if (user) {
      if (args.indexOf(user.role.name) > -1) {
        hasPermission = true;
      }
    }
    return hasPermission;
  }

  public hasModulePermission(module: string, action: string) {
    let hasPermission = false;
    const user = this.getSession();
    if (user) {
      let roleAction = user.role.actionList.find((element) => element.module == module);
      if (roleAction && ((action == 'ADD' && roleAction.addAction) || (action == 'UPDATE' && roleAction.updateAction)
        || (action == 'LIST' && roleAction.listAction) || (action == 'DELETE' && roleAction.deleteAction))) {
        hasPermission = true;
      }

    }
    return hasPermission;
  }


  public getImageUrl(imageName: string) {
    return this.HOME_URL + this.SERVER_URLS['IMAGE_URL'] + imageName + '/';
  }


  public getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  public checkFileExtension(fileExt: string) {
    if (this.FILE_EXTNS.indexOf(fileExt) > -1)
      return true;
    else
      return false;
  }

  public checkImageExtension(imgName) {
    if (this.IMG_EXTNS.indexOf(imgName) > -1)
      return true;
    else
      return false;
  }

  downloadFile(url: string) {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/octet-stream',
      'Authorization': this.getAuthHeader()
    });
    return this.http.get<any>(this.HOME_URL + url, { headers: httpHeaders, responseType: 'blob' as 'json' });
  }

  public checkIfAlphabetsWithOneSpace(event: any): void {
    const pattern = /^[A-Za-z\s]*$/;
    let inputChar = String.fromCharCode(event.charCode);
    const inputValue = event.target.value;

    if (inputChar === ' ' && inputValue.length === 0) {
      event.preventDefault();
      return;
    }

    if (inputChar === ' ' && inputValue[inputValue.length - 1] === ' ') {
      event.preventDefault();
      return;
    }

    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  public checkIfAllCharacters(event: any): void {
    const inputChar = String.fromCharCode(event.charCode);
    const inputValue = event.target.value;

    if (inputChar === ' ' && inputValue.length === 0) {
      event.preventDefault();
      return;
    }

    if (inputChar === ' ' && inputValue[inputValue.length - 1] === ' ') {
      event.preventDefault();
      return;
    }
  }

  public checkIfAlphanumericPassword(event: any): void {
    const inputChar = String.fromCharCode(event.charCode);
    const inputValue = event.target.value;

    if (inputChar === ' ') {
      event.preventDefault();
      return;
    }

    if (!/^[a-zA-Z0-9]$/.test(inputChar)) {
      event.preventDefault();
      return;
    }
  }

  public checkNoSpace(event: any): void {
    const inputChar = String.fromCharCode(event.charCode);
    if (inputChar === ' ') {
      event.preventDefault();
      return;
    }
  }

  public checkNoSpaceAndOnlyNumbers(event: any): void {
    const inputChar = String.fromCharCode(event.charCode);
    if (inputChar === ' ' || isNaN(Number(inputChar))) {
      event.preventDefault();
      return;
    }
  }

  checkIfAlphanumericNoSpaces(event: KeyboardEvent): boolean {
    const inputChar = String.fromCharCode(event.charCode);

    const pattern = /^[a-zA-Z0-9]$/;

    if (!pattern.test(inputChar)) {
      event.preventDefault();
      return false;
    }

    if (inputChar >= 'a' && inputChar <= 'z') {
      event.preventDefault();

      const upperChar = inputChar.toUpperCase();
      const target = event.target as HTMLInputElement;

      const start = target.selectionStart || 0;
      const end = target.selectionEnd || 0;
      const originalValue = target.value;

      target.value = originalValue.slice(0, start) + upperChar + originalValue.slice(end);

      target.setSelectionRange(start + 1, start + 1);
    }

    return true;
  }



}