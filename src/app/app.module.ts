import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { localStorageSyncReducer, metaReducers, reducers } from "./app.reducer";

import { APP_BASE_HREF } from "@angular/common";
import { AppComponent } from "./app.component";
import { Autosize } from "./shared/directives/autosize/autosize.directive";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { ChecklistComponent } from "./checklist/checklist.component";
import { ChecklistEffect } from "./checklist-service/checklist.effects";
import { ChecklistService } from "./checklist-service/checklist.service";
import { ClickOutsideDirective } from "./shared/directives/click-outside/click-outside.directive";
import { ContentComponent } from "./content/content.component";
import { DragulaModule } from "ng2-dragula";
import { EffectsModule } from "@ngrx/effects";
import { ErrorHandlingService } from "./shared/error-handling/error-handling.service";
import { FocusDirective } from "./shared/directives/focus/focus.directive";
import { FooterComponent } from "./footer/footer.component";
import { FourOFourComponent } from "./four-o-four/four-o-four.component";
import { HeaderComponent } from "./header/header.component";
import { HelpComponent } from "./help/help.component";
import { HomeComponent } from "./home/home.component";
import { HttpModule } from "@angular/http";
import { LoginComponent } from "./login/login.component";
import { ModalWindowComponent } from "./modal-window/modal-window.component";
import { NgModule } from "@angular/core";
import { PresetModalContentComponent } from "./preset-modal-content/preset-modal-content.component";
import { RefocusDirective } from "./shared/directives/refocus/refocus.directive";
import { RestService } from "./shared/rest/rest.service";
import { Routing } from "./app.routes";
import { SailsModule } from "angular2-sails";
import { StatusBarComponent } from "./status-bar/status-bar.component";
import { StatusBarService } from "./status-bar/status-bar.service";
import { StoreModule } from "@ngrx/store";
import { UrlToLinkPipe } from "./shared/pipes/url-to-link/url-to-link.pipe";
import { UserEffect } from "./shared/user/user.effects";
import { UserService } from "./shared/user/user.service";
import { WindowSizeService } from "./shared/window-size/window-size.service";
import { environment } from "../environments/environment";

@NgModule({
  declarations: [
    Autosize,
    ClickOutsideDirective,
    UrlToLinkPipe,
    AppComponent,
    ChecklistComponent,
    FourOFourComponent,
    HeaderComponent,
    FooterComponent,
    ModalWindowComponent,
    PresetModalContentComponent,
    StatusBarComponent,
    HomeComponent,
    FocusDirective,
    RefocusDirective,
    ContentComponent,
    LoginComponent,
    HelpComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    StoreModule.forRoot(reducers, {
      metaReducers: [localStorageSyncReducer]
    }),
    DragulaModule,
    ReactiveFormsModule,
    FormsModule,
    Routing,
    BrowserAnimationsModule,
    EffectsModule.forRoot([ChecklistEffect, UserEffect]),
    SailsModule.forRoot()
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: "/" },
    ChecklistService,
    StatusBarService,
    RestService,
    ErrorHandlingService,
    UserService,
    WindowSizeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
