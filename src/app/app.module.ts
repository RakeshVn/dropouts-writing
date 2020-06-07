import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components/login/login.component';
import { EventsComponent } from './components/events/events.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ClinteleComponent } from './components/clintele/clintele.component';
import { OwlModule } from 'ngx-owl-carousel';
import { AuditDetailsComponent } from './components/audit-details/audit-details.component';
import { WriterDetailsComponent } from './components/writer-details/writer-details.component';
import { QueryDetailsComponent } from './components/query-details/query-details.component';
import { BlogsComponent } from './blogs/blogs.component';
import { FooterComponent } from './components/footer/footer.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    NavbarComponent,
    LoginComponent,
    EventsComponent,
    ClinteleComponent,
    AuditDetailsComponent,
    WriterDetailsComponent,
    QueryDetailsComponent,
    BlogsComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    OwlModule,
    SlickCarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
