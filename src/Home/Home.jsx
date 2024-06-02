import Banner from "./Banner";
import Company from "./Company";
import Feature from "./Feature";

const Home = () => {
    return (
        <div className="space-y-5">
            <Banner />
            <Company />
            <Feature />
        </div>
    );
};

export default Home;