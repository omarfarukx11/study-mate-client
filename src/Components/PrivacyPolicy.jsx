import React from 'react';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
    const sections = [
        {
            title: "1. Information We Collect",
            content: "To help you find the perfect study mate, we collect information you provide directly to us, such as your name, email address, academic interests, skill levels, and profile pictures."
        },
        {
            title: "2. How We Use Your Information",
            content: "We use your information to match you with compatible study partners, personalize your experience, and facilitate communication between you and other members of the community."
        },
        {
            title: "3. Data Sharing & Visibility",
            content: "Your profile information (skills, subjects, and rating) is visible to other registered users to help them decide if you are a good match. We do not sell your personal data to third parties."
        },
        {
            title: "4. Cookies & Tracking",
            content: "StudyMate uses cookies to keep you logged in and to analyze our website traffic. You can manage cookie preferences through your browser settings."
        },
        {
            title: "5. Data Security",
            content: "We implement industry-standard security measures to protect your information. However, no method of transmission over the internet is 100% secure, so we cannot guarantee absolute security."
        }
    ];

    return (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.5 }}
            className="w-full bg-secondary min-h-screen py-10 px-6 md:px-20 text-neutral-content"
        >
            <div className="max-w-4xl mx-auto bg-base-100 p-8 md:p-12 rounded-lg shadow-2xl border border-primary/10">
                <header className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Privacy Policy</h1>
                    <p className="text-sm opacity-60">Last Updated: January 2026</p>
                </header>

                <div className="space-y-8">
                    {sections.map((section, index) => (
                        <motion.section 
                            key={index}
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <h2 className="text-2xl font-semibold text-primary mb-3">{section.title}</h2>
                            <p className="leading-relaxed opacity-80 text-lg">
                                {section.content}
                            </p>
                        </motion.section>
                    ))}
                </div>

                <div className="mt-12 pt-8 border-t border-primary/20">
                    <h2 className="text-2xl font-semibold text-primary mb-3">Contact Us</h2>
                    <p className="opacity-80">
                        If you have any questions about this Privacy Policy, please contact our support team at:
                        <br />
                        <span className="font-bold text-primary">privacy@studymate.com</span>
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default PrivacyPolicy;