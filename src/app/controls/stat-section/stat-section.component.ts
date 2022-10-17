import { Help } from "../../help/Help";
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stat-section',
  templateUrl: './stat-section.component.html',
  styleUrls: ['./stat-section.component.scss']
})
export class StatSectionComponent  {  
  @Input() help!:Help;
  @Input() stat!:number;  
  constructor() { 

  }  
}