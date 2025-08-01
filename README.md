# 📦 Parcel Delivery System API 
## 🎯 Objective
Design and build a secure, modular, and role-based backend API using  for managing a parcel delivery system. Inspired by real-world logistics services like Pathao Courier, this API allows tracking, managing, and updating parcel statuses across different user roles.
### 🧰 Tech Stack

| Category       | Tools                                   |
|----------------|------------------------------------------|
| ⚙️ Runtime      | Node.js                                  |
| 🔧 Framework    | Express.js                               |
| 🧠 Language     | TypeScript                               |
| 🛢️ Database     | MongoDB + Mongoose                       |
| 🛡️ Security     | JWT, bcrypt                              |
| 📦 Others       | cors, cookie-parser, zod, dotenv, etc.   |

# ⚙️ Setup & Environment Instructions
1. Clone the repository
```javascript 
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```
2. Install dependencies
```javascript 
npm install
```
3. Set up environment variables
Create a .env file in the root directory and add the following:

```javascript 
PORT=5000
DATABASE_URL=
JWT_SECRET=
JWT_EXPIRES_IN=
NODE_ENV=development
|
|
|
and other env files
```
4. Configure the Typescript file

5. Run the project
```javascript 
npm run dev
```
For production:
```javascript 
npm run build
npm start
```
6. API Base URL
```javascript 
http://localhost:5000/api/v1/
```
```javascript 

```
# API Endpoints

# Auth

## 1. Register User
### Request: with roles SENDER/RECIVER/ADMIN (used for development purpose)
POST=>  /api/v1/user/register
Request
```javascript 
{
  "name": "shanto",
  "email": "Mithila@example.com",
  "password": "Mdshiab12@",
  "phone": "+8801101125551",
  "address": "Ashulia, Savar, Dhaka",
  "role": "SENDER"
}
```
## 2. Login User
### Request:
POST=>  /api/v1/auth/login
Request
```javascript 
{
 "email": "Admin@example.com",
  "password": "Mdshiab12@"
}
```
## 3. Logout User
### Request:
POST=>  /api/v1/auth/logout

# SENDER Roles functionalities:

## 4. Create parcel via SENDER/ADMIN Role
### Request:
POST =>  api/v1/parcel/createParcel
Request
```javascript 
{
  "sender": "01828518888",
  "receiver": "01757332222",
  "type": "Fruit",
  "weight": 1,
  "baseFee":200,
  "couponCode":"SAVE20",
  "fromAddress": "123 Main Street, City A",
  "toAddress": "456 Second Avenue, City B",
  "status": "Requested"
 
}
```

## 5. Cancel parcel (if not dispatched)
### Request:
PATCH =>  api/v1/parcel/cancelParcel/:id
Request
```javascript 
{
    "status":"Cancelled"
}
```
## 6. View all their parcels and status logs
### Request:
GET =>  api/v1/parcel/getParcel

# RECIVER Roles functionalities:

## 7. View incoming parcels

### Request:

GET =>  api/v1/parcel/reciverParcels

## 8. Confirm parcel delivery
### Request:
PATCH =>  api/v1/parcel/reciverConfirm/:id
Request
```javascript 
{
    "reciverConfiramtion":"Confirmed"
}
```
## 9. Delivery history
### Request:
GET =>  api/v1/parcel/getreciverhistory

# ADMIN Roles functionalities:

## 10. View and manage all users and parcels
### Request:for Parcels
GET =>  api/v1/parcel/allparcel

### Request:for Users
GET =>  api/v1/user/all-users

## 11. Block or unblock users or parcels and other management
### Request: block user
PATCH =>  api/v1/user/updateUsers/:id
id: ObjectId of user
Request
```javascript 
{
    "isblocked":false
}
```
### Request: block parcel
PATCH =>  api/v1/parcel/updateParcel/:id
id: ObjectId of parcel
Request
```javascript 
{
    "isblocked":false
}
```
## 12. Update delivery statuses
### Request:
PATCH =>  api/v1/user/updateUsers/:id
id: ObjectId of  parcel
Request
```javascript 
{
  "newStatus": "Delivered",
  "note": "Delivered",
  "location":"dhaka"
}
```

# PUBLIC

## 13. Track Parcels
### Request:
GET =>  api/v1/parcel/tracking-events/:trackingId
trackingId:TRK-YYYYMMDD-xxxxxx

# Additonal SENDER/ADMIN
## 14. create coupon code
### Request:
POST =>  /api/v1/parcel/createCoupon
Request
```javascript 
{
  "code": "SAVE25",
  "discountAmount": 25,
  "discountType": "percent",
  "isActive": true
 
}

```
