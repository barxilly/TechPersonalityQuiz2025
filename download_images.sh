#!/bin/bash

mkdir -p public/img

# List: name|url
images="
arch|https://preview.redd.it/i-use-arch-btw-v0-9ztdlyr6fjbd1.jpeg?width=1080&crop=smart&auto=webp&s=b680a449ce88400fa15741123e8db3dace5c1a2f
apple|https://c8.alamy.com/comp/CM2GH0/japan-tokyo-21st-september-2012-japanese-apple-fan-wearing-steve-jobs-CM2GH0.jpg
hardcore|https://online.maryville.edu/wp-content/uploads/sites/97/2020/07/software-developer-coding.jpg
newb|https://www.udacity.com/blog/wp-content/uploads/2020/11/Hello-World_Blog-scaled.jpeg
broke|https://miro.medium.com/v2/resize:fit:1400/1*ERKwKZO8ICnMLk_bsRuB5Q.jpeg
design|https://platform.theverge.com/wp-content/uploads/sites/2/2025/06/liquid1.jpg?quality=90&strip=all
basic|https://www.weetechsolution.com/wp-content/uploads/2022/04/Laptop-for-Web-Development-1.jpg
vibecoder|https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F29688e26-bc5a-4f72-9fea-f423288af3d0_2160x1022.png
rich|https://images.ctfassets.net/16nm6vz43ids/1RX4klMADm4JVyzWyLSayu/f281f27c3e1c45c49362c0a1924f0d33/5_habits_ruining_your_electronic_devices.jpg?fm=webp&q=65
grandma|https://d.ibtimes.co.uk/en/full/1473536/grandma-looks-tv-screen.jpg?w=1600&h=1200&q=88&f=e707e52fbf6bf6527a72db90e5baba18
"

echo "$images" | while IFS='|' read -r name url; do
  [ -z "$name" ] && continue
  ext="jpg"
  # Try to get extension from URL if possible
  if [[ "$url" =~ \.(png|jpeg|jpg|webp) ]]; then
    ext="${BASH_REMATCH[1]}"
  fi
  out="public/img/$name.$ext"
  echo "Downloading $name -> $out"
  curl -L "$url" -o "$out"
done