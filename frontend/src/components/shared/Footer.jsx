import {
  RiFacebookCircleFill,
  RiInstagramFill,
  RiTwitterXFill,
  RiGithubFill,
  RiLinkedinBoxFill,
  RiMailSendLine,
  RiRedditFill,
} from "react-icons/ri";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socials = [
    { icon: RiGithubFill, link: "https://github.com/Pintu-Kumar-1709" },
    {
      icon: RiLinkedinBoxFill,
      link: "https://www.linkedin.com/in/pintu-kumar-12x",
    },
    { icon: RiTwitterXFill, link: "https://x.com/babu_sajan_12" },
    { icon: RiInstagramFill, link: "https://instagram.com/babu_sajan_12" },
    {
      icon: RiFacebookCircleFill,
      link: "https://www.facebook.com/Mrkumar.Sajan.12x",
    },
    {
      icon: RiRedditFill,
      link: "https://www.reddit.com/u/KumarrR_12x/s/y85m0My7iZ",
    },
  ];

  return (
    <footer className="w-full mt-24 bg-[#050505] border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#42edc5]/5 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-amber-500/5 blur-[120px] rounded-full"></div>

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-4 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-3xl font-extrabold tracking-tight"
            >
              <span className="text-amber-500">Radi</span>
              <span className="bg-linear-to-r from-[#42edc5] to-teal-500 bg-clip-text text-transparent">
                AntiX
              </span>
            </motion.div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Empowering the next generation of developers with premium UI
              components and seamless job-seeking experiences. Build faster,
              hire better.
            </p>

            <div className="flex gap-3">
              {socials.map((item, i) => (
                <motion.a
                  key={i}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "rgba(66, 237, 197, 0.1)",
                  }}
                  className="p-2.5 rounded-lg border border-white/10 text-gray-400 hover:text-[#42edc5] transition-all"
                >
                  <item.icon size={22} />
                </motion.a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6">
                Platform
              </h4>
              <ul className="space-y-4 text-sm text-gray-400">
                {[
                  "Browse Jobs",
                  "Companies",
                  "Post a Job",
                  "Top Candidates",
                ].map((item) => (
                  <li
                    key={item}
                    className="hover:text-[#42edc5] transition-colors cursor-pointer w-fit"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6">
                Company
              </h4>
              <ul className="space-y-4 text-sm text-gray-400">
                {["Our Story", "Careers", "Blog", "Press Kit"].map((item) => (
                  <li
                    key={item}
                    className="hover:text-[#42edc5] transition-colors cursor-pointer w-fit"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <h4 className="text-white font-bold text-sm mb-2">
                Join our Newsletter
              </h4>
              <p className="text-gray-400 text-xs mb-4">
                Get the latest job updates and tech news directly.
              </p>
              <div className="relative group">
                <input
                  type="email"
                  value="babusajan1886@gmail.com"
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none cursor-default text-gray-300"
                />

                <a
                  href="mailto:babusajan1886@gmail.com"
                  className="absolute right-2 top-1.5 p-1.5 bg-[#42edc5] text-black rounded-lg hover:scale-105 transition-transform flex items-center justify-center"
                >
                  <RiMailSendLine size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col items-center justify-center gap-4">
          <p className="text-xs text-gray-500 font-medium tracking-wide">
            © {currentYear}{" "}
            <span className="text-gray-300">RadiAntiX Global</span>.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-xs text-gray-500 hover:text-[#42edc5] transition-colors"
            >
              Privacy Policy
            </a>
            <div className="w-1 h-1 bg-white/10 rounded-full"></div>
            <a
              href="#"
              className="text-xs text-gray-500 hover:text-[#42edc5] transition-colors"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
