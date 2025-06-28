import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { ConstantsService } from '../constants/constants.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient, private constants: ConstantsService) { }

  /**
  * Method to do GET request to server by passing URL
  * @param url
  */
  getRequest(url: String): Observable<any> {
    return this.http.get<any>(this.constants.HOME_URL + url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.constants.getAuthHeader()
      })
    });
  }

  postRequest(url: String, data: any): Observable<any> {
    return this.http.post<any>(this.constants.HOME_URL + url, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.constants.getAuthHeader()
      })
    });
  }

  putRequest(url: String, data: any) {
    return this.http.put<any>(this.constants.HOME_URL + url, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.constants.getAuthHeader()
      })
    });
  }

  deleteRequest(url: String) {
    return this.http.delete<any>(this.constants.HOME_URL + url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.constants.getAuthHeader()
      })
    });
  }

  multipartRequest(url: string, files: any, contentParameter: string, content: any): Observable<any> {
    const formData: FormData = new FormData();
    Object.keys(files).forEach(key => {
      formData.append(key, files[key]);
    });
    if(contentParameter && content){
      const contentOverrides = new Blob([JSON.stringify(content)], {
        type: 'application/json',
      });
      formData.append(contentParameter, contentOverrides);
    }
    return this.http.post<any>(this.constants.HOME_URL + url, formData, {
      headers: new HttpHeaders({
        'Authorization': this.constants.getAuthHeader(),
      }),
    });
  }


  multipartFilesRequest(url: string, files: any[], contentParameter: string, content: any): Observable<any> {
    const formData: FormData = new FormData();
  
    // Loop through the list of files and append each one to the FormData
    files.forEach((file, index) => {
      formData.append('files', file, file.name); // 'files' is the key name for all files
    });
  
    // If content (e.g., JSON) is provided, append it as a Blob to FormData
    if (contentParameter && content) {
      const contentOverrides = new Blob([JSON.stringify(content)], {
        type: 'application/json',
      });
      formData.append(contentParameter, contentOverrides); // Append content as a JSON Blob
    }
  
    // Send the request with FormData and necessary headers
    return this.http.post<any>(this.constants.HOME_URL + url, formData, {
      headers: new HttpHeaders({
        'Authorization': this.constants.getAuthHeader(),
      }),
    });
  }

  multipartFilesRequestPut(url: string, files: any[], contentParameter: string, content: any): Observable<any> {
    const formData: FormData = new FormData();
  
    // Loop through the list of files and append each one to the FormData
    files.forEach((file, index) => {
      formData.append('files', file, file.name); // 'files' is the key name for all files
    });
  
    // If content (e.g., JSON) is provided, append it as a Blob to FormData
    if (contentParameter && content) {
      const contentOverrides = new Blob([JSON.stringify(content)], {
        type: 'application/json',
      });
      formData.append(contentParameter, contentOverrides); // Append content as a JSON Blob
    }
  
    // Send the request with FormData and necessary header
    return this.http.put<any>(this.constants.HOME_URL + url, formData, {
      headers: new HttpHeaders({
        'Authorization': this.constants.getAuthHeader(),
      }),
    });
  }
  
  


  postRequestWithFile(url: string, fileParameter: string, file: any, contentParameter: string, content: any): Observable<any> {
    const formData: FormData = new FormData();
    if (file) {
      formData.append(fileParameter, file);
    }
    formData.append(contentParameter, JSON.stringify(content));
    return this.http.post<any>(this.constants.HOME_URL + url, formData, {
      headers: new HttpHeaders({
        'Authorization': this.constants.getAuthHeader(),
      }),
    });
  }

  putRequestWithFile(url: string, fileParameter: string, file: any, contentParameter: string, content: any): Observable<any> {
    const formData: FormData = new FormData();
    if (file) {
      formData.append(fileParameter, file);
    }
    formData.append(contentParameter, JSON.stringify(content));
    return this.http.put<any>(this.constants.HOME_URL + url, formData, {
      headers: new HttpHeaders({
        'Authorization': this.constants.getAuthHeader()
      })
    });
  }

  postRequestWithFileOtherDetails(url: string, researchParameter: string, researchFile: any, syllabusParameter: string, syllabusFile: any, otherlinkParameter: string, otherlinkFile: any, detailsParameter: string, deptOtherDetails: any): Observable<any> {
    const formData: FormData = new FormData();
    if (researchFile) {
      formData.append(researchParameter, researchFile);
    }
    if (syllabusFile) {
      formData.append(syllabusParameter, syllabusFile);
    }
    if (otherlinkFile) {
      formData.append(otherlinkParameter, otherlinkFile);
    }
    const detailsOverrides = new Blob([JSON.stringify(deptOtherDetails)], {
      type: 'application/json',
    });
    formData.append(detailsParameter, detailsOverrides);
    return this.http.post<any>(this.constants.HOME_URL + url, formData, {
      headers: new HttpHeaders({
        'Authorization': this.constants.getAuthHeader(),
      }),
    });
  }


  putRequestWithFileOtherDetails(url: string, researchParameter: string, researchFile: any, syllabusParameter: string, syllabusFile: any, otherlinkParameter: string, otherlinkFile: any, detailsParameter: string, deptOtherDetails: any): Observable<any> {
    const formData: FormData = new FormData();
    if (researchFile) {
      formData.append(researchParameter, researchFile);
    }
    if (syllabusFile) {
      formData.append(syllabusParameter, syllabusFile);
    }
    if (otherlinkFile) {
      formData.append(otherlinkParameter, otherlinkFile);
    }
    const detailsOverrides = new Blob([JSON.stringify(deptOtherDetails)], {
      type: 'application/json',
    });
    formData.append(detailsParameter, detailsOverrides);
    return this.http.put<any>(this.constants.HOME_URL + url, formData, {
      headers: new HttpHeaders({
        'Authorization': this.constants.getAuthHeader()
      })
    });
  }

  postRequestWithTwoFile(url: string, marathiParameter: string, marathiPdf: any, englishParameter: string, englishPdf: any, objectParameter: string, object: any): Observable<any> {
    const formData: FormData = new FormData();
    if (marathiPdf) {
      formData.append(marathiParameter, marathiPdf);
    }
    if (englishPdf) {
      formData.append(englishParameter, englishPdf);
    }
    const detailsOverrides = new Blob([JSON.stringify(object)], {
      type: 'application/json',
    });
    formData.append(objectParameter, detailsOverrides);
    return this.http.post<any>(this.constants.HOME_URL + url, formData, {
      headers: new HttpHeaders({
        'Authorization': this.constants.getAuthHeader(),
      }),
    });
  }


  putRequestWithTwoFile(url: string, marathiParameter: string, marathiPdf: any, englishParameter: string, englishPdf: any, weatherForecastParameter: string, weatherForecast: any): Observable<any> {
    const formData: FormData = new FormData();
    if (marathiPdf) {
      formData.append(marathiParameter, marathiPdf);
    }
    if (englishPdf) {
      formData.append(englishParameter, englishPdf);
    }
    const detailsOverrides = new Blob([JSON.stringify(weatherForecast)], {
      type: 'application/json',
    });
    formData.append(weatherForecastParameter, detailsOverrides);
    return this.http.put<any>(this.constants.HOME_URL + url, formData, {
      headers: new HttpHeaders({
        'Authorization': this.constants.getAuthHeader()
      })
    });
  }



  postExternalRequest(url: string, data: any): Observable<any> {
    return this.http.post<any>(url, data == ''? null : data , {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
    });
  }


  downloadFile(url: string) {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/octet-stream',
      'Authorization': this.constants.getAuthHeader()
    });
    return this.http.get<any>(this.constants.HOME_URL + url, { headers: httpHeaders, responseType: 'blob' as 'json' });
  }
}
