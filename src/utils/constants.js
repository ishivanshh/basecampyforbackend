
export const UserRolesEnum = {
    "ADMIN" : "admin",
    "PROJECT_ADMIN" : "project_admin",
    "MEMBER" : "member"
}
// give all the values of UserRoleEnum in an array.
// now we can iterate over it and use it in our code.
export const AvailableUserRole = Object.values(UserRolesEnum);

export const TaskStatusEnum ={
    "TODO" : "todo",
    "IN_PROGRESS" : "in_progress",
    "DONE" : "done"
}

export const AvailableTaskStatus = Object.values(TaskStatusEnum);

