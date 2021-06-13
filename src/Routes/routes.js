import { Switch , Route, Redirect , withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
/*------------- importing components ------------------*/
import Home from '.././components/Home/Home';
import Market from '.././components/Market/Market';
import Projects from '.././components/Projects/Projects';
import ContactUs from '../components/ContactUs/ContactUs';
import HeaderWithRouter from '.././components/UpBar/UpBar';
import FooterWithRouter from '../components/Footer/Footer';
import Profile from '../components/Profil/Profile';

const mapStateToProps = state =>{
    return{
        User: state.User,
        Questions: state.Questions,
        Projects: state.Projects,
        Trees: state.Trees
    }
}
const Routes =(props)=>{
    const homeComponent = () => {
        return(
            <Home/>
        );
    };
    const projectComponent = () => {
        return(
            <Projects projects={props.Projects}/>
        );
    };
    const marketComponent = () => {
        return(
            <Market trees={props.Trees}/>
        );
    };
    const contactComponent = () => {
        return(
            <ContactUs questions={props.Questions}/>
        );  
    }
    const profilComponent = () => {
        return(
            <Profile
              profile={props.User}
              projects={props.Projects.filter(({id})=>{
                return props.User.Donations.some(include => include.ProjectId === id)
              })}
            />
        );
    }
    return(
        <div>
            <HeaderWithRouter/>
            <Switch>
                <Route exact path="/" component={homeComponent}/>
                <Route exact path="/project" component={projectComponent}/>
                <Route exact path="/Market" component={marketComponent}/>
                <Route exact path="/ContactUs" component ={contactComponent}/>
                <Route exact path="/Profil" component={profilComponent}/>
                <Redirect to="/"/>
            </Switch>
            <FooterWithRouter/>
        </div>
    );
}

export default withRouter(connect(mapStateToProps)(Routes));