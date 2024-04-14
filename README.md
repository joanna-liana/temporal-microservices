# Microservices with Temporal - E-Commerce

A toy e-commerce app illustrating the usage of Temporal for handling distributed transactions across multiple microservices.

## Quick start

1. Set up the infra and the apps:

```
docker compose -f ./temporal-server/docker-compose.yml up # starts the temporal server

cd payments && npm run temporal:worker && cd # starts Payments - just the Temporal worker

cd orders && npm run temporal:worker # starts Orders Temporal worker
npm run dev # starts the Orders HTTP server

```
2. Create an order via:
```
curl -X POST http://localhost:3001/api/v1/orders
```

*[14 April 2023] The request will return and error due to broken persistence; regardless, the workflow should complete successfully.*

3. Naviagate to the [Temporal UI](http://localhost:8080) to see the results.

## To do
- [x] Single-service workflow (Orders)
- [x] Call Payments activity from Orders
- [ ] Call Payments subworkflow instead of activity
- [ ] Add timeouts/max attemps
- [ ] Add compensations (saga - transactions with all-or-nothing semantics)
