import Navbar from '../Navbar'
import './index.css'

const NotFound = () => (
  <div>
    <Navbar />
    <img
      src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
      className="notFound"
      alt="not found"
    />
    <h1>Page Not Found</h1>
    <p>We are sorry, the page you requested could not be found</p>
  </div>
)

export default NotFound
