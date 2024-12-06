import { Component, Input, OnInit } from '@angular/core';
import { Qoutes } from '../../services/qoute';
import { environment } from '../../../environment';

@Component({
  selector: 'app-qoute-overview',
  templateUrl: './qoute-overview.component.html',
  styleUrl: './qoute-overview.component.css'
})
export class QouteOverviewComponent implements OnInit {


  @Input() qoute !: Qoutes;
  backgourd_color: string = environment.background_color
  text_color: string = environment.text_color

  ngOnInit(): void {

  }


}
