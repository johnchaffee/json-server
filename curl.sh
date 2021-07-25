curl http://localhost:4000/contacts
curl http://localhost:4000/contacts/2063996576
curl --header "Content-Type: application/json" --request POST \
--data '{"number": "2063996576", "campaign_id": 101, "created_at": "2020-12-14T19:37:14Z", "updated_at": "2020-12-14T19:37:14Z", "zo_progress_at": "2020-12-14T19:37:16Z", "mo_received_at": "2020-12-14T19:36:18Z", "status_code": 4, "delivery_seconds": 5, "response_seconds": 10, "mo_stop": false }' \
http://localhost:4000/contacts

