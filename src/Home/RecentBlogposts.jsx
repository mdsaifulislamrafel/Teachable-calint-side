

const blogPosts = [
  { category: "Art", date: "23 Nov 2021", title: "The limits between art and craft", imageUrl: "https://plus.unsplash.com/premium_photo-1661380783027-7d85dba11d1c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { category: "Info. Tech", date: "23 Nov 2021", title: "8 guidelines for art lovers", imageUrl: "https://plus.unsplash.com/premium_photo-1671069848012-2fee83ddd6f9?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { category: "Mathematics", date: "23 Nov 2021", title: "The Importance of Statistics", imageUrl: "https://plus.unsplash.com/premium_photo-1680807897556-03769be7b0e2?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { category: "Design", date: "23 Nov 2021", title: "The Fundamentals of Color Theory", imageUrl: "https://plus.unsplash.com/premium_photo-1661764189164-d4e65c47e7b9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { category: "Art", date: "23 Nov 2021", title: "Excellent short tale writing tips", imageUrl: "https://plus.unsplash.com/premium_photo-1661668354680-2642980c2bd5?q=80&w=2008&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { category: "Education", date: "23 Nov 2021", title: "Make your Classroom a Community", imageUrl: "https://plus.unsplash.com/premium_photo-1661903149361-d044d3b71632?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { category: "Art", date: "23 Nov 2021", title: "Five Turner chosen art collectives", imageUrl: "https://plus.unsplash.com/premium_photo-1661962749465-2715c785d017?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { category: "Art", date: "23 Nov 2021", title: "The artistic highlights of the week", imageUrl: "https://plus.unsplash.com/premium_photo-1716396590683-89798ae4b674?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
];

export default function RecentBlogposts() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-bold text-blue-700 text-center mb-8">
        RECENT BLOGPOST
      </h2>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {blogPosts.map((post, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex items-center space-x-2 text-sm text-blue-600 font-semibold">
                <span>{post.category}</span>
                <span className="text-gray-400">|</span>
                <span className="text-gray-500">{post.date}</span>
              </div>
              <h3 className="text-gray-800 font-semibold text-lg mt-2">
                {post.title}
              </h3>
              <a href="#" className="text-blue-500 mt-2 inline-block">Full Article</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
