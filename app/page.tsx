'use client';
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import data from "@/data/index.json";

const TypingEffect = ({ words, prefix, suffix }: { words: string[], prefix: string, suffix: string }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    // Délai variable entre 50ms et 100ms pour la frappe, plus rapide pour la suppression
    const getRandomTypingSpeed = () => {
      return isDeleting 
        ? Math.random() * (80 - 40) + 40  // 40-80ms pour supprimer
        : Math.random() * (100 - 50) + 50; // 50-100ms pour taper
    };
    const pauseTime = isDeleting ? 500 : 2000;

    if (isPaused) {
      const pauseTimer = setTimeout(() => {
        setIsPaused(false);
        if (isDeleting) {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        } else {
          setIsDeleting(true);
        }
      }, pauseTime);
      return () => clearTimeout(pauseTimer);
    }

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < currentWord.length) {
          setCurrentText(currentWord.slice(0, currentText.length + 1));
        } else {
          setIsPaused(true);
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1));
        } else {
          setIsPaused(true);
        }
      }
    }, getRandomTypingSpeed());

    return () => clearTimeout(timer);
  }, [currentText, currentWordIndex, isDeleting, isPaused, words]);

  return (
    <span className="inline-block">
      {prefix}
      <span className="text-primary font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
        {currentText}
      </span>
      <span className="animate-pulse text-primary">|</span>
      {suffix}
    </span>
  );
};

const Home = () => {
  const { hero } = data;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="space-y-8">
          
          {/* Hero Principal */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold">
                {hero.title}
              </h1>
              
              <h2 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                {hero.name}
              </h2>
            </div>
            
            <div className="space-y-6">
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {hero.description}
              </p>
              
              {/* Texte magique avec effet typing */}
              <div className="text-xl md:text-2xl font-medium min-h-[3rem] flex items-center justify-center">
                <TypingEffect 
                  words={hero.magicText.words}
                  prefix={hero.magicText.prefix}
                  suffix={hero.magicText.suffix}
                />
              </div>
            </div>
          </div>

          {/* Boutons CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              asChild 
              size="lg"
            >
              <Link href={hero.cta.primary.href}>
                {hero.cta.primary.label}
              </Link>
            </Button>
            
            <Button 
              asChild 
              variant="outline" 
              size="lg"
            >
              <Link href={hero.cta.secondary.href}>
                {hero.cta.secondary.label}
              </Link>
            </Button>
          </div>

          {/* Petite indication */}
          <div className="pt-8">
            <p className="text-sm text-muted-foreground">
              {hero.subtitle}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;