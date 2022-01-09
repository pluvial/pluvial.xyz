#!/bin/sh

content_dir=content
metadata_dir=metadata
metadata_json=$metadata_dir/../metadata.json

rm -rf $metadata_dir $metadata_json
mkdir -p $metadata_dir

# parse links and external links from .md into json files in metadata dir
for file in $content_dir/*.md; do
  file_json=$(basename $file .md).json
  node scripts/parse-links.js < $file > $metadata_dir/$file_json
done

# parse json metadata files into a single metadata file with links and backlinks
node scripts/build-backlinks.js > $metadata_json
