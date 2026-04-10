import dog1 from "../../../assets/images/blogDog1.jpg";
import dog2 from "../../../assets/images/dog3.jpg";
import cat1 from "../../../assets/images/BlogCat1.jpg";
import BlogCard from "./BlogCard";
import titleIcon from "../../../assets/images/title-icon.png";


const Blog = () => {
  const posts = [
    {
      category: "Dog Care",
      title: "Complete Guide to Golden Retriever Care",
      excerpt:
        "Golden Retrievers are known for their friendly nature, intelligence, and loyalty, making them one of the...",
      author: "Dr. Sarah Johnson",
      date: "March 15, 2024",
      readTime: "8 min read",
      image: dog1,
      link: "https://lovepetcare.com/the-ultimate-guide-to-caring-for-a-golden-retriever-health-grooming-diet-and-training-tips/",
    },
    {
      category: "Cat Behavior",
      title: "Understanding Your Cat's Behavior",
      excerpt:
        "Cats, like human-beings, reveal their inner states through their body language. At tuft + paw, we spend a ton of time researching...",
      author: "Emily Chen",
      date: "March 11, 2024",
      readTime: "6 min read",
      image: cat1,
      link: "https://www.tuftandpaw.com/blogs/cat-guides/the-definitive-guide-to-cat-behavior-and-body-language?srsltid=AfmBOoqBf__jTA7j1mjxt_F6y2AFpHjGZxpJhTee_4zJq4Yn3E3Z8vMN",
    },
    {
      category: "Pet Care",
      title: "First Time Pet Owner's Essential Checklist",
      excerpt:
        "A Complete Guide for First-Time Pet Owners: How to Prepare for Your New Furry Friend...",
      author: "Michael Roberts",
      date: "March 10, 2024",
      readTime: "10 min read",
      image: dog2,
      link: "https://www.missionveterinaryspecialists.com/blog/a-complete-guide-for-first-time-pet-owners-how-to-prepare-for-your-new-furry-friend",
    },
  ];

  return (
    <section id="blog-section" className="mt-14 px-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12 flex flex-col justify-between items-center">
        <img src={titleIcon} alt="icon Image" />
        <h2 className="text-3xl font-bold text-slate-900 mb-2">
          Pet Care Blog
        </h2>
        <p className="text-slate-500">Expert advice and tips for pet owners</p>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {posts.map((post, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 flex flex-col"
          >
            <BlogCard post={post} />
          </div>
        ))}
      </div>

    </section>
  );
};

export default Blog;
