import { Injectable } from '@angular/core';
import { Education } from './app/mock/education';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EducationService {

  private url = 'http://localhost/Social/web/index.php';

  constructor(private http: HttpClient) { }

  getEducation(idStudent: Number): Observable<Education[]>{
    return this.http.get<Education[]>(this.url+"/api/student/"+idStudent+"/education", {headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
  }

  addEducation(education: Education, id: Number): Observable<Education[]>{
    let body = `IdStudent=${education.IdStudent}&SchoolName=${education.schoolName}&Diploma=${education.diploma}&FieldOfStudy=${education.fieldOfStudy}&DiplomaLevel=${education.diplomaLevel}&Period=${education.period}&Description=${education.description}`;
    return this.http.post<Education[]>(this.url+"/api/student/"+id+"/education/addEducation", body,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
  }
}
