import sys, json
from lyricsgenius import Genius

def read_in():
    lines = sys.stdin.readlines()
    return json.loads(lines[0])

def main():
    song_name = "Lovely"
    genius = Genius("bCWWGcKFK5o1w813dyIc7cxC1DBmWFwOt6K9LbrJkHUeKyS8FtsVngmiQfpvwePK")
    song = genius.search_song(song_name)
    lyrics = song.lyrics[:-30]
    print(lyrics)
    sys.stdout.flush()


if __name__ == '__main__':
    main()