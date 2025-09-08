"use client";
import { useRef } from "react";
import { motion, useInView } from "motion/react";
import Image from "next/image";
import styles from "./page.module.scss";
import Footer from "@/components/footer/Footer";



type Profile = {
    profileImage: string,
    name: string,
    role: string,
    bio: string,

}

const ProfileCard = ({profileImage, name, role, bio}: Profile) => {
    return (
        <div className={styles.profileCard}>
            <div className={styles.profileCard__picture}>
                <Image
                    src={profileImage}
                    alt={name}
                    width={400}
                    height={400}
                />
                <div className={styles.profileCard__info}>
                    <h3>{name}</h3>
                    <p className={styles.role}>{role}</p>
                    <p className={styles.bio}>{bio}</p>
                </div>
            </div>
        </div>
    )
}

const AboutUs = () => {
    const headerRef = useRef<HTMLDivElement|null>(null)

    const headerRefIsInView = useInView(headerRef, {amount: "some", once: true})
    return(
        <div
            className={styles.aboutUs}
        >
            <div className={styles.aboutUs__header} ref={headerRef}>
                <div className={styles.aboutUs__header__image}>
                    {headerRefIsInView && (
                        <Image
                            src="/company-animate.svg"
                            alt="rexon members"
                            style={{ width: "100%", height: "auto" }}
                        />
                    )}
                </div>
                <motion.div 
                    className={styles.aboutUs__header__text}
                    initial={{ opacity: 0, x: 30 }}
                    animate={headerRefIsInView? { opacity: 1, x: 0 } : {opacity: 0, x: 30}}
                    transition={{ duration: 0.8, delay: 1.5 }}
                >

                    <h2>
                        Meet the Engineers of Rexon Dev
                    </h2>
                    <p>
                        We are not just developers and designers; we are a team of actual engineers driven by a shared passion for building robust and elegant digital solutions. For us, creativity personified is about applying a methodical, engineering mindset to every challenge, transforming your digital dreams into tangible realities.
                    </p>
                </motion.div>
            </div>
            <motion.div className={styles.ourEngineers}>
                {[
                    {
                        profileImage: "/profiles/joePP.jpg",
                        name: "Joseph Aneto",
                        role: "Full-Stack Engineer, Chief Executive Officer",
                        bio: "Joe, CEO and founder, blends technical expertise with creative vision. A full-stack developer skilled in front-end, back-end and web3 technologies, he leads the agency in building sleek, scalable apps. His passion for beautiful UI—and a love for anime—shapes the team’s culture and innovation."
                    },{
                        profileImage: "/profiles/divinePP.jpg",
                        name: "Divine Nwachukwu",
                        role: "Mobile Engineer, Co-founder",
                        bio: "Divine, co-founder and mobile software engineer, is passionate about crafting seamless mobile experiences. Skilled in Flutter, he focuses on performance optimization and intuitive design, ensuring our apps are not only functional but also delightful to use on any device."
                    },{
                        profileImage: "/profiles/michealPP.jpg",
                        name: "Micheal Emmanuel",
                        role: "Front-end Engineer, Chief Technical Officer",
                        bio: "Micheal, our CTO, specializes in frontend development with a focus on sleek, responsive design and intuitive user interfaces. Skilled in React, Next.js, and modern CSS frameworks, he drives the agency’s frontend vision, ensuring every product feels as good as it looks, cause what's a product without good ui."
                    },{
                        profileImage: "/profiles/umorenPP.jpg",
                        name: "Emmanuel Umoren",
                        role: "UI/UX Engineer, Chief Product Officer",
                        bio: "Emmanuel, CPO and lead UI/UX engineer, combines a keen eye for design with a user-centric approach. Proficient in Figma, and user research methodologies, he ensures every project not only meets business goals but also delivers an exceptional user experience and best believe he's always ging to deliver."
                    },{
                        profileImage: "/profiles/ifeanyiPP.jpg",
                        name: "Ifeanyi Ojukwu",
                        role: "UI/UX Engineer",
                        bio: "Ifeanyi, a talented UI/UX engineer, is dedicated to creating intuitive and engaging user experiences. With expertise in design tools like Figma and a strong understanding of user behavior, he crafts interfaces that are both visually appealing and easy to navigate."
                    }
                ].map((engineers, idx)=>(
                    <ProfileCard
                        key={idx}
                        profileImage={engineers.profileImage}
                        name={engineers.name}
                        role={engineers.role}
                        bio={engineers.bio}
                    />
                ))}
                
            </motion.div>
            <div>
                <Footer/>
            </div>
        </div>
    )
}

export default AboutUs;
