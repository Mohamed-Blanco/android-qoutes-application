import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environment';


@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css'
})
export class LoadingComponent implements OnInit {


  background_color: string = environment.background_color
  ngOnInit(): void {

  }

}
