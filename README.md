# Lastejobb for artslister

Laster generaliserte artslistedatsett utført som grunnlag for typeinndelingen på natursystem-nivået i Natur i Norge – NiN – versjon 2.0 fra https://github.com/Artsdatabanken/natursystem-artsliste-ubehandlet

## Kataloger

- `stages/download`: Script for å laste ned eksterne datafiler til `data/`
- `stages/transform`: Script som produserer resultatet og legger det i `build/`
- `build`: Filene som kommer ut av lastejobben
- `data`: Temporær lagring av nedlastede data og mellomformater

## Bruk

### Download

```
npm run download
```

Laster ned eksterne avhengigheter som lastejobben er avhengig av for å produsere sitt resultat i "transform". Denne kjører stegene som ligger i `stages/download`. Nedlastede data lagres som en konvensjon i katalog `data`.

### Transform

```
npm run transform
```

Bruker allerede nedlastede data til å produsere sitt resultat. Denne brukes gjerne mens man utvikler så man slipper å laste ned data hver gang, og kan også brukes uten at man har tilgang til nett sålenge man har gjort `download` først. Denne kjører stegene som ligger i `stages/transform`

Sluttproduktet av transform skrives som en konvensjon til katalogen `build`.

### Build

```
npm run build
```

Kjører hele lastejobben, først `download`, så `transform`.

### Deploy

Tar filene fra `build`-katalogen som er produsert i `build` eller `tranform` og publiserer disse offentlig slik at andre lastejobber eller konsumenter kan nå dem uten å kjøre lastejobben.

