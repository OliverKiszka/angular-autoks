import { Component, OnInit } from "@angular/core";
import { Wydatek, KATEGORIE } from "../wydatek";
import { WydatkiService } from "../wydatki.service";

@Component({
  selector: "app-statystyka",
  templateUrl: "./statystyka.component.html",
  styleUrls: ["./statystyka.component.css"]
})
export class StatystykaComponent implements OnInit {
  wydatki: Wydatek[];
  kategorie: string[];
  private stat: number = 0;
  private lacznaKwotaRawPriv: number;

  constructor(private wydatkiService: WydatkiService) {}

  ngOnInit() {
    this.kategorie = KATEGORIE;
    this.wydatki = this.wydatkiService.getWydatki();
    this.lacznaKwotaRawPriv = this.wydatki.reduce(
      (acc, val) => (acc += val.kwota),
      0
    );
  }

  private fullStat() {
    this.lacznaKwotaRawPriv = this.wydatki.reduce(
      (acc, val) => (acc += val.kwota),
      0
    );
  }

  private monthStat() {
    const month = new Date().getMonth();
    const year = new Date().getFullYear();

    const wydatki = this.wydatki
      .filter(wyd => {
        return (
          new Date(wyd.data).getMonth() === month &&
          new Date(wyd.data).getFullYear() === year
        );
      })
      .reduce((acc, val) => (acc += val.kwota), 0);
    this.lacznaKwotaRawPriv = wydatki;
  }

  public get lacznaKwotaRaw(): number {
    return this.lacznaKwotaRawPriv;
  }

  public set lacznaKwotaRaw(val) {
    this.lacznaKwotaRawPriv = val;
  }

  public lacznaKwota(kategoria: string): number {
    if (this.stat === 0) {
      return this.wydatki
        .filter(wyd => wyd.kategoria === kategoria)
        .reduce((acc, val) => (acc += val.kwota), 0);
    } else if (this.stat === 1) {
      const month = new Date().getMonth();
      const year = new Date().getFullYear();

      return this.wydatki
        .filter(wyd => wyd.kategoria === kategoria)
        .filter(wyd => {
          return (
            new Date(wyd.data).getMonth() === month &&
            new Date(wyd.data).getFullYear() === year
          );
        })
        .reduce((acc, val) => (acc += val.kwota), 0);
    }
  }

  public onWydatki(id: number) {
    if (id === 0) {
      this.stat = id;
      this.fullStat();
    } else if (id === 1) {
      this.stat = id;
      this.monthStat();
    } else {
    }
  }
}
