import React, { useState } from "react";
import { Mail, Phone, MapPin, Instagram } from "lucide-react";
import { api } from "../lib/api";
import { toast } from "sonner";
import { useAuth } from "../lib/AuthContext";

export default function Footer() {
  const { user, token } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);

  const committeeMembers = [
    { name: "John Doe", position: "President", photo: "https://picsum.photos/seed/member1/100/100" },
    { name: "Jane Smith", position: "Secretary", photo: "https://picsum.photos/seed/member2/100/100" },
    { name: "Mike Johnson", position: "Treasurer", photo: "https://picsum.photos/seed/member3/100/100" },
  ];

  const pastEvents = [
    "https://raw.githubusercontent.com/shrinivaskumari/bhimjayanti/main/past/6.jpeg",
    "https://raw.githubusercontent.com/shrinivaskumari/bhimjayanti/main/past/8.jpeg",
    "https://raw.githubusercontent.com/shrinivaskumari/bhimjayanti/main/past/WhatsApp%20Image%202026-03-16%20at%2011.02.24%20AM.jpeg",
    "https://raw.githubusercontent.com/shrinivaskumari/bhimjayanti/main/past/WhatsApp%20Image%202026-03-16%20at%2011.02.25%20AM%20(1).jpeg",
    "https://raw.githubusercontent.com/shrinivaskumari/bhimjayanti/main/past/WhatsApp%20Image%202026-03-16%20at%2011.02.27%20AM.jpeg",
    "https://raw.githubusercontent.com/shrinivaskumari/bhimjayanti/main/past/WhatsApp%20Image%202026-03-16%20at%2011.02.30%20AM.jpeg",
    "https://raw.githubusercontent.com/shrinivaskumari/bhimjayanti/main/past/WhatsApp%20Image%202026-03-16%20at%2011.02.31%20AM.jpeg",
    "https://raw.githubusercontent.com/shrinivaskumari/bhimjayanti/main/past/WhatsApp%20Image%202026-03-16%20at%2011.02.32%20AM%20(1).jpeg",
    "https://raw.githubusercontent.com/shrinivaskumari/bhimjayanti/main/past/WhatsApp%20Image%202026-03-16%20at%2011.02.35%20AM%20(1).jpeg",
    "https://raw.githubusercontent.com/shrinivaskumari/bhimjayanti/main/past/WhatsApp%20Image%202026-03-16%20at%2011.02.59%20AM.jpeg",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.mobile || !formData.message) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      await api.post("/messages", formData, token || undefined);
      toast.success("Message sent successfully!");
      setFormData({ name: "", mobile: "", message: "" });
    } catch (error: any) {
      toast.error(error.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-gray-dark text-cream pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Contact Section */}
          <div>
            <h3 className="text-xl font-bold mb-6 border-b border-gold/20 pb-2">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-3 text-gold" />
                <span className="text-gold/80">Samajkalyan Boys Hostel, Vishrantwadi Campus, Pune, 411015</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-gold" />
                <span className="text-gold/80">+91 8830957542</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-gold" />
                <span className="text-gold/80">shrinivaskumari03@gmail.com</span>
              </div>
            </div>
            
            <div className="mt-8">
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <Instagram className="w-6 h-6 text-gold hover:text-cream cursor-pointer transition" />
              </div>
            </div>
          </div>

          {/* Committee Members */}
          <div>
            <h3 className="text-xl font-bold mb-6 border-b border-gold/20 pb-2">Committee Members</h3>
            <div className="space-y-6">
              {committeeMembers.map((member) => (
                <div key={member.name} className="flex items-center">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover border border-gold/20"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <p className="font-semibold">{member.name}</p>
                    <p className="text-sm text-gold/70">{member.position}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Past Events Gallery */}
          <div>
            <h3 className="text-xl font-bold mb-6 border-b border-gold/20 pb-2">Past Year Events</h3>
            <div className="grid grid-cols-2 gap-2">
              {pastEvents.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Past event ${idx + 1}`}
                  className="w-full h-24 object-cover rounded hover:opacity-75 transition cursor-pointer border border-gold/10"
                  referrerPolicy="no-referrer"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-charcoal p-8 rounded-lg mb-12 border border-gold/10">
          <h3 className="text-xl font-bold mb-6">Send us a Message</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-gray-dark border-none rounded-md px-4 py-2 focus:ring-2 focus:ring-gold text-cream placeholder-gold/50"
            />
            <input
              type="text"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
              className="bg-gray-dark border-none rounded-md px-4 py-2 focus:ring-2 focus:ring-gold text-cream placeholder-gold/50"
            />
            <textarea
              placeholder="Your Message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="md:col-span-2 bg-gray-dark border-none rounded-md px-4 py-2 focus:ring-2 focus:ring-gold text-cream h-24 placeholder-gold/50"
            ></textarea>
            <div className="md:col-span-2 flex justify-end">
              <button 
                type="submit"
                disabled={loading}
                className="bg-cream hover:bg-gold text-charcoal hover:text-white font-bold py-2 px-8 rounded-md transition disabled:opacity-50 min-w-[200px]"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
        </div>

        <div className="text-center text-gold/50 text-sm border-t border-gold/10 pt-8">
          &copy; {new Date().getFullYear()} Bhim Jayanti Event Management. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
