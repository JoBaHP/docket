import { RouterModule, Routes } from "@angular/router";

import { ChecklistComponent } from "./checklist/checklist.component";
import { FourOFourComponent } from "./four-o-four/four-o-four.component";
import { HelpComponent } from "./help/help.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { ModuleWithProviders } from "@angular/core";

const appRoutes: Routes = [
  {
    path: "",
    component: HomeComponent,
    pathMatch: "full"
  },
  {
    path: "list/:id",
    component: ChecklistComponent,
    pathMatch: "full"
  },
  {
    path: "login",
    component: LoginComponent,
    pathMatch: "full"
  },
  {
    path: "help",
    component: HelpComponent,
    pathMatch: "full"
  },
  {
    path: "**",
    component: FourOFourComponent
  }
];

export const Routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
