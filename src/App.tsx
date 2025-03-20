import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import DearMeImage from './assets/DearMe.png';
import FitTrackImage from './assets/fitTrack.png';
import BringThemHome from './assets/BringThemHome.png';
import {
  Instagram,
  Linkedin,
  Twitter,
  Database,
  Rocket,
  Mail,
  GitBranch,
  Beaker,
  TestTube,
  Theater,
  FileType,
  Paintbrush,
  Layout,
  Server,
  Component,
  ArrowUp,
  Moon,
  Sun,
  CloudLightning,
  Cat,
  Facebook,
  Github,
} from 'lucide-react';

function useTypingEffect(
  texts: string[],
  typingSpeed = 50,
  erasingSpeed = 30,
  delayBetweenTexts = 2000
) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let timeout: number;

    if (isTyping) {
      if (displayText !== texts[currentIndex]) {
        timeout = window.setTimeout(() => {
          setDisplayText(texts[currentIndex].slice(0, displayText.length + 1));
        }, typingSpeed);
      } else {
        timeout = window.setTimeout(() => {
          setIsTyping(false);
        }, delayBetweenTexts);
      }
    } else {
      if (displayText === '') {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
        setIsTyping(true);
      } else {
        timeout = window.setTimeout(() => {
          setDisplayText((prevText) => prevText.slice(0, -1));
        }, erasingSpeed);
      }
    }

    return () => clearTimeout(timeout);
  }, [
    displayText,
    isTyping,
    currentIndex,
    texts,
    typingSpeed,
    erasingSpeed,
    delayBetweenTexts,
  ]);

  return displayText;
}

function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedTheme = window.localStorage.getItem('theme');
      return storedTheme ? (storedTheme as 'light' | 'dark') : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
    >
      {theme === 'light' ? (
        <Moon className="w-6 h-6" />
      ) : (
        <Sun className="w-6 h-6" />
      )}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}

