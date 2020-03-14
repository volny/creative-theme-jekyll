#!/usr/bin/python
import argparse
import os
import re

#
# Script Parameters
#

parser = argparse.ArgumentParser(description='Create and upload a new image post')
parser.add_argument('-p','--path', help='Path to the actual image to upload. Image file must have a valid extension.', required=True, default=None)
parser.add_argument('-i','--index', help='Optional image index. If existing file will be overwritten, otherwise will calculated.', required=False, default=None)

#
# Function Declaration
#

# Get filepath from args. Must not contain whitespaces
def getFilepath(args):
	filepath = (args['path'] if args['path'] != None else "")
	stripedFilePath = re.sub(r'[\\]*', '', filepath)
	if os.path.isfile(stripedFilePath) == False:
		print("Invalid file path.")
		quit(1)
	return stripedFilePath

# Clean non-word characters and whitespaces.
def clear_string(s):
	# Check parameter.
	if s == None:
		return None
	# Remove all non-valid characters
	s = re.sub('[/_:]', '', s).strip()
	# Remove backslashes
	s = s.replace("\\", "").strip()
	# Remove all duplicated whitespaces
	s = re.sub(' +', ' ', s).strip()
	# If the string was empty or just containing one single whitespace then return None
	if s == '':
		return None
	return s

# Get index from args. If not provided will use the number of images already available and increment by 1.
def getIndex(args):
	index = (args['index'] if args['index'] != None else "")
	index = clear_string(index)

	if index == None or index == "":
		root = os.path.dirname(os.path.realpath(__file__))
		path, dirs, files = next(os.walk(root + '/../_images/'))
		index = len(files)

	return "%d" % index

# Create a thumbnail of the original picture within the img/gallery/thumb/ folder.
def createThumbnail(index, filepath, image_extension):
	root = os.path.dirname(os.path.realpath(__file__))
	thumbnail_path = (root + "/../img/gallery/thumb/" + index + "." + image_extension)
	os.system("convert -gravity center -crop 3:2 -thumbnail 500 %s %s" % (filepath, thumbnail_path))

# Create a smaller version than the original picture within the img/gallery/large/ folder.
def createBigImage(index, filepath, image_extension):
	root = os.path.dirname(os.path.realpath(__file__))
	image_path = (root + "/../img/gallery/large/" + index + "." + image_extension)
	os.system("convert %s -resize 2160x1440 -quality 40 %s" % (filepath, image_path))

# Get the image extension from the given filepath.
def getImageExtension(filepath):
	components = filepath.split('.')
	if len(components) < 2:
		print("Invalid image extension.")
		quit(1)
	return components[-1]

def image_filename(index, extension):
	return ("%s.%s" % (index, extension))

# Create the markdown file for the new post.
def createMarkdownFile(args, index, image_extension):
	# Reuse or create filename.
	root = os.path.dirname(os.path.realpath(__file__))
	filename = index + '.markdown'
	md_path = (root + '/../_images/' + filename)
	# Create the markdown file.
	f = open(md_path,'w')
	f.write('---\n') # python will convert \n to os.linesep
	f.write('image: %s\n' % image_filename(index, image_extension))
	f.write('---\n')
	f.close()
	return filename

#
# Script Logic
#

# Get parameters
args = vars(parser.parse_args())

# Get all important data
filepath = getFilepath(args)
image_extension = getImageExtension(filepath)
index = getIndex(args)

# Create Markdown file
filename = createMarkdownFile(args, index, image_extension)

# Create thumbnail and large image.
createThumbnail(index, filepath, image_extension)
createBigImage(index, filepath, image_extension)

# Log successful data used by the main server to only commit the new or updated files.
print('{ "filename": "%s", "image": "%s"}' % (filename, image_filename(index, image_extension)))
