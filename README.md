# examens-projekt-2026

# Översiktig beskrivning
Hemma på Tuna* är en webbplattform designad för att förenkla administrationen inom ett stall. Där admin har ett lätt verktyg för att generera stallschema månad för månad. 
Syftet är också att förenkla vägen till att boka ridbanan vid träningar och tävlingar med en interaktiv kalender som tydligt visar bokade/obokade datum.
Det är jag själv som är beställare utifrån min nyfikenhet för hur man kan bygga upp detta och för att göra överblicken enklare.

*
*Namnet är inte satt i sten och kan komma att ändra*

---

# Kravspecifikation

---

### Applikationen ska:
[] Lagra data i en databas
[] Hantera 2 olika användarroller: admin, user
[] Ha en responsiv design
[] Hantera ett genereringsverktyg för stallschema
[] Hantera bokningar för ridbanan inför träningar och tävlingar
[] Hantera hur en besökare bokar ridbanan utan inloggning
[] Ha relevant information om stallet
[] Ha information till alla inackorderade hästägare

### En användare ska kunna:
[] Registrera sig/ logga in / logga ut / använda glömt lösenord
[] Redigera sina inloggningsuppgifter
[] Boka ridbanan
[] Kolla stallschema
[] Göra stallpassbyten med andra hästägare
[] Skicka meddelanden till andra hästägare
[] Kunna publiciera inlägg som syns för hästägare
[] Redigera inlägg
[] Ta bort inlägg som användaren har skrivit
[] Kommentera på inlägg
[] Gilla inlägg

### En besökare (utan inloggning) ska kunna:
[] Boka ridbanan
[] Läsa relevant information om stall/event som är pågång

### Administratörer ska kunna:
[] Redigera användares roller
[] Radera användare
[] Kunna lägga till hästägare för stallschema
[] Använda schemagenereraren för stalltjänst

### Utmaningar:
[] Ska publiceras på en publik webbbplats
[] Påminnelser för olika insatser som hästägare behöver göra t.ex. täcke på/av
[] Ägare ska kunna lägga in stam på sin häst


# Tekniker och programspråk
- React
- Tailwind
- MongoDB
- Mongoose
- Nodemon
- Dotenv
- ReactRouterDom
- Node.js


