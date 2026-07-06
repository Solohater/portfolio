import Link from 'next/link'
import Image from 'next/image'

const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-20 xl:px-48 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              &copy; {new Date().getFullYear()} Yoseph Ayalew. All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="mailto:yosefayalew56@gmail.com"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition"
            >
              yosefayalew56@gmail.com
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link href="https://github.com/Solohater" target="_blank">
              <Image src="/github.png" alt="GitHub" width={22} height={22} className="opacity-60 hover:opacity-100 transition" />
            </Link>
            <Link href="https://www.linkedin.com/in/yoseph-ayalew-65247b291" target="_blank">
              <Image src="/linkedin.png" alt="LinkedIn" width={22} height={22} className="opacity-60 hover:opacity-100 transition" />
            </Link>
            <Link href="mailto:yosefayalew56@gmail.com">
              <svg className="w-5 h-5 opacity-60 hover:opacity-100 transition text-gray-600 dark:text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
