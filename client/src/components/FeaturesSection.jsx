import FeatureCard from "./FeatureCard";
import { FiShield, FiSearch, FiFileText } from "react-icons/fi";
import { motion } from "framer-motion";

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-slate-900/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Why Choose CertifyMe?
          </motion.h2>
          <motion.div
            className="h-1 w-20 bg-blue-600 mx-auto mt-4"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          ></motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<FiShield className="h-7 w-7 text-blue-400" />}
            title="Tamper-Proof Security"
            description="Certificates are secured by blockchain technology, making them impossible to forge or alter."
            delay={0}
          />
          <FeatureCard
            icon={<FiSearch className="h-7 w-7 text-purple-400" />}
            title="Instant Verification"
            description="Verify any certificate in seconds with our simple verification tool."
            delay={0.1}
          />
          <FeatureCard
            icon={<FiFileText className="h-7 w-7 text-teal-400" />}
            title="Customizable Templates"
            description="Create beautiful, professional certificates with our easy-to-use template system."
            delay={0.2}
          />
        </div>
      </div>
    </section>
  );
}