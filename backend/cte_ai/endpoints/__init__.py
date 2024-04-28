from .health_check import api_router as health_check_router
from .cte import api_router as cte_router

list_of_routes = [
    health_check_router,
    cte_router,
]

__all__ = [
    "list_of_routes",
]
