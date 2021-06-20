import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import * as apigw from "@aws-cdk/aws-apigateway";
import * as dynamodb from "@aws-cdk/aws-dynamodb";

export class AwsCdkCrudStack extends cdk.Stack {
	constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props);

		// dynamodb table definition
		const table = new dynamodb.Table(this, "Book", {
			partitionKey: { name: "name", type: dynamodb.AttributeType.STRING },
		});

		// lambda function
		const createBook = new lambda.Function(this, "CreateBookHandler", {
			runtime: lambda.Runtime.NODEJS_14_X,
			code: lambda.Code.fromAsset("lambda"),
			handler: "create.handler",
			environment: {
				TABLE_NAME: table.tableName,
			},
		});
		const getBooks = new lambda.Function(this, "GetAllBookHandler", {
			runtime: lambda.Runtime.NODEJS_14_X,
			code: lambda.Code.fromAsset("lambda"),
			handler: "getAll.handler",
			environment: {
				TABLE_NAME: table.tableName,
			},
		});
		const getBook = new lambda.Function(this, "GetBookHandler", {
			runtime: lambda.Runtime.NODEJS_14_X,
			code: lambda.Code.fromAsset("lambda"),
			handler: "read.handler",
			environment: {
				TABLE_NAME: table.tableName,
			},
		});
		const updateBook = new lambda.Function(this, "UpdateBookHandler", {
			runtime: lambda.Runtime.NODEJS_14_X,
			code: lambda.Code.fromAsset("lambda"),
			handler: "update.handler",
			environment: {
				TABLE_NAME: table.tableName,
			},
		});
		const deleteBook = new lambda.Function(this, "DeleteBookHandler", {
			runtime: lambda.Runtime.NODEJS_14_X,
			code: lambda.Code.fromAsset("lambda"),
			handler: "delete.handler",
			environment: {
				TABLE_NAME: table.tableName,
			},
		});

		// permissions to lambda to dynamo table
		table.grantReadWriteData(createBook);
		table.grantReadWriteData(getBooks);
		table.grantReadWriteData(getBook);
		table.grantReadWriteData(updateBook);
		table.grantReadWriteData(deleteBook);

		// API gateway
		const api = new apigw.RestApi(this, "BookEndPoint");

		api.root
			.resourceForPath("books")
			.addMethod("POST", new apigw.LambdaIntegration(createBook));
		api.root
			.resourceForPath("books")
			.addMethod("GET", new apigw.LambdaIntegration(getBooks));
		api.root
			.resourceForPath("books/{book_id}")
			.addMethod("GET", new apigw.LambdaIntegration(getBook));
		api.root
			.resourceForPath("books/{book_id}")
			.addMethod("PUT", new apigw.LambdaIntegration(updateBook));
		api.root
			.resourceForPath("books/{book_id}")
			.addMethod("DELETE", new apigw.LambdaIntegration(deleteBook));

		new cdk.CfnOutput(this, "HTTP API URL", {
			value: api.url ?? "Something went wrong",
		});
	}
}
