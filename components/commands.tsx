import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, GraduationCap, Briefcase, Award, Folder, ExternalLink, Mail, Linkedin, LucideIcon, Phone, MapPin, X, Globe } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';

const iconMap: Record<string, LucideIcon> = {
    Code,
    GraduationCap,
    Briefcase,
    Award,
};

export const executeCommand = (
    cmd: string,
    setTheme?: (theme: string) => void,
    theme?: string,
    onCommand?: (command: string) => void
): React.ReactNode => {
    const args = cmd.trim().split(' ');
    const mainCmd = args[0].toLowerCase();

    switch (mainCmd) {
        case 'help':
            return (
                <div className="flex flex-col gap-1 text-foreground">
                    <div><span className="text-primary font-bold w-20 inline-block">home</span> - Landing overview</div>
                    <div><span className="text-primary font-bold w-20 inline-block">about</span> - Who am I?</div>
                    <div><span className="text-primary font-bold w-20 inline-block">skills</span> - My tech stack</div>
                    <div><span className="text-primary font-bold w-20 inline-block">services</span> - What I offer</div>
                    <div><span className="text-primary font-bold w-20 inline-block">projects</span> - Things I&apos;ve built</div>
                    <div><span className="text-primary font-bold w-20 inline-block">contact</span> - Get in touch</div>
                    <div><span className="text-primary font-bold w-20 inline-block">resume</span> - Download my CV</div>
                    <div><span className="text-primary font-bold w-20 inline-block">theme</span> - Toggle Dark/Light mode</div>
                    <div><span className="text-primary font-bold w-20 inline-block">clear</span> - Clear the terminal</div>
                    <div><span className="text-primary font-bold w-20 inline-block">close</span> - Minimize terminal</div>
                    <div><span className="text-primary font-bold w-20 inline-block">help</span> - Show this help message</div>
                </div>
            );
        case 'home':
            return (
                <div className="flex flex-col gap-8 py-2 mt-4">
                    <div className="flex flex-col items-start">
                        <h2 className="mt-3 text-4xl md:text-5xl font-bold text-emerald-400">Hi! I&apos;m Janrey! 👋</h2>
                        <div className="mt-3 h-1 w-20 rounded-full bg-emerald-500/80"></div>
                    </div>

                    <div className="max-w-3xl space-y-4 text-sm md:text-base leading-relaxed text-foreground/90">
                        <p className="text-lg md:text-xl text-foreground font-semibold">Full-Stack Web Developer</p>
                        <p>Based in the Philippines.</p>
                        <p>
                            With 6 years of experience, I&apos;ve contributed to scalable web applications and responsive frontend designs
                            across multiple projects.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl">
                        <div className="rounded-xl border border-emerald-500/30 bg-[#161b22] p-4">
                            <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/70">Experience</p>
                            <p className="mt-2 text-lg font-bold text-foreground">6+ Years</p>
                        </div>
                        <div className="rounded-xl border border-cyan-400/30 bg-[#161b22] p-4">
                            <p className="text-xs uppercase tracking-[0.2em] text-cyan-300/70">Focus</p>
                            <p className="mt-2 text-lg font-bold text-foreground">Scalable Web Apps</p>
                        </div>
                        <div className="rounded-xl border border-amber-400/30 bg-[#161b22] p-4">
                            <p className="text-xs uppercase tracking-[0.2em] text-amber-300/70">Specialty</p>
                            <p className="mt-2 text-lg font-bold text-foreground">Responsive UI + Backend</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <button
                            onClick={() => onCommand?.('contact')}
                            className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-300 hover:bg-emerald-500/20 transition-colors"
                        >
                            Connect with me
                        </button>
                        <a
                            href={portfolioData.contact.resume}
                            target="_blank"
                            rel="noreferrer"
                            download="Janrey_Mina_Resume.pdf"
                            className="rounded-lg border border-cyan-400/40 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-200 hover:bg-cyan-500/20 transition-colors"
                        >
                            My resume
                        </a>
                    </div>
                </div>
            );
        case 'about':
            return (
                <div className="flex flex-col gap-6 py-2 mt-4">
                    <div className="flex flex-col mb-2 items-start">
                        <h2 className="text-4xl font-bold text-emerald-500 mb-2">About me</h2>
                        <div className="w-16 h-1 rounded-full bg-emerald-500/80"></div>
                    </div>
                    <div className="flex flex-col gap-6 w-full mt-2">
                        <div className="flex flex-col gap-6 text-foreground/90 w-full text-sm md:text-base leading-relaxed tracking-wide font-mono mt-1">
                            {portfolioData.about.bio.map((paragraph, i) => (
                                <p key={i}>{paragraph}</p>
                            ))}

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                                {portfolioData.about.stats.map((stat, i) => {
                                    const Icon = iconMap[stat.icon] || Code;
                                    return (
                                        <div key={i} className={`flex flex-col border rounded-2xl p-5 bg-[#161b22] transition-colors ${i === 0 ? 'border-emerald-500/30 hover:border-emerald-500/60' : 'border-white/10 hover:border-white/30'}`}>
                                            <Icon className="w-6 h-6 text-emerald-500 mb-4" />
                                            <h4 className="text-lg font-bold text-foreground mb-2 whitespace-nowrap">{stat.label}</h4>
                                            <p className="text-foreground/70 text-sm">{stat.value}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            );
        case 'skills':
            return (
                <div className="flex flex-col gap-6 py-2 mt-4">
                    <div className="flex flex-col mb-4 items-start">
                        <h2 className="text-4xl font-bold text-emerald-500 mb-2">My Skills</h2>
                        <div className="w-16 h-1 rounded-full bg-emerald-500/80"></div>
                    </div>

                    <div className="flex flex-col gap-10 text-foreground/90 font-mono text-sm md:text-base w-full mt-4">
                        {(['frontend', 'backend', 'tools'] as const).map(category => (
                            <div key={category} className="flex flex-col gap-4">
                                <h3 className="font-bold text-primary text-xl border-b border-white/10 pb-2 capitalize">{category}</h3>
                                <div className="grid grid-cols-2 gap-3 pt-2 md:hidden">
                                    {(portfolioData.skills[category]).map(icon => (
                                        <div key={icon.name} className="w-full min-w-0 flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors cursor-default shadow-sm group">
                                            <img src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${icon.icon}`} className="w-6 h-6 shrink-0 group-hover:scale-110 transition-transform" alt={icon.name} />
                                            <span className="font-medium text-xs truncate">{icon.name}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="hidden md:flex md:flex-col md:gap-4 md:pt-2">
                                    {Array.from(
                                        { length: Math.ceil(portfolioData.skills[category].length / 6) },
                                        (_, rowIndex) => portfolioData.skills[category].slice(rowIndex * 6, rowIndex * 6 + 6)
                                    ).map((row, rowIndex) => (
                                        <div key={`${category}-row-${rowIndex}`} className="flex flex-wrap gap-4">
                                            {row.map(icon => (
                                                <div key={icon.name} className="flex items-center gap-3 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors cursor-default shadow-sm group">
                                                    <img src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${icon.icon}`} className="w-8 h-8 group-hover:scale-110 transition-transform" alt={icon.name} />
                                                    <span className="font-medium">{icon.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        case 'services':
            return (
                <div className="flex flex-col gap-6 py-2 mt-4">
                    <div className="flex flex-col mb-4 items-start">
                        <h2 className="text-4xl font-bold text-emerald-500 mb-2">My Services</h2>
                        <div className="w-16 h-1 rounded-full bg-emerald-500/80"></div>
                    </div>

                    <div className="max-w-4xl text-foreground/90 text-sm md:text-base leading-relaxed">
                        <p>
                            I am a Full-Stack Developer with 6 years of experience, specializing in building scalable,
                            high-performance web and mobile applications.
                        </p>
                        <p className="mt-3">
                            I work across the entire stack from clean, intuitive user interfaces to secure, efficient backend systems.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full mt-2">
                        <div className="flex flex-col border border-white/10 rounded-2xl p-6 bg-[#161b22] hover:border-emerald-500/50 transition-all">
                            <div className="text-2xl mb-3">Web Design</div>
                            <p className="text-foreground/75 text-sm leading-relaxed flex-grow">
                                I build fast, responsive, and scalable web applications using modern frameworks and best practices.
                                From landing pages to complex dashboards, I focus on performance, accessibility, and clean code.
                            </p>
                            <span className="mt-5 self-start px-3 py-1 rounded-md border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 text-xs uppercase tracking-[0.18em]">
                                Available
                            </span>
                        </div>

                        <div className="flex flex-col border border-white/10 rounded-2xl p-6 bg-[#161b22] hover:border-cyan-400/50 transition-all">
                            <div className="text-2xl mb-3">Mobile App</div>
                            <p className="text-foreground/75 text-sm leading-relaxed flex-grow">
                                I develop cross-platform and web-based mobile applications with a focus on usability and performance,
                                ensuring seamless experiences across devices.
                            </p>
                            <span className="mt-5 self-start px-3 py-1 rounded-md border border-cyan-400/40 bg-cyan-500/10 text-cyan-200 text-xs uppercase tracking-[0.18em]">
                                Available
                            </span>
                        </div>

                        <div className="flex flex-col border border-white/10 rounded-2xl p-6 bg-[#161b22] hover:border-amber-400/50 transition-all">
                            <div className="text-2xl mb-3">UI/UX Design</div>
                            <p className="text-foreground/75 text-sm leading-relaxed flex-grow">
                                I design intuitive and user-centered interfaces that balance aesthetics with usability.
                                My goal is to create experiences that are simple, engaging, and effective.
                            </p>
                            <span className="mt-5 self-start px-3 py-1 rounded-md border border-amber-400/40 bg-amber-500/10 text-amber-200 text-xs uppercase tracking-[0.18em]">
                                Available
                            </span>
                        </div>

                        <div className="flex flex-col border border-white/10 rounded-2xl p-6 bg-[#161b22] hover:border-rose-400/50 transition-all">
                            <div className="text-2xl mb-3">Backend & API Development</div>
                            <p className="text-foreground/75 text-sm leading-relaxed flex-grow">
                                I build secure and scalable backend systems and RESTful APIs, ensuring efficient data handling and
                                seamless integration with frontend applications.
                            </p>
                            <span className="mt-5 self-start px-3 py-1 rounded-md border border-rose-400/40 bg-rose-500/10 text-rose-200 text-xs uppercase tracking-[0.18em]">
                                Available
                            </span>
                        </div>
                    </div>
                </div>
            );
        case 'projects':
            return <FilteredProjects />;
        case 'contact':
            return (
                <div className="flex flex-col gap-6 py-2 mt-4">
                    <div className="flex flex-col mb-4 items-start">
                        <h2 className="text-4xl font-bold text-emerald-500 mb-2">Get In Touch</h2>
                        <div className="w-16 h-1 rounded-full bg-emerald-500/80"></div>
                        <p className="mt-4 text-foreground/75 text-sm md:text-base">
                            Let&apos;s discuss your next project or opportunity.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full mt-2">
                        <div className="rounded-2xl border border-white/10 bg-[#161b22] p-6">
                            <h3 className="text-xl font-bold text-foreground">Contact Information</h3>
                            <p className="mt-4 text-foreground/70 text-sm leading-relaxed">
                                I&apos;m always interested in hearing about new projects and opportunities.
                                Whether you have a question or just want to say hi, feel free to reach out.
                            </p>

                            <div className="mt-7 space-y-5">
                                <a href={`mailto:${portfolioData.contact.email}`} className="flex items-start gap-3 group">
                                    <Mail className="w-5 h-5 mt-0.5 text-emerald-400" />
                                    <div>
                                        <p className="text-sm font-semibold text-foreground">Email</p>
                                        <p className="text-foreground/70 text-sm break-all group-hover:text-emerald-300 transition-colors font-mono">
                                            {portfolioData.contact.email}
                                        </p>
                                    </div>
                                </a>
                                <a href={portfolioData.contact.whatsappUrl} target="_blank" rel="noreferrer" className="flex items-start gap-3 group">
                                    <Phone className="w-5 h-5 mt-0.5 text-cyan-300" />
                                    <div>
                                        <p className="text-sm font-semibold text-foreground">Phone</p>
                                        <p className="text-foreground/70 text-sm group-hover:text-cyan-200 transition-colors font-mono">
                                            {portfolioData.contact.whatsapp}
                                        </p>
                                    </div>
                                </a>
                                <div className="flex items-start gap-3">
                                    <MapPin className="w-5 h-5 mt-0.5 text-amber-300" />
                                    <div>
                                        <p className="text-sm font-semibold text-foreground">Location</p>
                                        <p className="text-foreground/70 text-sm font-mono">{portfolioData.about.location}</p>
                                    </div>
                                </div>
                                <a href={portfolioData.contact.linkedinUrl} target="_blank" rel="noreferrer" className="flex items-start gap-3 group">
                                    <Linkedin className="w-5 h-5 mt-0.5 text-blue-300" />
                                    <div>
                                        <p className="text-sm font-semibold text-foreground">LinkedIn</p>
                                        <p className="text-foreground/70 text-sm group-hover:text-blue-200 transition-colors font-mono">
                                            {portfolioData.contact.linkedin}
                                        </p>
                                    </div>
                                </a>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-[#161b22] p-6">
                            <form className="space-y-4">
                                <div>
                                    <label htmlFor="contact-name" className="block text-sm font-semibold text-foreground mb-2">Name</label>
                                    <input
                                        id="contact-name"
                                        type="text"
                                        placeholder="John Doe"
                                        className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-foreground placeholder:text-foreground/45 outline-none focus:border-emerald-400/50"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="contact-email" className="block text-sm font-semibold text-foreground mb-2">Email</label>
                                    <input
                                        id="contact-email"
                                        type="email"
                                        placeholder="john@example.com"
                                        className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-foreground placeholder:text-foreground/45 outline-none focus:border-emerald-400/50"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="contact-subject" className="block text-sm font-semibold text-foreground mb-2">Subject</label>
                                    <input
                                        id="contact-subject"
                                        type="text"
                                        placeholder="Project inquiry"
                                        className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-foreground placeholder:text-foreground/45 outline-none focus:border-emerald-400/50"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="contact-message" className="block text-sm font-semibold text-foreground mb-2">Message</label>
                                    <textarea
                                        id="contact-message"
                                        rows={5}
                                        placeholder="Tell me about your project..."
                                        className="w-full resize-none rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-foreground placeholder:text-foreground/45 outline-none focus:border-emerald-400/50"
                                    />
                                </div>
                                <button
                                    type="button"
                                    className="w-full rounded-lg border border-emerald-500/40 bg-emerald-500/10 py-2.5 text-sm font-semibold text-emerald-300 hover:bg-emerald-500/20 transition-colors"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            );
        case 'resume':
            return <ResumeDownload />;
        case 'theme':
            if (setTheme && theme) {
                const newTheme = theme === 'dark' ? 'light' : 'dark';
                setTheme(newTheme);
                return <div className="text-accent">Theme switched to {newTheme} mode.</div>;
            }
            return <div>Theme toggle not available.</div>;
        case '':
            return null;
        case 'clear':
            return null;
        case 'close':
            return null;
        default:
            return <div className="text-red-500">Command not found: {mainCmd}. Type &quot;help&quot; for a list of commands.</div>;
    }
};

const ResumeDownload = () => {
    useEffect(() => {
        const link = document.createElement('a');
        link.href = portfolioData.contact.resume;
        link.download = 'Janrey_Mina_Resume.pdf';
        link.click();
    }, []);

    return (
        <div className="flex flex-col gap-4 py-2">
            <div className="flex items-center gap-2 text-emerald-400">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <p className="font-mono">Initiating resume download...</p>
            </div>
            <div className="text-sm text-foreground/60 font-mono pl-4">
                Thank you for your interest! If the download doesn&apos;t start automatically,
                you can use the button below.
            </div>
            <a
                href={portfolioData.contact.resume}
                download="Janrey_Mina_Resume.pdf"
                className="w-fit mt-2 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm font-semibold text-emerald-300 hover:bg-emerald-500/20 transition-all flex items-center gap-2"
            >
                <ExternalLink className="w-4 h-4" />
                Manually Download Resume
            </a>
        </div>
    );
};

const FilteredProjects = () => {
    const [filter, setFilter] = useState('All');
    const [visibleCount, setVisibleCount] = useState(6);
    const [selectedProject, setSelectedProject] = useState<any>(null);
    const filters = ['All', 'Next.js', 'Laravel', 'WordPress', 'Vue', 'Flutter'];

    const projects = portfolioData.projects;

    const allFilteredProjects = filter === 'All'
        ? projects
        : projects.filter(p => p.tags.includes(filter));

    const displayedProjects = allFilteredProjects.slice(0, visibleCount);

    const handleFilterChange = (f: string) => {
        setFilter(f);
        setVisibleCount(6);
    };

    const getSkillIcon = (tagName: string) => {
        const allSkills = [
            ...portfolioData.skills.frontend,
            ...portfolioData.skills.backend,
            ...portfolioData.skills.tools
        ];
        // Standardize tag names vs skill names (e.g., TailwindCSS vs Tailwind CSS)
        const normalizedTag = tagName.toLowerCase().replace(/\s/g, '').replace(/\./g, '');
        const skill = allSkills.find(s => 
            s.name.toLowerCase().replace(/\s/g, '').replace(/\./g, '') === normalizedTag
        );
        
        if (skill) {
            return (
                <img 
                    src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${skill.icon}`} 
                    className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" 
                    alt={tagName} 
                />
            );
        }
        return <Code className="w-4 h-4 text-emerald-500/50" />;
    };

    return (
        <div className="flex flex-col gap-6 py-2 mt-4 relative">
            <div className="flex flex-col mb-4 items-start">
                <h2 className="text-4xl font-bold text-emerald-500 mb-2">My Projects</h2>
                <div className="w-16 h-1 rounded-full bg-emerald-500/80"></div>
            </div>

            {/* Filter Buttons */}
            <div className="mb-2 grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-wrap gap-2.5 md:gap-3">
                {filters.map(f => (
                    <button
                        key={f}
                        onClick={() => handleFilterChange(f)}
                        className={`w-full md:w-auto px-3 md:px-4 py-2 md:py-1.5 rounded-lg md:rounded-full text-xs md:text-sm font-mono text-center transition-all border outline-none ${filter === f
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-[0_0_12px_rgba(16,185,129,0.2)]'
                            : 'bg-white/5 text-foreground/75 border-white/10 hover:bg-white/10 hover:text-white'
                            }`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* Projects Grid - Clean Mockup Style */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full mt-2">
                {displayedProjects.map(project => (
                    <div
                        key={project.title}
                        onClick={() => setSelectedProject(project)}
                        className="group relative flex flex-col border border-white/10 rounded-2xl bg-[#161b22] overflow-hidden cursor-pointer hover:border-emerald-500/50 transition-all duration-300"
                    >
                        {/* macOS Window Header Bar */}
                        <div className="w-full bg-[#1c2128] border-b border-white/10 px-4 py-3 flex items-center justify-between">
                            <div className="flex gap-1.5 items-center">
                                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></div>
                            </div>
                            <div className="p-1 rounded-md bg-white/5 border border-white/5 text-foreground/20 group-hover:text-emerald-500/30 transition-colors">
                                <ExternalLink className="w-3 h-3" />
                            </div>
                        </div>

                        {/* Thumbnail Container - Solid & Clean with Subtle Vignette */}
                        <div className="aspect-video w-full overflow-hidden relative bg-[#0a0c10] flex items-center justify-center">
                            {project.thumbnail ? (
                                <div className="w-full h-full relative">
                                    <img
                                        src={project.thumbnail}
                                        alt={project.title}
                                        className="w-full h-full object-top object-cover transition-all duration-500 brightness-[0.85] group-hover:brightness-100 group-hover:scale-105"
                                    />
                                    {/* Subtle Inner Highlight & Vignette to anchor bright images */}
                                    <div className="absolute inset-0 pointer-events-none border border-white/5 rounded-none" />
                                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/20 via-transparent to-black/10 transition-opacity duration-500 opacity-100 group-hover:opacity-40" />
                                </div>
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <Folder className="w-12 h-12 text-emerald-500/30" />
                                </div>
                            )}
                        </div>

                        {/* Content Area - Clean Typography */}
                        <div className="p-6 flex flex-col flex-grow bg-gradient-to-b from-transparent to-black/30">
                            <div className="flex justify-between items-start mb-3">
                                <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors tracking-tight">{project.title}</h3>
                            </div>
                            <p className="text-foreground/60 text-sm line-clamp-2 leading-relaxed mb-6 font-medium">
                                {project.description}
                            </p>
                            <div className="flex flex-wrap gap-2.5 mt-auto">
                                {project.tags.slice(0, 3).map((tag: string) => (
                                    <span key={tag} className="text-[10px] uppercase tracking-wider font-mono px-2.5 py-1 bg-emerald-500/5 text-emerald-400/80 rounded-md border border-emerald-500/10">
                                        {tag}
                                    </span>
                                ))}
                                {project.tags.length > 3 && (
                                    <span className="text-[10px] font-mono px-2.5 py-1 bg-white/5 text-foreground/40 rounded-md border border-white/10">
                                        +{project.tags.length - 3}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Project Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 overflow-hidden">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedProject(null)}
                            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
                        />
                        
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 30 }}
                            transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
                            className="relative w-full max-w-3xl bg-[#0d1117] border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl z-10"
                            onClick={e => e.stopPropagation()}
                        >
                            {/* Modal Close Control */}
                            <button 
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-6 right-6 z-20 p-2 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 text-white/70 hover:text-white transition-all outline-none"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="flex flex-col h-full max-h-[90vh] overflow-y-auto no-scrollbar">
                                {/* Top: Image/Thumbnail - Clean Header Style with Vignette */}
                                <div className="w-full aspect-video md:aspect-[21/9] relative overflow-hidden bg-[#0a0c10]">
                                    {selectedProject.thumbnail ? (
                                        <div className="w-full h-full relative">
                                            <img 
                                                src={selectedProject.thumbnail} 
                                                alt={selectedProject.title}
                                                className="w-full h-full object-top object-cover brightness-[0.85]"
                                            />
                                            {/* Soft Vignette to prevent harsh white-on-dark contrast */}
                                            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0d1117] via-[#0d1117]/40 to-transparent" />
                                            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent h-24" />
                                        </div>
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-white/5 text-emerald-500/20">
                                            <Folder className="w-24 h-24" />
                                        </div>
                                    )}
                                    {/* Sublte top shadow to anchor navigation controls */}
                                    <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/40 to-transparent" />
                                </div>

                                {/* Content Section */}
                                <div className="p-8 md:p-12 relative flex flex-col">
                                    {/* Live Link Arrow Button - Top Right of Content */}
                                    {selectedProject.link && selectedProject.link !== '#' && (
                                        <a 
                                            href={selectedProject.link} 
                                            target="_blank" 
                                            rel="noreferrer"
                                            className="absolute top-8 right-8 md:top-12 md:right-12 p-3 rounded-full border border-white/10 bg-white/5 hover:bg-emerald-500 hover:text-black hover:border-emerald-500 text-foreground/50 transition-all group"
                                            title="Visit Live Site"
                                        >
                                            <ExternalLink className="w-5 h-5 transition-transform group-hover:scale-110" />
                                        </a>
                                    )}

                                    {/* Title & Subtitle */}
                                    <div className="pr-16">
                                        <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">{selectedProject.title}</h3>
                                        <p className="text-blue-400 font-semibold mt-2 text-lg">{selectedProject.subtitle}</p>
                                    </div>

                                    {/* Description */}
                                    <div className="mt-8 mb-10">
                                        <p className="text-foreground/70 leading-relaxed text-base md:text-lg whitespace-pre-line font-medium">
                                            {selectedProject.description}
                                        </p>
                                    </div>

                                    {/* Tech Stack - With Icons */}
                                    <div className="mt-auto border-t border-white/10 pt-8">
                                        <div className="flex flex-wrap gap-4">
                                            {selectedProject.tags.map((tag: string) => (
                                                <div 
                                                    key={tag} 
                                                    className="flex items-center gap-2.5 px-4 py-2 bg-[#161b22] border border-white/10 rounded-full transition-colors hover:border-emerald-500/30 group"
                                                >
                                                    {getSkillIcon(tag)}
                                                    <span className="text-sm font-mono text-foreground/80 group-hover:text-foreground transition-colors">{tag}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Load More Button */}
            {visibleCount < allFilteredProjects.length && (
                <div className="flex justify-center mt-6">
                    <button
                        onClick={() => setVisibleCount(prev => prev + 6)}
                        className="px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-foreground font-mono transition-colors"
                    >
                        Load More Projects
                    </button>
                </div>
            )}
        </div>
    );
};
