Omdat de dialog in een apart venster draait, heb je *GEEN* toegang tot de mobx store data van de addon zelf

De store is er wel, maar de dialog krijgt zijn eigen instance daarvan. 

Over het algemeen: gebruik react state voor dialogs, en geen mobx stores