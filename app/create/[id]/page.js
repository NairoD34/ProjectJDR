"use client"

import {notFound} from "next/navigation";
import React, { useState, useEffect } from 'react';
import classes from "@/components/images/image-slideshow.module.css";
import Image from "next/image";


export default function CampainPage({params}){
    const [heroes, setHeroes] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchHeroes() {
            try {
                const res = await fetch(`/api/heroes/by-campain/${params.id}`);
                if (!res.ok) throw new Error("Erreur lors du fetch des héros");

                const data = await res.json();
                setHeroes(data);
            } catch (err) {
                console.error(err);
                setError(err.message);
            }
        }

        fetchHeroes();
    }, [params.id]);

    if (error) return <div>Erreur : {error}</div>;

    return (
        <div>
            <h1>Héros de la campagne {params.id}</h1>
            {heroes.length === 0 ? (
                <p>Aucun héros pour cette campagne.</p>
            ) : (
<>
                    {heroes.map(hero => (

                            <Image
                                key={hero.id}
                                src={`https://project-jdr-bucket.s3.eu-west-3.amazonaws.com/heroes/${hero.filename}`}
                                alt={`image de ${hero.title}`}
                                width={500}
                                height={500}
                            />
                    ))}
</>
            )}
        </div>
    );
}
