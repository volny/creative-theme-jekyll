#!/usr/bin/python
# -*- coding: UTF-8 -*-
import os
import argparse
import re

#
# Script Parameters
#

parser = argparse.ArgumentParser(description='Import all images from a folder')
parser.add_argument('-p','--path', help='Path to the folder containing all pictures.', required=True, default=None)

#
# Functions
#

# Delete all existing gallery images.
def deletePreviousFiles():
	root = os.path.dirname(os.path.realpath(__file__))
	os.system("rm -f %s/../img/gallery/large/*" % (root))
	os.system("rm -f %s/../img/gallery/thumb/*" % (root))

# Get filepath from args. Must not contain whitespaces
def getValidDirectoryPath(args):
	filepath = (args['path'] if args['path'] != None else "")
	stripedFilePath = re.sub(r'[\\]*', '', filepath)
	if os.path.isdir(stripedFilePath) == False:
		print("Invalid file path.")
		quit(1)
	return stripedFilePath

# Get valid filepath (must not contain whitespaces)
def getValidFilePath(filepath):
	stripedFilePath = re.sub(r'[\\]*', '', filepath)
	if os.path.isfile(stripedFilePath) == False:
		print("Invalid file path.")
		quit(1)
	return stripedFilePath

# Create a thumbnail of the original picture within the img/gallery/thumb/ folder.
def createThumbnail(filepath):
	root = os.path.dirname(os.path.realpath(__file__))
	image_filename = os.path.basename(filepath)
	thumbnail_path = (root + "/../img/gallery/thumb/" + image_filename)
	os.system("convert -gravity center -crop 3:2 -thumbnail 500 %s %s" % (filepath, thumbnail_path))
	return image_filename

# Create a smaller version than the original picture within the img/gallery/large/ folder.
def createBigImage(filepath):
	root = os.path.dirname(os.path.realpath(__file__))
	image_filename = os.path.basename(filepath)
	image_path = (root + "/../img/gallery/large/" + image_filename)
	os.system("convert %s -resize 2160x1440 -quality 40 %s" % (filepath, image_path))
	return image_filename

#
# Script Logic
#

# Get parameters
args = vars(parser.parse_args())

# Extract files from given directory
root = getValidDirectoryPath(args)
path, dirs, files = next(os.walk(root))
print("Cleaning existing files...")
deletePreviousFiles()

# Import new images
print("Importing images from: %s" % (path))
files.sort()
for file in files:
	filepath = getValidFilePath("%s/%s" % (path, file))
	# Create thumbnail and large image.
	createThumbnail(filepath)
	image_filename = createBigImage(filepath)
	# Log successful data used by the main server to only commit the new or updated files.
	print('✅ %s' % (image_filename))
