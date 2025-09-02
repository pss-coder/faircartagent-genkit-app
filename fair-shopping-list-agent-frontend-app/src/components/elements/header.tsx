"use client";

import * as React from "react"
import Link from "next/link"

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
]

export function Header() {
  return (
    <header className="bg-white dark:bg-gray-900">
        <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between gap-x-6 p-4 lg:px-8">
            <div className="flex lg:flex-1 items-center gap-x-2">
                {/* <a href="#" className="-m-1.5 p-1.5">
                    <img
                    alt=""
                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=green&shade=600"
                    className="h-8 w-auto dark:hidden"
                    />
                    <img
                    alt=""
                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=green&shade=500"
                    className="hidden h-8 w-auto dark:block"
                    />
                </a> */}
                <span className="font-bold text-xm">Smart Shopping List</span>
            </div>

             <div className="flex flex-1 items-center justify-end gap-x-6">
          <a href="#" className="text-sm/6 font-semibold text-gray-900 dark:text-white">
           About
          </a>
            </div>


        </nav>
        
    </header>
   
  )
}