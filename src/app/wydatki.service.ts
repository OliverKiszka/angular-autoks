import { Injectable, Inject } from "@angular/core";
import { Wydatek, KATEGORIE } from "./wydatek";

import { LOCAL_STORAGE, StorageService } from "ngx-webstorage-service";

const STORAGE_KEY = "ksiegowy_storage";

@Injectable()
export class WydatkiService {
  private wydatki: Wydatek[];
  private nextId: number;
  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {
    
    const wydatkiList = this.storage.get(STORAGE_KEY) || {
      items: [],
      empty: true
    };
    if (wydatkiList.items.length > 0) {
      this.nextId = wydatkiList.length + 1;
      this.wydatki = wydatkiList.items;
    } else {
      this.nextId = 1;
      this.wydatki = [];
    }
  }
    public pushStore(wydatek: Wydatek): void {
    const wydatkiList = this.storage.get(STORAGE_KEY) || {
      items: [],
      empty: true
    };
    wydatkiList.items.push(wydatek);
    this.storage.set(STORAGE_KEY, wydatkiList);
  }
    public removeFromStore(id: number): void {
    let wydatkiList = this.storage.get(STORAGE_KEY) || {
      items: [],
      empty: true
    };
    wydatkiList.items = wydatkiList.items.filter(wyd => wyd.id !== id);
    this.storage.set(STORAGE_KEY, wydatkiList);
  }
    
    
    
    
    
    
    
    reset() {
    this.nextId = 7;
    this.wydatki = [
      new Wydatek(1, "Tankowanie", 252.4, "", new Date(2018, 4, 30), 527.5, 48),
      new Wydatek(2, "Myjnia", 75, "", new Date(2018, 4, 2)),
      new Wydatek(3, "Serwis",1250,"Klocki, rozrząd i parę drobiazgów",new Date(2018, 3, 16)),
      new Wydatek(4,"Inne",315.5,"Różowe futerko na kierownicę",new Date(2018, 3, 16),55,55),
      new Wydatek(5,"Tankowanie",325.2,"Do pełna po urlopie",new Date(2017, 7, 12),527),
      new Wydatek(6, "Tankowanie", 257.3, "", new Date(2017, 7, 13), null, 35)
    ];
    this.wydatki.forEach(wyd => this.pushStore(wyd));
    }






  
  getWydatki() {
    return this.wydatki;
  }
  getKategorie(): string[] {
    return KATEGORIE;
  }
  dodajWydatek(nowyWydatek: Wydatek): void {
    nowyWydatek.data = new Date(nowyWydatek.data);
    this.wydatki.push(nowyWydatek);
    nowyWydatek.id = this.nextId++;
  }
  usunWydatek(id: number): void {
    const ind = this.wydatki.findIndex(wydatek => wydatek.id === id);
    this.wydatki.splice(ind, 1);
    this.removeFromStore(id);
  }
}
