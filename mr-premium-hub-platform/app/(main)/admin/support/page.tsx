"use client";

import React, { useState, useEffect, useRef } from "react";
import AdminLayout from "../components/AdminLayout";
import {
  fetchConversations,
  fetchMessages,
  sendAdminMessage,
  type ConversationListItem,
  type MessageItem,
} from "./lib/support-api";

function formatDate(s: string): string {
  const d = new Date(s);
  const now = new Date();
  const isToday =
    d.getDate() === now.getDate() &&
    d.getMonth() === now.getMonth() &&
    d.getFullYear() === now.getFullYear();
  if (isToday) {
    return d.toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" });
  }
  return d.toLocaleDateString("fa-IR", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
}

/** عنوان مکالمه برای ادمین: نام و تلفن تا فرستنده مشخص باشد */
function getConversationTitle(c: ConversationListItem): string {
  const name = c.userName?.trim();
  const phone = c.userPhone?.trim();
  if (name && phone) return `نام: ${name} — تلفن: ${phone}`;
  if (name) return name;
  if (phone) return `تلفن: ${phone}`;
  return "کاربر بدون نام";
}

export default function AdminSupportPage() {
  const [conversations, setConversations] = useState<ConversationListItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [replyText, setReplyText] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const prevMessagesLengthRef = useRef(0);

  const POLL_INTERVAL_MS = 2000; // هر ۲ ثانیه به‌روزرسانی برای نمایش آنی پیام‌ها

  const loadConversations = async (silent = false) => {
    if (!silent) setLoading(true);
    setError(null);
    try {
      const list = await fetchConversations();
      setConversations(list);
    } catch (e) {
      if (!silent) setError(e instanceof Error ? e.message : "خطا در بارگذاری");
    } finally {
      if (!silent) setLoading(false);
    }
  };

  useEffect(() => {
    loadConversations();
  }, []);

  /** به‌روزرسانی خودکار لیست مکالمات هر چند ثانیه */
  useEffect(() => {
    const t = setInterval(() => loadConversations(true), POLL_INTERVAL_MS);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (!selectedId) {
      setMessages([]);
      return;
    }
    let cancelled = false;
    const load = async () => {
      try {
        const list = await fetchMessages(selectedId);
        if (!cancelled) setMessages(list);
      } catch {
        if (!cancelled) setMessages([]);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [selectedId]);

  /** به‌روزرسانی خودکار پیام‌های مکالمهٔ باز برای نمایش آنی پیام کاربر */
  useEffect(() => {
    if (!selectedId) return;
    const t = setInterval(async () => {
      try {
        const list = await fetchMessages(selectedId);
        setMessages(list);
      } catch {
        // ignore
      }
    }, POLL_INTERVAL_MS);
    return () => clearInterval(t);
  }, [selectedId]);

  /** فقط وقتی پیام جدید اضافه شده پایین برو؛ با هر بار به‌روزرسانی (poll) اسکرول را عوض نکن */
  useEffect(() => {
    const prevLen = prevMessagesLengthRef.current;
    if (messages.length > prevLen) {
      prevMessagesLengthRef.current = messages.length;
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    prevMessagesLengthRef.current = 0;
  }, [selectedId]);

  const selectedConv = conversations.find((c) => c.id === selectedId);

  const handleSendReply = async () => {
    if (!selectedId || !replyText.trim() || sending) return;
    const textToSend = replyText.trim();
    setSending(true);
    setError(null);
    setReplyText("");
    try {
      const msg = await sendAdminMessage(selectedId, textToSend);
      setMessages((prev) => [...prev, msg]);
      setConversations((prev) =>
        prev.map((c) =>
          c.id === selectedId
            ? {
                ...c,
                messageCount: c.messageCount + 1,
                lastMessage: { text: msg.text.slice(0, 60), createdAt: msg.createdAt },
                updatedAt: msg.createdAt,
              }
            : c
        )
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : "خطا در ارسال");
      setReplyText(textToSend);
    } finally {
      setSending(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-medium text-gray-900 mb-1">پنل پشتیبانی</h1>
          <p className="text-sm text-gray-600">
            مکالمات ارسال‌شده از ویجت چت سایت را اینجا ببینید و پاسخ دهید.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-220px)] min-h-[400px]">
          {/* لیست مکالمات */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col">
            <div className="p-3 border-b border-gray-100 font-medium text-gray-800">
              مکالمات
            </div>
            <div className="flex-1 overflow-y-auto">
              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="w-8 h-8 border-2 border-[#ff5538]/30 border-t-[#ff5538] rounded-full animate-spin" />
                </div>
              ) : conversations.length === 0 ? (
                <p className="text-sm text-gray-500 p-4 text-center">
                  هنوز مکالمه‌ای ثبت نشده است.
                </p>
              ) : (
                <ul className="divide-y divide-gray-100">
                  {conversations.map((c) => (
                    <li key={c.id}>
                      <button
                        type="button"
                        onClick={() => setSelectedId(c.id)}
                        className={`w-full text-right p-3 hover:bg-gray-50 transition-colors ${
                          selectedId === c.id ? "bg-[#ff5538]/10 border-r-2 border-[#ff5538]" : ""
                        }`}
                      >
                        <div className="font-medium text-gray-900 text-sm truncate" title={getConversationTitle(c)}>
                          {getConversationTitle(c)}
                        </div>
                        {c.lastMessage && (
                          <p className="text-xs text-gray-500 truncate mt-0.5">
                            {c.lastMessage.text}
                          </p>
                        )}
                        <p className="text-xs text-gray-400 mt-1">
                          {formatDate(c.updatedAt)} · {c.messageCount} پیام
                        </p>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* پنجره چت */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 flex flex-col overflow-hidden">
            {selectedConv ? (
              <>
                <div className="p-3 border-b border-gray-100 flex items-center justify-between">
                  <span className="font-medium text-gray-800" title={getConversationTitle(selectedConv)}>
                    {getConversationTitle(selectedConv)}
                  </span>
                  <span className="text-xs text-gray-500">
                    {selectedConv.messageCount} پیام
                  </span>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {messages.map((m) => (
                    <div
                      key={m.id}
                      className={`flex ${m.sender === "admin" ? "justify-start" : "justify-end"}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${
                          m.sender === "admin"
                            ? "bg-[#ff5538] text-white"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        <p className="whitespace-pre-wrap">{m.text}</p>
                        <p
                          className={`text-xs mt-1 ${
                            m.sender === "admin" ? "text-white/80" : "text-gray-500"
                          }`}
                        >
                          {formatDate(m.createdAt)}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
                <div className="p-3 border-t border-gray-100 flex gap-2">
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="پاسخ را بنویسید..."
                    rows={2}
                    className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm text-right resize-none focus:ring-2 focus:ring-[#ff5538] focus:border-transparent"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendReply();
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleSendReply}
                    disabled={!replyText.trim() || sending}
                    className="bg-[#ff5538] text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                  >
                    {sending ? "..." : "ارسال"}
                  </button>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500 text-sm">
                یک مکالمه را از لیست انتخاب کنید.
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
