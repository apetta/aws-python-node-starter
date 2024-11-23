import { SendMessageCommand, SQSClient } from "@aws-sdk/client-sqs";
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Resource } from "sst";

const client = new SQSClient({});

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    // Send a message to the SQS queue
    await client.send(
      new SendMessageCommand({
        QueueUrl: Resource.MyQueue.url,
        MessageBody: JSON.stringify({ hello: "world" }),
      })
    );

    console.log("Message sent to SQS");

    return {
      statusCode: 200,
      body: JSON.stringify({ status: "sent" }, null, 2),
    };
  } catch (error) {
    console.error("Error sending message to SQS:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
