# Environment variables

**NODE_ENV**=default development it will change automatically with production whenever you will deploy
**PORT**=default 400 it will set automatically by hoisting provider
**MONGO_URI**=change with your mongodb uri

**FILE_UPLOAD_PATH= ./public/uploads** should leave as it is
**MAX_FILE_UPLOAD**=maximum size of the file in bytes default 1000000 if you want you can change

**JWT_SECRET**=json web token secret to verify the user request change it with your secret
**JWT_EXPIRE**=login token expiring time default 30days if you would you can change

**SMTP_HOST**=set your smtp host
**SMTP_PORT**=set your smtp port
**SMTP_EMAIL**=set your smtp email
**SMTP_PASSWORD**=set your smtp password
**FROM_EMAIL**=default noreply@mail.com you can change whatever you want
**FROM_NAME**=default Admin you can change

**AWS_BUCKET_NAME**=change with your aws bucket name
**AWS_BUCKET_REGION**=change with your aws region name
**AWS_ACCESS_KEY**=change with your aws access key
**AWS_SECRET_KEY**=change with your aws secret key

**STRIPE_PRIVATE_KEY**=change with your stripe private key
**STRIPE_PUBLIC_KEY**=change with your stripe public key
**CLIENT_URL**=change with the front end domain
**STRIPE_WEBHOOK_END_POINT_SECRET**=change with your stripe webhook end point secret which you will get on stripe dashboard

## npm scripts

to install all dependencies run for both react and node
**`npm install`**

will run react project
**`npm run client`**

to run node project by nodemon in production should change
**`npm run server`**

to run react and node projects at same time
**`npm run dev`**
