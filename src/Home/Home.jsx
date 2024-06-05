import Banner from "./Banner";
import Company from "./Company";
import Feature from "./Feature";
import Pricing from "./Pricing";
import Teams from "./Teams";

const Home = () => {
    return (
        <div className="space-y-5">
            <Banner />
            <Company />
            <Feature />
            <Pricing />
            <Teams />
        </div>
    );
};

export default Home;