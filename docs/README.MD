## Steps for Temporal installation on [Windows10](https://learn.temporal.io/getting_started/typescript/dev_environment/?os=win)

1. Create folder C:\bin by running "mkdir C:\bin"
2. Save the temporal.exe to folder C:\bin
3. Edit the PATH for your account "setx PATH "C:\bin;%PATH%""
4. Restart Command Prompt

### Run poc-temporal-worflow-api server
 1. Open the new terminal
 2. Go to poc-temporal-worflow-api
 3. Run *npm install*
 4. Run *temporal server start-dev*

### Run poc-temporal-worflow-api worker
 1. Open the new terminal
 2. Go to poc-temporal-worflow-api
 3. Run *npm run start.watch* 
 
### Run poc-temporal-worflow-api application
 1. Open the new terminal
 2. Go to poc-temporal-worflow-api
 3. Run *npm run start.server*
 >. application will run on PORT:3130
 

## Run the poc-temporal-backend-api
 1. Open the new terminal
 2. Go to poc-temporal-backend-api
 3. Run *npm run start*
 >. application will run on PORT:4000


## Run the poc-temporal-shipment-api
 1. Open the new terminal
 2. Go to poc-temporal-shipment-api
 3. Run *npm run start*
 >. application will run on PORT:3402

## Run the poc-temporal-vendor-api
 1. Open the new terminal
 2. Go to poc-temporal-vendor-api
 3. Run *npm run start*
 >. application will run on PORT:3401

### Open [temporal dashboard](http://localhost:8233/namespaces/default/workflows) 

### Raise a new request through Postman

curl --location --request POST 'http://localhost:4000/backend-api/create-order' \
--header 'Content-Type: application/json' \
--data-raw '{
    "type":"footwear",
    "quantity":1,
    "price":200,
    "size":14,
    "gender":"male",
    "address":"Baner Pune"
}'

# See the results on [temporal dashboard](http://localhost:8233/namespaces/default/workflows)



