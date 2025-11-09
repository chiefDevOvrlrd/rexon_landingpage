'use client';

import { useState, useEffect } from "react";
import LoadingScreen from "@/components/loading-screen/LoadingScreen";
import NavBar from "@/components/nav-bar/NavBar";
import QuoteDialog from "@/components/dialog/QuoteDialog";

export default function ClientWrapper({children}: {children: React.ReactNode}) {
    const [animateUp, setAnimateUp] = useState(false)
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const toggleDialog = () => setIsDialogOpen(!isDialogOpen);

    useEffect(() => {
        const timeout = setTimeout(() => setAnimateUp(true), 5800)
        return() => clearTimeout(timeout);
    }, [])


    return(
        <>
            <LoadingScreen animateUp={animateUp}/>
            {
                animateUp && (
                    <>
                    <NavBar toggleDialog={toggleDialog}/>
                    {children}
                    </>
                )
            }
            <QuoteDialog isOpen={isDialogOpen} toggleDialog={toggleDialog} />
        </>
    )
}
