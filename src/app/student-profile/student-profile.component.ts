import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {
  checkbox: any;
  constructor() {}

  ngOnInit() {
    this.openForm();
    this.closeForm();
    this.actualRole();
  }

openForm(): void {
    document.getElementById("myExperienceForm").style.display = "block";
}

closeForm(): void {
    document.getElementById("myExperienceForm").style.display = "none";
}

actualRole(): void {
  this.checkbox = document.getElementById("working-now-checkbox");

  if(this.checkbox.checked == false){
    document.getElementById("months-to-id").style.display = "block";
    document.getElementById("show-present-txt").style.display = "none"; 
  }else{
    document.getElementById("months-to-id").style.display = "none";
    document.getElementById("show-present-txt").style.display = "block";
  }
  
}

}
