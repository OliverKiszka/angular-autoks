import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { StorageServiceModule } from "ngx-webstorage-service";

import { AppComponent } from "./app.component";
import { ListaWydatkowComponent } from "./lista-wydatkow/lista-wydatkow.component";
import { WydatkiService } from "./wydatki.service";
import { DodajWydatekComponent } from "./dodaj-wydatek/dodaj-wydatek.component";
import { StatystykaComponent } from "./statystyka/statystyka.component";

const appRoutes: Routes = [
  { path: "wydatki", component: ListaWydatkowComponent },
  { path: "dodaj", component: DodajWydatekComponent },
  { path: "statystyka", component: StatystykaComponent },
  { path: "", redirectTo: "/wydatki", pathMatch: "full" }
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    StorageServiceModule
  ],
  declarations: [
    AppComponent,
    ListaWydatkowComponent,
    DodajWydatekComponent,
    StatystykaComponent
  ],
  bootstrap: [AppComponent],
  providers: [WydatkiService]
})
export class AppModule {}
