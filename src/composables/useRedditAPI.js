import { ref, computed } from 'vue'
import { config, allowedPostHints, endpointBase, domainMapping } from '@/config'

export function useRedditAPI() {
  const posts = ref([])
  const currentPost = ref(null)
  const comments = ref(null)
  const postMeta = ref({
    after: null,
    count: 0,
    loadedIds: [],
  })

  const mediaStatus = ref({
    playing: 'playing',
    stopped: 'stopped',
    loading: 'loading',
    error: 'error',
    current: 'playing',
  })

  const currentSubreddit = ref(null)

  const endpoint = computed(() => {
    if (!postMeta.value || !postMeta.value.after) {
      return endpointBase.replace('{subreddit}', '{subreddit}').replace('{params}', '')
    }
    return (
      endpointBase
        .replace('{subreddit}', '{subreddit}')
        .replace('{params}', `&after=${postMeta.value.after}`)
    )
  })

  async function fetchData(subreddit) {
    try {
      currentSubreddit.value = subreddit
      mediaStatus.value.current = 'loading'
      const url = endpointBase
        .replace('{subreddit}', subreddit)
        .replace('{params}', postMeta.value.after ? `&after=${postMeta.value.after}` : '')

      const response = await fetch(url)
      const data = await response.json()

      const newPosts = prepareData(data.data.children.map((c) => c.data))
      posts.value = [...posts.value, ...newPosts]

      postMeta.value.after = data.data.after
      postMeta.value.count = data.data.dist

      if (!currentPost.value && posts.value.length > 0) {
        loadPost(posts.value[0])
      }

      mediaStatus.value.current = 'playing'
    } catch (error) {
      console.error('Error fetching posts:', error)
      mediaStatus.value.current = 'error'
    }
  }

  function prepareData(children) {
    return children
      .filter((post) => allowedPostHints.includes(post.post_hint))
      .filter((post) => !postMeta.value.loadedIds.includes(post.id))
      .map((post) => {
        // Normalize domain
        const url = new URL(post.url)
        let domain = url.hostname.replace('www.', '').replace('m.', '')
        domain = domain.replace('i.imgur.com', 'imgur.com')
        domain = domain.replace('i.redd.it', 'redd.it')

        postMeta.value.loadedIds.push(post.id)
        return {
          ...post,
          domain: domainMapping[domain] || domain,
        }
      })
  }

  async function fetchComments(post) {
    if (!post) return
    try {
      const url = `https://www.reddit.com/comments/${post.id}.json?raw_json=1`
      const response = await fetch(url)
      const data = await response.json()
      comments.value = prepareComments(data[1].data.children)
    } catch (error) {
      console.error('Error fetching comments:', error)
    }
  }

  function prepareComments(children) {
    return children
      .filter((c) => c.kind === 't1')
      .map((c) => {
        const comment = c.data
        return {
          author: comment.author,
          body: comment.body,
          score: comment.score,
          created_utc: comment.created_utc,
          replies: comment.replies && comment.replies.data ? prepareComments(comment.replies.data.children) : [],
        }
      })
  }

  function loadPost(post) {
    currentPost.value = post
  }

  function queueNext() {
    const currentIndex = posts.value.findIndex((p) => p.id === currentPost.value.id)
    if (currentIndex < posts.value.length - 1) {
      loadPost(posts.value[currentIndex + 1])
    } else {
      // Load more posts
      if (currentSubreddit.value) {
        return fetchData(currentSubreddit.value)
      }
    }
  }

  function queuePrev() {
    const currentIndex = posts.value.findIndex((p) => p.id === currentPost.value.id)
    if (currentIndex > 0) {
      loadPost(posts.value[currentIndex - 1])
    }
  }

  function queueToggle() {
    if (mediaStatus.value.current === 'playing') {
      mediaStatus.value.current = 'stopped'
    } else {
      mediaStatus.value.current = 'playing'
    }
  }

  return {
    posts,
    currentPost,
    comments,
    mediaStatus,
    postMeta,
    currentSubreddit,
    fetchData,
    fetchComments,
    loadPost,
    queueNext,
    queuePrev,
    queueToggle,
  }
}
