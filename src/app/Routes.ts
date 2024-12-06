import { Routes } from '@angular/router';
import { SwipeHomeComponent } from './components/swipe-home/swipe-home.component';



const routes: Routes = [

    {
        path: '',
        redirectTo: '/Landing/Home', // Default route
        pathMatch: 'full'
    },
    {
        path: "Landing",
        component: SwipeHomeComponent,
        children: [
            {
                path: 'Home',
                component: SwipeHomeComponent
            },

        ]
    },
    {
        path: 'Register',
        component: SwipeHomeComponent
    },


];

export default routes;
