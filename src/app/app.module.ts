import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from './services/supabase.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { ScrollHomeModule } from './components/scroll-home/scroll-home.module';
import { LoadingModule } from './components/loading/loading.module';
import { QouteOverviewComponent } from './components/qoute-overview/qoute-overview.component';
import { QouteOverviewModule } from './components/qoute-overview/qoute-overview.module';

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ScrollHomeModule,
    LoadingModule,
    QouteOverviewModule
  ],
  providers: [
    provideAnimationsAsync(),
    SupabaseService,
    SQLite,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }