"use client";

import React, { useState } from "react";
import AdminLayout from "../components/AdminLayout";
import UsersTable from "./components/UsersTable";
import UserForm from "./components/UserForm";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  joinDate: string;
}

const initialUsers: User[] = [
  {
    id: "1",
    name: "علی احمدی",
    email: "ali@example.com",
    role: "کاربر عادی",
    status: "فعال",
    joinDate: "1402/12/01",
  },
  {
    id: "2",
    name: "مریم رضایی",
    email: "maryam@example.com",
    role: "ادمین",
    status: "فعال",
    joinDate: "1402/11/15",
  },
  {
    id: "3",
    name: "حسین محمدی",
    email: "hossein@example.com",
    role: "کاربر عادی",
    status: "غیرفعال",
    joinDate: "1402/10/20",
  },
];

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleAdd = () => {
    setEditingUser(null);
    setShowForm(true);
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("آیا از حذف این کاربر اطمینان دارید؟")) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  const handleSave = (formData: any) => {
    if (editingUser) {
      setUsers(
        users.map((user) =>
          user.id === editingUser.id
            ? { ...user, ...formData }
            : user
        )
      );
    } else {
      const newUser: User = {
        id: Date.now().toString(),
        ...formData,
        joinDate: new Date().toLocaleDateString("fa-IR"),
      };
      setUsers([newUser, ...users]);
    }
    setShowForm(false);
    setEditingUser(null);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-medium text-gray-900 mb-2">
              مدیریت کاربران
            </h1>
            <p className="text-sm text-gray-600">
              مشاهده و مدیریت کاربران سایت
            </p>
          </div>
          <button
            onClick={handleAdd}
            className="bg-[#ff5538] text-white px-6 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            افزودن کاربر جدید
          </button>
        </div>

        <div className="bg-white border-b border-gray-200 p-4">
          <input
            type="text"
            placeholder="جستجو در کاربران..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-11 bg-white border-b border-gray-300 px-3 text-right text-gray-900 focus:outline-none focus:border-[#ff5538] transition-colors text-sm"
          />
        </div>

        <UsersTable
          users={filteredUsers}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {showForm && (
          <UserForm
            user={editingUser || undefined}
            onClose={() => {
              setShowForm(false);
              setEditingUser(null);
            }}
            onSave={handleSave}
          />
        )}
      </div>
    </AdminLayout>
  );
}
