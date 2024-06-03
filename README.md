# Mentor-Student API Management

Mentor-Student API Management to manage the mentors, students, and their assignments. This API allows for creating mentor and student, managing their relationships and retrieving the information.

## API Endpoints

1. **Create Mentor:**   POST `/mentor/create`
2. **Create Student:**  POST `/student/create`
3. **Assign student to mentor:** Assigns a students to a mentor.
	* POST `/assign-students-mentor`
4. **Assign or Change Mentor for Student:** Updates a student's existing mentor or assign a new mentor
	- PUT `/assign-change/:studentId/:mentorId`
5. **Get All Students for a Mentor:** Retrieves students assigned to a specific mentor.
	- GET `/mentor-students/:mentorId`
6. **Get Previously Assigned Mentor for a Student:** Retrieves the previous mentor assigned to a student.
	 * GET `/previous-mentor/:studentId`

## Render Deployment
Website URL: [mentor-student Assignment](https://assign-mentor-mbpz.onrender.com/)

## API Documentation
[Click here to view API Documentation](https://documenter.getpostman.com/view/35311314/2sA3QwdVuX)

## Installation and Setup

1. Clone the repository:
```
git clone https://github.com/manoje8/assign-mentor.git

```

2. Install dependencies:
```
npm install express nodemon mongoose morgan
```

3. Start the development server:
```
npm run dev 
(OR)
npm run start
```

The server will start on port `3000` by default. You can access the application routes in your browser.

**Technologies Used**
- Node.js
- Express.js
- mongoose
- mogan module(logging middleware)