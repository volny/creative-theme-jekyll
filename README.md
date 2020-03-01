# LePenon-SurfHouse Website

[![Netlify Status](https://api.netlify.com/api/v1/badges/b82dcde1-3fc8-471f-8352-227a06973b05/deploy-status)](https://app.netlify.com/sites/lepenon-surfhouse/deploys)

## Dependencies

### CSS

- Animate: https://daneden.github.io/animate.css/
- [ ] TODO: review and update bootstrap (css+js)
- [ ] TODO: review and update JS libraries

## Localization

The entire website is localized and translated into few languages.
The default language is French.

The languages enabled are listed in the folder `_languages`. The static texts are translated in the `_config.yml` and the dynamic elements in their dedicated markdown files.

To add a new language support:
1. Create a new markdown file in the `_languages` folder and fill it based on the other languages format.
2. Create new subfolders in all 3 content folders: `_activities`, `_images`, `_services`
3. Copy the .markdown content files from another language into those new folders.
4. Edit and translate the content of the .markdown files to the new supported language.
5. Add a new language-short-name.html file at the root of the repository (ex: `en.html`), within set the correct `lang` variable.

## Deployment

Netlify has been configured to deploy the website at every git commit/push on the `master` branch.

## TODO

### General
- [ ] Activities: style should be calculater, not imported from markdown
- [ ] Generate a sitemap.xml for better indexing:
	- https://support.google.com/webmasters/answer/189077?hl=en
	- https://www.sylvaindurand.org/making-jekyll-multilingual/
- [ ] Navigation bar: not so wide, current index not visible enough

### Map
- [ ] Add a new section to show a map location
- [ ] Add POI to google maps
- [ ] Mobile: Add link to map application

### Slideshow
- [ ] Add slideshow that feels good on a mobile device.
