import { motion } from "framer-motion";
import { SlSocialGithub } from "react-icons/sl";

const testimonials = [
  {
    name: "Amina Sultana",
    course: "MERN Stack Bootcamp",
    review:
      "Amazing course! The instructors were clear and supportive. Highly recommended.",
    avatar: "https://i.pravatar.cc/150?img=32",
    rating: 5,
  },
  {
    name: "Tahira Khatun",
    course: "UI/UX Design",
    review: "Loved the hands-on projects and clean layout. Learnt a lot!",
    avatar: "https://i.pravatar.cc/150?img=27",
    rating: 4,
  },
  {
    name: "Ramila Begum",
    course: "Firebase Auth Mastery",
    review: "Practical, simple, and powerful content. Great value!",
    avatar: "https://i.pravatar.cc/150?img=21",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-16  text-base-content font-poppins">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-inter text-primary">
          What Our Students Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              viewport={{ once: false }}
              className="bg-base-100 rounded-lg shadow-lg p-6"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={t.avatar}
                  alt="avatar"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h4 className="font-semibold">{t.name}</h4>
                  <span className="text-sm text-primary">{t.course}</span>
                </div>
              </div>
              <p className="text-sm">{t.review}</p>
              <div className="mt-3 text-yellow-500">
                {"★".repeat(t.rating)}
                {"☆".repeat(5 - t.rating)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
