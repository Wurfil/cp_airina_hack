from logging import getLogger

from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from uvicorn import run

from cte_ai.config import DefaultSettings
from cte_ai.config.utils import get_settings
from cte_ai.endpoints import list_of_routes
from cte_ai.utils.common import get_hostname


logger = getLogger(__name__)


def bind_routes(application: FastAPI, setting: DefaultSettings) -> None:
    """
    Bind all routes to application.
    """
    for route in list_of_routes:
        application.include_router(route, prefix=setting.PATH_PREFIX)


def get_app() -> FastAPI:
    """
    Creates application and all dependable objects.
    """
    description = ""

    application = FastAPI(
        title="CTE AI API",
        description=description,
        docs_url="/swagger",
        openapi_url="/openapi",
        version="1.0.0",
    )

    application.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    settings = get_settings()
    bind_routes(application, settings)
    application.state.settings = settings
    return application


app = get_app()


if __name__ == "__main__":  # pragma: no cover
    settings_for_application = get_settings()
    run(
        "cte_ai.__main__:app",
        host=get_hostname(settings_for_application.APP_HOST),
        port=settings_for_application.APP_PORT,
        reload=False,
        # reload_dirs=["procure_base_ai"],
        log_level="debug",
    )
