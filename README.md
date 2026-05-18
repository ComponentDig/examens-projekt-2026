# examens-projekt-2026

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

