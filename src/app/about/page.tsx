import Navbar from '@/components/Navbar';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShieldCheck,
  BadgeCheck,
  Wrench,
  PhoneCall,
  MapPin,
  Layers,
  Settings,
  Headset,
  ArrowRight
} from 'lucide-react';

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="w-full bg-white">
        {/* Hero Section */}
        <section className="relative w-full h-[45vh] min-h-[400px] flex flex-col justify-center bg-[#111]">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/About-page-img.png"
              alt="About Live View Infotech"
              fill
              className="object-cover opacity-50"
              priority
            />
            {/* Gradient Overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full pb-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-white leading-[1.1] mb-4 max-w-3xl tracking-tight">
              Built on <span className="text-[#095DA8] font-bold relative inline-block">
                Trust
                {/* Subtle highlight effect matching Axis style */}
                <span className="absolute bottom-1 left-0 w-full h-[30%] bg-[#095DA8]/20 -z-10 blur-sm"></span>
              </span>, <br className="hidden md:block" />Backed by Technology
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl font-light leading-relaxed">
              Security and safety systems designed around your site, not sold off a shelf.
            </p>
          </div>
        </section>

        {/* Diagonal Cut Section */}
        <section
          className="relative z-20 bg-white"
          style={{
            clipPath: 'polygon(0 0, 100% 5vw, 100% 100%, 0 100%)',
            marginTop: '-5vw',
            paddingTop: '12vw',
            paddingBottom: '8rem'
          }}
        >
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

            {/* We Are Live View Infotech */}
            <div className="max-w-4xl mx-auto text-center mb-32">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 tracking-tight">We Are Live View Infotech</h2>
              <div className="text-lg md:text-xl text-gray-600 leading-relaxed space-y-6">
                <p>
                  Live View Infotech is a technology partner for organizations that need dependable security and safety infrastructure. We work across CCTV surveillance, access control, fire alarm and fire fighting, and the networking backbone that keeps every system connected and running.
                </p>
                <p>
                  Our approach is simple. We design each system around the actual site, not a generic package, and we stay involved from the first survey through installation, commissioning, and ongoing support. When you call, you speak with the people doing the work, not a call centre.
                </p>
              </div>
            </div>

            {/* What We Do */}
            <div className="mb-32">
              <div className="text-center mb-16">
                <span className="text-[#095DA8] font-bold tracking-[0.15em] uppercase text-sm mb-3 block">Expertise</span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">What We Do</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-start">
                {/* Feature 1 */}
                <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-[0_20px_40px_-15px_rgba(9,93,168,0.15)] hover:border-[#095DA8]/20 transition-all duration-500 ease-out group relative overflow-hidden flex flex-col bg-white">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#095DA8]/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10 flex flex-col">
                    <div className="w-14 h-14 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#095DA8] group-hover:bg-[#095DA8] group-hover:text-white mb-6 transition-all duration-500 group-hover:-translate-y-1">
                      <ShieldCheck className="w-7 h-7 transition-transform duration-500 group-hover:scale-110" />
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 mb-4 leading-tight group-hover:text-[#095DA8] transition-colors duration-300">
                      Professional Project Execution
                    </h3>

                    <p className="text-gray-600 leading-relaxed relative z-10 transition-all duration-300 ease-out">
                      Every project starts with a <span className="box-decoration-clone transition-all duration-300 ease-out px-1.5 py-0.5 rounded border border-[#095DA8]/10 bg-[#095DA8]/5 text-gray-900 group-hover:px-2 group-hover:mx-1 group-hover:border-[#095DA8]/30 group-hover:bg-[#095DA8]/10 group-hover:text-[#095DA8] font-medium">proper site assessment</span>, not a quick quote off a phone call. We plan camera placement, access points, and fire coverage based on how your building is actually used.
                    </p>

                    <div className="mt-auto">
                      <div className="grid [grid-template-rows:1fr] lg:[grid-template-rows:0fr] lg:group-hover:[grid-template-rows:1fr] transition-all duration-300 ease-in-out">
                        <div className="overflow-hidden">
                          <div className="pt-6 mt-4 border-t border-gray-200/60 opacity-100 transform translate-y-0 lg:opacity-0 lg:group-hover:opacity-100 lg:translate-y-4 lg:group-hover:translate-y-0 transition-all duration-300 lg:delay-100">
                            <p className="text-sm font-medium text-[#095DA8] flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#095DA8] mt-1.5 flex-shrink-0" />
                              <span>Includes detailed site mapping, risk analysis, and custom infrastructure planning.</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-[0_20px_40px_-15px_rgba(9,93,168,0.15)] hover:border-[#095DA8]/20 transition-all duration-500 ease-out group relative overflow-hidden flex flex-col bg-white">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#095DA8]/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10 flex flex-col">
                    <div className="w-14 h-14 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#095DA8] group-hover:bg-[#095DA8] group-hover:text-white mb-6 transition-all duration-500 group-hover:-translate-y-1">
                      <BadgeCheck className="w-7 h-7 transition-transform duration-500 group-hover:scale-110" />
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 mb-4 leading-tight group-hover:text-[#095DA8] transition-colors duration-300">
                      Genuine, Certified Brands
                    </h3>

                    <p className="text-gray-600 leading-relaxed relative z-10 transition-all duration-300 ease-out">
                      We work with <span className="box-decoration-clone transition-all duration-300 ease-out px-1.5 py-0.5 rounded border border-[#095DA8]/10 bg-[#095DA8]/5 text-gray-900 group-hover:px-2 group-hover:mx-1 group-hover:border-[#095DA8]/30 group-hover:bg-[#095DA8]/10 group-hover:text-[#095DA8] font-medium">established manufacturers</span> across CCTV, access control, and fire safety equipment, so what gets installed is built to last and easy to service down the line.
                    </p>

                    <div className="mt-auto">
                      <div className="grid [grid-template-rows:1fr] lg:[grid-template-rows:0fr] lg:group-hover:[grid-template-rows:1fr] transition-all duration-300 ease-in-out">
                        <div className="overflow-hidden">
                          <div className="pt-6 mt-4 border-t border-gray-200/60 opacity-100 transform translate-y-0 lg:opacity-0 lg:group-hover:opacity-100 lg:translate-y-4 lg:group-hover:translate-y-0 transition-all duration-300 lg:delay-100">
                            <p className="text-sm font-medium text-[#095DA8] flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#095DA8] mt-1.5 flex-shrink-0" />
                              <span>Includes verified equipment sourcing, standard manufacturer warranty coverage, and spare-part availability for future servicing.</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-[0_20px_40px_-15px_rgba(9,93,168,0.15)] hover:border-[#095DA8]/20 transition-all duration-500 ease-out group relative overflow-hidden flex flex-col bg-white">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#095DA8]/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10 flex flex-col">
                    <div className="w-14 h-14 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#095DA8] group-hover:bg-[#095DA8] group-hover:text-white mb-6 transition-all duration-500 group-hover:-translate-y-1">
                      <Wrench className="w-7 h-7 transition-transform duration-500 group-hover:scale-110" />
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 mb-4 leading-tight group-hover:text-[#095DA8] transition-colors duration-300">
                      Supply, Installation & Commissioning
                    </h3>

                    <p className="text-gray-600 leading-relaxed relative z-10 transition-all duration-300 ease-out">
                      From procurement through final testing, we <span className="box-decoration-clone transition-all duration-300 ease-out px-1.5 py-0.5 rounded border border-[#095DA8]/10 bg-[#095DA8]/5 text-gray-900 group-hover:px-2 group-hover:mx-1 group-hover:border-[#095DA8]/30 group-hover:bg-[#095DA8]/10 group-hover:text-[#095DA8] font-medium">handle the full rollout ourselves</span> rather than passing work between subcontractors.
                    </p>

                    <div className="mt-auto">
                      <div className="grid [grid-template-rows:1fr] lg:[grid-template-rows:0fr] lg:group-hover:[grid-template-rows:1fr] transition-all duration-300 ease-in-out">
                        <div className="overflow-hidden">
                          <div className="pt-6 mt-4 border-t border-gray-200/60 opacity-100 transform translate-y-0 lg:opacity-0 lg:group-hover:opacity-100 lg:translate-y-4 lg:group-hover:translate-y-0 transition-all duration-300 lg:delay-100">
                            <p className="text-sm font-medium text-[#095DA8] flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#095DA8] mt-1.5 flex-shrink-0" />
                              <span>Includes equipment procurement, on-site installation, complete system testing, and final commissioning sign-off before handover.</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Feature 4 */}
                <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-[0_20px_40px_-15px_rgba(9,93,168,0.15)] hover:border-[#095DA8]/20 transition-all duration-500 ease-out group relative overflow-hidden flex flex-col bg-white">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#095DA8]/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10 flex flex-col">
                    <div className="w-14 h-14 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#095DA8] group-hover:bg-[#095DA8] group-hover:text-white mb-6 transition-all duration-500 group-hover:-translate-y-1">
                      <PhoneCall className="w-7 h-7 transition-transform duration-500 group-hover:scale-110" />
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 mb-4 leading-tight group-hover:text-[#095DA8] transition-colors duration-300">
                      Technical Support & AMC
                    </h3>

                    <p className="text-gray-600 leading-relaxed relative z-10 transition-all duration-300 ease-out">
                      Installation is the start, not the finish. We offer ongoing maintenance and <span className="box-decoration-clone transition-all duration-300 ease-out px-1.5 py-0.5 rounded border border-[#095DA8]/10 bg-[#095DA8]/5 text-gray-900 group-hover:px-2 group-hover:mx-1 group-hover:border-[#095DA8]/30 group-hover:bg-[#095DA8]/10 group-hover:text-[#095DA8] font-medium">annual support contracts</span> so systems keep working long after handover.
                    </p>

                    <div className="mt-auto">
                      <div className="grid [grid-template-rows:1fr] lg:[grid-template-rows:0fr] lg:group-hover:[grid-template-rows:1fr] transition-all duration-300 ease-in-out">
                        <div className="overflow-hidden">
                          <div className="pt-6 mt-4 border-t border-gray-200/60 opacity-100 transform translate-y-0 lg:opacity-0 lg:group-hover:opacity-100 lg:translate-y-4 lg:group-hover:translate-y-0 transition-all duration-300 lg:delay-100">
                            <p className="text-sm font-medium text-[#095DA8] flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#095DA8] mt-1.5 flex-shrink-0" />
                              <span>Includes scheduled maintenance visits, remote troubleshooting, and priority response for system faults.</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* How We Work */}
            <div className="mb-32">
              <div className="bg-[#09152e] rounded-[2.5rem] p-10 md:p-16 lg:p-20 text-white relative overflow-hidden shadow-2xl">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                  <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid-pattern)" />
                  </svg>
                </div>

                <div className="relative z-10">
                  <div className="text-center mb-16">
                    <span className="text-[#3b82f6] font-bold tracking-[0.15em] uppercase text-sm mb-3 block">Process</span>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">How We Work</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 lg:gap-8 relative">
                    {/* Connecting line for desktop */}
                    <div className="hidden md:block absolute top-[28px] left-[10%] right-[10%] h-[2px] bg-white/20 z-0"></div>

                    {/* Step 1 */}
                    <div className="relative z-10 flex flex-col items-center text-center">
                      <div className="w-14 h-14 rounded-full bg-[#095DA8] border-4 border-[#09152e] flex items-center justify-center mb-6 text-white font-bold text-xl shadow-lg">1</div>
                      <h3 className="text-xl font-semibold mb-3">Site Survey & Assessment</h3>
                      <p className="text-gray-300 text-sm leading-relaxed">We visit your location and map out actual coverage needs, risk points, and existing infrastructure.</p>
                    </div>

                    {/* Step 2 */}
                    <div className="relative z-10 flex flex-col items-center text-center mt-8 md:mt-0">
                      <div className="w-14 h-14 rounded-full bg-[#095DA8] border-4 border-[#09152e] flex items-center justify-center mb-6 text-white font-bold text-xl shadow-lg">2</div>
                      <h3 className="text-xl font-semibold mb-3">System Design</h3>
                      <p className="text-gray-300 text-sm leading-relaxed">A tailored plan for cameras, access points, fire systems, and networking, sized to your site and budget.</p>
                    </div>

                    {/* Step 3 */}
                    <div className="relative z-10 flex flex-col items-center text-center mt-8 md:mt-0">
                      <div className="w-14 h-14 rounded-full bg-[#095DA8] border-4 border-[#09152e] flex items-center justify-center mb-6 text-white font-bold text-xl shadow-lg">3</div>
                      <h3 className="text-xl font-semibold mb-3">Installation & Commissioning</h3>
                      <p className="text-gray-300 text-sm leading-relaxed">Full setup, testing, and handover, done by our own experienced team.</p>
                    </div>

                    {/* Step 4 */}
                    <div className="relative z-10 flex flex-col items-center text-center mt-8 md:mt-0">
                      <div className="w-14 h-14 rounded-full bg-[#095DA8] border-4 border-[#09152e] flex items-center justify-center mb-6 text-white font-bold text-xl shadow-lg">4</div>
                      <h3 className="text-xl font-semibold mb-3">Ongoing Support & AMC</h3>
                      <p className="text-gray-300 text-sm leading-relaxed">Maintenance plans and direct technical support after the system is live.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Who We Serve & A Team You Can Actually Reach */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-24 items-center">
              {/* Left Side */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 tracking-tight">Who We Serve</h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Our work spans commercial buildings, institutions, industrial sites, and public infrastructure. We understand that every sector has unique compliance and operational requirements.
                </p>
                <Link
                  href="/industries"
                  className="inline-flex items-center gap-2 text-[#095DA8] font-semibold hover:text-[#074883] transition-colors group"
                >
                  See the full list of industries we serve
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Right Side */}
              <div className="bg-gray-50 border-l-4 border-[#095DA8] p-8 md:p-12 rounded-r-2xl shadow-sm">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">A Team You Can Actually Reach</h2>
                <p className="text-lg text-gray-600 italic leading-relaxed mb-6">
                  "Every project is overseen personally by our founder, so you're never stuck waiting on a support queue."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#095DA8]/10 rounded-full flex items-center justify-center text-[#095DA8]">
                    <span className="font-bold">RD</span> {/* Placeholder initials */}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Rahul Deshmukh</p> {/* Placeholder name, change as needed */}
                    <p className="text-sm text-gray-500">Founder, Live View Infotech</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="text-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-[#095DA8] hover:bg-[#074883] text-white rounded-full text-lg font-semibold transition-all duration-300 shadow-[0_8px_20px_rgba(9,93,168,0.25)] hover:shadow-[0_12px_25px_rgba(9,93,168,0.35)] hover:-translate-y-1"
              >
                Get a Free Quote
              </Link>
            </div>

          </div>
        </section>
      </main>
    </>
  );
}
