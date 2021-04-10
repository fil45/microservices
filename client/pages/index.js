import axios from 'axios';

const LandingPage = ({ currentUser }) => {
    console.log("I am in the comp", currentUser)
    return <h1>Welcome</h1>;
}

LandingPage.getInitialProps = async () => {
    if (typeof window === 'undefined') {
    }
    // const response = await axios.get('/api/users/currentuser');


    // return response.data;
};

export default LandingPage;