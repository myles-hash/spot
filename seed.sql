CREATE TABLE albums (
id SERIAL PRIMARY KEY,
album_id text,
album_image_url text,
album_name text,
spotify_link text,
album_artist text,
spot_album_review text,
spot_album_score text,
user_id text
);

INSERT INTO albums (album_id, album_image_url, album_name, spotify_link, album_artist,) 
VALUES ('5EUgcfO5OWxnniHR3QYFcK', 'https://i.scdn.co/image/ab67616d0000b273c926cc5c75394291893ee86b',
'The Marshall Mathers LP2 (Expanded Edition)', 'https://open.spotify.com/album/5EUgcfO5OWxnniHR3QYFcK', 'Eminem', 
'This was good', '5', ''
);


DROP TABLE reviews;

CREATE TABLE reviews (
id SERIAL PRIMARY KEY,
album_id text,
album_image_url text,
album_name text,
spotify_link text,
album_artist text,
album_score text,
album_review text,
fav_track text
);

INSERT INTO reviews (album_id, album_image_url, album_name, spotify_link, album_artis, album_score, album_review, user_id) 
VALUES ('5EUgcfO5OWxnniHR3QYFcK', 'https://i.scdn.co/image/ab67616d0000b273c926cc5c75394291893ee86b',
'The Marshall Mathers LP2 (Expanded Edition)', 'https://open.spotify.com/album/5EUgcfO5OWxnniHR3QYFcK', 'Eminem', 
'5', 'This was good I guess', 'user_2cay5RTJ1gTJacLlYox8bHhdNw3'
);