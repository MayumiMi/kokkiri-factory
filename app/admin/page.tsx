'use client'

import { useState } from 'react'
import Link from 'next/link'
import { UserCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sidebar } from '@/components/sidebar' // Import Sidebar

interface Admin {
  username: string
  fullName: string
  contribution: string
  icon?: string
}

const admins: Admin[] = [
  { username: "Mieko", fullName: "Belva Mieko Suparwanto", contribution: "39%" },
  { username: "Hasbi", fullName: "Hasbi Fajrul Hakim", contribution: "10%" },
  { username: "Aya", fullName: "Azahra Nouvanda Guzka", contribution: "10%" },
  { username: "Ame", fullName: "Salma Azaria", contribution: "1%" },
  { username: "Zahra", fullName: "Zahra Annisa Fakhira", contribution: "10%" },
  { username: "Ahsan", fullName: "Muhammad Ahsanul Fikri", contribution: "10%" },
  { username: "Rafi", fullName: "Mohamad Rafi Al-Yahya", contribution: "10%" },
  { username: "Hussein", fullName: "Muhammad Hussein Aprianto", contribution: "10%" },
  { username: "Yumna", fullName: "Yumna Aulia Rahmawati", contribution: "5%" },
  { username: "Dio", fullName: "Dio Alvaro Santoso", contribution: "7%" },
  { username: "Vian", fullName: "Kevian Ramadhan", contribution: "4%" },
  { username: "Siti", fullName: "Siti Nurhaliza", contribution: "15%" },
  { username: "Taufik", fullName: "Muhammad Taufik", contribution: "8%" },
]

const ROWS_PER_PAGE = 10

export default function AdminListPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  // Filter admins based on search query
  const filteredAdmins = admins.filter(
    (admin) =>
      admin.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      admin.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      admin.contribution.includes(searchQuery)
  )

  // Calculate pagination
  const totalPages = Math.ceil(filteredAdmins.length / ROWS_PER_PAGE)
  const startIndex = (currentPage - 1) * ROWS_PER_PAGE
  const currentAdmins = filteredAdmins.slice(startIndex, startIndex + ROWS_PER_PAGE)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar className="w-64" />

      {/* Main Content */}
      <div className="flex-1 container mx-auto p-6 bg-white">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-black">Admin List</h1>
          <Button variant="ghost" size="icon" asChild className="text-blue-600 hover:text-blue-800">
            <Link href="performance/admin-profile">
              <UserCircle className="h-6 w-6" />
              <span className="sr-only">Admin Profile</span>
            </Link>
          </Button>
        </div>

        {/* Search Input */}
        <div className="flex justify-between items-center mb-4">
          <div className="relative flex-1 max-w-md">
            <Input
              type="search"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setCurrentPage(1)
              }}
              placeholder="Search by username or contribution"
              className="pl-10 pr-4 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Admin Table */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2 text-left">Username</th>
                <th className="border px-4 py-2 text-left">Full Name</th>
                <th className="border px-4 py-2 text-left">Contribution</th>
              </tr>
            </thead>
            <tbody>
              {currentAdmins.length > 0 ? (
                currentAdmins.map((admin, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border px-4 py-2 flex items-center gap-2">
                      <span className="font-bold">{admin.username}</span>
                    </td>
                    <td className="border px-4 py-2">{admin.fullName}</td>
                    <td className="border px-4 py-2">{admin.contribution}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={3}
                    className="border px-4 py-2 text-center text-gray-500"
                  >
                    No results found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-4 gap-2">
          <Button
            variant="ghost"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(1)}
          >
            First Page
          </Button>

          {[...Array(totalPages)].map((_, i) => (
            <Button
              key={i}
              variant={currentPage === i + 1 ? "default" : "ghost"}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </Button>
          ))}

          <Button
            variant="ghost"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(totalPages)}
          >
            Last Page
          </Button>
        </div>
      </div>
    </div>
  )
}
