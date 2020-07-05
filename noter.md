Muligvis skal hvert seed have en begrebsgruppe – skal vi ikke kunne bruge en frase til at udfylde begrebsgrupperne

Fraserne er p.t. den største udfordring. Hvordan holder man styr på dem?

Næste skridt: prøve at starte fra frontend

Tabel-javascript: http://tabulator.info

Et frø kan også være en sætning. Hvis en frø er en sætning, skal sætningen deles op i ord og fraser. Det er et problem, jeg tackler senere. 
Indtil videre bygger jeg sætninger op af ord og ordforbindelser.


TODO:
seed-kø
fraser


RIMORDBOGEN

tilføj forkortelsesmarkører

# Need to have
- sql skal matche case-sensitivt (n skal ikke matche N)
- understøt ord med bitryk efter hovedtryk - bitrykstegnet bliver p.t. ikke taget med i søgningen
- familierim
- additive/subtraktive rim
- søg i given liste
- konsonans/assonansrim
- fjernelsen af opslagsordet fra søgeresultaterne skal ske på baggrund af udtale, ikke ortografi
- o-lyde bliver blandet sammen med å-lyde og ø-lyde
- sag rimer på ar

# Nice to have
- schwa-assimilation (https://schwa.dk/fonologi/regler-for-schwa-assimilation/)
- gruppering/sammenfoldning af ord med samme stamme 
- gentagne rimord skal fjernes, eller forskellen skal markeres
- Kan man se hvilke ord, der er blandt de 100.000 mest brugte?
- mulighed for at ekskludere egennavne
- mulighed for ekskludering af ord med samme stamme. Hvis opslagsordet er 'ordbog' skal der også være mulighed for at skjule rimene på 'lydbog'? 
- handle multiple transcriptions

# Spørgsmål
- hvordan skal rim på bitryk blandes med rim på hovedtryk?