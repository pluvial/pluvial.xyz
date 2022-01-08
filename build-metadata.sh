#!/bin/sh

content_dir=content
metadata_dir=metadata

rm -rf $metadata_dir
mkdir -p $metadata_dir

# parse links and external links from .md into json files in metadata dir
for file in $content_dir/*.md; do
  file_json=$(basename $file .md).json
  node scripts/parse-links.js < $file > $metadata_dir/$file_json
done
