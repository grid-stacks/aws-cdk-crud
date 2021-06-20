#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import { AwsCdkCrudStack } from "../lib/aws_cdk_crud-stack";

const app = new cdk.App();
new AwsCdkCrudStack(app, "AwsCdkCrudStack");
