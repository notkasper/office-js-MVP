Omdat de dialog in een apart venster draait, heb je *GEEN* toegang tot de mobx store data van de addon zelf

De store is er wel, maar de dialog krijgt zijn eigen instance daarvan. 

Over het algemeen: gebruik react state voor dialogs, en geen mobx stores

als je toch een store wilt gebruiken:
maak voor die specifieke dialog een aparte store aan (maak de file, en voeg hem toe aan de stores in de index.js)

je hebt *wel* gewoon toegang tot de services.