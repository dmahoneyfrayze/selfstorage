'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

const faqs = [
    {
        question: "How does the autonomous access work?",
        answer: "Once you book a unit, you'll receive a digital access code. This code allows you to enter the facility gate and unlock your specific unit using our secure keypad system, 24/7."
    },
    {
        question: "Are the units climate controlled?",
        answer: "Yes, our facility offers climate-controlled units designed to protect your sensitive items from extreme temperature fluctuations and humidity, perfect for electronics, furniture, and archives."
    },
    {
        question: "What storage sizes are available?",
        answer: "We offer a variety of sizes to fit your needs, from small 5x10 units for personal items to large 10x30 units suitable for vehicle storage or moving a whole house. Check our 'Units' page for real-time availability."
    },
    {
        question: "Is there a minimum rental contract?",
        answer: "Our rentals are month-to-month flexibility. You are not locked into a long-term contract, giving you the freedom to move out whenever you need."
    }
]

export default function FAQPage() {
    return (
        <div style={{ paddingTop: '120px', paddingBottom: '80px', minHeight: '100vh' }}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{ maxWidth: '800px', margin: '0 auto' }}
                >
                    <h1 style={{ marginBottom: '24px', textAlign: 'center', color: 'var(--deep-navy)' }}>Frequently Asked Questions</h1>
                    <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '60px', fontSize: '1.25rem' }}>
                        Everything you need to know about Gordon Self Storage.
                    </p>

                    <div style={{ display: 'grid', gap: '24px' }}>
                        {faqs.map((faq, index) => (
                            <FAQItem key={index} question={faq.question} answer={faq.answer} delay={index * 0.1} />
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

function FAQItem({ question, answer, delay }: { question: string, answer: string, delay: number }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            className="glass-card"
            style={{ borderRadius: '16px', overflow: 'hidden', cursor: 'pointer' }}
            onClick={() => setIsOpen(!isOpen)}
        >
            <div style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--deep-navy)', margin: 0 }}>{question}</h3>
                <span style={{
                    color: 'var(--primary)',
                    fontSize: '1.5rem',
                    transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease'
                }}>+</span>
            </div>
            {isOpen && (
                <div style={{ padding: '0 24px 24px', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                    {answer}
                </div>
            )}
        </motion.div>
    )
}
