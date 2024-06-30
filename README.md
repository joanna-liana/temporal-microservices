# Microservices with Temporal - E-Commerce

A toy e-commerce app illustrating the usage of Temporal for handling distributed transactions across multiple microservices.

## Quick start

1. Set up the infra and the apps:

```
docker compose -f ./temporal-server/docker-compose.yml up # starts the temporal server

cd payments && npm run temporal:worker # starts Payments - just the Temporal worker

cd orders && npm run temporal:worker # starts Orders Temporal worker
cd orders && npm run dev # starts the Orders HTTP server

```
2. Create an order via:
```
curl -X POST \
-H "Content-Type: application/json" \
-d '{"createdBy": "demo-runner", "products": ["1","2","123"]}' \
http://localhost:3001/api/v1/orders
```

3. Naviagate to the [Temporal UI](http://localhost:8080) to see the results. The orders logic throws throw a random error - therefore, the workflow might (eventually, after 3 retries) complete successfuly or fail.

## To do
- [x] Single-service workflow (Orders)
- [x] Call Payments activity from Orders
- [ ] Flesh out Payments activity to make HTTP call
- [ ] Call Payments subworkflow instead of activity
- [x] Add timeouts/max attempts
- [ ] Add compensations (saga - transactions with all-or-nothing semantics)
