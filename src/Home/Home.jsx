import Banner from "./Banner";
import BestInstructors from "./BestInstructors";
import FaqSection from "./FaqSection";
import Feature from "./Feature";
import PopularCategories from "./PopularCategories";
import Pricing from "./Pricing";
import RecentBlogposts from "./RecentBlogposts";
import StudentFeedback from "./StudentFeedback";
import TotalReview from "./TotalReview";

const Home = () => {
    return (
        <div className="space-y-5 mt-24">
            <Banner />
            <Pricing />
            <PopularCategories />
            <BestInstructors />
            <StudentFeedback />
            <RecentBlogposts />
            <Feature />
            <TotalReview />
            <FaqSection />
        </div>
    );
};

export default Home;