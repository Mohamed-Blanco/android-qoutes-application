import { Routes } from '@angular/router';
import { QoutesComponent } from './app/components/qoutes/qoutes.component';
import { ScrollHomeComponent } from './app/components/scroll-home/scroll-home.component';



const routes: Routes = [



    {
        path: 'Qoute/:qouteId',
        component: QoutesComponent
    },
    {
        path: 'home',
        component: ScrollHomeComponent
    },




];

export default routes;
