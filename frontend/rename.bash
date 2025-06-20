find ./app -name '*.tsx' | while read file; do
  newname=$(basename "$file" | sed -E 's/([a-z])([A-Z])/\1-\2/g' | tr 'A-Z' 'a-z')
  if [ "$(basename "$file")" != "$newname" ]; then
    mv "$file" "$(dirname "$file")/$newname"
  fi
done