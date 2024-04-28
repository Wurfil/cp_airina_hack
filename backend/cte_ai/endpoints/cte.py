from fastapi import APIRouter, Request, Body
from starlette import status

from cte_ai.utils import get_result as get_chat_result

api_router = APIRouter(tags=["CHAT_GB"])


@api_router.post(
    "/get-answer",
    status_code=status.HTTP_200_OK,
)
async def get_message_answer(
        _: Request,
        message_data=Body(...),
):
    answer_data = get_chat_result(message_data)
    return answer_data
