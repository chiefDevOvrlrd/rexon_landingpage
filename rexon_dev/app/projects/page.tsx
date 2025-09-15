"use client"

import styles from "./page.module.scss";
import { motion, useInView } from "motion/react";
import { useState, useRef } from "react"
import Image from "next/image"
import WhiteButton from "@/components/ui/WhiteButton";
import LoaderButton from "@/components/ui/LoaderButton";
import Footer from "@/components/footer/Footer";

type DesignShowcaseProps = {
    thumbnail: string;
    title: string; 
    tag: string;
    description: string;    
    teaser?: string;
    embed?: string;
};

type HoverCardProps = {
    image: string;
    title: string;
    description: string;
};

type ProjectsProps = DesignShowcaseProps & { custom?: number };

const textFallVariant = {
    hidden: { opacity: 0, y: -50 },
    visible: (i: number) => ({
        opacity: 1, y: 0,
        transition: {
            duration: 0.5,
            delay: i * 0.1,
            ease: "easeInOut" as const,
        }
    }),
}

const infoVariant = {
    hidden: { opacity: 0, y: 5 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: .1 } }, 
}

const textVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({ 
        opacity: 1, y: 0, 
        transition: { 
            duration: 0.5, 
            delay: i * 0.3, 
        } 
    }), 
}

