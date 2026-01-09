"""
Task service layer for the Todo application.
Handles business logic for task operations.
"""
from typing import List, Optional
from sqlmodel import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import NoResultFound
from datetime import datetime

from ..models.task import Task, TaskCreate, TaskUpdate


class TaskService:
    """
    Service class to handle task business logic
    """

    @staticmethod
    async def get_tasks_by_user_id(session: AsyncSession, user_id: str) -> List[Task]:
        """
        Retrieve all tasks for a specific user
        """
        statement = select(Task).where(Task.user_id == user_id)
        results = await session.execute(statement)
        return results.scalars().all()

    @staticmethod
    async def get_task_by_id_and_user_id(session: AsyncSession, task_id: int, user_id: str) -> Optional[Task]:
        """
        Retrieve a specific task by ID and user ID
        """
        statement = select(Task).where(Task.id == task_id).where(Task.user_id == user_id)
        results = await session.execute(statement)
        try:
            task = results.scalar_one()
            return task
        except NoResultFound:
            return None

    @staticmethod
    async def create_task(session: AsyncSession, task_create: TaskCreate) -> Task:
        """
        Create a new task
        """
        task = Task.model_validate(task_create)
        session.add(task)
        await session.commit()
        await session.refresh(task)
        return task

    @staticmethod
    async def update_task(session: AsyncSession, task_id: int, user_id: str, task_update: TaskUpdate) -> Optional[Task]:
        """
        Update a task with the given ID for the specified user
        """
        # Get the existing task
        statement = select(Task).where(Task.id == task_id).where(Task.user_id == user_id)
        results = await session.execute(statement)
        try:
            task = results.scalar_one()

            # Update task fields
            update_data = task_update.model_dump(exclude_unset=True)
            for field, value in update_data.items():
                setattr(task, field, value)

            # Update timestamp
            task.updated_at = datetime.utcnow()

            await session.commit()
            await session.refresh(task)
            return task
        except NoResultFound:
            return None

    @staticmethod
    async def delete_task(session: AsyncSession, task_id: int, user_id: str) -> bool:
        """
        Delete a task with the given ID for the specified user
        """
        # Get the existing task
        statement = select(Task).where(Task.id == task_id).where(Task.user_id == user_id)
        results = await session.execute(statement)
        try:
            task = results.scalar_one()

            await session.delete(task)
            await session.commit()
            return True
        except NoResultFound:
            return False

    @staticmethod
    async def toggle_task_completion(session: AsyncSession, task_id: int, user_id: str) -> Optional[Task]:
        """
        Toggle the completion status of a task
        """
        # Get the existing task
        statement = select(Task).where(Task.id == task_id).where(Task.user_id == user_id)
        results = await session.execute(statement)
        try:
            task = results.scalar_one()

            # Toggle completion status
            task.completed = not task.completed
            task.updated_at = datetime.utcnow()

            await session.commit()
            await session.refresh(task)
            return task
        except NoResultFound:
            return None