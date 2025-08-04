# IconGen

IconGen is a SaaS web application that allows users to generate high-quality custom icons using the ChatGPT API. It features a modern UI built with **Next.js**, **TypeScript**, and **Tailwind CSS**, and integrates cloud storage and payments for a complete end-to-end experience.

---

## Features

- AI-powered icon generation using OpenAI's ChatGPT API  
- Image storage with **Amazon S3**  
- Payment integration using **Razorpay**  
- Deployed with **Vercel**  
- Secure API routes and form handling  
- Fully typed with **TypeScript**

---

## Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS, TypeScript  
- **Backend:** Next.js API routes  
- **Storage:** AWS S3  
- **Payments:** Razorpay  
- **AI Integration:** ChatGPT API  
- **Deployment:** Vercel

---

## Installation

```bash
git clone https://github.com/Maxcillius/IconGen.git
cd IconGen
npm install
```

Create a .env.local file and add the required environment variables:

```bash
NEXT_PUBLIC_OPENAI_API_KEY=your_openai_key
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_S3_BUCKET_NAME=your_bucket_name
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

Then run the development server:

    npm run dev

## Live Demo

icon-gen-blush.vercel.app

## Author
Maxcilius
