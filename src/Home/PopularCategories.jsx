

const categories = [
  { name: "Design", icon: "🖌️" },
  { name: "Development", icon: "💻" },
  { name: "Marketing", icon: "📈" },
  { name: "Business", icon: "💼" },
  { name: "Lifestyle", icon: "🌿" },
  { name: "Photography", icon: "📷" },
  { name: "Music", icon: "🎵" },
  { name: "Data Science", icon: "📊" },
  { name: "Personal Development", icon: "🌱" },
  { name: "Health & Fitness", icon: "💪" },
  { name: "Finance", icon: "💰" },
  { name: "Teaching", icon: "📚" },
];

export default function PopularCategories() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-2xl font-semibold text-gray-800">Most <span className="text-green-600">Popular Categories</span></h2>
      <p className="text-gray-500 mt-1">Various versions have evolved over the years, sometimes by accident,</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {categories.map((category, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-lg transition duration-200 ease-in-out cursor-pointer border border-transparent hover:border-green-500"
          >
            <div className="flex items-center space-x-2">
              <span className="text-2xl">{category.icon}</span>
              <span className="text-gray-800 font-medium">{category.name}</span>
            </div>
            <span className="text-green-500">→</span>
          </div>
        ))}
      </div>
    </div>
  );
}
