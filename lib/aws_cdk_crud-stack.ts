import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import * as apigw from "@aws-cdk/aws-apigateway";

export class AwsCdkCrudStack extends cdk.Stack {
	constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props);

		// lambda function
		const hello = new lambda.Function(this, "HelloHandler", {
			runtime: lambda.Runtime.NODEJS_14_X,
			code: lambda.Code.fromAsset("lambda"),
			handler: "hello.handler",
		});

		// API gateway
		new apigw.LambdaRestApi(this, "EndPoint", {
			handler: hello,
		});
	}
}
