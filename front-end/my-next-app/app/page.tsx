
import Nav from './sections/nav/page'
import Jumbotron from './jumbotron/Jumbotron'
import Onboarding from './onboarding/page';
import Dashboard from './dashboard/page';

export default function Home() {
  return (
    // this is where all our components will go
    <div className="App">
      <Jumbotron/>
      {/* <Onboarding/> */}
      {/* <Dashboard/> */}
      {/* <About/>
      <Sponsor/>
      <FAQ/>
      <Footer/> */}
    </div>
  );
}
