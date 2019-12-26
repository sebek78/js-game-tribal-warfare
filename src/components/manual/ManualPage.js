import React from "react";
import Header from "./../common/Header";

const ManualPage = () => {
  return (
    <div className="manual">
      <Header />
      <h2 className="manual__title">Wojna Plemienna - zasady gry</h2>
      <h3 className="manual__subtitle">Wprowadzenie</h3>
      <p className="manual__text">
        Wojna Plemienna jest grą karcianą dla dwóch graczy. Każdy gracz
        kontroluje prehistoryczne plemię. Celem gry jest zwycięsto poprzez
        dominację, czyli osiągnęcie populacji conajmniej 30 ludzi w plemieniu.
        Drugim sposobem na zwycięstwo jest podbój, czyli wyeliminowanie
        populacji drugiego plemienia.
      </p>
      <p className="manual__text">
        Na początku gry każdy z graczy otrzymuje 10 kart zwykłych ludzi i dwie
        jednostki żywności. Gracze w czasie gry losują karty z wspólnej talii
        kart. Talia ta zawiera karty: dodatkowych ludzi, żywności i broni. Gdy
        karty w wspólnej talii kart skończą się, to wszystkie odrzucone karty są
        tasowane i tworzą nową wspólną talię do gry.
      </p>
      <p className="manual__text">
        Gracz posiada karty w ręce, które są dostępne wyłącznie dla niego i
        zagrywa je w odpowiednich momentach gry. Gracz posiada też karty w
        wiosce, które są kartami w grze na wirtualnym stole.
      </p>
      <h3 className="manual__subtitle">Przebieg gry</h3>
      <p className="manual__text">
        Gracz przechodzi przez wszystkie częsci dnia (turę gry), a potem
        działania podejmuje kolejny gracz.
      </p>
      <h4 className="manual__small-title">Początek dnia</h4>
      <p className="manual__text">
        Gracz pobiera pierwszą kartę z wspólnej talii.
      </p>
      <p className="manual__text">
        Jeśli gracz ma co najmniej 15 ludzi to otrzymuje dodatkową kartę z
        wspólnej talii.
      </p>
      <p className="manual__text">
        Gracz może posiadać maksymalnie 5 kart w ręce. Wszystkie nadmiarowe
        karty muszą być odrzucone. Karty w wiosce (już zagrane) nie są wliczane
        do tego limitu.
      </p>
      <h4 className="manual__small-title">Polowanie i zbieranie</h4>
      <p className="manual__text">
        Jeśli gracz posiada w ręce kartę żywności to może ją zagrać. Wtedy karta
        zostaje odrzucona, a w wiosce przybywa tyle sztuk żywności ile wynosiła
        jej wartość na karcie.
      </p>
      <h4 className="manual__small-title">Decyzje w wiosce</h4>
      <p className="manual__text">
        Gracz w tym momencie otrzymuje zawsze jedną nową kartę zwykłego
        człowieka, który pojawia się w wiosce. Wszystkie karty dodatkowych
        ludzi, które znajdowały się w ręce gracza automatycznie są przeniesione
        do wioski gracza.
      </p>
      <p className="manual__text">
        Są dwa rodzaje kart broni: do walki wręcz i do walki dystansowej. Karty
        broni do walki wręcz posiadają w swoim opisie siłę broni wyrażoną liczbą
        ze znakiem plus. Siła broni do walki wręcz sumuje się z siłą karty
        człowieka. Karty broni do walki dystansowej są opisane tylko liczbą (bez
        znaku plus przed nią). Im wyższa jest ta liczba tym broń dystansowa jest
        skteczniejsza w walce.
      </p>
      <p className="manual__text">
        Jeśli gracz posiada w ręce karty broni to może je przydzielić do karty
        człowieka. Każdy człowiek może posiadać maksymalnie jedną broń każdego
        typu.
      </p>
      <p className="manual__text">
        Po dodaniu karty broni karty ludzi są automatycznie sortowane i
        wyświetlane od najsilnijeszej do najsłabszej z uwzględnieniem siły karty
        postaci z sumą siły posiadanej przez nią broni.
      </p>
      <h4 className="manual__small-title">Główny posiłek dnia</h4>
      <p className="manual__text">
        W tym momencie jest konsumowana posiadna przez gracza żywność w wiosce.
        Jedna sztuka żywności żywności wystarcza do nakarmienia 10 ludzi.
        Kolejna jednostka żywności jest odejmowana jeśli trzeba nakarmić
        kolejnych 10 osób. Oznacza to, że jeśli gracz posiada wiosce na przykład
        18 osób to skonsumują oni tylko jedną jednostkę żywności. Ale gdyby w
        wiosce było na przykład 23 osoby, to ci ludzie skonsujmują 2 jednośtki
        żywności (po jednej na każde 10 osób).
      </p>
    </div>
  );
};

export default ManualPage;
