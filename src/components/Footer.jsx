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
            <Link href="https://gitlab.com/yosephh" target="_blank">
              <svg className="w-5 h-5 opacity-60 hover:opacity-100 transition text-gray-600 dark:text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="m22.77 9.72-.71-2.18a.87.87 0 0 0-.05-.15l-2.26-6.95a.84.84 0 0 0-1.6 0l-2.26 6.95H8.16L5.9.44a.84.84 0 0 0-1.6 0L2.05 7.39a.87.87 0 0 0-.05.15l-.71 2.18a1.73 1.73 0 0 0 .54 1.92l9.6 7.36a.53.53 0 0 0 .63 0l9.6-7.36a1.73 1.73 0 0 0 .55-1.92zM11.9 18.31 6.5 11.7 11.9 8.1Zm.18 0 5.4-6.61-5.4-3.6Z"/>
              </svg>
            </Link>
            <Link href="https://t.me/YOSEP015" target="_blank">
              <svg className="w-5 h-5 opacity-60 hover:opacity-100 transition text-gray-600 dark:text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
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
