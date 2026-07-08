import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment';
import { Survey } from '../Models/survey.model';

@Injectable({
  providedIn: 'root',
})
export class SurveyService {
  private http = inject(HttpClient);
  private api = `${environment.apiUrl}/surveys`;

  getAll(): Observable<Survey[]> {
    return this.http.get<Survey[]>(this.api);
  }

  getById(id: number): Observable<Survey> {
    return this.http.get<Survey>(`${this.api}/${id}`);
  }

  create(survey: Survey): Observable<Survey> {
    return this.http.post<Survey>(this.api, survey);
  }

  update(id: number, survey: Survey): Observable<Survey> {
    return this.http.put<Survey>(`${this.api}/${id}`, survey);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
