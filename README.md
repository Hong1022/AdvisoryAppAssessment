# AdvisoryAppAssessment

** PREREQUISITE
- Install Mysql and configure it
- Install 'yarn' into library
   - For Windows user, use command: 'npm i -g yarn'
   - For Mac user, use command: 'brew install yarn'

1. Open your terminal and change directory to AdvisoryAppAssessment
    - Enter command 'cd ~/\*\*/AdvisoryAppAssessment'

2. Enter command: 'yarn' to install the package/library of the program

3. In the directory '~/\*\*/AdvisoryAppAssessment', create an '.env' file and copy the environemt key from .env.sample
   - (The enviroment PORT can based on user preference, DB_USERNAME and DB_PASSWORD based on the configuration set in MySQL)

4. Enter 'yarn migrate' and 'yarn seed' to tables migration and data seed

5. Enter command: 'yarn dev' to run the program

6. User can using the Postman to run the API
    * ADMIN
    - To login as admin, user can POST method on 'localhost:PORT/api/admin/auth/login'
    (LISTING for ADMIN)
    - * All the APIs below need to set the Bearer Token at Authorization Header
    - To view all listing, user can GET method on 'localhost:PORT/api/listing/get-all'
    - To create listing, user can PUT method on 'localhost:PORT/api/listing/create'
    - To update listing, user can POST method on 'localhost:PORT/api/listing/update'
    - To delete listing, user can DELETE method on 'localhost:PORT/api/listing/delete'

    * USER
    - To login as user, user can GET method on 'http://localhost:PORT/api/user/auth/login'
    (LISTING for ADMIN)
    - * All the APIs below need to set the Bearer Token at Authorization Header
    - To view all listing, user can GET method on 'localhost:PORT/api/listing/get?currentLongitude=* *longitude* *&currentLatitude=* *latitude* *'
    - * *longitude* * is user current longitude; * *latitude* * is is user current latitude (since mobile app will retreive the values and send to Banckend)

    * NOTE: PORT is the port number that configure in .env file