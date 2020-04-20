# Solution taken from https://gitlab.com/guided-explorations/ci-cd-plugin-extensions/ci-cd-plugin-extension-integrate-aws-codepipeline/-/blob/master/ci-cd-plugin-extension-integrate-aws-codepipeline.yml
import os

FILE_CONTENT = """variables:
  GIT_DEPTH: 10
  S3_BUCKET_NAME: "{bucket_name}"
  AWS_DEFAULT_REGION: "eu-west-1"
  ZIPPED_REPO: "bundle.zip"

copy-code-to-s3:
  image: amazonlinux
  only:
    - master
  script:
    - |
      echo "Installing required packages"
      yum install -y zip
      curl https://bootstrap.pypa.io/get-pip.py | python
      pip install awscli --upgrade

      echo "Zipping and copying code to $S3_BUCKET_NAME/$ZIPPED_REPO"
      zip -q -r $ZIPPED_REPO *
      aws s3 cp $ZIPPED_REPO s3://$S3_BUCKET_NAME
"""


def run():
    f = open("../.gitlab-ci.yml", "w")
    bucket_name = "atium." + os.environ["ACTIVITY_NAME"] + ".repo"
    f.write(FILE_CONTENT.format(bucket_name=bucket_name))
    f.close()


if __name__ == "__main__":
    run()
