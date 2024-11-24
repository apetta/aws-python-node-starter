import numpy as np
from aws_lambda_typing import context as context_, events


def handler(event: events.SQSEvent, context: context_.Context):
    print("Function invoked from Python")
    print(event)
    print(context)
    random_arr = np.random.rand(3)
    print(random_arr)
    return
