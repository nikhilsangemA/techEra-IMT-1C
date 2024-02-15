import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Navbar from '../Navbar'
import './index.css'

const status = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'ISPROGRESS',
}

class SeparateApi extends Component {
  state = {apiTravelData: [], activeStatus: status[0]}

  componentDidMount() {
    this.getSingleApi()
  }

  getFetchData = dataOf => ({
    id: dataOf.id,
    name: dataOf.name,
    imageUrl: dataOf.image_url,
    description: dataOf.description,
  })

  getSingleApi = async () => {
    this.setState({activeStatus: status.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/te/courses/${id}`
    const option = {
      method: 'GET',
    }
    const fetchData = await fetch(url, option)
    const data = await fetchData.json()
    console.log(data)
    if (fetchData.ok === true) {
      const courseDetails = this.getFetchData(data.course_details)
      console.log(courseDetails)
      this.setState({
        apiTravelData: courseDetails,
        activeStatus: status.success,
      })
    } else {
      this.setState({activeStatus: status.failure})
    }
  }

  getLoader = () => (
    <div data-testid="loader">
      <Loader color="#00BFFF" type="TailSpin" height={50} width={50} />
    </div>
  )

  //   travelsListOf = travelsList => {
  //     const {id, name, description, imageUrl} = travelsList
  //     return (
  //       <li key={id} onClick={this.getLoad}>
  //         <img src={imageUrl} alt={travelsList.name} />
  //         <h5>{name}</h5>
  //         <p>{description}</p>
  //       </li>
  //     )
  //   }

  getSuccess = () => {
    const {apiTravelData} = this.state
    const {id, name, description, imageUrl} = apiTravelData
    return (
      <div className="mainContainer">
        <Navbar />
        <ul className="ul-list2">
          <li key={id} onClick={this.getLoad}>
            <img src={imageUrl} alt={name} />
            <h5>{name}</h5>
            <p>{description}</p>
          </li>
        </ul>
      </div>
    )
  }

  clickBtn = () =>
    this.setState({activeStatus: status.inProgress}, this.getSingleApi)

  getFailure = () => (
    <div>
      <img
        className="failureImg"
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" onClick={this.clickBtn}>
        Retry
      </button>
    </div>
  )

  render() {
    const {activeStatus} = this.state
    switch (activeStatus) {
      case status.success:
        return this.getSuccess()
      case status.failure:
        return this.getFailure()
      case status.inProgress:
        return this.getLoader()

      default:
        return null
    }
  }
}

export default SeparateApi
