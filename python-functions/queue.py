import numpy as np


def handler(event, context):
    print("Function invoked from Python")
    print(event)
    print(context)
    random_arr = np.random.rand(3)
    print(random_arr)
    return
