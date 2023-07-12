To start the server run command: npm start

Base URL
The base URL for all endpoints is: http://localhost:3000

Endpoints
GET /post
fetch all blog by using the filters.

Response
Status Code: 200
{
    "status": true,
    "Data": [
        {
            "_id": "64aec3d610198c6a3773ae5c",
            "blogName": "Introduction of Web development",
            "blogBody": "Frontend",
            "category": "Web Development",
            "isDeleted": false,
            "publishedAt": "2023-12-06T18:30:00.000Z",
            "createdAt": "2023-07-12T15:16:38.594Z",
            "updatedAt": "2023-07-12T15:36:40.195Z",
            "__v": 0
        },
        {
            "_id": "64aecdb07c3adc9a81425331",
            "blogName": "Introduction of Web development",
            "blogBody": "Backend",
            "category": "Programming",
            "isDeleted": false,
            "publishedAt": "2023-12-06T18:30:00.000Z",
            "createdAt": "2023-07-12T15:58:40.254Z",
            "updatedAt": "2023-07-12T15:58:40.254Z",
            "__v": 0
        }
    ]
}
GET /post/:id
Fetch a specific blog by its ID.

Input

id - The ID of the blog.
Response

Status Code: 200
{
    "status": true,
    "data": [
        {
            "_id": "64aec3d610198c6a3773ae5c",
            "blogName": "Introduction of Web development",
            "blogBody": "Frontend",
            "category": "Programming",
            "isDeleted": false,
            "publishedAt": "2023-12-06T18:30:00.000Z",
            "createdAt": "2023-07-12T15:16:38.594Z",
            "updatedAt": "2023-07-12T15:16:38.594Z",
            "__v": 0
        }
    ]
}

POST /post
Create a new blog.

Request Body
{
  "blogName": "Introduction of Web development",
  "blogBody": "Backend",
  "category": "Programming",
  "publishedAt": "12-07-2023"
}

Response

Status Code: 200
{
    "status": true,
    "data": {
        "blogName": "Introduction of Web development",
        "blogBody": "Backend",
        "category": "Programming",
        "isDeleted": false,
        "publishedAt": "2023-12-06T18:30:00.000Z",
        "_id": "64aecdb07c3adc9a81425331",
        "createdAt": "2023-07-12T15:58:40.254Z",
        "updatedAt": "2023-07-12T15:58:40.254Z",
        "__v": 0
    }
}
PUT /post/:id
Update a specific blog by its ID.

Input

id - The ID of the blog.
Request Body
{
"category":"Web Development"
} 

Response

Status Code: 200
{
    "status": true,
    "msg": "done",
    "data": {
        "_id": "64aec3d610198c6a3773ae5c",
        "blogName": "Introduction of Web development",
        "blogBody": "Frontend",
        "category": "Web Development",
        "isDeleted": false,
        "publishedAt": "2023-12-06T18:30:00.000Z",
        "createdAt": "2023-07-12T15:16:38.594Z",
        "updatedAt": "2023-07-12T15:36:40.195Z",
        "__v": 0
    }
}

DELETE /post/:id
Delete a specific blog by its ID.

Input

id - The ID of the blog.
Response

Status Code: 200
{
    "status": true,
    "msg": "Document for given blog Id is deleted."
}

Error Handling
If an error occurs, the API will respond with an appropriate status code and error message in the response body.

Status Code: 400 Bad Request
Body:
{
  "message": "Send Required Data"
}
Status Code: 404 Not Found
Body:
{
  "message": "No such blog exist"
}