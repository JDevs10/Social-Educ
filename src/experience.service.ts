import { Injectable } from '@angular/core';
import { Experience } from './app/mock/experience';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  private url = 'http://localhost/Social/web/index.php';

  constructor(private http: HttpClient) { }

  getExperience(idStudent: Number): Observable<Experience[]> {
    return this.http.get<Experience[]>(this.url+"/api/student/"+idStudent+"/experience", {headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
  }

  addExperience(experience: Experience): Observable<Experience[]>{
    let body = `IdStudent=${experience.IdStudent}&Title=${experience.title}&CompanyName=${experience.companyName}
    &CompanyAddress=${experience.companyAddress}&CompanyWebSite=${experience.companyWebSite}
    &Period=${experience.period}&Description=${experience.description}`;

    return this.http.post<Experience[]>(this.url+"/api/student/"+experience.IdStudent+"/experience/addExperience", body,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
  }

  deleteExperiencePost(experiencePostID: Number, IdStudent: Number): Observable<Experience[]>{
    return this.http.get<Experience[]>(this.url+"/api/student/"+IdStudent+"/experience/"+experiencePostID+"/delete", {headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
  }
}
