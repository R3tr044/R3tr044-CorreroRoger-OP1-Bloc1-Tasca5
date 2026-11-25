# Gestor de tasques

API REST feta amb Node.js, Express i MongoDB per crear, consultar, actualitzar i eliminar tasques.

## Requisits

- Node.js i npm.
- MongoDB en funcionament.

## Instal·lació i arrencada

1. Instal·la les dependències:

   ```bash
   npm install
   ```

2. Copia `.env.example` a `.env` i, si cal, ajusta el port o la URI de MongoDB:

   ```env
   PORT=3000
   MONGO_URI=mongodb://127.0.0.1:27017/taskmanager
   ```

3. Amb MongoDB en funcionament, inicia el servidor en mode de desenvolupament:

   ```bash
   npm run dev
   ```

   Per iniciar-lo sense reinici automàtic en desar canvis, fes servir `npm start`.

El servidor s'inicia quan s'ha connectat a MongoDB. La ruta inicial és `http://localhost:3000/`.

## Rutes

| Mètode | Ruta | Acció |
| --- | --- | --- |
| `POST` | `/api/tasks` | Crear una tasca |
| `GET` | `/api/tasks` | Obtenir totes les tasques |
| `GET` | `/api/tasks/:id` | Obtenir una tasca pel seu identificador |
| `PUT` | `/api/tasks/:id` | Actualitzar els camps enviats |
| `DELETE` | `/api/tasks/:id` | Eliminar una tasca |

Per a les peticions `POST` i `PUT`, envia un cos en format JSON. Els camps `title`, `cost` i `hours_estimated` són obligatoris en crear una tasca. Els valors numèrics no poden ser negatius. `completed` és `false` per defecte; en marcar-lo com a `true`, l'API desa `finished_at`, i en tornar-lo a `false`, el posa a `null`. `createdAt` es genera automàticament.

## Col·lecció de Postman

La col·lecció en format v2.1 és a `postman/gestor-tasques.postman_collection.json`. Conté les set peticions de l'enunciat amb les respostes obtingudes en una prova local contra MongoDB. La tasca de prova es va eliminar en acabar. Per tornar a executar les peticions que necessiten un identificador existent, substitueix l'ID desat pel valor `_id` retornat per una petició `POST`.
