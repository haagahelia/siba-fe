<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  
<h1 align="center">SIBA22S</h1>

<h3 align="center">
    Projekti luotu Softalaprojekti kurssilla <br />
<br />
</div>

## Tekijät

  <p>SIBA22S</p>

<!-- ABOUT THE PROJECT -->

## Projektista

Projekti on Haaga-Helian ja Sibelius akatemian yhteistyön pohjalta toteutettava sovellus, jonka tarkoituksena on mahdollistaa Sibelius akatemian opetustilojen ja varusteiden käytön laskenta, sekä optimointi eri opetuksille.

<p align="right">(<a href="#top">back to top</a>)</p>

### Teknologiat ja muut hyödylliset resurssit

- [React](https://reactjs.org/)
- [Axios](https://www.npmjs.com/package/axios)
- [Formik](https://formik.org/)
- [MUI](https://mui.com/)
- [Colorhunt](https://colorhunt.co/)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Aloitus

Fronttipuolen asennusohjeet

### Asennus

1. Kloonaa repo
   ```sh
   git clone https://github.com/haagahelia/siba-fe.git
   ```
2. Asenna tarvittavat paketit

   ```sh
   npm install
   ```

3. Env. tiedoston lisäys. Lisää .env tiedosto repon juurihakemistoon

   ```sh
   REACT_APP_BE_SERVER_BASE_URL=http://localhost:3001/api
   REACT_APP_BE_SERVER_BASE_URL2=http://jokutoinenpalvelin:3001/api
   ```

4. Sovelluksen käynnistys
   ```sh
   npm start
   ```
5. Huom! Seuraa [Backend repon](https://github.com/haagahelia/Siba_be) asennusohjetta myös

<p align="right">(<a href="#top">back to top</a>)</p>

## Käyttö

### Opetukset näkymä

1. Opetusnäkymässä on mahdollisuus lisätä uusia opetuksia "Lisää opetus" osiossa. Käyttäjällä myös mahdollisuus kopioida jo olemassa olevan opetuksen tiedot dropdown valikosta
2. "Opetukset" otsikon alla on listattuna kaikki syötetyt opetukset. Opetuksia pystytään hakea "Opetusten haku:" tekstikentän avulla
3. Listattuja opetuksia pystytään valitsemaan ja tällöin opetuksen Popup Dialog tulee esiin. Tässä dialogissa pystytään poistamaan, muokkaamaan tai lisäämään opetukselle varusteita
4. Listalla näytetään aina 15 opetusta kerralla. Listan alaosassa on käytättey paginationia, jossa voidaan selata lisää opetuksia

### Tulosnäkymä

1. Tulosnäkymässä käyttäjä käynnistää allokoinnin "Start Allocation" napilla.

2. Käyttäjä ei pysty aloittaa toista allokointia ennenkun on painanut "Reset Allocation" nappia.

3. Tällähetkellä käyttäjän pitää päivittää sivu, jotta näkee muutokset allokointiin.

4. Aineryhmä kohdassa käyttäjä pystyy avata dropdown valikon, joka kertoo, mitä huoneita aineryhmä käyttää ja kuinka monta tuntia sillä huoneella on käytössä.

5. Aineryhmä kohdassa informaatio nappia painamalla aukeaa pop-up ikkuna, jossa käyttäjä näkee ainekohtaiset opetukset.
   Pop-up ikkunassa käyttäjä pystyy avata opetuskohtaiset dropdownit, josta näkee missä huoneessa opetusta on.

6. Huone kohdassa käyttäjä näkee kaikki käytössä olevat huoneet ja niitten käyttöasteet.

7. Huone kohdassa käyttäjä pystyy avata huonekohtaiset dropdown listat, josta näkee, mitä opetuksia huoneissa on ja kuinka monta tuntia ne käyttä

8. Huoneet ovat värikoodilla erotettuja, luokkatyypeittäin. Esim. Studio, Esitystilat, Luentoluokat ja musiikki luokat

<p align="right">(<a href="#top">back to top</a>)</p>

## Vanhalta kurssilta jääneet ongelmat

### Lisää tähän kurssin päätteeksi

dao.js tiedoston yhtenäistäminen

<p align="right">(<a href="#top">back to top</a>)</p>

## Jatkokehitysideat

### Lisää tähän kurssin päätteeksi

Opetuksen lisäyksessä, jossa voi kopioida tietoja muista opetuksista, voisi olla selectin lisäksi samassa etsi -toiminto, jotta käyttäjä löytäisi nopeammin sekä helpommin haluamansa opetuksen.

Opetuksen lisäsyksessä voisi valita onko opetus etäopetus, jotta laskennassa voisi ottaa huomioon opetukset, jotka eivät tarvitse tai tarvitsevat vähemmän opetustilaa.

Opetuksen lisäyksessä olisi toiminto, jolla lomakkeen voisi nollata syötetyistä syötteistä

<p align="right">(<a href="#top">back to top</a>)</p>
