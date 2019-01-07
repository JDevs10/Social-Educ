import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../post.service';
import { ExperienceService } from '../../experience.service';
import { EducationService } from '../../education.service';
import { SkillService } from '../../skill.service';
import { Experience } from '../mock/experience';
import { Education } from '../mock/education';
import { Skill } from '../mock/skill';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {
  private checkbox: any;
  experience: Experience[];
  education: Education[];
  skill: Skill[];


  constructor(private route: ActivatedRoute,
    private postService: PostService,
    private experienceService: ExperienceService,
    private educationService: EducationService,
    private skillService: SkillService) {}

  ngOnInit() {
    this.openExperienceForm();
    this.closeExperienceForm();
    this.getExperience();

    this.openEducationForm();
    this.closeEducationForm();
    this.getEducationPost();

    this.getSkills();
    this.actualRole();
  }

  getExperience(): void{
    const id = +this.route.snapshot.paramMap.get('id');
    this.experienceService.getExperience(id).subscribe(experience => this.experience = experience);
  }
  
openExperienceForm(): void {
  var div_pop_up = document.getElementById("pop-up");
  var expForm = document.getElementById("myExperienceForm");

  div_pop_up.style.display = "block";
  expForm.style.display = "block";
}

addExperience(title: String, companyName: String, companyAddress: String, companyWebSite: String, deMonthFromExperience: String,
  deYearFromExperience: String, aMonthToExperience: String, aYearToExperience: String, description: String): void{
  const IdStudent = +this.route.snapshot.paramMap.get('id');

  title = title.trim();
  companyName = companyName.trim();
  companyAddress = companyAddress.trim();
  companyWebSite = companyWebSite.trim();
  deMonthFromExperience = deMonthFromExperience.trim();
  deYearFromExperience = deYearFromExperience.trim();
  aMonthToExperience = aMonthToExperience.trim();
  aYearToExperience = aYearToExperience.trim();
  description = description.trim();

  let period;
  if(this.checkbox.checked == true){
    period = "Je travaille actuellement dans ce rôle depuis "+deMonthFromExperience+" "+deYearFromExperience;
  }else{
    period = "Depuis "+deMonthFromExperience+" "+deYearFromExperience+" jusqu'a "+aMonthToExperience+" "+aYearToExperience;
  }

  if(!title || !companyName || !period ){return;}
  this.experienceService.addExperience({IdStudent, title, companyName, companyAddress, companyWebSite, period, description} as Experience)
  .subscribe(experience => {this.experience = experience;});
}

closeExperienceForm(): void {
  var div_pop_up = document.getElementById("pop-up");
  var expForm = document.getElementById("myExperienceForm");

  div_pop_up.style.display = "none";
  expForm.style.display = "none";
}

modifyExperiencePost(experiencePostID: Number): void{
  alert("A form pop-up need to show the correct information of the experience post by this id : "+experiencePostID);
  var allFrom_div = document.getElementById("allFrom");

  //allFrom_div.innerHTML("<p>Hello World people !!!</p>");
}

deleteExperiencePost(experiencePostID: Number): void{
  const IdStudent = +this.route.snapshot.paramMap.get('id');

  this.experienceService.deleteExperiencePost(experiencePostID, IdStudent).subscribe(experience => this.experience = experience);
}

// Education
getEducationPost(): void{
  const id = +this.route.snapshot.paramMap.get('id');
  this.educationService.getEducation(id).subscribe(education => this.education = education);
}

openEducationForm(): void {
  var div_pop_up = document.getElementById("pop-up");
  var expForm = document.getElementById("myEducationForm");

  div_pop_up.style.display = "block";
  expForm.style.display = "block";
}

addEducation(schoolName: String, diploma: String ,fieldOfStudy: String, diplomaLevel: String, 
  anneeFromEducation: String , anneeToEducation: String ,description: String): void{
    schoolName = schoolName.trim();
    diploma = diploma.trim();
    fieldOfStudy = fieldOfStudy.trim();
    diplomaLevel = diplomaLevel.trim();
    anneeFromEducation = anneeFromEducation.trim();
    anneeToEducation = anneeToEducation.trim();
    description = description.trim();

    const IdStudent = +this.route.snapshot.paramMap.get('id');
    this.checkbox = document.getElementById("working-now-checkbox");
    // En cour depuis Octobre 2018 jusqu'à Juillet 2019
    let period;

    if(this.checkbox.checked == true){
      period = "En cour depuis "+anneeFromEducation+" jusqu'à "+anneeToEducation;
    }else{
      period = "Diplôme validé en "+anneeFromEducation;
    }

    if(!schoolName || !diploma || !fieldOfStudy || !diplomaLevel || !period){
      alert("Tout les champs avec * doit être complété");
      return;
    }
    this.educationService.addEducation({IdStudent, schoolName, diploma, fieldOfStudy, diplomaLevel, period, 
      description} as Education, 1).subscribe(education => {this.education = education;});
  }

closeEducationForm(): void {
  var div_pop_up = document.getElementById("pop-up");
  var expForm = document.getElementById("myEducationForm");

  div_pop_up.style.display = "none";
  expForm.style.display = "none";
}

modifyEducationPost(educationPostID: Number): void{
  alert("A form pop-up need to show the correct information of the education post by this id : "+educationPostID);
}

deleteEducationPost(educationPostID: Number){
  const IdStudent = +this.route.snapshot.paramMap.get('id');

  this.educationService.deleteEducationPost(educationPostID, IdStudent).subscribe(education => this.education = education);
}

// Skills
openSkillForm(): void {
  var div_pop_up = document.getElementById("pop-up");
  var skillForm = document.getElementById("mySkillForm");

  div_pop_up.style.display = "block";
  skillForm.style.display = "block";
}

getSkills(): void{
  const id = +this.route.snapshot.paramMap.get('id');
  this.skillService.getSkills(id).subscribe(skill => this.skill = skill);
}

addSkill(skillName: String): void{
    const IdStudent = +this.route.snapshot.paramMap.get('id');
    skillName = skillName.trim();

    if(!skillName){alert("le champ est vide voudriez-vous le remplir...");  return;}
    this.skillService.addSkill({IdStudent, skillName} as Skill, 1).subscribe(skill => {this.skill = skill;});
}

closeSkillForm(): void {
  var div_pop_up = document.getElementById("pop-up");
  var skillForm = document.getElementById("mySkillForm");

  div_pop_up.style.display = "none";
  skillForm.style.display = "none";
}

modifySkillPost(id_id: Number, n: Number): void{

}

deleteSkill(skill_id: Number): void{
  const IdStudent = +this.route.snapshot.paramMap.get('id');

  this.skillService.deleteSkill(skill_id, IdStudent).subscribe(skill => this.skill = skill);
}

actualRole(): void {
  this.checkbox = document.getElementById("working-now-checkbox");

  if(this.checkbox.checked == true){
    document.getElementById("months-to-id").style.display = "none";
    document.getElementById("show-present-txt").style.display = "block";
  }else{
    document.getElementById("months-to-id").style.display = "block";
    document.getElementById("show-present-txt").style.display = "none";
  }
}

diplomaValidation(): void{
  this.checkbox = document.getElementById("valid-diploma-checkbox");
  var valid_at_title = document.getElementById("valid-at-title");
  var valid_to = document.getElementById("valid-to"); 

  if(this.checkbox.checked == true){
    valid_at_title.innerText = "En cour depuis";
    valid_to.style.display = "block";
  }else{
    valid_at_title.innerText = "Validé en";
    valid_to.style.display = "none";
  }
}


}
