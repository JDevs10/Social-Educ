import { Injectable } from '@angular/core';
import { Skill } from './app/mock/skill';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  private url = 'http://localhost/Social/web/index.php';

  constructor(private http: HttpClient) { }

  getSkills(idStudent: Number): Observable<Skill[]>{
    return this.http.get<Skill[]>(this.url+"/api/student/"+idStudent+"/skill", {headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
  }

  addSkill(skill: Skill, id: Number): Observable<Skill[]>{
    let body = `IdStudent=${skill.IdStudent}&SkillName=${skill.skillName}`;
    return this.http.post<Skill[]>(this.url+"/api/student/"+id+"/skill/addSkill", body,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
  }

  deleteSkill(skill_id: Number, idStudent: Number): Observable<Skill[]>{
    return this.http.get<Skill[]>(this.url+"/api/student/"+idStudent+"/skill/"+skill_id+"/delete", {headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
  }
}
