import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-10 md:p-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
            Join thousands of organizations that trust CerifyMe for their certificate issuance and verification
            needs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="cursor-pointer bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-medium transition-colors">
              Create Free Account
            </button>
            <button className="cursor-pointer bg-transparent border border-white text-white hover:bg-white/10 px-8 py-3 rounded-lg font-medium transition-colors">
              Schedule Demo
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}