import React, { useState } from 'react';
import { Code, GraduationCap, Briefcase, Award, Folder, ExternalLink, Mail, Linkedin, LucideIcon, Phone, MapPin } from 'lucide-react';
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
                        <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/80">Home Screen</p>
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
                            href="/resume.pdf"
                            target="_blank"
                            rel="noreferrer"
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
                                <div className="flex flex-wrap gap-4 pt-2">
                                    {(portfolioData.skills[category]).map(icon => (
                                        <div key={icon.name} className="flex items-center gap-3 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors cursor-default shadow-sm group">
                                            <img src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${icon.icon}`} className="w-8 h-8 group-hover:scale-110 transition-transform" alt={icon.name} />
                                            <span className="font-medium">{icon.name}</span>
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
                        <p className="text-xs uppercase tracking-[0.35em] text-emerald-300/80">What I Offer</p>
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

const FilteredProjects = () => {
    const [filter, setFilter] = useState('All');
    const [visibleCount, setVisibleCount] = useState(6);
    const filters = ['All', 'Next.js', 'Laravel', 'WordPress', 'Flutter'];

    const projects = portfolioData.projects;

    const allFilteredProjects = filter === 'All'
        ? projects
        : projects.filter(p => p.tags.includes(filter));

    const displayedProjects = allFilteredProjects.slice(0, visibleCount);

    const handleFilterChange = (f: string) => {
        setFilter(f);
        setVisibleCount(6);
    };

    return (
        <div className="flex flex-col gap-6 py-2 mt-4">
            <div className="flex flex-col mb-4 items-start">
                <h2 className="text-4xl font-bold text-emerald-500 mb-2">My Projects</h2>
                <div className="w-16 h-1 rounded-full bg-emerald-500/80"></div>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-3 mb-2">
                {filters.map(f => (
                    <button
                        key={f}
                        onClick={() => handleFilterChange(f)}
                        className={`px-4 py-1.5 rounded-full text-sm font-mono transition-all border outline-none ${filter === f
                            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                            : 'bg-white/5 text-foreground/70 border-white/10 hover:bg-white/10 hover:text-white'
                            }`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-2">
                {displayedProjects.map(project => (
                    <div key={project.title} className="flex flex-col border border-white/10 rounded-2xl p-6 bg-[#161b22] hover:border-emerald-500/50 transition-all group relative">
                        {/* macOS Window Controls */}
                        <div className="flex gap-1.5 mb-4 items-center">
                            <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                            <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                        </div>
                        <div className="flex justify-between items-start mb-4">
                            <Folder className="w-8 h-8 text-emerald-500" />
                            <a href={project.link} className="p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer">
                                <ExternalLink className="w-5 h-5 text-foreground/50 hover:text-emerald-500 transition-colors" />
                            </a>
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-emerald-400 transition-colors">{project.title}</h3>
                        <p className="text-foreground/70 text-sm mb-6 flex-grow font-mono leading-relaxed">
                            {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 text-xs font-mono">
                            {project.tags.map(tag => (
                                <span key={tag} className="px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded-md">{tag}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

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
