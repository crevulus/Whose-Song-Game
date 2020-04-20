gitlab-ci:
	python -m create_gitlab_ci
validate:
	aws cloudformation validate-template \
		--template-body file://template.yml \
		--profile ${AWS_PROFILE}
package:
	aws cloudformation package \
		--template-file template.yml \
		--output-template-file packaged.yml \
		--s3-bucket atium-prod-cf-templates \
		--s3-prefix ${ACTIVITY_NAME} \
		--profile ${AWS_PROFILE}
deploy: gitlab-ci validate package
	aws cloudformation deploy \
		--template-file packaged.yml \
		--stack-name atium-${ACTIVITY_NAME} \
		--capabilities CAPABILITY_IAM \
		--profile ${AWS_PROFILE} \
		--parameter-overrides ActivityName=${ACTIVITY_NAME} \
		CertificateArn=arn:aws:acm:us-east-1:487828212707:certificate/a8e6d521-1d58-4554-bdeb-6f9bf33cfec9 \
		HostedZoneId=Z22U9SFSNWMWPH
