# examens-projekt-2026

# Komma igång och starta applikationen

## Steg 1: Förberedelser

Först måste du se till att ha node.js installerat för att kunna starta igång applikationen på datorn och ett program som koden kan 'bo' i.
1. **Ladda ner Node.js:**
   Gå till [nodejs.org](https://nodejs.org/en/download) och ladda ner den senaste versionen som heter LTS. Installera på din dator som ett vanligt program.
2. **Ladda ner en kodredigerare:**
   Ladda ner **Visual Studio Code (VS Code)** från [code.visualstudio.com](http://code.visualstudio.com/) för att lättare kunna se och hantera filerna.

---

## Steg 2: Öppna rätt mappar

Det här projektet är uppdelat i två delar:
* **backend** (Det som är hjärnan - databasen - det körs i bakgrunden)
* **frontend** (Det visuella - det som du ser i webbläsarfönstret)
  
För att starta projektet behöver du öppna två olika terminalfönster. Såhär gör du:
1. Öppna **VS Code**
2. Välj *File* -> *Open Folder* och öppna den mapp där projektet ligger.
3. Öppna en terminal i VC Code genom att klicka på **Terminal** i menyn högst upp och välj **New Terminal**

---

## Steg 3: Starta Servern - backendfilen

Börja med att starta backend - servern.
1. **Gå in i backend-mappen:**
   Skriv detta kommando i din terminal du precis öppande i **VS Code** och tryck sedan Enter.
   ```bash
        cd backend
   ```
2. **Installera alla nödvändiga paket:**
   Sedan skriver du detta kommando i din terminal för att installera nödvändiga paket pch tryck Enter. Det kan ta en liten stund.
   ````bash
        npm install
   ```
3. **Starta servern**
   Nu ska du starta servern, det gör du genom att i terminalen skriva:
   ````bash
        nodemon server
   ``` 
I terminalen komm du att se "Server is running on port XXXX" Låt terminalen vara igång. Stäng den inte!

## Steg 4: Starta frontenden

Först måste du öppna en ny terminal. Det gör via plustecknet som finns uppe till höger i terminalfönstert i VS Code.
När en ny terminal är öppnad behöver du navigera till frontend mappen på samma sätt som för backend.
Skriv: 
```bash
    cd frontend
``` 
och tryck på Enter.

Här ska vi också installera nödvändiga paket:
```bash
    npm install
```

När alla nödvändiga paket är installerade kan du dra igång sidan! Det gör du genom att i terminalen för frontend skriva:
```bash
    npm run dev
``` 

# Översiktig beskrivning
Hemma på Tuna* är en webbplattform designad för att förenkla administrationen inom ett stall. Där admin har ett lätt verktyg för att generera stallschema månad för månad. 
Syftet är också att förenkla vägen till att boka ridbanan vid träningar och tävlingar med en interaktiv kalender som tydligt visar bokade/obokade datum.
Det är jag själv som är beställare utifrån min nyfikenhet för hur man kan bygga upp detta och för att göra överblicken enklare.

*Namnet är inte satt i sten och kan komma att ändra*

---

# Kravspecifikation

---

## Måste

### Applikationen ska:
- [x] Lagra data i en databas
- [x] Hantera 2 olika användarroller: admin, user
- [ ] Ha en responsiv design
- [ ] Hantera ett genereringsverktyg för stallschema
- [ ] Hantera bokningar för ridbanan inför träningar och tävlingar
- [ ] Hantera hur en besökare bokar ridbanan utan inloggning
- [ ] Ha relevant information om stallet - så som vad som händer - tävling/träning - information till hästägare - spån, veterinär, hovslagare som kommer
- [ ] Ha information till alla inackorderade hästägare

### En användare ska kunna:
- [x] Registrera sig/ logga in / logga ut 
- [ ] Boka ridbanan
- [ ] Kolla stallschema

### En besökare (utan inloggning) ska kunna:
- [ ] Boka ridbanan
- [ ] Läsa relevant information om stall/event som är pågång

### Administratörer ska kunna:
- [ ] Redigera användares roller
- [ ] Radera användare
- [x] Kunna lägga till hästägare för stallschema
- [ ] Använda schemagenereraren för stalltjänst

## Bör

### En användare ska kunna:
- [ ] Använda ett formulär för glömt lösenord
- [ ] Redigera sina inloggningsuppgifter
- [ ] Göra stallpassbyten med andra hästägare
- [ ] Skicka meddelanden till andra hästägare
- [ ] Kunna publicera inlägg som syns för hästägare
- [ ] Redigera inlägg
- [ ] Ta bort inlägg som användaren har skrivit
- [ ] Kommentera på inlägg
- [ ] Gilla inlägg

## Utmaning
- [x] Ska publiceras på en publik webbbplats
- [ ] Påminnelser för olika insatser som hästägare behöver göra t.ex. täcke på/av
- [ ] Ägare ska kunna lägga in stam på sin häst

# Tekniker och programspråk
- React
- Tailwind
- MongoDB
- Mongoose
- Nodemon
- Dotenv
- ReactRouterDom
- Node.js

---
# AI - användning
Tanken är att använda ingen till minimalt med AI i detta projekt för att fortsätta bygga kunskap på egenhand.

