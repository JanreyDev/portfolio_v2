export const portfolioData = {
    about: {
        name: "Janrey Mina",
        role: "Full-Stack Web Developer",
        location: "Philippines",
        yearsOfExperience: 6,
        bio: [
            "I am an experienced Full-Stack Web Developer with 6 years of professional expertise, based in the Philippines.",
            "I specialize in building modern, responsive frontends and robust backend systems, delivering seamless and scalable web applications.",
            "Throughout my career, I have contributed to diverse projects, creating solutions that combine performance, usability, and reliability."
        ],
        stats: [
            { label: "Languages", value: "HTML & CSS, JavaScript, PHP, TypeScript, SQL", icon: "Code" },
            { label: "Education", value: "Bachelor of Science in Information Technology", icon: "GraduationCap" },
            { label: "Projects", value: "Built more than 100+ projects", icon: "Briefcase" },
            { label: "Experience", value: "6+ Years of Full-Stack Web Development", icon: "Award" }
        ]
    },
    skills: {
        frontend: [
            { name: "React", icon: "react/react-original.svg" },
            { name: "Next.js", icon: "nextjs/nextjs-original.svg" },
            { name: "Vue", icon: "vuejs/vuejs-original.svg" },
            { name: "Tailwind CSS", icon: "tailwindcss/tailwindcss-original.svg" },
            { name: "TypeScript", icon: "typescript/typescript-plain.svg" },
            { name: "HTML5", icon: "html5/html5-plain.svg" },
            { name: "CSS3", icon: "css3/css3-plain.svg" },
            { name: "Bootstrap", icon: "bootstrap/bootstrap-plain.svg" }
        ],
        backend: [
            { name: "Node.js", icon: "nodejs/nodejs-original.svg" },
            { name: "Python", icon: "python/python-original.svg" },
            { name: "Laravel", icon: "laravel/laravel-original.svg" },
            { name: "MySQL", icon: "mysql/mysql-original.svg" },
            { name: "PostgreSQL", icon: "postgresql/postgresql-original.svg" },
            { name: "MongoDB", icon: "mongodb/mongodb-plain.svg" },
            { name: "Convex", icon: "convex/convex-original.svg" },
            { name: "Supabase", icon: "supabase/supabase-original.svg" },
            { name: "Firebase", icon: "firebase/firebase-plain.svg" }
        ],
        tools: [
            { name: "Docker", icon: "docker/docker-original.svg" },
            { name: "Git", icon: "git/git-plain.svg" },
            { name: "GitHub", icon: "github/github-original.svg" },
            { name: "DigitalOcean", icon: "digitalocean/digitalocean-original.svg" },
            { name: "Flutter", icon: "flutter/flutter-original.svg" },
            { name: "WordPress", icon: "wordpress/wordpress-plain.svg" },
            { name: "Linux", icon: "linux/linux-plain.svg" },
            { name: "Figma", icon: "figma/figma-original.svg" }
        ]
    },
    projects: [
        {
            title: "Teachify AI",
            subtitle: "AI-Powered Classroom Platform",
            description: "An AI-powered classroom platform that lets teachers generate quizzes from prompts or documents, assign them to students, and automatically analyze student performance.",
            tags: ["Laravel", "Next.js", "TailwindCSS", "PostgreSQL", "OpenAI API"],
            link: "https://teachify-web-ai.vercel.app/",
            thumbnail: "/image 62.png"
        },
        {
            title: "Shopepito Online Store",
            subtitle: "E-Commerce Solution with WooCommerce",
            description: "An e-commerce website developed with WordPress that allows businesses to sell products online with a complete shopping system including product management, cart, and checkout functionality powered by WooCommerce.",
            tags: ["WordPress", "Elementor Pro", "WooCommerce", "PHP"],
            link: "https://shopepito.is-best.net/?i=1",
            thumbnail: "/shopepeto.png"
        },
        {
            title: "Furniture Store Website",
            subtitle: "Modern Furniture E-Commerce",
            description: "A modern e-commerce furniture store built with WordPress, featuring product catalogs, shopping cart functionality, and a responsive UI. Developed using Elementor Pro with WooCommerce integration for managing products, orders, and payments.",
            tags: ["WordPress", "Elementor Pro", "WooCommerce", "PHP"],
            link: "https://furniturestore.ct.ws/?i=1",
            thumbnail: "/furniture.png"
        },
        {
            title: "CodeTech Portfolio",
            subtitle: "Dynamic Developer Portfolio",
            description: "A dynamic WordPress developer portfolio built using Elementor Pro and Advanced Custom Fields (ACF), enabling flexible content management and responsive layouts to showcase development projects and services.",
            tags: ["WordPress", "Elementor Pro", "Advanced Custom Fields (ACF)", "PHP"],
            link: "https://codetech.wuaze.com/?i=1",
            thumbnail: "/codetech.png"
        },
        {
            title: "Terminal Portfolio",
            subtitle: "Interactive CLI Style Portfolio",
            description: "An interactive command-line style portfolio featuring macOS inspired window cards, a custom command parser, and comprehensive theme support.",
            tags: ["TypeScript", "Next.js", "TailwindCSS", "CSS Variables"],
            link: "#",
            thumbnail: "/terminal.png"
        },
        {
            title: "Lifestyle Blog",
            subtitle: "Optimized Publishing Platform",
            description: "A modern, highly optimized publishing platform featuring custom dynamic themes and SEO tools.",
            tags: ["WordPress", "PHP", "TailwindCSS"],
            link: "#",
            thumbnail: "https://placehold.co/800x450/0d1117/10b981?text=Project+Coming+Soon"
        },
        {
            title: "Fitness Tracker App",
            subtitle: "Cross-Platform Mobile Workout Tracker",
            description: "A cross-platform mobile application to track daily workouts, calculate calories, and visualize progress metrics over time.",
            tags: ["Flutter", "Dart", "Firebase"],
            link: "#",
            thumbnail: "https://placehold.co/800x450/0d1117/10b981?text=Fitness+App+Preview"
        },
        {
            title: "Task Management API",
            subtitle: "Robust Backend for Team Collaboration",
            description: "A secure, robust backend API for managing user tasks, deadlines, and team collaboration with real-time websocket updates.",
            tags: ["Node.js", "Express", "PostgreSQL", "Laravel"],
            link: "#",
            thumbnail: "https://placehold.co/800x450/0d1117/10b981?text=API+Project+Preview"
        },
        {
            title: "Real Estate Portal",
            subtitle: "Property Listing & Virtual Tour Platform",
            description: "A high-performance property listing platform with advanced filtering, map integration, and virtual tours.",
            tags: ["Next.js", "React", "Mapbox", "Prisma"],
            link: "#",
            thumbnail: "https://placehold.co/800x450/0d1117/10b981?text=Real+Estate+Preview"
        }
    ],
    contact: {
        email: "janreyminadev@gmail.com",
        whatsapp: "09619174255",
        linkedin: "janrey-mina-78b9373a7", // Modified to be the ID part for cleaner link management
        linkedinUrl: "https://www.linkedin.com/in/janrey-mina-78b9373a7/",
        whatsappUrl: "https://wa.me/09619174255",
        resume: "/janreyMina.pdf"
    }
};
