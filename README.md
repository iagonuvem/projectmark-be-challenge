# Project Mark BE Coding Challenge
This is a simple server using **Node + Express + SQLite**.

## Get Started
To install dependencies properly make sure you have the following versions of these packages:

| Tool    | Version |
| ------- | ------- |
| Node JS | 22.11.0 |
| NPM     | 10.9.0  |

Install the packages using npm:
```sh
npm install
```

Start the database and populate by running:
```sh
npm run migrate
```

You can run unit tests using:
```sh
npm run test
```

Start the server using:
```sh
npm run dev
```
Server should be running on localhost:3000.

## API Docs
To make test easier I have created a postman collection that you can [import](https://learning.postman.com/docs/getting-started/importing-and-exporting/importing-and-exporting-overview/) using the json file `api.json` in root folder. You should see three folders with the requests: **Topics**, **Resources**, **Users**.
Inside each folder you can access a pre-setted test and run to check the results with the initial data.

### Authentication
All endpoints can only be accessed by a authenticated user and based on the roles. in order to do so, you should pass a `user_id` prop into the header of every request, containing the id of the user. 
Once you run the migration, you should have three users setted with different roles, you can use their ids to test it: 
- `1` - Admin user
- `2` - Editor User
- `3` - Viewer User

Example curl for Admin user:
```sh
curl --location 'http://localhost:3000/api/users' \
--header 'user_id: 1'
```
**Topics Endpoints**
Method | Endpoint    |  Allowed By | Description |
|------ | ------- | ------- | ------ |
| GET | api/topics/path | Admin, Editor, Viewer  | Get shortest Path from one topic to another
| GET | api/topics/:id/tree | Admin, Editor, Viewer | Get tree view from topic 
| GET | api/topics/:id/version/:version | Admin, Editor, Viewer | Get topic version
| POST | api/topics/ | Admin, Editor | Create a new topic at Version 1
| PUT | api/topics/:id | Admin, Editor | Create a new version for a topic

**Resources Endpoints**
Method | Endpoint    |  Allowed By | Description |
|------ | ------- | ------- | ------ |
| GET | api/resources/ | Admin, Editor, Viewer  | Get all resources
| POST | api/resources/ | Admin, Editor  | Create a new Resource

**Users Endpoints**
Method | Endpoint    |  Allowed By | Description |
|------ | ------- | ------- | ------ |
| GET | api/users/ | Admin, Editor, Viewer  | Get all users
| POST | api/users/ | Admin | Add a new user
