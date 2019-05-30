interface AwsExports {
  Auth: {
    [key: string]: string;
  };
  AWSS3: {
    [key: string]: string;
  };
  aws_appsync_graphqlEndpoint: string;
  aws_appsync_region: string;
  aws_appsync_authenticationType: string;
  route53: {
    admin: string;
    public: string;
  };
}
