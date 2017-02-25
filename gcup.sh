#!/bin/bash
# dependencias: inotify-tools
( while inotifywait -e close_write /var/www/html/_includes -e close_write /var/www/html/_content; do sleep 0.5;/var/www/html/generate.sh; done > /dev/null 2>&1 & )
