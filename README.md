# SpeakUp — Empowering Safer Work and Study Environments.

**SpeakUp** is a web-based application built with **Next.js** and **Convex** that enables users to anonymously report incidents (such as harassment or misconduct) within their organization — whether it’s a **college**, **school**, or **company**. The goal is to create safer and more supportive environments by giving individuals a secure and private way to share their experiences.

## 🎯 Objective

To empower students, employees, and members of any organization to **safely report incidents** — especially those related to **harassment**, **abuse**, or **misconduct** — **anonymously**, without fear or discomfort. This platform is especially focused on supporting women who face harassment from colleagues or seniors and may not feel safe speaking up in person.

---

## 🧩 Features

- ✅ **Create Organizations**: Admins can create an organization and generate access codes for private entry.
- 🔐 **Access via Code**: Users join organizations using an access code shared by the admin.
- 🙈 **Anonymous Reporting**: Victims can report incidents without disclosing their identity.
- 📎 **Evidence Upload**: Reporters can optionally attach files (images, documents, etc.) as proof.
- 📝 **Optional Identity**: Users can choose to provide their name or stay anonymous.
- 🔄 **Real-time Data**: All interactions are handled seamlessly with real-time updates via Convex.
- 🎨 **Clean UI**: Built with Tailwind CSS and shadcn/ui for a modern, accessible interface.

---

## 🛠️ Tech Stack

| Layer        | Tech Used              |
|--------------|------------------------|
| Frontend     | Next.js (App Router), React |
| Backend      | Convex (Serverless + Real-time) |
| Auth         | next-auth              |
| Styling      | Tailwind CSS, shadcn/ui |
| UI Elements  | React Icons            |
| Storage      | Convex File Storage  |

---


## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/ashkankhan786/SpeakUp.git
cd SpeakUp
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create .env.local
```bash
CONVEX_DEPLOYMENT=
NEXT_PUBLIC_CONVEX_URL=your-convex-deployment-url

GITHUB_ID=your-github-id
GITHUB_SECRET=your-github-secret

GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

NEXTAUTH_URL=your-next-auth-url
NEXTAUTH_SECRET=your-next-auth-secret
```

### 4. Start the dev server
```bash
npm run dev
```
