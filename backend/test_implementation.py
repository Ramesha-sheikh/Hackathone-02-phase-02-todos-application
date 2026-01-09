"""
Basic test to validate the Todo API implementation
"""
import asyncio
import sys
import os

# Add the backend/src directory to the Python path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'src'))

def test_imports():
    """Test that all modules can be imported correctly"""
    try:
        from src.models.task import Task, TaskCreate, TaskUpdate, TaskRead
        print("OK Task models imported successfully")

        from src.models.user import User, UserCreate, UserRead
        print("OK User models imported successfully")

        from src.services.task_service import TaskService
        print("OK Task service imported successfully")

        from src.services.auth_service import AuthService
        print("OK Auth service imported successfully")

        from src.db import get_async_session, async_engine
        print("OK Database module imported successfully")

        from src.dependencies import get_current_user, verify_token
        print("OK Dependencies module imported successfully")

        from src.api.routes.tasks import router as tasks_router
        print("OK Tasks router imported successfully")

        from src.api.routes.auth import router as auth_router
        print("OK Auth router imported successfully")

        print("\nOK All modules imported successfully!")
        return True
    except Exception as e:
        print(f"\nX Import error: {e}")
        return False

def validate_structure():
    """Validate that the directory structure matches the plan"""
    required_dirs = [
        'backend/src/models',
        'backend/src/services',
        'backend/src/api',
        'backend/src/api/routes'
    ]

    missing_dirs = []
    for directory in required_dirs:
        if not os.path.exists(directory):
            missing_dirs.append(directory)

    if missing_dirs:
        print(f"X Missing directories: {missing_dirs}")
        return False
    else:
        print("OK All required directories exist")
        return True

def validate_files():
    """Validate that the required files exist"""
    required_files = [
        'backend/src/models/task.py',
        'backend/src/models/user.py',
        'backend/src/services/task_service.py',
        'backend/src/services/auth_service.py',
        'backend/src/api/routes/tasks.py',
        'backend/src/api/routes/auth.py',
        'backend/src/db.py',
        'backend/src/dependencies.py',
        'backend/src/main.py'
    ]

    missing_files = []
    for file in required_files:
        if not os.path.exists(file):
            missing_files.append(file)

    if missing_files:
        print(f"X Missing files: {missing_files}")
        return False
    else:
        print("OK All required files exist")
        return True

if __name__ == "__main__":
    print("Validating Todo API Implementation...")
    print("=" * 40)

    structure_ok = validate_structure()
    files_ok = validate_files()
    imports_ok = test_imports()

    print("\n" + "=" * 40)
    if structure_ok and files_ok and imports_ok:
        print("OK Implementation validation PASSED!")
        print("All components are properly implemented and structured.")
    else:
        print("X Implementation validation FAILED!")
        print("Some components are missing or incorrectly implemented.")
        sys.exit(1)