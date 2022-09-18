# Practica-4-backend-nodejs

Api ads with node js and mongodb.

Start the application:

In production:

On first deploy, load initial data into the database:

```js
node init-db.js
```


```sh
npm start
```

In development

```sh
npm run start
```

## API

### GET /api/agentes

Return a list of ads. Example:

```json
{
      "_id": "631e1e5444e03257bed5cce7",
      "nombre": "Bicicleta",
      "venta": true,
      "precio": 250,
      "foto": "bicicleta.jpg",
      "tags": ["lifestyle", "motor"]
    },
    {
      "_id": "631e1e9944e03257bed5cce8",
      "nombre": "Iphone 12",
      "venta": false,
      "precio": 50,
      "foto": "iphone.jpg",
      "tags": ["lifestyle", "mobile"]
    }
```
