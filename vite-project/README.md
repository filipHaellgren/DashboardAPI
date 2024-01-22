Under projektets gång tänkte jag hur upplägget skulle vara. Det var därför jag började med att försöka skapa backgrundsbilderna från unsplash först så att jag inte skulle behöva oroa mig att unsplash skulle täcka allt annat innehåll senare. Jag gjorde detta genom att skapa flera divs i html så att resten av innehållet skulle placeras snyggt över bilderna.

Dessutom så gjorde jag att unsplash skulle hämta bilder i min smak 
export function fetchSingleImage() {
  return unsplashApi.get('/photos/random', {
    params: {
      query: 'gradient',
      width: 4096,
      height: 2160,
    }
  })

  detta gör att det endast kommer upp 4k bilder inom "gradient" kategorin, vilken enligt mig är snyggaste atlerativet för att få en lite mer minimalistisk design. Detta är både en brist och en styrka beroende på vem användaren är. Men genom att det är en modern tvist på designen tror jag att detta är mer av en styrka än vad det är en svaghet. Dessutom att det är 4k bilder så kommer det alltid se snyggt ut oavsett vilken typ av skärm man använder sig av.

  En annan del av styrkorna är att bilderna sparas lokalt så ifall man hittar sin perfekta bild så är den sparad. Det negativa är att jag ej designade en tillbaka knapp så ifall man råkar klicka på den så är det svårt att hitta exakt samma bild igen.

  Både användar namnet, länkarna och anteckningar sparas också lokalt så att det inte försvinner efter man uppdaterar sidan. Personoligen föredrar jag när information sparas lokalt då det skapar en mindre risk att ens personliga info sprids ut, ifall man nu är känslig för sådant. Däremot hade man kunnat tänka sig ha ett konto för att logga in för att skydda informationen på en högre nivå. Då skulle man dessutom kunna göra att informationen sparas på en server men då skapar det ändå en mindre säker plats att hålla informationen. Däremot eftersom det sparas lokalt är det inte optimalt för personer som har en familje dator med en användare. 

  Qoutes delen är den valfria apin jag valde. Detta var rätt simpelt att skapa. Denna del tycker jag knappt har några riktiga svagheter eller styrkor bortsett från att man är tvungen att refresha sidan för att få en ny men det är inte varför jag valde att skapade den så. Egentligen var det mer av att varje gång man kommer in på sidan är det ett nytt citat vilken kan skapa några extra tanke vandringar då man använder sig utav dashboarden. Nackdelen blir ju egentligen för dem som vill se mer qoutes behöver refresha sidan vilket kan skapa problem med väder api:n.

  Väder api:n är också skapad rätt minimalistisk och är hårdkodad för stockholm. Detta är egentligen inte optimalt men valde att göra det för att få en mer minimalistisk syn på hela dashboarden. Den är också gjord för att se dagar och inte tider. Detta gav allt för mycket information för vad man egentligen behöver. Men den ger en medelvärdet av temperaturen under dagen för att förstå generellt hur vädret kommer vara. Detta kan vara en nackdel ifall man undrar om det kommer vara klart väder under någon tid på dagen. 