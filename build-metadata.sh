#!/bin/sh

set -e
if [[ -v DEBUG ]]; then
  set -x
fi

root=.
export content_dir=$root/content
export build_dir=$root/.metadata
export metadata_dir=$root/metadata
export metadata_json=$root/metadata.json

rm -rf $build_dir $metadata_dir $metadata_json
mkdir -p $build_dir $metadata_dir

# parse links and external links from .md into json files
for file in $content_dir/*.md; do
  export slug=$(basename $file .md)
  node scripts/parse-links.js < $file > $build_dir/$slug.json
done

# parse json metadata files into a single metadata file with links and backlinks
node scripts/build-backlinks.js > $metadata_json

# merge backlinks into per-page metadata json files
for file in $build_dir/*.json; do
  export slug=$(basename $file .json)
  node scripts/merge-backlinks.js < $file > $metadata_dir/$slug.json
done
