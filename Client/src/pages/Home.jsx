import CountryChart from "../components/Home/CountryChart"
import News from "../components/Home/News"
import Notes from "../components/Home/Notes"
import PestleChart from "../components/Home/PestleChart"
import TopicChart from "../components/Home/TopicChart"
import TopicNews from "../components/Home/TopicNews"
import YearChart from "../components/Home/YearChart"
import Navbar from "../components/layout/Navbar"
import "../style/home.scss"

function Home() {
  return (
    <>
        <Navbar></Navbar>
        <main>
          <Notes></Notes>
          <section className="second-section">
            <TopicNews></TopicNews>
            <YearChart></YearChart>
          </section>
          <section className="third-section">
            <CountryChart></CountryChart>
            <PestleChart></PestleChart>
            <TopicChart></TopicChart>
          </section>
          <section className="fourth-section">
            <News></News>
          </section>
        </main>
    </>
  )
}

export default Home
