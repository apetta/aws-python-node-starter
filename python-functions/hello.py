import numpy as np
from aws_lambda_typing import context as context_, events


def handler(event: events.APIGatewayProxyEventV2, context: context_.Context):
    print("Function invoked from Python")
    random_arr = np.random.rand(3)
    return {
        "statusCode": 200,
        "body": f"Hello World from Python in a container!!!!!! - {random_arr}",
    }


if __name__ == "__main__":
    res = handler(None, None)
    print(res)
