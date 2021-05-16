# Lowdb + ExpressJS Example

Demo of using lowdb as a local json database.

[Youtube demo video](https://youtu.be/SY1RtzoR42g)

## Setup

```curl
npm i
npm start
```

## Fetch and create records (notes)

Use these curl commands to fetch and create notes. The notes will be stored as objects in `db.json` and persisted.

// GET - fetch all notes
```curl
curl http://localhost:4000/notes
```

// POST - Create a note
```curl
curl --header "Content-Type: application/json" \
--request POST \
--data '{"text": "My new note"}' \
http://localhost:4000/notes/new
```