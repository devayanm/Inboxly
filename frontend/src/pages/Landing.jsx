import React from 'react';
import Footer from '../components/Footer';
import { Moon, Sun, Check, Star, MessageSquare, Shield, Zap, Settings, Globe, Users, Github, Twitter, Mail } from 'lucide-react';

import { Menu, X } from "lucide-react";
import { useTheme } from '../App.jsx'; // Import the theme hook
import Navbar from '../components/Navbar.jsx';
import { useNavigate } from 'react-router-dom';
// import banner from "../assets/banner.jpg"


import banner from './banner.jpg';
const IconWrapper = ({ children, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={`w-6 h-6 ${className}`}
  >
    {children}
  </svg>
);

// SVG Icon Components
const InboxlyLogo = ({ className }) => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M14 0C6.268 0 0 6.268 0 14C0 21.732 6.268 28 14 28C21.732 28 28 21.732 28 14C28 6.268 21.732 0 14 0ZM21.238 8.792L14.448 19.642C14.21 19.994 13.79 19.994 13.552 19.642L6.762 8.792C6.562 8.505 6.79 8.05 7.14 8.05H8.484C8.75 8.05 9.002 8.218 9.118 8.47L14 18.004L18.882 8.47C18.998 8.218 19.25 8.05 19.516 8.05H20.86C21.21 8.05 21.438 8.505 21.238 8.792Z" fill="url(#logo-gradient)" />
    <defs>
      <linearGradient id="logo-gradient" x1="14" y1="0" x2="14" y2="28" gradientUnits="userSpaceOnUse">
        <stop stopColor="#A57BFF" />
        <stop offset="1" stopColor="#8C52FF" />
      </linearGradient>
    </defs>
  </svg>
);

const CheckIcon = () => (
  <Check className="text-[#8C52FF] w-5 h-5 mr-3 flex-shrink-0 group-hover:scale-110 group-hover:text-[#A57BFF] transition-all duration-300" />
);

const StarIcon = ({ filled = true }) => (
  <Star className={`w-5 h-5 ${filled ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'}`} />
);

// SocialIcon component will be defined inside LandingPage component

// Main Landing Page Component
const LandingPage = () => {
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = React.useState(false);

  // SocialIcon component with access to isDark
  const SocialIcon = ({ children }) => (
    <a href="#" className={`${isDark ? 'text-slate-500 hover:text-white' : 'text-slate-600 hover:text-slate-900'} transition-colors cursor-pointer`}>
      {children}
    </a>
  );
  const features = {
    messaging: [
      { name: "Real-time Messaging" },
      { name: "Push Notifications" },
      { name: "Message Threads" },
      { name: "Typing Indicators" },
      { name: "Online Presence" },
    ],
    management: [
      { name: "Custom Roles & Permissions" },
      { name: "Moderation Tools" },
      { name: "User & Group Management" },
      { name: "Audit Logs" },
      { name: "SSO & 2FA" },
    ],
    customization: [
      { name: "Custom Themes & Branding" },
      { name: "UI Components Library" },
      { name: "Webhooks & Events" },
      { name: "Custom Data Payloads" },
      { name: "Serverless Functions" },
    ],
    integrations: [
      { name: "REST & GraphQL APIs" },
      { name: "Slack & Discord" },
      { name: "Zendesk & Intercom" },
      { name: "Segment & Mixpanel" },
      { name: "Zapier & Make" },
    ],
    security: [
      { name: "End-to-End Encryption" },
      { name: "SOC 2 Type II Certified" },
      { name: "GDPR & HIPAA Compliant" },
      { name: "Data Residency Options" },
      { name: "99.99% Uptime SLA" },
    ],
    scalability: [
      { name: "Auto-scaling Infrastructure" },
      { name: "Global Edge Network" },
      { name: "Dedicated Clusters" },
      { name: "Low-latency Media" },
      { name: "Global CDN" },
    ],
  };

  const testimonials = [
    {
      name: "Alex Thompson",
      title: "CTO at Innovate Inc.",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      review: "Inboxly has revolutionized our internal communication. The real-time messaging is incredibly fast and reliable. The developer-friendly API made integration a breeze. Highly recommended!",
    },
    {
      name: "Samantha Carter",
      title: "Product Manager at TechSolutions",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      review: "We chose Inboxly for its robust feature set and scalability. The ability to customize the UI to match our brand was a huge plus. Our users love the new chat experience.",
    },
    {
      name: "David Chen",
      title: "Lead Developer at AppCrafters",
      avatar: "https://randomuser.me/api/portraits/men/56.jpg",
      review: "The documentation is top-notch, and the support team is very responsive. We were able to build our proof-of-concept in just a few days. Inboxly just works.",
    },
  ];

  //Pricing Plans
  const pricingPlans = [
    {
      plan: "Free",
      descriptions: "Perfect for individuals and small projects just getting started.",
      price: "$ 10.00",
      discount: "Free",
      discountedPrice: "$ 0.00 ",
      features: [
        "Real-time messaging with typing indicators",
        "Basic push notifications",
        "Up to 50 active users",
        "Access to community support",
        "Core SDK & UI components",
      ],
      isPopular: false,
    },
    {
      plan: "Premium",
      descriptions: "Best for growing teams that need reliability, security, and flexibility.",
      price: "$ 12.00",
      discount: "SAVE 30%",
      discountedPrice: "$ 9.40",
      features: [
        "Everything in Free, plus",
        "Unlimited users & message history",
        "Advanced moderation tools & audit logs",
        "Custom themes and branding",
        "REST & GraphQL API access",
        "SSO & 2FA authentication",
        "Priority email support",

      ],
      isPopular: true,
    },
    {
      plan: "Business",
      descriptions: "Scalable, secure, and customizable for enterprise needs.",
      price: "$ 20.00",
      discount: "SAVE 20%",
      discountedPrice: "$ 16.00",
      features: [
        "Everything in Premium, plus",
        "Dedicated infrastructure & global edge network",
        "99.99% uptime SLA",
        "End-to-end encryption & compliance (SOC 2, GDPR, HIPAA)",
        "Data residency options",
        "Custom integrations (Slack, Zendesk, Segment, etc.)",
        "Dedicated success manager & 24/7 support",
      ],
      isPopular: false,
    }
  ];

  const CodeSnippet = ({ title, language, children }) => (
    <div className={`${isDark ? 'bg-[#171C2A] border-slate-700' : 'bg-slate-100 border-slate-300'} border rounded-lg overflow-hidden`}>
      <div className={`flex justify-between items-center px-4 py-2 ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-200/50 border-slate-300'} border-b`}>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <p className="text-sm text-slate-400">{title}</p>
        <button className="text-slate-400 hover:text-white">
          <IconWrapper className="w-4 h-4">
            <path d="M16.5 8.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v8.25A2.25 2.25 0 006 16.5h2.25m8.25-8.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-7.5A2.25 2.25 0 018.25 18v-1.5m8.25-8.25h-6.75a.75.75 0 00-.75.75v6.75a.75.75 0 00.75.75h6.75a.75.75 0 00.75-.75v-6.75a.75.75 0 00-.75-.75z" />
          </IconWrapper>
        </button>
      </div>
      <pre className="p-4 text-sm overflow-x-auto">
        <code className={`language-${language}`}>{children}</code>
      </pre>
    </div>
  );

  return (
    <div className={`${isDark ? 'bg-[#0B0F19] text-slate-300' : 'bg-white text-slate-700'} font-poppins leading-relaxed transition-colors duration-300`}>

      {/* Header */}
      <Navbar />
      
      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section className="py-20 md:py-32 text-center">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h1 className={`text-5xl md:text-7xl font-bold ${isDark ? 'text-white' : 'text-slate-900'} mb-6`}>
                Inboxly is a Real-Time Messaging Inbox
              </h1>
              <p className={`text-lg md:text-xl ${isDark ? 'text-slate-400' : 'text-slate-600'} mb-10`}>
                A new-gen suite for chat and messaging that has been created with developers and businesses in mind, ready for any scale.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 px-4">
                <button
                  onClick={() => navigate('/auth')}
                  className="bg-gradient-to-r from-[#A57BFF] to-[#8C52FF] text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity w-full sm:w-auto cursor-pointer"
                >
                  Get Started for Free
                </button>
                <button
                  onClick={() => navigate('/contact')}
                  className={`${isDark ? 'bg-slate-800 text-white border-slate-700 hover:bg-slate-700' : 'bg-slate-200 text-slate-900 border-slate-300 hover:bg-slate-300'} font-semibold py-3 px-6 rounded-lg border transition-colors w-full sm:w-auto cursor-pointer`}
                >
                  Talk to Sales
                </button>
              </div>
            </div>
            <div className="mt-16">
              {/* Placeholder for the product image. Replace with your actual image component or <img> tag. */}
              <div className={`max-w-5xl mx-auto ${isDark ? 'bg-[#171C2A]/50 border-slate-700' : 'bg-slate-100 border-slate-300'} border rounded-xl shadow-2xl shadow-[#8C52FF]/10 p-2`}>
                <div className="bg-cover bg-center h-58 md:h-96 rounded-lg" style={{ backgroundImage: `url(${banner})` }}>
                  {/* The image is set via background for better control. You can use an <img> tag too. */}
                </div>
              </div>
            </div>
          </div>
        </section>

        <hr className={`${isDark ? 'border-slate-800' : 'border-slate-200'}`} />

        {/* Features Section */}
        <section id='features' className={`py-20 ${isDark ? 'bg-gradient-to-b from-transparent to-[#171C2A]/20' : 'bg-gradient-to-b from-transparent to-slate-50/50'}`}>
          <div className="container mx-auto px-4 relative">
            {/* Subtle border around the section */}
            <div className={`absolute inset-0 ${isDark ? 'border border-slate-800/20' : 'border border-slate-200/30'} rounded-3xl -z-10`}></div>
            <div className="text-center mb-16">
              <h2 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Everything you need for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A57BFF] to-[#8C52FF]">modern messaging</span>
              </h2>
              <p className={`mt-4 max-w-2xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                We've built a suite of tools for robust, real-time communication. All the features you need, none of the bloat.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative group">
              {/* Decorative background elements */}
              <div className={`absolute inset-0 ${isDark ? 'bg-[#171C2A]/5' : 'bg-slate-100/30'} rounded-3xl blur-3xl -z-10 group-hover:bg-opacity-20 transition-all duration-500`}></div>
              {Object.entries(features).map(([category, items]) => (
                <div
                  key={category}
                  className={`${isDark ? 'bg-[#171C2A] border-slate-600' : 'bg-white border-slate-300'} border rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group`}
                >
                  <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'} mb-4 capitalize text-lg group-hover:text-[#8C52FF] transition-colors duration-300 flex items-center gap-2`}>
                    {category === 'messaging' && <MessageSquare className="w-5 h-5" />}
                    {category === 'management' && <Settings className="w-5 h-5" />}
                    {category === 'customization' && <Zap className="w-5 h-5" />}
                    {category === 'integrations' && <Globe className="w-5 h-5" />}
                    {category === 'security' && <Shield className="w-5 h-5" />}
                    {category === 'scalability' && <Users className="w-5 h-5" />}
                    {category.replace(/([A-Z])/g, ' $1')}
                  </h3>
                  <ul className="space-y-3">
                    {items.map((item, index) => (
                      <li key={index} className={`flex items-center ${isDark ? 'text-slate-200' : 'text-slate-800'} transition-colors duration-300`}>
                        <CheckIcon />
                        <span className="group-hover:translate-x-1 transition-transform duration-300 font-medium">{item.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quote Section */}
        <section className={`py-20 ${isDark ? 'bg-[#171C2A]/30' : 'bg-slate-50'}`}>
          <div className="container mx-auto px-4 text-center">
            <InboxlyLogo className="mx-auto mb-6 h-12 w-12" />
            <blockquote className="max-w-4xl mx-auto">
              <p className={`text-2xl md:text-3xl font-medium ${isDark ? 'text-white' : 'text-slate-900'} italic`}>
                “Inboxly is modern, secure, and extensible—a messaging inbox you can rely on, and simply connect with any channel.”
              </p>
              <footer className="mt-6">
                <p className={`${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Ryan Brooks, CEO and Co-founder of Inboxly</p>
              </footer>
            </blockquote>
          </div>
        </section>

        {/* Developer Section */}
        <section id='docs' className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Built for Developers</h2>
              <p className={`mt-4 max-w-2xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Integrate robust, real-time messaging into your applications. Our APIs, SDKs, and webhooks make it easy.
              </p>
            </div>
            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              <CodeSnippet title="React hook / Realtime.jsx" language="jsx">
                <span className="text-purple-400">import</span> {'{ useChannel }'} <span className="text-purple-400">from</span> <span className="text-green-400">'@inboxly/react'</span>;{'\n\n'}
                <span className="text-purple-400">export const</span> <span className="text-yellow-300">Chat</span> = ({'{ channelName }'}) =&gt; {'{'}{'\n'}
                {'  '}<span className="text-purple-400">const</span> [state, channel] = <span className="text-yellow-300">useChannel</span>(channelName);{'\n\n'}
                {'  '}<span className="text-gray-500">// Display messages from the channel</span>{'\n'}
                {'  '}<span className="text-purple-400">return</span> ({'\n'}
                {'    '}<span className="text-blue-400">&lt;&gt;</span>{'\n'}
                {'      '}{'{'}state.messages.map((<span className="text-orange-400">msg</span>) =&gt; {'\n'}
                {'        '}&lt;div key={'{msg.id}'}&gt;{'{msg.text}'}&lt;/div&gt;{'\n'}
                {'      '}){'}'}{'\n'}
                {'    '}<span className="text-blue-400">&lt;/&gt;</span>{'\n'}
                {'  '});{'\n'}
                {'}'};
              </CodeSnippet>
              <CodeSnippet title="Webhook / Payload.json" language="json">
                {'{'}{'\n'}
                {'  '}<span className="text-blue-400">"type"</span>: <span className="text-green-400">"message.new"</span>,{'\n'}
                {'  '}<span className="text-blue-400">"cid"</span>: <span className="text-green-400">"messaging:123"</span>,{'\n'}
                {'  '}<span className="text-blue-400">"message"</span>: {'{'}{'\n'}
                {'    '}<span className="text-blue-400">"id"</span>: <span className="text-green-400">"abc-123"</span>,{'\n'}
                {'    '}<span className="text-blue-400">"text"</span>: <span className="text-green-400">"Hello, World!"</span>,{'\n'}
                {'    '}<span className="text-blue-400">"user"</span>: {'{'}{'\n'}
                {'      '}<span className="text-blue-400">"id"</span>: <span className="text-green-400">"user-1"</span>,{'\n'}
                {'      '}<span className="text-blue-400">"name"</span>: <span className="text-green-400">"John Doe"</span>{'\n'}
                {'    '}{'}'}{'\n'}
                {'  '}{'}'}{'\n'}
                {'}'}
              </CodeSnippet>
            </div>
            <CodeSnippet title="RESTful API / Messages.sh" language="shell">
              <span className="text-green-400">curl</span> -X POST \<br />
              {'  '}<span className="text-blue-400">https://api.inboxly.com/v1/channels/general/message</span> \<br />
              {'  '}-H <span className="text-green-400">'Content-Type: application/json'</span> \<br />
              {'  '}-H <span className="text-green-400">'Authorization: Bearer YOUR_API_KEY'</span> \<br />
              {'  '}-d '{'{'}<br />
              {'    '}"text": "Your first message via the API!",<br />
              {'    '}"user_id": "system"<br />
              {'  '}{'}'}'
            </CodeSnippet>
          </div>
        </section>

        <hr className={`${isDark ? 'border-slate-800' : 'border-slate-200'}`} />

        {/* Testimonials Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Trusted by teams worldwide</h2>
              <p className={`mt-4 max-w-2xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Thousands of product teams from startups to Fortune 500 companies build their messaging with Inboxly.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className={`${isDark ? 'bg-[#171C2A] border-slate-800' : 'bg-white border-slate-200'} border rounded-lg p-6 shadow-lg`}>
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
                  </div>
                  <p className={`${isDark ? 'text-slate-300' : 'text-slate-700'} mb-6`}>"{testimonial.review}"</p>
                  <div className="flex items-center gap-4">
                    <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full" />
                    <div>
                      <p className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>{testimonial.name}</p>
                      <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{testimonial.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr className={`${isDark ? 'border-slate-800' : 'border-slate-200'}`} />


        {/* Pricing Section */}
        <section id="pricing" className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Explore Plans</h2>
            <div className={`mt-4 max-w-2xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'} mb-20`}>
              <p>From Startups to Enterprises, our pricing is built to scale with your growth.</p>
              <p>Start for free, upgrade when you need more features,</p>
              <p>and never pay for what you don’t use.</p>
            </div>
            {/* Pricing Plan-Card */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pricingPlans.map((plans, idx) => {
                return (
                  <div key={idx}
                    className={` group relative flex flex-col transition-transform duration-300 ease-in-out hover:scale-102
                      ${isDark ? 'bg-[#171C2A] border-slate-800' : 'bg-white border-slate-800 shadow-grey-500'}
                      ${plans.isPopular ? "border-3 border-yellow-200" : "border-grey-500 shadow-white-100"} hover:shadow-2xl rounded-lg p-6 shadow-lg`}>

                    <div className='flex-1'>
                      <h1 className={`text-xl font-bold group-hover:scale-105 group-hover:text-[#8C52FF] ${isDark ? 'text-[#ffffff]' : 'text-[black]'}`}>{plans.plan}</h1>
                      <p className={`text-md p-6 ${isDark ? 'text-[#ffffff]' : 'text-[black]'}`}>{plans.descriptions}</p>

                      {plans.isPopular && (
                        <div className='absolute top-0 -translate-y-1/2 rounded-full px-2 py-2 bg-yellow-500 text-black text-xs'>Most Popular</div>
                      )
                      }

                      <div className='space-y-4'>

                        <div className='flex items-center gap-4'>
                          <span className='text-xl text-grey-500 line-through'>{plans.price}</span>
                          <span className='text-sm font-semibold text-slate-700 bg-[#d5dfff] px-4 py-1 rounded-full'>{plans.discount}</span>
                        </div>

                        <div>
                          <h1 className='text-xl text-slate-800 bg-slate-200 left-0 p-4 rounded-md:border-2 border-grey-300 '>
                            <span className='text-3xl font-bold'>{plans.discountedPrice}</span> /month
                          </h1>
                          <ul className='list-none m-5 text-sm text-grey-600 space-y-2 text-left'>
                            {plans.features.map((feature, id) => (
                              <li className='flex items-center gap-2' key={id}>
                                <CheckIcon /><p>{feature}</p>
                              </li>
                            ))}
                          </ul>
                        </div>

                      </div>

                    </div>

                    <button className="mt-auto text-lg w-full bg-gradient-to-r from-[#A57BFF] to-[#8C52FF] font-semibold p-3 text-white rounded-md cursor-pointer 
  transform transition-transform duration-300 hover:-translate-y-1">
                      Choose plan
                    </button>

                  </div>
                );
              })}
            </div>
          </div>
        </section>


        <hr className={`${isDark ? 'border-slate-800' : 'border-slate-200'}`} />


        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Start Building with Inboxly Today</h2>
            <p className={`mt-4 max-w-2xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'} mb-8`}>
              Create an account and start integrating real-time messaging in minutes.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 px-4">
              <button
                onClick={() => navigate('/auth')}
                className="bg-gradient-to-r from-[#A57BFF] to-[#8C52FF] text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity w-full sm:w-auto cursor-pointer"
              >
                Get Started for Free
              </button>
              <button
                onClick={() => navigate('/docs')}
                className={`${isDark ? 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700' : 'bg-slate-200 text-slate-900 border-slate-300 hover:bg-slate-300'} font-semibold py-3 px-6 rounded-lg border transition-colors w-full sm:w-auto cursor-pointer`}
              >
                View Documentation
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;