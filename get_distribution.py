import boto3
import os

activity_name = os.environ["ACTIVITY_NAME"]
aws_profile = os.environ["AWS_PROFILE"]
session = boto3.Session(profile_name=aws_profile)
client = session.client("cloudfront")

distributions = client.list_distributions()["DistributionList"]["Items"]
ids = [
    d["Id"]
    for d in distributions
    if d["Aliases"]["Items"][0] == activity_name + ".atium.app"
]
if ids:
    print(ids[0])
