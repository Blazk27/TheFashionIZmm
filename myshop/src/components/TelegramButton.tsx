import { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { loadSettings, loadSettingsFromDB } from '../pages/AdminPage';

export function TelegramFloatingButton() {
  const [settings, setSettings] = useState(loadSettings());
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    loadSettingsFromDB().then(s => setSettings(s));
    const timer = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const telegramUrl = settings.telegram_handle
    ? `https://t.me/${settings.telegram_handle.replace('@', '')}`
    : null;

  if (!telegramUrl || !visible) return null;

  return (
    <a href={telegramUrl} target="_blank" rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-[#0088cc] hover:bg-[#0077b3] text-white font-semibold rounded-2xl shadow-xl shadow-blue-400/30 transition-all hover:scale-105 animate-fade-in-up">
      <MessageCircle className="w-5 h-5" />
      <span className="text-sm">Chat with us</span>
    </a>
  );
}
