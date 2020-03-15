#!/usr/bin/env sh
(
	set -e
	# Remove any existing local website.
	rm -rf _site
	# Locally build and serve the jekyll website.
	bundle exec jekyll serve --incremental --config "_config.yml"
)
