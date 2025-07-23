import { FaClock, FaLaptopCode, FaUsers, FaShieldAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const features = [
  {
    icon: <FaLaptopCode size={32} />,
    title: "Project-Based Learning",
    desc: "Every course includes real-world projects to boost your skills.",
  },
  {
    icon: <FaClock size={32} />,
    title: "Flexible Schedule",
    desc: "Learn at your own pace, any time, from anywhere.",
  },
  {
    icon: <FaUsers size={32} />,
    title: "Expert Mentors",
    desc: "Guidance from professionals with years of experience.",
  },
  {
    icon: <FaShieldAlt size={32} />,
    title: "Secure Platform",
    desc: "Top-notch security to protect your learning journey.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-16 bg-base-100 text-base-content font-poppins">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center font-inter text-primary mb-8">
          Why Choose Our Platform
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              viewport={{ once: false }}
              className="p-6 bg-base-200 rounded-lg shadow-md text-center"
            >
              <div className="text-primary flex items-center justify-center mb-4">
                {f.icon}
              </div>
              <h4 className="font-semibold mb-2">{f.title}</h4>
              <p className="text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
