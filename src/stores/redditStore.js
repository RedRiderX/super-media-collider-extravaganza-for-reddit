import { defineStore } from 'pinia'
import { config, allowedPostHints, endpointBase, domainMapping } from '@/config'

export const useRedditStore = defineStore('reddit', {
  state: () => ({
    posts: [],
    currentPost: null,
    comments: null,
    postMeta: {
      after: null,
      count: 0,
      loadedIds: [],
    },
    mediaStatus: {
      playing: 'playing',
      stopped: 'stopped',
      loading: 'loading',
      error: 'error',
      current: 'playing',
    },
    currentSubreddit: null,
  }),

  getters: {
    endpoint: (state) => {
      if (!state.postMeta || !state.postMeta.after) {
        return endpointBase.replace('{subreddit}', '{subreddit}').replace('{params}', '')
      }
      return (
        endpointBase
          .replace('{subreddit}', '{subreddit}')
          .replace('{params}', `&after=${state.postMeta.after}`)
      )
    },
  },

  actions: {
    async fetchData(subreddit) {
      try {
        this.currentSubreddit = subreddit
        this.mediaStatus.current = 'loading'
        const url = endpointBase
          .replace('{subreddit}', subreddit)
          .replace('{params}', this.postMeta.after ? `&after=${this.postMeta.after}` : '')

        const response = await fetch(url)
        const data = await response.json()

        const newPosts = this.prepareData(data.data.children.map((c) => c.data))
        this.posts = [...this.posts, ...newPosts]

        this.postMeta.after = data.data.after
        this.postMeta.count = data.data.dist

        if (!this.currentPost && this.posts.length > 0) {
          this.loadPost(this.posts[0])
        }

        this.mediaStatus.current = 'playing'
      } catch (error) {
        console.error('Error fetching posts:', error)
        this.mediaStatus.current = 'error'
      }
    },

    prepareData(children) {
      return children
        .filter((post) => allowedPostHints.includes(post.post_hint))
        .filter((post) => !this.postMeta.loadedIds.includes(post.id))
        .map((post) => {
          // Normalize domain
          const url = new URL(post.url)
          let domain = url.hostname.replace('www.', '').replace('m.', '')
          domain = domain.replace('i.imgur.com', 'imgur.com')
          domain = domain.replace('i.redd.it', 'redd.it')

          this.postMeta.loadedIds.push(post.id)
          return {
            ...post,
            domain: domainMapping[domain] || domain,
          }
        })
    },

    async fetchComments(post) {
      if (!post) return
      try {
        const url = `https://www.reddit.com/comments/${post.id}.json?raw_json=1`
        const response = await fetch(url)
        const data = await response.json()
        this.comments = this.prepareComments(data[1].data.children)
      } catch (error) {
        console.error('Error fetching comments:', error)
      }
    },

    prepareComments(children) {
      return children
        .filter((c) => c.kind === 't1')
        .map((c) => {
          const comment = c.data
          return {
            author: comment.author,
            body: comment.body,
            score: comment.score,
            created_utc: comment.created_utc,
            replies: comment.replies && comment.replies.data ? this.prepareComments(comment.replies.data.children) : [],
          }
        })
    },

    loadPost(post) {
      this.currentPost = post
    },

    queueNext() {
      const currentIndex = this.posts.findIndex((p) => p.id === this.currentPost.id)
      if (currentIndex < this.posts.length - 1) {
        this.loadPost(this.posts[currentIndex + 1])
      } else {
        // Load more posts
        if (this.currentSubreddit) {
          return this.fetchData(this.currentSubreddit)
        }
      }
    },

    queuePrev() {
      const currentIndex = this.posts.findIndex((p) => p.id === this.currentPost.id)
      if (currentIndex > 0) {
        this.loadPost(this.posts[currentIndex - 1])
      }
    },

    queueToggle() {
      if (this.mediaStatus.current === 'playing') {
        this.mediaStatus.current = 'stopped'
      } else {
        this.mediaStatus.current = 'playing'
      }
    },
  },
})
