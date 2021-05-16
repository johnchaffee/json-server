# Lowdb + ExpressJS Example

Demo of using lowdb as a local json database.

* https://github.com/satansdeer/json-server
* [Youtube demo video](https://youtu.be/SY1RtzoR42g)

## Setup

```curl
npm i
npm start
```

## Fetch and create records (notes)

Use these curl commands to fetch and create notes. The notes will be stored as json objects in `db.json` and will persist between restarts.

### GET - Fetch all notes
```curl
curl http://localhost:4000/notes
```

### POST - Create a note
```curl
curl --header "Content-Type: application/json" \
--request POST \
--data '{"text": "My new note"}' \
http://localhost:4000/notes/new
```