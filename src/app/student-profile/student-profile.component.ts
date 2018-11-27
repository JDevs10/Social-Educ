import { Component, OnInit } from '@angular/core';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {
  private checkbox: any;
  private ok: boolean;
  private i: number;

  constructor() {}

  ngOnInit() {
    this.openExperienceForm();
    this.closeExperienceForm();

    this.openEducationForm();
    this.closeEducationForm();

    this.actualRole();
  }
  
openExperienceForm(): void {
  var div_pop_up = document.getElementById("pop-up");
  var expForm = document.getElementById("myExperienceForm");

  div_pop_up.style.display = "block";
  expForm.style.display = "block";
}

closeExperienceForm(): void {
  var div_pop_up = document.getElementById("pop-up");
  var expForm = document.getElementById("myExperienceForm");

  div_pop_up.style.display = "none";
  expForm.style.display = "none";
}

openEducationForm(): void {
  var div_pop_up = document.getElementById("pop-up");
  var expForm = document.getElementById("myEducationForm");

  div_pop_up.style.display = "block";
  expForm.style.display = "block";
}

closeEducationForm(): void {
  var div_pop_up = document.getElementById("pop-up");
  var expForm = document.getElementById("myEducationForm");

  div_pop_up.style.display = "none";
  expForm.style.display = "none";
}

actualRole(): void {
  this.checkbox = document.getElementById("working-now-checkbox");

  if(this.checkbox.checked == true){
    document.getElementById("months-to-id").style.display = "block";
    document.getElementById("show-present-txt").style.display = "none"; 
  }else{
    document.getElementById("months-to-id").style.display = "none";
    document.getElementById("show-present-txt").style.display = "block";
  }
  
}

}
