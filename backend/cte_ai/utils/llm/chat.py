import torch

from .model import model, tokenizer
from .prompt import PROMPT


def get_result(data):
    chat_history = data['chat_history']
    question = data['question']

    messages = [
        {"role": "system", "content": PROMPT},
        {"role": "user", "content": f"{question} "}
    ]

    if len(chat_history) > 0:
        messages = [messages[0], *chat_history, messages[1]]

    input_ids = tokenizer.apply_chat_template(
        messages,
        tokenize=True,
        add_generation_prompt=True,
        return_tensors="pt"
    ).to('cuda')

    gen_tokens = model.generate(
        input_ids,
        max_new_tokens=1024,
        temperature=0.1,
    )
    torch.cuda.empty_cache()
    gen_text = tokenizer.decode(gen_tokens[0])
    result = gen_text.split('<|CHATBOT_TOKEN|>')[1].split('<|END_OF_TURN_TOKEN|>')[0]

    return result
