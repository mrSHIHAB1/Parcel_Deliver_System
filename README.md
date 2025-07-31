# 📦 Parcel Delivery System API – Project Overview
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
DATABASE_URL=mongodb://localhost:27017/your-db-name
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
NODE_ENV=development
You can customize the environment variables as needed.
```
4. Run the project
```javascript 
npm run dev
```
For production:
```javascript 
npm run build
npm start
```
5. API Base URL
```javascript 
http://localhost:5000/api/v1/
```
