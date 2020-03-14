#!/usr/bin/python
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
	os.system("rm -f ../_images/*")
	os.system("rm -f ../img/gallery/large/*")
	os.system("rm -f ../img/gallery/thumb/*")

# Get filepath from args. Must not contain whitespaces
def getFilepath(args):
	filepath = (args['path'] if args['path'] != None else "")
	stripedFilePath = re.sub(r'[\\]*', '', filepath)
	if os.path.isdir(stripedFilePath) == False:
		print("Invalid file path.")
		quit(1)
	return stripedFilePath

#
# Script Logic
#

# Get parameters
args = vars(parser.parse_args())

root = getFilepath(args)
path, dirs, files = next(os.walk(root))
print("Cleaning existing files...")
deletePreviousFiles()
print("Importing images from: %s" % (path))
for file in files:
	os.system("python create_slideshow_image.py -p %s" % (path + file))