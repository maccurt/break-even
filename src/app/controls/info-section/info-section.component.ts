import { Component, Input, OnInit } from '@angular/core';
import { Help } from "src/app/help/Help";

@Component({
  selector: 'app-info-section',
  templateUrl: './info-section.component.html',
  styleUrls: ['./info-section.component.scss']
})
export class InfoSectionComponent {
  @Input() help!: Help;
  @Input() stat!:string;  
  constructor() { }
}
