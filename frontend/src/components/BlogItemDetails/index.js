import {Component} from 'react'
import Loader from 'react-loader-spinner'

import './index.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

class BlogItemDetails extends Component {
  state = {blogData: {}, isLoader: true}

  componentDidMount() {
    this.getBlogs()
  }

  getBlogs = async () => {
    const {match} = this.props
    const {params} = match

    try {
      const response = await fetch(
        `http://localhost:3001/get-blog/${params.id}`,
      )
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      console.log('Fetched data:', data) // Add this line
      const blogsData = {
        title: data.title,
        imageUrl: data.image_url,
        content: data.content,
        avatarUrl: data.avatar_url,
        author: data.author,
      }
      this.setState({blogData: blogsData, isLoader: false})
      console.log('State updated with:', blogsData) // Add this line
    } catch (error) {
      console.error('Fetch error:', error)
    }
  }

  renderBlogItemDetails = () => {
    const {blogData, isLoader} = this.state
    console.log('Rendering blog data:', blogData) // Add this line
    const {title, imageUrl, content, avatarUrl, author} = blogData
    return (
      <div className="blog-info">
        {isLoader ? (
          <Loader type="ThreeDot" />
        ) : (
          <>
            <h2 className="blog-details-title">{title}</h2>
            <div className="author-details">
              <img className="author-pic" src={avatarUrl} alt={author} />
              <p className="details-author-name">{author}</p>
            </div>
            <img className="blog-image" src={imageUrl} alt={title} />
            <p className="blog-content">{content}</p>)
          </>
        )}
      </div>
    )
  }

  render() {
    return <div className="blog-container">{this.renderBlogItemDetails()}</div>
  }
}

export default BlogItemDetails
