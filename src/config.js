export const moods = [
  {
    name: 'Videos',
    subreddits: [
      { name: 'Videos', path: 'videos' },
      { name: 'Obscure Media', path: 'obscuremedia' },
      { name: 'Interdimensional Cable', path: 'InterdimensionalCable' },
      { name: 'YouTube Haiku', path: 'youtubehaiku' },
    ],
  },
  {
    name: 'Music',
    subreddits: [
      { name: 'Listen to This', path: 'listentothis' },
      { name: 'Electronic', path: 'electronicmusic' },
      { name: 'Classical', path: 'classicalmusic' },
    ],
  },
  {
    name: 'Images',
    subreddits: [
      { name: 'Art', path: 'Art' },
      { name: 'Pics', path: 'pics' },
      { name: 'Earthporn', path: 'EarthPorn' },
    ],
  },
]

export const config = {
  nsfwThumbnailUrl: 'https://cdn.glitch.com/db81a2c9-1aad-4ddd-b39a-9b26a1c1c8dd%2Fnsfw.jpg?v=1611081779403',
  imgurClientId: '2ac6a4219c940db',
}

export const allowedPostHints = ['link', 'image', 'rich:video', 'hosted:video']

export const endpointBase = 'https://www.reddit.com/r/{subreddit}/hot.json?raw_json=1{params}'

export const domainMapping = {
  'youtube.com': 'youtube',
  'youtu.be': 'youtube',
  'm.youtube.com': 'youtube',
  'streamable.com': 'streamable',
  'vid.me': 'vidme',
  'gfycat.com': 'gfycat',
  'imgur.com': 'imgur',
  'i.imgur.com': 'imgur',
  'media.giphy.com': 'giphy',
  'v.redd.it': 'reddit',
  'i.redd.it': 'redditi',
}
