

const Footer = () => {
    return (
        <footer className="bg-gray-900 py-10 px-6 md:px-20 text-white">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Contact Us Section */}
                <div>
                    <h2 className="text-2xl font-bold text-orange-500 mb-4 uppercase">Teach : Able</h2>
                    <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
                    <p className="text-sm text-gray-400">
                        Call: +123 400 123<br />
                        Praesent nulla massa, hendrerit vestibulum gravida in, feugiat auctor felis.
                    </p>
                    <p className="text-sm text-gray-400 mt-2">Email: example@mail.com</p>
                    <div className="flex space-x-3 mt-4">
                        {/* Social Icons */}
                        <a href="#" className="text-gray-400 hover:text-white">
                            <i className="fab fa-facebook-square text-2xl"></i>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white">
                            <i className="fab fa-dribbble-square text-2xl"></i>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white">
                            <i className="fab fa-linkedin text-2xl"></i>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white">
                            <i className="fab fa-instagram text-2xl"></i>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white">
                            <i className="fab fa-behance-square text-2xl"></i>
                        </a>
                    </div>
                </div>

                <div className="flex md:flex-none justify-evenly">
                    {/* Explore Section */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Explore</h3>
                        <ul className="text-sm text-gray-400 space-y-2">
                            <li><a href="#" className="hover:text-white">Home</a></li>
                            <li><a href="#" className="hover:text-white">About</a></li>
                            <li><a href="#" className="hover:text-white">Course</a></li>
                            <li><a href="#" className="hover:text-white">Blog</a></li>
                            <li><a href="#" className="hover:text-white">Contact</a></li>
                        </ul>
                    </div>

                    {/* Category Section */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Category</h3>
                        <ul className="text-sm text-gray-400 space-y-2">
                            <li><a href="#" className="hover:text-white">Design</a></li>
                            <li><a href="#" className="hover:text-white">Development</a></li>
                            <li><a href="#" className="hover:text-white">Marketing</a></li>
                            <li><a href="#" className="hover:text-white">Business</a></li>
                            <li><a href="#" className="hover:text-white">Lifestyle</a></li>
                            <li><a href="#" className="hover:text-white">Photography</a></li>
                            <li><a href="#" className="hover:text-white">Music</a></li>
                        </ul>
                    </div>
                </div>

                {/* Subscribe Section */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Subscribe</h3>
                    <p className="text-sm text-gray-400 mb-4">
                        Lorem Ipsum has been them an industry printer took a galley make book.
                    </p>
                    <div className="space-y-4">
                        <input
                            type="email"
                            placeholder="Email here"
                            className="p-2 border border-gray-600 bg-gray-800 text-white rounded-full focus:outline-none"
                        />
                        <br />
                        <button className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600">
                            Subscribe Now
                        </button>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