const DesignShowcase = ({thumbnail, title, tag, description, teaser, embed, custom = 0}: ProjectsProps) => {
    const [hovered, setHovered] = useState(false);
    const [showEmbed, setShowEmbed] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleShowEmbed = () => {
        setLoading(true);
        setShowEmbed(true);
        setHovered(true);
        setTimeout(() => {
        setLoading(false);
        }, 9000); // 9 seconds
    };

    const handleCloseEmbed = () => {
        setShowEmbed(false);
        setLoading(false);
        setHovered(false);
    };
    return (
        <motion.div className={styles.card__container}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => {
                setHovered(false);
                setShowEmbed(false);
                setLoading(false);
            }}
        >
            <motion.div className={styles.card} layoutId="card-media">
                <img src={thumbnail} alt={title}  className={styles.card__image} />
            </motion.div>
            <div className={styles.card__overlay}>
                <motion.div className={styles.card__media} layoutId="card-media">
                    {teaser ? (
                        !hovered ? (
                            thumbnail && <img src={thumbnail} alt={title}/>
                        ) : (
                            <video
                                autoPlay
                                loop
                                muted
                                playsInline
                                style={{ width: "100%", borderRadius: "12px" }}
                            >
                                <source src={teaser} type="video/mp4" />
                                y0ur browser does not support the video tag.
                            </video>
                        )
                    ) : (
                        thumbnail && <img src={thumbnail} alt={title}/>
                    )}
                    {/* Show embed iframe if embed exists and showEmbed is true */}
                    {embed && embed.trim() !== "" && showEmbed && hovered && (
                        <iframe
                            src={embed}
                            style={{ border: "1px solid rgba(0,0,0,0.1)", width: "100%", height: "200px", borderRadius: "12px" }}
                            allowFullScreen
                            title="Figma Embed"
                            className={styles.showcase__iframe}
                        />
                    )}
                </motion.div>
                <div className={styles.card__content}>
                    <h2 className={styles.card__title}>{title}</h2>
                    <span className={styles.card__tag}>{tag}</span>
                    <p className={styles.card__description}>{description}</p>
                    <div className={styles.figma__button__container}>
                        {embed && embed.trim() !== "" && hovered &&( 
                            loading ? (
                            <LoaderButton disabled />
                            ) : showEmbed ? (
                            <WhiteButton
                                text="Close"
                                onClick={handleCloseEmbed}
                            />
                            )  : (
                            <WhiteButton
                                text="Show Figma"
                                
                                onClick={handleShowEmbed}
                            />
                            )
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

// function DesignShowcase ({thumbnail, title, tag, description, teaser, embed, custom = 0}: ProjectsProps){
//     const [hovered, setHovered] = useState(false);
//     const [showEmbed, setShowEmbed] = useState(false);
//     const [loading, setLoading] = useState(false);

//     const handleShowEmbed = () => {
//         setLoading(true);
//         setShowEmbed(true);
//         setHovered(true);
//         setTimeout(() => {
//         setLoading(false);
//         }, 9000); // 9 seconds
//     };

//     const handleCloseEmbed = () => {
//         setShowEmbed(false);
//         setLoading(false);
//         setHovered(false);
//     };
//     return(
//         <motion.div
//             className={styles.showcase__grid__item}
//             onMouseEnter={() => setHovered(true)}
//             onMouseLeave={() => {
//                 setHovered(false);
//                 setShowEmbed(false);
//                 setLoading(false);
//             }}
//             variants={textVariant} custom={custom}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, amount: 0.5 }}
//         >
//         <div className={styles.showcase__media}>
//             {/* Netflix effect: swap image for video on hover if teaser exists */}
//             {teaser ? (
//             !hovered ? (
//                 thumbnail && <Image src={thumbnail} alt={title} width={400} height={200} />
//             ) : (
//                 <video
//                 autoPlay
//                 loop
//                 muted
//                 playsInline
//                 className={styles.showcase__video}
//                 style={{ width: "100%", borderRadius: "12px" }}
//                 >
//                 <source src={teaser} type="video/mp4" />
//                 y0ur browser does not support the video tag.
//                 </video>
//             )
//             ) : (
//             thumbnail && <Image src={thumbnail} alt={title} width={400} height={200} />
//             )}
//             {/* Show embed iframe if embed exists and showEmbed is true */}
//             {embed && embed.trim() !== "" && showEmbed && hovered && (
//             <iframe
//                 src={embed}
//                 style={{ border: "1px solid rgba(0,0,0,0.1)", width: "100%", height: "200px", borderRadius: "12px" }}
//                 allowFullScreen
//                 title="Figma Embed"
//                 className={styles.showcase__iframe}
//             />
//             )}
//         </div>
//         <motion.div 
//             className={styles.showcase__info}
//             variants={infoVariant}
//             initial="hidden"
//             animate={hovered ? "visible" : "hidden"}
//             exit={"hidden"}
//         >
//             <h2>{title}</h2>
//             <span>{tag}</span>
//             <p>{description}</p>
//             {/* Show Figma button on hover if embed exists */}
//             <div className={styles.figma__button__container}>
//             {embed && embed.trim() !== "" && hovered &&( 
//                 loading ? (
//                 <LoaderButton disabled />
//                 ) : showEmbed ? (
//                 <WhiteButton
//                     text="Close"
//                     onClick={handleCloseEmbed}
//                 />
//                 )  : (
//                 <WhiteButton
//                     text="Show Figma"
                    
//                     onClick={handleShowEmbed}
//                 />
//                 )
//             )}

//             </div>
//         </motion.div>

//         </motion.div>
//     )
// };

const Projects = () => {
    const headerRef = useRef<HTMLDivElement | null>(null)

    const headerIsInView = useInView(headerRef, {amount: "all", once: true})

    return (
        <div className={styles.projects}>
            <div className={styles.projects__header}
                ref={headerRef}
            >
                <div className={styles.projects__header__text}>
                    <motion.h1 
                        variants={textFallVariant}
                        initial="hidden"
                        animate={headerIsInView ? "visible" : "hidden"}
                        custom={0}
                    >
                        Showcase that
                    </motion.h1>
                    <motion.h1 
                        variants={textFallVariant}
                        initial="hidden"
                        animate={headerIsInView ? "visible" : "hidden"}
                        custom={1}
                    >
                        shows just
                    </motion.h1>
                    <motion.h1 
                        variants={textFallVariant}
                        initial="hidden"
                        animate={headerIsInView ? "visible" : "hidden"}
                        custom={2}
                    >
                        enough!
                    </motion.h1>
                    <motion.h3
                        variants={textFallVariant}
                        initial="hidden"
                        animate={headerIsInView ? "visible" : "hidden"}
                        custom={4}
                    >
                        We&apos;re not just showing off; we&apos;re showcasing the dreams we&apos;re making come true—one project at a time.
                    </motion.h3>
                </div>
                <div className={styles.projects__header__image}>
                    {headerIsInView && (
                        <Image src="/innovation-animate.svg" alt="rexon showcase"
                            width={600}
                            height={600}
                        />
                    )}                
                </div>
            </div>
            <div className={styles.projects__content}>
                <ol>
                    <li> Hold hover on projects with <span>web development</span>, <span>app development</span> to watch project teaser video</li>
                    <li> Disclaimer: Not all projects listed here are commissioned company projects. Some are personal works created to demonstrate individual excellence, creativity, and technical expertise.</li>
                </ol>
                <div className={styles.projects__content__grid}>
                    {[
                        {
                            thumbnail: "/projects/the-ark.svg",
                            title: "The Ark",
                            tag: "Web 3, Design",
                            description: "A sleek, modern website for a cutting-edge tech startup, showcasing their innovative solutions and dynamic team.",
                            embed: "https://embed.figma.com/design/eHBxWHbbkw2PnXlTW1o4iR/TheArk?node-id=0-1&embed-host=share",
                            teaser:"",
                        },{
                            thumbnail: "/projects/mzaccmainlogo.png",
                            title: "Mzacc Global",
                            tag: "Web Development",
                            description:"A clean and modern landing page designed for a startup and its ten sub-companies. Showcases brand identity, smooth color transition, and a scalable layout built to unify multiple services under one platform.",
                            embed: "",
                            teaser: "/videos/mzacc.mp4",
                        },{
                            thumbnail: "/projects/gm-coffee.svg",
                            title: "GM Coffee",
                            tag: "Web3, Design",
                            description: "Web3-powered UI for a ‘Buy Me a Coffee’ app, enabling simple crypto donations with a smooth, creator-focused experience.",
                            embed: "https://embed.figma.com/design/xIbUBunXa3SOsbcwIrzMRs/GM-Coffee?node-id=0-1&embed-host=share",
                            teaser: "",
                        },{
                            thumbnail: "/projects/attend.png",
                            title: "Attend",
                            tag: "Web Development",
                            description: "A sleek, modern landing page for a cutting-edge tech startup, showcasing their innovative solutions and dynamic team.",
                            embed: "",
                            teaser: "/videos/attend.mp4",
                        }
                    ].map((project, index) => (
                        <DesignShowcase 
                            key={index}
                            thumbnail={project.thumbnail}
                            title={project.title}
                            tag={project.tag}
                            description={project.description}
                            teaser={project.teaser}
                            embed={project.embed}
                        />
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    ) 
}

export default Projects