"""
API routes for task management in the Todo application.
Implements CRUD operations for tasks with user ownership validation.
"""
from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from ...models.task import Task, TaskRead, TaskUpdate, TaskCreate
from ...database import get_async_session
from ...dependencies import get_current_user
from ...services.task_service import TaskService
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import NoResultFound
from datetime import datetime

router = APIRouter()

@router.get("/{user_id}/tasks", response_model=List[TaskRead])
async def get_tasks(
    user_id: str,
    current_user: dict = Depends(get_current_user),
    session: AsyncSession = Depends(get_async_session)
):
    """
    Get all tasks for the specified user.
    Validates that the requesting user matches the user_id in the path.
    """
    # Verify user identity matches the requested user_id
    if current_user["id"] != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to access tasks for this user"
        )

    # Get tasks using the service layer
    tasks = await TaskService.get_tasks_by_user_id(session, user_id)
    return tasks


@router.post("/{user_id}/tasks", response_model=TaskRead)
async def create_task(
    user_id: str,
    task_create: TaskCreate,
    current_user: dict = Depends(get_current_user),
    session: AsyncSession = Depends(get_async_session)
):
    """
    Create a new task for the specified user.
    Validates that the requesting user matches the user_id in the path.
    """
    # Verify user identity matches the requested user_id
    if current_user["id"] != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to create tasks for this user"
        )

    # Ensure the user_id in the request matches the authenticated user
    if task_create.user_id != user_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User ID in request does not match authenticated user"
        )

    # Create the task using the service layer
    task = await TaskService.create_task(session, task_create)
    return task


@router.get("/{user_id}/tasks/{id}", response_model=TaskRead)
async def get_task(
    user_id: str,
    id: int,
    current_user: dict = Depends(get_current_user),
    session: AsyncSession = Depends(get_async_session)
):
    """
    Get a specific task by ID.
    Validates that the requesting user matches the user_id in the path and owns the task.
    """
    # Verify user identity matches the requested user_id
    if current_user["id"] != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to access tasks for this user"
        )

    # Get the specific task using the service layer
    task = await TaskService.get_task_by_id_and_user_id(session, id, user_id)
    if task is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )

    return task


@router.put("/{user_id}/tasks/{id}", response_model=TaskRead)
async def update_task(
    user_id: str,
    id: int,
    task_update: TaskUpdate,
    current_user: dict = Depends(get_current_user),
    session: AsyncSession = Depends(get_async_session)
):
    """
    Update a specific task by ID.
    Validates that the requesting user matches the user_id in the path and owns the task.
    """
    # Verify user identity matches the requested user_id
    if current_user["id"] != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to update tasks for this user"
        )

    # Update the task using the service layer
    task = await TaskService.update_task(session, id, user_id, task_update)
    if task is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )

    return task


@router.delete("/{user_id}/tasks/{id}")
async def delete_task(
    user_id: str,
    id: int,
    current_user: dict = Depends(get_current_user),
    session: AsyncSession = Depends(get_async_session)
):
    """
    Delete a specific task by ID.
    Validates that the requesting user matches the user_id in the path and owns the task.
    """
    # Verify user identity matches the requested user_id
    if current_user["id"] != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to delete tasks for this user"
        )

    # Delete the task using the service layer
    success = await TaskService.delete_task(session, id, user_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )

    return {"message": "Task deleted successfully"}


@router.patch("/{user_id}/tasks/{id}/complete", response_model=TaskRead)
async def toggle_task_completion(
    user_id: str,
    id: int,
    current_user: dict = Depends(get_current_user),
    session: AsyncSession = Depends(get_async_session)
):
    """
    Toggle the completion status of a specific task.
    Validates that the requesting user matches the user_id in the path and owns the task.
    """
    # Verify user identity matches the requested user_id
    if current_user["id"] != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to update tasks for this user"
        )

    # Toggle the task completion using the service layer
    task = await TaskService.toggle_task_completion(session, id, user_id)
    if task is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )

    return task