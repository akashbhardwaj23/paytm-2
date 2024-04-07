# PayTM

This is a Web App Similar To PayTM 

## Technolgy Used : 

- `NEXT JS` - A User and Merchant Application built in Next js Both having Backend As Well
- `Prisma` - This Application uses Prisma with PostgresSql as a database (Present in package/db)
- `Express Js` - Used Inside the bank-webhook folder
- `zod` - For Input Validation
- `TypeScript` - As The Primary Language
- `Tailwind CSS` - Used as a Styling Language
- `Next Auth` - For Authentication with Google and Github


# SignUp and SignIn Page

![SigninPage](/apps/user-app/public//login.png)


# Home Page 
![home](/apps//user-app//public/transfer.png)

# P2p Transaction Page
![p2p](/apps//user-app/public/p2p.png)


# Starting The Application Locally


1. Run at Root Directory
    ```javascript
     npm install
    ```
2. Get Postgres Database and Paste the URL in package/db/.env
    ```
        cd packages/db
        mkdir .env
    ```

3. In Packages/db Do - 
    ```javascript
        npx prisma generate
    ```

4. Go To apps/user-app and create a .env file
    ```
        cd apps/user-app
        mkdir .env
     ```
     Paste these In .env
     ```javascript
        NEXT_SECRET= "Your secret"
        GOOGLE_CLIENT_ID = "Your client Id"
        GOOGLE_CLIENT_SECRET = "Your Google Client Secret"
        GITHUB_CLIENT_ID = "GitHub client Id"
        GITHUB_CLIENT_SECRET = "Github client id"
        NEXTAUTH_URL= "http://localhost:3000"
    ```

5. Go to apps/merchant-app and create a .env
    ```
        cd apps/merchant-app
        mkdir .env
     ```
     Paste these In .env
     ```javascript
        NEXT_SECRET= "Your secret"
        GOOGLE_CLIENT_ID = "Your client Id"
        GOOGLE_CLIENT_SECRET = "Your Google Client Secret"
        NEXTAUTH_URL= "http://localhost:3001"
    ```

6. ### And Thats All Enjoy The Application


## Licence :
### [MIT](https://github.com/expressjs/express/blob/master/LICENSE)

