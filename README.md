#Gazzetta Scraper
Fa la ricerca per la lista dei giocatori e per i voti del fantacalcio

installare con 

```
npm install gazzetta-scraper
```
includere il modulo

```
const scrp = require('gazzetta-scraper');
```



###getAllPlayers()

ritorna una promise con la un array di giocatori. Es:

```
scrp.getAllPlayers().then(function (players) {
        console.log(players);
   });
   
#player.name 
#player.team 
#player.position 
#player.id
```



###getMarks(giornata)

ritorna una promise con un array lista dei giocatori con relativi voti e modificatori. Es:

```
scrp.getMarks(5).then(function (marks) {
        console.log(marks);
   });
#mark.nome 
#mark.voto 
#mark.goal 
#mark.goalSubito 
#mark.assist 
#mark.ammonito 
#mark.espulso 
#mark.autogol 
```
