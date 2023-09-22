import { Component } from '@angular/core';

@Component({
  selector: 'app-gy-ik',
  templateUrl: './gy-ik.component.html',
  styleUrls: ['./gy-ik.component.scss']
})
export class GyIKComponent {

  FaQ: {
    question: string,
    answer: string,
  }[] = [
    {
      question: "Regisztráció/Bejelentkezés",
      answer: "Kérdés: Hogyan tudok rendelést leadni? <br> Válasz: Először regisztrálnod vagy bejelentkezned kell a webshopban. Ha már rendelkezel fiókkal, jelentkezz be. Ha nem, akkor regisztrálj egy új fiókot.",
    },
    {
      question: "Böngészés és Kiválasztás",
      answer: "Kérdés: Hogyan találom meg a terméket, amit meg szeretnék vásárolni? <br> Válasz: Használd a keresőt vagy böngészd a kategóriákat és alkategóriákat. Kattints a kívánt termékre részletes információkért.",
    },
    {
      question: "Kosárba helyezés",
      answer: "Kérdés: Hogyan tehetem a terméket a kosaramba? <br> Válasz: A termék oldalánál válaszd ki a kívánt mennyiséget és kattints a 'Kosárba' gombra.",
    },
    {
      question: "Szállítási és Fizetési Információk",
      answer: "Kérdés: Hogyan tehetem a terméket a kosaramba? <br> Válasz: A termék oldalánál válaszd ki a kívánt mennyiséget és kattints a 'Kosárba' gombra.",
    },
    {
      question: "Rendelés megerősítése",
      answer: "Kérdés: Hogyan tehetem a terméket a kosaramba? <br> Válasz: A termék oldalánál válaszd ki a kívánt mennyiséget és kattints a 'Kosárba' gombra.",
    },
    {
      question: "Rendelési visszaigazolás",
      answer: "Kérdés: Hogyan tehetem a terméket a kosaramba? <br> Válasz: A termék oldalánál válaszd ki a kívánt mennyiséget és kattints a 'Kosárba' gombra.",
    },
    {
      question: "Kiszállítás és Nyomonkövetés",
      answer: "Kérdés: Hogyan tehetem a terméket a kosaramba? <br> Válasz: A termék oldalánál válaszd ki a kívánt mennyiséget és kattints a 'Kosárba' gombra.",
    },
    {
      question: "Kérdések és Segítségnyújtás",
      answer: "Kérdés: Hogyan tehetem a terméket a kosaramba? <br> Válasz: A termék oldalánál válaszd ki a kívánt mennyiséget és kattints a 'Kosárba' gombra.",
    }
  ];





}
