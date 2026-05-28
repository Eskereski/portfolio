"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useChat } from "@ai-sdk/react";

import { useLanguage } from "@/lib/language-context";
import { useI18n } from "@/lib/use-i18n";

export function ChatInterface() {
  const { language } = useLanguage();
  const { t } = useI18n(language);

  const transport = useMemo(
    () =>
      new DefaultChatTransport<UIMessage>({
        api: "/api/chat",
      }),
    []
  );

  const { messages, sendMessage, status, error } = useChat({
    transport,
  });

  const [input, setInput] = useState("");

  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const lastMessage = messages[messages.length - 1];
  const getMessageText = (message: (typeof messages)[number]) =>
    message.parts
      .filter((part) => part.type === "text")
      .map((part) => part.text)
      .join("");
  const lastMessageContent = lastMessage ? getMessageText(lastMessage) : "";

  useEffect(() => {
    const messagesContainer = messagesContainerRef.current;
    if (!messagesContainer) return;

    messagesContainer.scrollTo({
      top: messagesContainer.scrollHeight,
      behavior: "smooth",
    });
  }, [messages.length, lastMessageContent]);

  const isLoading = status === "submitted" || status === "streaming";
  const canSend = input.trim().length > 0 && !isLoading;

  return (
    <div className="rounded-3xl border border-zinc-300/80 bg-zinc-50/70 p-6 shadow-sm shadow-zinc-900/5 dark:border-zinc-700 dark:bg-white/5 dark:shadow-black/20 sm:p-8">
      <div className="flex flex-col gap-6">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.35em] text-zinc-500 dark:text-zinc-400">
            {t("chatInterface.eyebrow")}
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            {t("chatInterface.title")}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-600 dark:text-zinc-300">
            {t("chatInterface.description")}
          </p>
        </div>

        <div className="flex h-[420px] flex-col rounded-2xl border border-zinc-200 bg-white/80 shadow-sm shadow-zinc-900/5 dark:border-zinc-800 dark:bg-zinc-950/40 dark:shadow-black/20">
          <div
            ref={messagesContainerRef}
            className="chat-scrollbar flex-1 overflow-y-auto px-4 py-5"
          >
            {messages.length === 0 ? (
              <div className="flex h-full items-center justify-center text-center text-sm text-zinc-500 dark:text-zinc-400">
                {t("chatInterface.emptyState")}
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {messages.map((message) => {
                  const isUser = message.role === "user";
                  const messageText = getMessageText(message);
                  return (
                    <div
                      key={message.id}
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm ${
                        isUser
                          ? "ml-auto bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                          : "mr-auto bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50"
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{messageText}</p>
                    </div>
                  );
                })}

                {isLoading ? (
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    {t("chatInterface.statusThinking")}
                  </p>
                ) : null}
              </div>
            )}
          </div>

          <form
            onSubmit={async (event) => {
              event.preventDefault();
              if (!input.trim() || isLoading) return;
              const messageText = input.trim();
              setInput("");
              await sendMessage(
                { text: messageText },
                { body: { language } }
              );
            }}
            className="border-t border-zinc-200 bg-white/90 p-3 dark:border-zinc-800 dark:bg-zinc-950/70"
          >
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder={t("chatInterface.inputPlaceholder")}
                className="h-11 flex-1 rounded-full border border-zinc-200 bg-white px-4 text-sm text-zinc-900 placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/15 dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:focus-visible:ring-zinc-200/20"
                aria-label={t("chatInterface.inputPlaceholder")}
              />
              <button
                type="submit"
                disabled={!canSend}
                className="inline-flex h-11 items-center justify-center rounded-full bg-zinc-900 px-5 text-sm font-medium text-white transition enabled:cursor-pointer hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
              >
                {t("chatInterface.sendButton")}
              </button>
            </div>
          </form>
        </div>

        {error ? (
          <p className="text-sm text-red-600 dark:text-red-400">
            {t("chatInterface.error")}
          </p>
        ) : null}
      </div>
    </div>
  );
}
