'use client'

import Link from 'next/link'
import { motion, useScroll, useTransform, Variants } from 'framer-motion'
import { useRef } from 'react'

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
}

export default function Home() {
  const targetRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: targetRef, offset: ["start start", "end start"] })
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Hero Section */}
      <motion.section
        ref={targetRef}
        style={{
          height: '100vh',
          paddingTop: '80px', // Clear fixed navbar
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'radial-gradient(circle at center, #232730 0%, #0f1115 100%)',
          position: 'relative',
          overflow: 'hidden',
          opacity,
          scale
        }}
      >
        {/* Abstract Background Element */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '800px',
            height: '800px',
            background: 'radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, transparent 70%)',
            zIndex: 1,
            pointerEvents: 'none'
          }}
        />

        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'url("/grid.png")', /* You might want to add a subtle grid or noise texture later */
          opacity: 0.05,
          zIndex: 0
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.span variants={fadeInUp} style={{
              color: '#60a5fa', // Lighter blue for dark background
              textTransform: 'uppercase',
              letterSpacing: '0.3em',
              fontWeight: 600,
              fontSize: '0.85rem',
              marginBottom: '1.5rem',
              display: 'block',
              textShadow: '0 0 20px rgba(96, 165, 250, 0.4)'
            }}>
              Autonomous Self Storage
            </motion.span>

            <motion.h1 variants={fadeInUp} style={{
              fontSize: 'clamp(2.5rem, 6vw, 6rem)',
              marginBottom: '1.5rem',
              lineHeight: 1,
            }}>
              <span className="text-gradient">Secure Space.</span><br />
              <span className="text-gold-gradient">Instant Access.</span>
            </motion.h1>

            <motion.p variants={fadeInUp} style={{
              fontSize: '1.25rem',
              color: '#cbd5e1', // Light gray/blue-ish for better readability on dark
              maxWidth: '640px',
              margin: '0 auto 3rem',
              lineHeight: 1.7
            }}>
              Experience the future of self storage. Book, manage, and access your unit completely autonomously through our premium digital portal.
            </motion.p>

            <motion.div variants={fadeInUp} style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/units" className="btn btn-primary" style={{ padding: '16px 40px', fontSize: '1.125rem' }}>
                Find Your Unit
              </Link>
              <Link href="/contact" className="btn btn-outline" style={{
                padding: '16px 40px',
                fontSize: '1.125rem',
                borderColor: 'rgba(255,255,255,0.3)',
                color: 'white'
              }}>
                Contact Support
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Grid */}
      <section style={{ padding: '120px 0', background: 'var(--surface)' }}>
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px' }}
          >
            <FeatureCard
              title="24/7 Autonomous Access"
              description="Seamless entry to the facility and your unit using our digital key system. No physical keys to lose."
              icon="🔒"
              delay={0}
            />
            <FeatureCard
              title="Climate Controlled"
              description="Keep your valuables safe from temperature fluctuations and humidity year-round."
              icon="🌡️"
              delay={0.1}
            />
            <FeatureCard
              title="Instant Booking"
              description="Select a unit, sign the contract, and move in immediately. No office hours needed."
              icon="⚡"
              delay={0.2}
            />
          </motion.div>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({ title, description, icon, delay }: { title: string, description: string, icon: string, delay: number }) {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -10, transition: { duration: 0.2 } }}
      className="glass-card"
      style={{
        padding: '40px',
        borderRadius: '24px',
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--surface-white)',
        boxShadow: 'var(--shadow-card)',
        border: '1px solid rgba(0,0,0,0.05)'
      }}
    >
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '4px',
        background: 'linear-gradient(90deg, transparent, var(--primary-blue), transparent)',
        opacity: 0.5
      }} />
      <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>{icon}</div>
      <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--deep-navy)' }}>{title}</h3>
      <p style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>{description}</p>
    </motion.div>
  )
}
