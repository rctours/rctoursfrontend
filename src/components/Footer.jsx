import React, { useState } from 'react'; // Added useState import
import { FaFacebookF, FaInstagram, FaTwitter, FaWhatsapp, FaYoutube } from 'react-icons/fa';
import Particles from './ParticleBg';
import ScrollToTop from './ScrollToTop';
import ScrollTopButton from './ScrollTopButton';
import LeadModal from './Modal'; // Added LeadModal import (adjust path if needed)
import LeadFormWidget from './LeadForm';
import { MessageCircle, Phone } from 'lucide-react';

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);


  return (
    <div className="relative w-auto">
      {/* Particle Background */}
      <div className="absolute inset-0 -z-10 bg-primary-950">
        <Particles
          particleColors={['#dfb6b2', '#7e478aff', '#7e478aff']}
          particleCount={200}
          particleSpread={10}
          speed={0.5}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
          className="w-auto h-auto"
        />
      </div>

      {/* Footer Content */}
      <footer className="relative py-8">
        <div className="container mx-auto px-3 max-w-7xl grid grid-cols-1 md:grid-cols-4 gap-15">
          {/* About Section */}
          <div className="flex items-center space-x-4">
            <div>
              <img
                src="/RCLogo.webp"
                alt="RC Tours & Travels Logo"
                className="h-12 w-12 rounded-2xl object-contain"
              />
              <h2 className="text-2xl font-bold text-text-light mb-2">RC Tours & Travels</h2>
              <p className="text-text-light leading-relaxed max-w-md">
                Explore breathtaking destinations and create unforgettable memories with RC Tours & Travels. Your adventure begins here.
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="justify-between">
            <h3 className="text-xl font-semibold text-text-light mb-4">Quick Links</h3>
            <ul className="space-y-2 text-text-light">
              {['Home', 'Destinations', 'Packages', 'Contact'].map(link => (
                <li key={link}>
                  <a href="#" className="hover:text-text-light transition">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="items-center">
            <h3 className="text-xl font-semibold text-text-light mb-4">Contact Us</h3>
            <ul className="space-y-2 text-text-light">
              <li>Email: rctoursandtravels01@gmail.com</li>
              <li>Phone: +91 9172271464</li>
              <li>Location: Dhande niwas, new narsala road, beldar nagar, dighori - nagpur 440034</li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-xl font-semibold text-text-light mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/profile.php?id=61582877115403&mibextid=rS40aB7S9Ucbxw6v"
                className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-800 transition-colors duration-300 flex items-center justify-center"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://www.instagram.com/rccab_services_nagpur?igsh=emw4NmJ4bWczdzM1"
                className="p-3 bg-linear-to-bl from-violet-500 via-red-600 to-amber-500 text-white rounded-full hover:opacity-90 transition-opacity duration-300 flex items-center justify-center"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="p-3 bg-red-600 text-white rounded-full hover:bg-red-800 transition-colors duration-300 flex items-center justify-center"
                aria-label="YouTube"
              >
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright and Developer Credit */}
        <div className="border-t border-primary-300 mt-10 pt-6 text-center text-text-light text-sm">
          <p>&copy; {new Date().getFullYear()} RC Tours & Travels. All rights reserved.</p>
          <p className="mt-2">
            Designed by{" "}
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-50 underline font-semibold"
            >
              Majju Nexora
            </a>
          </p>
        </div>

        {/* Lead Modal Trigger Button (Inside Footer for Better Organization) */}
        {/* <div className="text-center mt-6">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition"
          >
            Get Travel Info
          </button>
        </div> */}
      </footer>

    {/* Fixed Call & WhatsApp Buttons (Right Center) */}
<div className="fixed right-4 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50">

  {/* 📞 Call Button */}
  <a
    href="tel:+919172271464"
    className="w-14 h-14 flex items-center justify-center rounded-full bg-amber-500 text-black shadow-xl hover:scale-110 hover:bg-amber-400 transition-all duration-300"
    aria-label="Call Taxi Service Nagpur"
  >
    <Phone size={24} />
  </a>

  {/* 🟢 WhatsApp Button */}
  <a
href="https://wa.me/919172271464?text=Hi%2C%20I%20want%20to%20book%20a%20taxi%20in%20Nagpur.%0A%0APickup%3A%0ADrop%3A%0ADate%20%26%20Time%3A%0ANumber%20of%20Passengers%3A"
    target="_blank"
    rel="noopener noreferrer"
    className="w-14 h-14 flex items-center justify-center rounded-full bg-green-600 text-white shadow-xl hover:scale-110 hover:bg-green-500 transition-all duration-300"
    aria-label="WhatsApp Taxi Booking Nagpur"
  >
    <FaWhatsapp size={24} />
  </a>

</div>


     <LeadFormWidget/>



      {/* Scroll-to-Top Button (Bottom Right) */}
      <div className="fixed right-3 bottom-3 z-50">
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-purple-900 text-white shadow-lg hover:scale-110 transition-all duration-300">
          <ScrollTopButton />
        </div>
      </div>

      {/* Lead Modal */}
      <LeadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Footer;
