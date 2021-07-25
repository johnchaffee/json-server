curl http://localhost:4000/contacts
curl --header "Content-Type: application/json" --request POST --data '{"number": "2063996576", "first": "John", "last": "Chaffee"}' http://localhost:4000/contacts
curl http://localhost:4000/contacts/2063996576