function App() {
  useEffect(() => {
    const root = window.document.documentElement;
    const initialColorValue = root.classList.contains('dark')
      ? 'dark'
      : 'light';
    root.classList.add(initialColorValue);
  }, []);

  const scrollRefs = {
    about: useRef<HTMLDivElement>(null),
    experience: useRef<HTMLDivElement>(null),
    education: useRef<HTMLDivElement>(null),
    skills: useRef<HTMLDivElement>(null),
    projects: useRef<HTMLDivElement>(null),
    certifications: useRef<HTMLDivElement>(null),
  };

  const typingTexts = [
    'Full Stack Developer with a passion for creating innovative web solutions.',
    'I specialize in React, Node.js, and modern web technologies.',
    'My goal is to build efficient, scalable, and user-friendly applications.',
    "I'm always eager to learn and take on new challenges in the tech world.",
    'Runner',
    'Sports Enthusiast',
    'Coffee Lover',
    'Traveler',
    'Music Fan',
  ];

  const displayText = useTypingEffect(typingTexts);

  useEffect(() => {
    Object.values(scrollRefs).forEach((ref) => {
      const container = ref.current;
      if (!container) return;

      const scroll = () => {
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        } else {
          container.scrollLeft += 1;
        }
      };

      const intervalId = setInterval(scroll, 30);
      return () => clearInterval(intervalId);
    });
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const projects = [
    {
      name: 'Dear Me',
      color: 'from-pink-500 to-rose-500',
      description:
        'A web app to enter your thoughts, feelings, and experiences in a digital diary.',
      link: 'https://talsag-dev.github.io/dear-me/',
      image: DearMeImage,
    },
    {
      name: 'ForgeFit - Fitness Tracker',
      color: 'from-red-500 to-orange-500',
      description:
        'Monitor your workouts, set goals, and track your progress towards a healthier lifestyle. Mobile and Desktop friendly.',
      link: 'https://forge-fit.github.io/client/',
      image: FitTrackImage,
    },
    {
      name: 'Bring Them Home 🎗️',
      color: 'from-yellow-500 to-indigo-500',
      description:
        'A small static website showing the hostages and there age , story and a way to share your thoughts ',
      image: BringThemHome,
    },
    {
      name: 'Portfolio Website',
      color: 'from-blue-500 to-cyan-500',
      description:
        'Showcase your work and skills with this customizable and responsive portfolio template.',
    },
    {
      name: 'Task Management Tool',
      color: 'from-green-500 to-emerald-500',
      description:
        'Boost productivity with this intuitive task organizer and collaboration tool.',
    },
    {
      name: 'Weather App',
      color: 'from-yellow-500 to-amber-500',
      description:
        'Get accurate weather forecasts and alerts for any location around the globe.',
    },
  ];

  type Skill = {
    name: string;
    icon: React.ReactNode;
  };

  const skills: Skill[] = [
    { name: 'Git', icon: <GitBranch className="w-12 h-12" /> },
    { name: 'GCP', icon: <Rocket className="w-12 h-12" /> },
    { name: 'Jest', icon: <Beaker className="w-12 h-12" /> },
    { name: 'React Testing Library', icon: <TestTube className="w-12 h-12" /> },
    { name: 'Playwright', icon: <Theater className="w-12 h-12" /> },
    { name: 'JavaScript', icon: <FileType className="w-12 h-12" /> },
    { name: 'Kubernetes', icon: <Rocket className="w-12 h-12" /> },
    { name: 'ECMAScript', icon: <FileType className="w-12 h-12" /> },
    { name: 'Styled Components', icon: <Paintbrush className="w-12 h-12" /> },
    { name: 'Material-UI', icon: <Layout className="w-12 h-12" /> },
    { name: 'Next.js', icon: <Server className="w-12 h-12" /> },
    { name: 'React', icon: <Component className="w-12 h-12" /> },
    { name: 'Nest.js', icon: <Cat className="w-12 h-12" /> },
    { name: 'PostgreSQL', icon: <Database className="w-12 h-12" /> },
    { name: 'Express', icon: <Server className="w-12 h-12" /> },
    { name: 'Node.js', icon: <Server className="w-12 h-12" /> },
    { name: 'TypeScript', icon: <FileType className="w-12 h-12" /> },
    { name: 'MongoDB', icon: <Database className="w-12 h-12" /> },
    { name: 'Docker', icon: <Rocket className="w-12 h-12" /> },
    { name: 'vite', icon: <CloudLightning className="w-12 h-12" /> },
    { name: 'MySQL', icon: <Database className="w-12 h-12" /> },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
      <nav className="fixed w-full z-50 px-4 sm:px-6 py-6 bg-white dark:bg-black bg-opacity-90 dark:bg-opacity-90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center">
          <a
            href="/"
            className="text-2xl font-bold tracking-wider hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            Tal Sagie
          </a>
          <div className="flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-8 mt-4 sm:mt-0 items-center">
            {Object.keys(scrollRefs).map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="text-sm sm:text-base hover:text-gray-600 dark:hover:text-gray-300 transition-colors capitalize"
              >
                {section}
              </button>
            ))}
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <main className="min-h-screen flex flex-col items-center justify-center px-4 pt-20">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.p
            className="text-gray-600 dark:text-gray-400 text-xl mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Full Stack Developer
          </motion.p>

          <motion.h1
            className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-tighter mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Tal Sagie
          </motion.h1>

          <motion.div
            className="relative w-64 h-64 sm:w-80 sm:h-80 mx-auto rounded-full overflow-hidden mb-12"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <img
              src="./avatar.svg"
              alt="Tal Sagie Memoji"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            className="flex flex-col items-center gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <div className="flex gap-6">
              <a
                href="https://www.linkedin.com/in/tal-sagie-92564756/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
              >
                <Linkedin className="w-6 h-6" />
                <span className="sr-only">LinkedIn Profile</span>
              </a>

              <a
                href="https://www.facebook.com/tal.sa123/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
              >
                <Facebook className="w-6 h-6" />
                <span className="sr-only">Twitter Profile</span>
              </a>

              <a
                href="https://github.com/talsag-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
              >
                <Github className="w-6 h-6" />
                <span className="sr-only">Github Profile</span>
              </a>

              <a
                href="https://www.instagram.com/talsag/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
              >
                <Instagram className="w-6 h-6" />
                <span className="sr-only">Instagram Profile</span>
              </a>

              <a
                href="mailto:talsagie19@gmail.com"
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
              >
                <Mail className="w-6 h-6" />
                <span className="sr-only">Email Contact</span>
              </a>
            </div>
          </motion.div>
        </motion.div>
      </main>

      <section id="about" className="min-h-screen flex flex-col justify-center">
        <div
          ref={scrollRefs.about}
          className="overflow-hidden whitespace-nowrap py-20 select-none"
        >
          <div className="inline-block">
            <span className="inline-block px-4 text-[200px] font-bold opacity-20">
              About
            </span>
            <span className="inline-block px-4 text-[200px] font-bold">Me</span>
            <span className="inline-block px-4 text-[200px] font-bold opacity-20">
              About
            </span>
            <span className="inline-block px-4 text-[200px] font-bold">Me</span>
          </div>
        </div>

        <motion.div
          className="max-w-4xl mx-auto px-6 py-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Welcome to{' '}
            <a href="https://github.com/talsag-dev">
              <code className="hover:underline">@talsag-dev</code>
            </a>{' '}
            Portfolio!
          </h2>
          <div className="text-2xl md:text-3xl lg:text-4xl leading-relaxed min-h-[120px]">
            {displayText}
            <span className="animate-pulse">|</span>
          </div>
        </motion.div>
      </section>

      <section
        id="experience"
        className="min-h-screen flex flex-col justify-center"
      >
        <div
          ref={scrollRefs.experience}
          className="overflow-hidden whitespace-nowrap py-20 select-none"
        >
          <div className="inline-block">
            <span className="inline-block px-4 text-[200px] font-bold opacity-20">
              Experience
            </span>
            <span className="inline-block px-4 text-[200px] font-bold">
              Work History
            </span>
            <span className="inline-block px-4 text-[200px] font-bold opacity-20">
              Experience
            </span>
            <span className="inline-block px-4 text-[200px] font-bold">
              Work History
            </span>
          </div>
        </div>

        <motion.div
          className="max-w-4xl mx-auto px-6 py-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="space-y-12">
            <div>
              <h3 className="text-2xl font-bold mb-2">Full Stack Developer</h3>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
                retrain.ai • 2021 - Present
              </p>
              <p className="text-lg">
                Led development of multiple high-traffic web applications using
                React, Node.js, and GCP. Implemented CI/CD pipelines and
                mentored junior developers.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">
                QA Automation Developer
              </h3>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
                Perfecto • 2020 - 2021
              </p>
              <p className="text-lg">
                Collaborated with cross-functional teams (developers, QA,
                product managers) to identify critical test cases and design
                automation strategies, ensuring adherence to agile development
                cycles.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      <section
        id="education"
        className="min-h-screen flex flex-col justify-center"
      >
        <div
          ref={scrollRefs.education}
          className="overflow-hidden whitespace-nowrap py-20 select-none"
        >
          <div className="inline-block">
            <span className="inline-block px-4 text-[200px] font-bold opacity-20">
              Education
            </span>
            <span className="inline-block px-4 text-[200px] font-bold">
              Learning Path
            </span>
            <span className="inline-block px-4 text-[200px] font-bold opacity-20">
              Education
            </span>
            <span className="inline-block px-4 text-[200px] font-bold">
              Learning Path
            </span>
          </div>
        </div>

        <motion.div
          className="max-w-4xl mx-auto px-6 py-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="space-y-12">
            <div>
              <h3 className="text-2xl font-bold mb-2">B.Sc Computer Science</h3>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
                HIT - Holon Institute of Technology • 2019 - 2022
              </p>
              <p className="text-lg">
                Focused on advanced algorithms, data structures, machine
                learning, and software engineering. Graduated with honors.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">B.Sc Mathematics</h3>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
                HIT - Holon Institute of Technology • 2019 - 2022
              </p>
              <p className="text-lg">
                Specialized in advanced mathematical fields, including linear
                algebra, calculus, probability, and discrete mathematics.
                Developed strong problem-solving skills and analytical thinking,
                with a focus on applying mathematical principles to real-world
                challenges. Graduated with honors.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      <section
        id="skills"
        className="min-h-screen flex flex-col justify-center"
      >
        <div
          ref={scrollRefs.skills}
          className="overflow-hidden whitespace-nowrap py-20 select-none"
        >
          <div className="inline-block">
            <span className="inline-block px-4 text-[200px] font-bold opacity-20">
              Skills
            </span>
            <span className="inline-block px-4 text-[200px] font-bold">
              Tech Stack
            </span>
            <span className="inline-block px-4 text-[200px] font-bold opacity-20">
              Skills
            </span>
            <span className="inline-block px-4 text-[200px] font-bold">
              Tech Stack
            </span>
          </div>
        </div>
        <motion.div
          className="max-w-4xl mx-auto px-6 py-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <div key={skill.name} className="text-center">
                <motion.div
                  className="w-24 h-24 mx-auto mb-4 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  {skill.icon}
                </motion.div>
                <p className="text-lg">{skill.name}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>
      <section
        id="projects"
        className="min-h-screen flex flex-col justify-center"
      >
        <div
          ref={scrollRefs.projects}
          className="overflow-hidden whitespace-nowrap py-20 select-none"
        >
          <div className="inline-block">
            <span className="inline-block px-4 text-[200px] font-bold opacity-20">
              Projects
            </span>
            <span className="inline-block px-4 text-[200px] font-bold">
              My Work
            </span>
            <span className="inline-block px-4 text-[200px] font-bold opacity-20">
              Projects
            </span>
            <span className="inline-block px-4 text-[200px] font-bold">
              My Work
            </span>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto w-full px-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="aspect-[4/3] w-full"
                onClick={
                  project.link
                    ? () => window.open(project.link, '_blank')
                    : undefined
                }
              >
                <div className="group relative w-full h-full overflow-hidden cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl rounded-lg">
                  {project.image ? (
                    <div
                      className="absolute inset-0 bg-cover bg-center blur-sm transform scale-125"
                      style={{
                        backgroundImage: `url(${project.image})`,
                      }}
                    ></div>
                  ) : (
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${project.color}`}
                    ></div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-black/20"></div>

                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-white">
                    <h3 className="text-2xl sm:text-3xl font-bold text-center mb-4 transition-transform duration-300 group-hover:-translate-y-2">
                      {project.name}
                    </h3>
                    <p className="text-center text-sm sm:text-base opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 translate-y-4">
                      {project.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="certifications"
        className="min-h-screen flex flex-col justify-center"
      >
        <div
          ref={scrollRefs.certifications}
          className="overflow-hidden whitespace-nowrap py-20 select-none"
        >
          <div className="inline-block">
            <span className="inline-block px-4 text-[200px] font-bold opacity-20">
              Certifications
            </span>
            <span className="inline-block px-4 text-[200px] font-bold">
              Achievements
            </span>
            <span className="inline-block px-4 text-[200px] font-bold opacity-20">
              Certifications
            </span>
            <span className="inline-block px-4 text-[200px] font-bold">
              Achievements
            </span>
          </div>
        </div>

        <motion.div
          className="max-w-4xl mx-auto px-6 py-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="space-y-12">
            <div>
              <h3 className="text-2xl font-bold mb-2">
                AWS Certified Solutions Architect
              </h3>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
                Amazon Web Services • 2022
              </p>
              <p className="text-lg">
                Demonstrated expertise in designing and deploying scalable,
                highly available, and fault-tolerant systems on AWS.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">
                Certified Kubernetes Administrator (CKA)
              </h3>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
                Cloud Native Computing Foundation • 2021
              </p>
              <p className="text-lg">
                Proved proficiency in managing Kubernetes clusters and
                containerized applications at scale.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">
                MongoDB Certified Developer Associate
              </h3>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
                MongoDB • 2020
              </p>
              <p className="text-lg">
                Validated skills in developing applications using MongoDB,
                including data modeling and query optimization.
              </p>
            </div>
          </div>
        </motion.div>
      </section>
      <div className="fixed bottom-8 right-8">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="p-3 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 rounded-full transition-colors"
        >
          <ArrowUp className="w-6 h-6" />
          <span className="sr-only">Go to top</span>
        </button>
      </div>
    </div>
  );
}

export default App;
