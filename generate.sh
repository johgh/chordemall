#!/bin/bash
root_path="$HOME/guitarchords"
cd $root_path/_content

for var in *
do
    title=`sed -n -e 's/.*<h1>\(.*\)<\/h1>.*/\1/p' $var`

    cat $root_path/_includes/header.html \
        $root_path/_includes/navbar.html \
        $root_path/_content/$var \
        $root_path/_includes/footer.html | sed "s/<section_title>/$title/g" > $root_path/$var
done

cd $root_path/_includes

# custom.html includes
sed -e '/<section_custom>/ {' -e 'r custom.html' -e 'd' -e '}' -i $root_path/generator.html
sed -e '/<section_custom>/ {' -e 'r custom.html' -e 'd' -e '}' -i $root_path/library.html

# library is the index
mv $root_path/library.html $root_path/index.html

