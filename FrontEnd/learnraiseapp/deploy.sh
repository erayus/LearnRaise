#/bin/bash
#upload files
npm run build
aws s3 sync ./dist s3://learnraise --acl public-read --storage-class REDUCED_REDUNDANCY

#--recursive --acl public-read --storage-class REDUCED_REDUNDANCY
