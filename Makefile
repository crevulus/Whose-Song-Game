DISTRIBUTION_ID := $(shell python -m get_distribution)

unit-test:
	yarn test:unit
build:
	yarn build
sync:
	aws s3 cp ./dist s3://${ACTIVITY_NAME}.atium.app/ \
	--acl public-read --recursive --exclude 'cloudformation/*' \
	--profile ${AWS_PROFILE}
	aws s3 cp ./dist/index.html s3://${ACTIVITY_NAME}.atium.app/ \
	--cache-control="max-age=0, no-cache, no-store, must-revalidate" \
	--acl public-read --profile ${AWS_PROFILE}

invalidate:
	aws cloudfront create-invalidation \
		--distribution-id ${DISTRIBUTION_ID} \
		--paths "/*" \
		--profile ${AWS_PROFILE}
	aws cloudfront create-invalidation --distribution-id ${DISTRIBUTION_ID} \
		--paths /index.html --profile ${AWS_PROFILE}
deploy: unit-test build sync invalidate
upload-files:
	aws s3 cp ./.env s3://atium.${ACTIVITY_NAME}.repo/ \
	--profile ${AWS_PROFILE}
	aws s3 cp ./src/aws-exports.js s3://atium.${ACTIVITY_NAME}.repo/ \
	--profile ${AWS_PROFILE}
