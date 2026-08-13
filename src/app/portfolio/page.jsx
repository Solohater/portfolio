'use client'
import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const items = [
  {
    id: 1,
    color: "from-purple-700 to-red-700",
    title: "Document Manager",
    desc: "A document management platform where users post documents and a reviewer role reviews and approves them.",
    img: '/hero3.jpg',
    link: "https://blog-app-seven-bice-50.vercel.app",
    github: "https://github.com/Solohater/Document-Management",
    demo: "admin / admin123",
  },
  {
    id: 2,
    color: "from-blue-700 to-violet-700",
    title: "TechShop",
    desc: "A commercial tech store for phones, tablets and laptops — product catalog, shopping cart, wishlist, order tracking, and customer accounts.",
    img: "/e-com.PNG",
    link: "https://techshop-peach.vercel.app",
    demo: "admin@techshop.com / Admin@12345",
  },
  {
    id: 3,
    color: "from-orange-700 to-yellow-700",
    title: "Ethio Kemem — Food Menu",
    desc: "A bilingual (Amharic/English) traditional Ethiopian food menu — categorized dishes, order cart, and an admin dashboard.",
    img: "/resturant.PNG",
    link: "https://fastfood-amber-chi.vercel.app",
    github: "https://github.com/Solohater/Food-Delivery-Platform",
    demo: "admin / admin123",
  },
  {
    id: 4,
    color: "from-green-700 to-teal-700",
    title: "JODEV Blog",
    desc: "A blog platform with categories, post management and newsletter subscription, backed by a REST API.",
    img: "/hero4.jpg",
    link: "https://materialtut-web.vercel.app",
    demo: "admin@blog.com / admin123 (user: john@blog.com / user123)",
  },
  {
    id: 5,
    color: "from-amber-700 to-yellow-700",
    title: "Repair Management System",
    desc: "A full-stack MERN repair shop management system with role-based authentication, repair tracking, dashboards, and REST APIs.",
    img: '/DanD.PNG',
    link: "https://web-seven-woad-99.vercel.app",
    github: "https://github.com/Solohater/DaveProjFront",
    demo: "admin / admin123",
  },
  {
    id: 6,
    color: "from-fuchsia-700 to-purple-700",
    title: "Reminder & Notes App",
    desc: "A reminder and scheduling app for keeping track of tasks, notes, and deadlines.",
    img: "/Grocery list.PNG",
    link: "https://reminder-schedule-eight.vercel.app",
  },
];

const PortfolioPage = () => {
  return (
    <motion.div 
      className="min-h-screen page-muted" 
      initial={{ y: "-200vh" }} 
      animate={{ y: "0%" }} 
      transition={{ duration: 1 }}
    >
      {/* Header Section */}
      <div className='min-h-screen flex items-center justify-center text-6xl md:text-8xl text-center dark:text-white'>
        My Works
      </div>

      {/* Vertical Projects List */}
      <div className="flex flex-col gap-24 px-6 py-12">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            className={`rounded-2xl p-6 shadow-md bg-gradient-to-r ${item.color} text-white flex flex-col items-center text-center`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-6">{item.title}</h1>
            <div className="relative w-80 h-56 md:h-64 md:w-96 lg:w-[500px] lg:h-[350px] xl:w-[600px] xl:h-[420px] mb-6">
              <Image src={item.img} alt={item.title} fill className="rounded-xl object-cover" />
            </div>
            <p className="w-80 md:w-96 lg:w-[500px] xl:w-[600px] mb-4 text-white/90">{item.desc}</p>
            {item.demo && (
              <p className="w-80 md:w-96 lg:w-[500px] xl:w-[600px] mb-4 text-white/70 text-sm">
                Demo login: {item.demo}
              </p>
            )}
            <div className="flex gap-3">
              {item.github && (
                <Link href={item.github} target="_blank">
                  <button className="p-2 px-6 text-sm md:text-base bg-white/20 text-white font-semibold rounded hover:bg-white/30 transition border border-white/30">
                    View Code
                  </button>
                </Link>
              )}
              <Link href={item.link} target="_blank">
                <button className="p-2 px-6 text-sm md:text-base bg-white text-gray-800 font-semibold rounded hover:bg-gray-200 transition">
                  Live Demo
                </button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Contact / Hire Me Section */}
      <div className='text-black dark:text-white w-screen h-screen flex flex-col gap-8 items-center justify-center text-center'>
        <h1 className='text-3xl md:text-6xl lg:text-8xl mt-20'>Do You Have A Project?</h1>
        <div className='relative'>
          <motion.svg
            animate={{ rotate: 360 }}
            transition={{ duration: 8, ease: "linear", repeat: Infinity }}
            viewBox='0 0 300 300'
            className='w-64 h-64 md:w-[500px] md:h-[500px]'
          >
            <defs>
              <path
                id="circlePath"
                d="M 150, 150 m -60, 0 a 60,60 0 0,1 120,0 a 60,60 0 0,1 -120,0 "
              />
            </defs>
            <text fill="currentColor">
              <textPath xlinkHref="#circlePath" className="text-xl">
                Software Engineer
              </textPath>
            </text>
          </motion.svg>
          <Link
            href='/contact'
            className='h-16 w-16 md:h-28 md:w-28 absolute top-0 left-0 right-0 bottom-0 m-auto bg-black text-white rounded-full flex items-center justify-center'
          >
            Hire Me
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default PortfolioPage
