import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";

export class AwsCdkCrudStack extends cdk.Stack {
	constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props);

		// lambda function
		new lambda.Function(this, "HelloHandler", {
			runtime: lambda.Runtime.NODEJS_14_X,
			code: lambda.Code.fromAsset("lambda"),
			handler: "hello.handler",
		});
	}
}
