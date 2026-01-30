"use client";

import React from "react";

interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  stock: number;
  sales: number;
  status: string;
}

interface ProductsTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export default function ProductsTable({
  products,
  onEdit,
  onDelete,
}: ProductsTableProps) {
  return (
    <div className="bg-white border-b border-gray-200 p-6">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-right py-3 px-4 font-medium text-gray-700">
                نام محصول
              </th>
              <th className="text-right py-3 px-4 font-medium text-gray-700">
                دسته‌بندی محصول
              </th>
              <th className="text-right py-3 px-4 font-medium text-gray-700">
                قیمت محصول
              </th>
              <th className="text-right py-3 px-4 font-medium text-gray-700">
                موجودی انبار
              </th>
              <th className="text-right py-3 px-4 font-medium text-gray-700">
                تعداد فروش
              </th>
              <th className="text-right py-3 px-4 font-medium text-gray-700">
                وضعیت موجودی
              </th>
              <th className="text-right py-3 px-4 font-medium text-gray-700">
                عملیات محصول
              </th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-gray-500">
                  محصولی یافت نشد
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-4 text-gray-900 font-medium">
                    {product.name}
                  </td>
                  <td className="py-3 px-4 text-gray-700">{product.category}</td>
                  <td className="py-3 px-4 text-gray-900 font-medium">
                    {product.price}
                  </td>
                  <td className="py-3 px-4 text-gray-600">{product.stock}</td>
                  <td className="py-3 px-4 text-gray-600">{product.sales}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded ${
                        product.status === "موجود"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onEdit(product)}
                        className="text-[#ff5538] hover:underline text-xs"
                      >
                        ویرایش محصول
                      </button>
                      <button
                        onClick={() => onDelete(product.id)}
                        className="text-red-600 hover:underline text-xs"
                      >
                        حذف محصول
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
