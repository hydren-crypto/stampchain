#!/bin/bash

aws s3 sync . s3://stampchain.io/mint/  --exclude pushdev.sh
aws cloudfront create-invalidation --distribution-id $aws_cloudfront_distribution_id --paths "/mint/*" 

