
import Nav from './sections/Nav/Nav'
import Jumbotron from './sections/Jumbotron/Jumbotron'

export default function Home() {
  return (
    // this is where all our components will go
    <div className="App">
      <Nav/>
      <Jumbotron/>
      {/* <About/>
      <Sponsor/>
      <FAQ/>
      <Footer/> */}
    </div>
  );
}
