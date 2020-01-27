export class Wydatek {
  constructor(
    public id: number,
    public kategoria: string,
    public kwota: number,
    public opis: string,
    public data: Date,
    public ileLitrow: number = 0,
    public ileKm: number = 0
  ) {}
}

export const KATEGORIE = ["Tankowanie", "Myjnia", "Serwis", "Inne"];
