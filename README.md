# BidiChat – راست‌چین خودکار چت‌های هوش مصنوعی

[![Latest Release](https://img.shields.io/github/v/release/VEXEL98/BidiChat?label=%D8%A2%D8%AE%D8%B1%DB%8C%D9%86%20%D9%86%D8%B3%D8%AE%D9%87)](https://github.com/VEXEL98/BidiChat/releases)
[![Downloads](https://img.shields.io/github/downloads/VEXEL98/BidiChat/total?color=brightgreen)](https://github.com/VEXEL98/BidiChat/releases)
[![Stars](https://img.shields.io/github/stars/VEXEL98/BidiChat?style=social)](https://github.com/VEXEL98/BidiChat/stargazers)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**BidiChat** افزونه‌ای متن‌باز و سبک برای کروم است که به‌طور خودکار جهت نوشتار **فارسی، عربی و سایر زبان‌های راست‌به‌چپ** را در پلتفرم‌های هوش مصنوعی مانند **Claude، ChatGPT و DeepSeek** تصحیح می‌کند.  
بدون این افزونه، متن فارسی شما چپ‌چین و ناخوانا دیده می‌شود—BidiChat این مشکل را برای همیشه حل می‌کند.

[![دانلود نسخه ۱.۰.۰](https://img.shields.io/badge/%D8%AF%D8%A7%D9%86%D9%84%D9%88%D8%AF-v1.0.0-blue)](https://github.com/VEXEL98/BidiChat/releases/tag/v1.0.0)

---

## 🇮🇷 فارسی

### ✨ ویژگی‌ها

| ویژگی | توضیح |
|--------|--------|
| **راست‌چین خودکار** | پیام‌های فارسی و عربی بلافاصله راست‌چین می‌شوند. |
| **کدهای برنامه‌نویسی** | کدها چپ‌چین باقی می‌مانند—پرانتز و نشانه‌ها خراب نمی‌شوند. |
| **پشتیبانی از استریم** | حتی وقتی هوش مصنوعی در حال تایپ پاسخ است، جهت نوشتار درست می‌شود. |
| **فیلد ورودی هوشمند** | هنگام تایپ فارسی، کادر نوشتار خودکار راست‌چین می‌شود. |
| **مصرف صفر CPU** | با بهینه‌ترین روش ممکن—فقط تغییرات لازم رصد می‌شود. |

### 🖥️ سایت‌های پشتیبانی‌شده
- `claude.ai`
- `chat.deepseek.com`
- `chatgpt.com` / `chat.openai.com`

### 📥 نصب
۱. از [صفحهٔ Releases](https://github.com/VEXEL98/BidiChat/releases) فایل `BidiChat.zip` را دانلود و استخراج کنید.  
۲. در کروم به `chrome://extensions` بروید.  
۳. **حالت توسعه‌دهنده** را (بالا سمت راست) روشن کنید.  
۴. روی **بارگذاری بستهٔ بسته‌بندی نشده** کلیک کرده و پوشهٔ استخراج‌شده را انتخاب کنید.  
۵. تمام! یکی از سایت‌های پشتیبانی‌شده را باز کنید و فارسی چت کنید.

### ➕ افزودن سایت‌های بیشتر
فایل `manifest.json` را ویرایش کنید و دامنه‌های جدید را به `host_permissions` اضافه کنید، سپس در `content.js` آرایهٔ `MESSAGE_SELECTORS` را بروز کنید.

---

## 🇸🇦 العربية

### ✨ الميزات

| الميزة | الوصف |
|--------|--------|
| **RTL تلقائي** | الرسائل الفارسية والعربية تظهر بمحاذاة اليمين فورًا. |
| **الأكواد البرمجية LTR** | تبقى الأكواد من اليسار لليمين دون تشويه الأقواس. |
| **دعم البث المباشر** | يعمل أثناء كتابة الذكاء الاصطناعي للرد. |
| **حقل الإدخال الذكي** | يتحول تلقائيًا للكتابة من اليمين عند الكتابة بالفارسية. |
| **خفيف جدًا** | استهلاك شبه معدوم للمعالج. |

### 🖥️ المواقع المدعومة
- `claude.ai`
- `chat.deepseek.com`
- `chatgpt.com` / `chat.openai.com`

### 📥 التثبيت
١. حمّل ملف `BidiChat.zip` من [صفحة الإصدارات](https://github.com/VEXEL98/BidiChat/releases) وقم بفك الضغط.  
٢. افتح `chrome://extensions` في كروم.  
٣. فعّل **وضع المطور** (أعلى اليمين).  
٤. انقر على **تحميل حزمة غير مضغوطة** واختر المجلد المفكوك.  
٥. الإضافة نشطة الآن — افتح أي موقع مدعوم وتحدث بالفارسية أو العربية!

---

## 🇬🇧 English

### ✨ Features

| Feature | Description |
|---------|-------------|
| **Auto RTL** | Persian/Arabic texts are instantly right‑aligned. |
| **Code Stays LTR** | Programming code remains left‑to‑right with correct brackets. |
| **Streaming Support** | Direction is applied while the AI is typing its response. |
| **Smart Input** | The input field switches to RTL automatically when needed. |
| **Zero CPU Impact** | Optimized observers and rAF‑based debouncing. |

### 🖥️ Supported Sites
- `claude.ai`
- `chat.deepseek.com`
- `chatgpt.com` / `chat.openai.com`

### 📥 Installation
1. Download `BidiChat.zip` from the [Releases page](https://github.com/VEXEL98/BidiChat/releases) and extract it.
2. Open `chrome://extensions` in Chrome.
3. Enable **Developer mode** (top right).
4. Click **Load unpacked** and select the extracted folder.
5. Done! Open any supported AI chat and enjoy properly aligned Persian/Arabic text.

### ➕ Adding More Sites
Edit `manifest.json` and add new domains to `host_permissions`, then update `MESSAGE_SELECTORS` in `content.js` with the appropriate CSS selectors.

---

## 🏷️ Repository Structure

BidiChat/
├── manifest.json # Chrome Extension Manifest (V3)

├── content.js # Core direction logic

├── README.md # This file

├── LICENSE # MIT License

---

## 👤 توسعه‌دهنده | المطور | Author

**[VEXEL98](https://github.com/VEXEL98)**  
پرسش یا پیشنهاد دارید؟  
از طریق [Issues](https://github.com/VEXEL98/BidiChat/issues) یا [Discussions](https://github.com/VEXEL98/BidiChat/discussions) در میان بگذارید.  
اگر این پروژه به کارتان آمده، با ستاره ⭐ دادن به آن دیگران را هم آگاه کنید.

---

## 📄 License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.

---

**Made with ❤️ for the RTL community.**
