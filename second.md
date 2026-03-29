# Models

### Project Routes

- we have created user.models.js => can access the user 
- now we will create other model

1. note.models.js :-

make a mongoose Schema where a it creates 

- project 
- creaetdBy
- content

1. projectmember.models.js

- user
- project
- role

1. projects.models.js

- name
- description
- createdBy

1. subtask.models.js

- title
- task
- isCompleted
- createdBy

1. task.models.js

- title
- project
- assignedTo
- status
- attachments
- description

## controllers

### getProject,

> GET / - List user projects (secured)

- first agreegation pipeline

1. In projectMember - match with (req.user._id) if true return the project they want with (id)

### getProjectById,

> GET /:projectId - Get project details (secured, role-based)

- req.params => got from frontend and matches with Project.findbyId if true then return api response if not then also

### createProject

> POST / - Create project (secured)

- take name and description from frontend n create new project and update in projectmember and share response

### deleteMember

> DELETE /:projectId/members/:userId - Remove member (secured, Admin only) 

- take proejctId from user in frontend using req.params then check weather with this projectd exist if yes then delete or not if not throw error

### updateMemberRole

> PUT /:projectId/members/:userId - Update member role (secured, Admin only)

- request proejectId , userId from frontend with newRole now check in the AvailableUserRole if requested role does not exist then return error response , in projectMember create mongoose project and user and update it.

### getProjectMembers

> GET /:projectId/members - List project members (secured)

- request projectId with req.params with frontend check if requested projectId finds or not and write agreegation pipeline

### addMemberToProject,

> POST /:projectId/members - Add project member (secured, Admin only)

### deleteProject,

> DELETE /:projectId - Delete project (secured, Admin only)

### updateProject

> PUT /:projectId - Update project (secured, Admin only)


## validateProjectPermission
works as middleware checks inbetweem weather u have specific permission or not. 


# create project - routes.
- check routers weather they are valid JWT or not => router.use(verifyJWT);

# MULTER 
express does not provides you direct access to use images, csv and other files so we use multer as middleware to provide connection betweeen them.
> npm install multer

- creating task routes 
