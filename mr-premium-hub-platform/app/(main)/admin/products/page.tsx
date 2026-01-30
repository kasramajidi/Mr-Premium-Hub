"use client";

import React, { useState, useEffect, useCallback } from "react";
import AdminLayout from "../components/AdminLayout";
import ProductsTable from "./components/ProductsTable";
import ProductForm, { ShopApiPayload } from "./components/ProductForm";

const API_URL = "https://mrpremiumhub.org/api.ashx?action=shop";

interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  stock: number;
  sales: number;
  status: string;
  description?: string;
}

type ApiProduct = Record<string, unknown>;

function mapApiToProduct(item: ApiProduct, index: number): Product {
  const id = String(item.id ?? item.ID ?? index + 1);
  const name = String(item.title ?? item.name ?? item.Name ?? "—");
  const category = String(item.groups ?? item.category ?? item.Category ?? "—");
  const priceNum = Number(item.price ?? item.Price ?? 0);
  const price =
    priceNum > 0
      ? new Intl.NumberFormat("fa-IR").format(priceNum) + " تومان"
      : "—";
  const stock = Number(item.value ?? item.stock ?? item.Stock ?? 0);
  const sales = Number(item.sales ?? item.Sales ?? item.NumberOfComments ?? 0);
  const status =
    stock > 0 ? "موجود" : String(item.status ?? item.Status ?? "ناموجود");
  const description = item.text ? String(item.text) : undefined;
  return {
    id,
    name,
    category,
    price,
    stock,
    sales,
    status,
    description,
  };
}

function parseApiProducts(data: unknown): Product[] {
  if (!data || typeof data !== "object") return [];
  const obj = data as Record<string, unknown>;
  const raw =
    (obj.data as ApiProduct[] | undefined) ??
    (obj.list as ApiProduct[] | undefined) ??
    (obj.items as ApiProduct[] | undefined) ??
    (Array.isArray(data) ? data : []);
  if (!Array.isArray(raw)) return [];
  return raw.map((item, i) => mapApiToProduct(item as ApiProduct, i));
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setFetchError(null);
    try {
      const res = await fetch(API_URL, { method: "GET" });
      let data: unknown;
      try {
        data = await res.json();
      } catch {
        data = {};
      }
      const obj = data as Record<string, unknown>;
      if (!res.ok) {
        const msg =
          (typeof obj.error === "string" && obj.error) ||
          (typeof obj.message === "string" && obj.message) ||
          `خطای سرور (کد: ${res.status})`;
        throw new Error(msg);
      }
      const list = parseApiProducts(data);
      setProducts(list);
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "خطا در دریافت لیست محصولات";
      setFetchError(msg);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleAdd = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("آیا از حذف این محصول اطمینان دارید؟")) {
      setProducts(products.filter((product) => product.id !== id));
    }
  };

  const handleSave = (_data?: ShopApiPayload) => {
    setShowForm(false);
    setEditingProduct(null);
    fetchProducts();
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-medium text-gray-900 mb-2">
              مدیریت محصولات فروشگاه
            </h1>
            <p className="text-sm text-gray-600">
              افزودن محصول جدید، ویرایش و حذف محصولات موجود
            </p>
          </div>
          <button
            onClick={handleAdd}
            className="bg-[#ff5538] text-white px-6 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            افزودن محصول جدید
          </button>
        </div>

        <div className="bg-white border-b border-gray-200 p-4">
          <input
            type="text"
            placeholder="جستجو در لیست محصولات (نام یا دسته‌بندی)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-11 bg-white border-b border-gray-300 px-3 text-right text-gray-900 focus:outline-none focus:border-[#ff5538] transition-colors text-sm"
          />
        </div>

        {fetchError && (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
            <span className="shrink-0 w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white">!</span>
            <div>
                <p className="font-medium mb-0.5">علت خطا در دریافت لیست محصولات:</p>
              <p>{fetchError}</p>
              <button
                onClick={fetchProducts}
                className="mt-2 text-[#ff5538] hover:underline text-sm"
              >
                تلاش مجدد
              </button>
            </div>
          </div>
        )}

        {loading ? (
          <div className="bg-white border-b border-gray-200 p-12 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 border-2 border-[#ff5538] border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-gray-600">در حال بارگذاری لیست محصولات از سرور...</p>
            </div>
          </div>
        ) : (
        <ProductsTable
          products={filteredProducts}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        )}

        {showForm && (
          <ProductForm
            product={
              editingProduct
                ? {
                    id: editingProduct.id,
                    name: editingProduct.name,
                    category: editingProduct.category,
                    price: editingProduct.price,
                    stock: editingProduct.stock,
                    description: editingProduct.description || "",
                  }
                : undefined
            }
            onClose={() => {
              setShowForm(false);
              setEditingProduct(null);
            }}
            onSave={handleSave}
          />
        )}
      </div>
    </AdminLayout>
  );
}
