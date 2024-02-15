import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Navbar from '../Navbar'

// import Cookies from 'js-cookie'

import './index.css'

const status = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'ISPROGRESS',
}

class TechEra extends Component {
  state = {apiTravelData: [], activeStatus: status[0]}

  componentDidMount() {
    this.getApiTravelGuide()
  }

  getFetchData = dataOf => ({
    id: dataOf.id,
    name: dataOf.name,
    logoUrl: dataOf.logo_url,
  })

  getApiTravelGuide = async () => {
    this.setState({activeStatus: status.inProgress})
    // const getToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/te/courses'
    const option = {
      method: 'GET',
      //   headers: {
      //     Authorization: `Bearer ${getToken}`,
      //   },
    }
    const fetchData = await fetch(url, option)
    const data = await fetchData.json()

    if (fetchData.ok === true) {
      const newData = data.courses.map(eachPack => this.getFetchData(eachPack))

      this.setState({apiTravelData: newData, activeStatus: status.success})
    } else {
      this.setState({activeStatus: status.failure})
    }
  }

  getLoader = () => (
    <div data-testid="loader">
      <Loader color="#00BFFF" type="TailSpin" height={50} width={50} />
    </div>
  )

  getLoad = () => this.getLoader()

  travelsListOf = travelsList => (
    <Link
      key={travelsList.id}
      to={`/courses/${travelsList.id}`}
      className="link"
    >
      <li className="li-list1" onClick={this.getLoad}>
        <img src={travelsList.logoUrl} alt={travelsList.name} />
        <p>{travelsList.name}</p>
      </li>
    </Link>
  )

  getSuccess = () => {
    const {apiTravelData} = this.state
    return (
      <div className="mainContainer">
        <Navbar />
        <h1 className="heading">Courses</h1>
        <ul className="ul-list">
          {apiTravelData.map(eachTravel => this.travelsListOf(eachTravel))}
        </ul>
      </div>
    )
  }

  clickBtn = () =>
    this.setState({activeStatus: status.inProgress}, this.getApiTravelGuide)

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

export default TechEra
