"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, Instagram, Linkedin, Github, ExternalLink, MapPin, Shield, CheckCircle, Briefcase } from "lucide-react";
import data from "@/data/index.json";

// Types pour les éléments de bruit du captcha
interface CaptchaLine {
  key: number;
  style: React.CSSProperties;
}

interface CaptchaDot {
  key: string;
  style: React.CSSProperties;
}

interface CaptchaCircle {
  key: string;
  style: React.CSSProperties;
}

const Contact = () => {
  const { profile } = data;
  const [emailUnlocked, setEmailUnlocked] = useState(false);
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [captchaQuestion, setCaptchaQuestion] = useState({ num1: 0, num2: 0, answer: 0, questionText: "" });
  const [captchaError, setCaptchaError] = useState(false);
  const [captchaStyles, setCaptchaStyles] = useState<React.CSSProperties>({});
  const [captchaNoise, setCaptchaNoise] = useState<{ lines: CaptchaLine[], dots: CaptchaDot[] }>({ lines: [], dots: [] });
  const [phoneUnlocked, setPhoneUnlocked] = useState(false);
  const [phoneCaptchaAnswer, setPhoneCaptchaAnswer] = useState("");
  const [phoneCaptchaQuestion, setPhoneCaptchaQuestion] = useState({ num1: 0, num2: 0, answer: 0, questionText: "" });
  const [phoneCaptchaError, setPhoneCaptchaError] = useState(false);
  const [phoneCaptchaStyles, setPhoneCaptchaStyles] = useState<React.CSSProperties>({});
  const [phoneCaptchaNoise, setPhoneCaptchaNoise] = useState<{ lines: CaptchaLine[], circles: CaptchaCircle[] }>({ lines: [], circles: [] });
  const [isClient, setIsClient] = useState(false);

  // Générer une nouvelle question de captcha
  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 20) + 1;
    const num2 = Math.floor(Math.random() * 20) + 1;
    const operations = ['+', '-', '*'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    
    let answer;
    let questionText;
    
    switch (operation) {
      case '+':
        answer = num1 + num2;
        questionText = `${num1} + ${num2}`;
        break;
      case '-':
        // S'assurer que le résultat est positif
        const larger = Math.max(num1, num2);
        const smaller = Math.min(num1, num2);
        answer = larger - smaller;
        questionText = `${larger} - ${smaller}`;
        break;
      case '*':
        // Utiliser des nombres plus petits pour la multiplication
        const smallNum1 = Math.floor(Math.random() * 10) + 1;
        const smallNum2 = Math.floor(Math.random() * 5) + 1;
        answer = smallNum1 * smallNum2;
        questionText = `${smallNum1} × ${smallNum2}`;
        break;
      default:
        answer = num1 + num2;
        questionText = `${num1} + ${num2}`;
    }
    
    // Générer les styles une seule fois
    const styles = {
      transform: `rotate(${Math.random() * 10 - 5}deg) skewX(${Math.random() * 8 - 4}deg)`,
      letterSpacing: `${Math.random() * 4 + 2}px`,
      textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
      filter: 'blur(0.5px)',
      background: 'linear-gradient(45deg, currentColor, transparent, currentColor)',
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundImage: 'repeating-linear-gradient(45deg, currentColor 0px, currentColor 2px, transparent 2px, transparent 4px)'
    };

    // Générer les éléments de bruit une seule fois
    const lines = [...Array(5)].map((_, i) => ({
      key: i,
      style: {
        width: '100%',
        height: '1px',
        top: `${20 + i * 15}%`,
        transform: `rotate(${Math.random() * 20 - 10}deg)`,
      }
    }));

    const dots = [...Array(15)].map((_, i) => ({
      key: `dot-${i}`,
      style: {
        width: '2px',
        height: '2px',
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }
    }));
    
    setCaptchaQuestion({ num1, num2, answer, questionText });
    setCaptchaStyles(styles);
    setCaptchaNoise({ lines, dots });
  };

  // Générer une nouvelle question de captcha pour le téléphone
  const generatePhoneCaptcha = () => {
    const num1 = Math.floor(Math.random() * 15) + 1;
    const num2 = Math.floor(Math.random() * 15) + 1;
    const operations = ['+', '-'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    
    let answer;
    let questionText;
    
    switch (operation) {
      case '+':
        answer = num1 + num2;
        questionText = `${num1} + ${num2}`;
        break;
      case '-':
        const larger = Math.max(num1, num2);
        const smaller = Math.min(num1, num2);
        answer = larger - smaller;
        questionText = `${larger} - ${smaller}`;
        break;
      default:
        answer = num1 + num2;
        questionText = `${num1} + ${num2}`;
    }
    
    // Générer les styles une seule fois pour le téléphone
    const phoneStyles = {
      transform: `rotate(${Math.random() * 8 - 4}deg) skewY(${Math.random() * 6 - 3}deg)`,
      letterSpacing: `${Math.random() * 3 + 1}px`,
      textShadow: '1px 1px 3px rgba(0,0,0,0.4)',
      filter: 'blur(0.3px)',
      background: 'linear-gradient(90deg, currentColor, transparent, currentColor)',
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundImage: 'repeating-linear-gradient(90deg, currentColor 0px, currentColor 1px, transparent 1px, transparent 3px)'
    };

    // Générer les éléments de bruit pour le téléphone
    const lines = [...Array(4)].map((_, i) => ({
      key: i,
      style: {
        width: '80%',
        height: '1px',
        top: `${15 + i * 20}%`,
        left: '10%',
        transform: `rotate(${Math.random() * 15 - 7}deg)`,
      }
    }));

    const circles = [...Array(8)].map((_, i) => ({
      key: `circle-${i}`,
      style: {
        width: `${Math.random() * 8 + 4}px`,
        height: `${Math.random() * 8 + 4}px`,
        left: `${Math.random() * 90}%`,
        top: `${Math.random() * 90}%`,
      }
    }));
    
    setPhoneCaptchaQuestion({ num1, num2, answer, questionText });
    setPhoneCaptchaStyles(phoneStyles);
    setPhoneCaptchaNoise({ lines, circles });
  };

  // Générer les captchas au chargement (côté client uniquement)
  useEffect(() => {
    setIsClient(true);
    generateCaptcha();
    generatePhoneCaptcha();
  }, []);

  // Vérifier la réponse du captcha email
  const verifyCaptcha = () => {
    const userAnswer = parseInt(captchaAnswer);
    if (userAnswer === captchaQuestion.answer) {
      setEmailUnlocked(true);
      setCaptchaError(false);
    } else {
      setCaptchaError(true);
      setCaptchaAnswer("");
      generateCaptcha(); // Générer une nouvelle question
      setTimeout(() => setCaptchaError(false), 3000);
    }
  };

  // Vérifier la réponse du captcha téléphone
  const verifyPhoneCaptcha = () => {
    const userAnswer = parseInt(phoneCaptchaAnswer);
    if (userAnswer === phoneCaptchaQuestion.answer) {
      setPhoneUnlocked(true);
      setPhoneCaptchaError(false);
    } else {
      setPhoneCaptchaError(true);
      setPhoneCaptchaAnswer("");
      generatePhoneCaptcha(); // Générer une nouvelle question
      setTimeout(() => setPhoneCaptchaError(false), 3000);
    }
  };

  const handleCaptchaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    verifyCaptcha();
  };

  const handlePhoneCaptchaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    verifyPhoneCaptcha();
  };

  return (
    <div className="min-h-screen p-2 sm:p-4">
      <div className="max-w-2xl mx-auto space-y-4 sm:space-y-8">
        
        {/* En-tête */}
        <div className="text-center space-y-2 sm:space-y-4 px-2">
          <h1 className="text-2xl sm:text-4xl font-bold">Me contacter 📬</h1>
          <p className="text-muted-foreground text-sm sm:text-lg">
            N&apos;hésitez pas à me contacter pour discuter de vos projets ou simplement échanger ! ✨
          </p>
        </div>

        <Separator />

        {/* Informations de contact */}
        <div className="grid gap-3 sm:gap-6">
          
          {/* Email avec Captcha */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3 sm:pb-6">
              <CardTitle className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                Email
                {emailUnlocked && <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />}
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Pour toute demande professionnelle ou collaboration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              {!emailUnlocked ? (
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                    <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
                    Résolvez ce captcha débile pour accéder à mon email 🤓
                  </div>
                  
                  <form onSubmit={handleCaptchaSubmit} className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                      {isClient ? (
                        <div className="relative bg-muted px-2 sm:px-4 py-2 sm:py-3 rounded border-2 border-dashed border-muted-foreground/30 overflow-hidden w-full sm:w-auto">
                          <div 
                            className="text-sm sm:text-lg font-mono font-bold text-foreground select-none text-center sm:text-left"
                            style={captchaStyles}
                          >
                            {captchaQuestion.questionText} = ?
                          </div>
                          {/* Lignes de bruit */}
                          <div className="absolute inset-0 pointer-events-none">
                            {captchaNoise.lines.map((line) => (
                              <div
                                key={line.key}
                                className="absolute bg-muted-foreground/20"
                                style={line.style}
                              />
                            ))}
                            {/* Points de bruit */}
                            {captchaNoise.dots.map((dot) => (
                              <div
                                key={dot.key}
                                className="absolute bg-muted-foreground/30 rounded-full"
                                style={dot.style}
                              />
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="bg-muted px-4 py-3 rounded border-2 border-dashed border-muted-foreground/30">
                          <div className="text-lg font-mono font-bold text-foreground">
                            Chargement du captcha...
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        placeholder="Votre réponse..."
                        value={captchaAnswer}
                        onChange={(e) => setCaptchaAnswer(e.target.value)}
                        className={captchaError ? "border-red-500" : ""}
                        autoComplete="off"
                      />
                      <Button type="submit" disabled={!captchaAnswer}>
                        Vérifier
                      </Button>
                    </div>
                    
                    {captchaError && (
                      <p className="text-red-500 text-sm animate-pulse">
                        🤔 Mauvaise réponse ! Nouvelle question générée...
                      </p>
                    )}
                  </form>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={generateCaptcha}
                    className="text-xs"
                  >
                    🔄 Nouvelle question
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-green-600 text-sm">
                    <CheckCircle className="w-4 h-4" />
                    Bravo ! Vous n&apos;êtes pas un robot 🎉
                  </div>
                  <Button variant="outline" className="w-full" asChild>
                    <a href="mailto:hello@cassette.work">
                      <Mail className="w-4 h-4 mr-2" />
                      hello@cassette.work
                    </a>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Téléphone avec Captcha */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-green-500" />
                Téléphone
                {phoneUnlocked && <CheckCircle className="w-4 h-4 text-green-500" />}
              </CardTitle>
              <CardDescription>
                Disponible du lundi au vendredi, 9h-18h
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {!phoneUnlocked ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Shield className="w-4 h-4" />
                    Encore un captcha pour le téléphone ! 📞🤪
                  </div>
                  
                  <form onSubmit={handlePhoneCaptchaSubmit} className="space-y-3">
                    <div className="flex items-center gap-3">
                      {isClient ? (
                        <div className="relative bg-muted px-2 sm:px-4 py-2 sm:py-3 rounded border-2 border-dashed border-muted-foreground/30 overflow-hidden w-full sm:w-auto">
                          <div 
                            className="text-sm sm:text-lg font-mono font-bold text-foreground select-none text-center sm:text-left"
                            style={phoneCaptchaStyles}
                          >
                            {phoneCaptchaQuestion.questionText} = ?
                          </div>
                          {/* Lignes de bruit différentes */}
                          <div className="absolute inset-0 pointer-events-none">
                            {phoneCaptchaNoise.lines.map((line) => (
                              <div
                                key={line.key}
                                className="absolute bg-muted-foreground/15"
                                style={line.style}
                              />
                            ))}
                            {/* Cercles de bruit */}
                            {phoneCaptchaNoise.circles.map((circle) => (
                              <div
                                key={circle.key}
                                className="absolute border border-muted-foreground/20 rounded-full"
                                style={circle.style}
                              />
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="bg-muted px-4 py-3 rounded border-2 border-dashed border-muted-foreground/30">
                          <div className="text-lg font-mono font-bold text-foreground">
                            Chargement du captcha...
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        placeholder="Votre réponse..."
                        value={phoneCaptchaAnswer}
                        onChange={(e) => setPhoneCaptchaAnswer(e.target.value)}
                        className={phoneCaptchaError ? "border-red-500" : ""}
                        autoComplete="off"
                      />
                      <Button type="submit" disabled={!phoneCaptchaAnswer}>
                        Vérifier
                      </Button>
                    </div>
                    
                    {phoneCaptchaError && (
                      <p className="text-red-500 text-sm animate-pulse">
                        😤 Raté ! Nouvelle équation générée...
                      </p>
                    )}
                  </form>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={generatePhoneCaptcha}
                    className="text-xs"
                  >
                    🔄 Nouvelle question
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-green-600 text-sm">
                    <CheckCircle className="w-4 h-4" />
                    Excellent ! Vous méritez mon numéro 📞✨
                  </div>
                  <Button variant="outline" className="w-full" asChild>
                    <a href="tel:+33767367982">
                      <Phone className="w-4 h-4 mr-2" />
                      +33 7 67 36 79 82
                    </a>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Localisation */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-red-500" />
                Localisation
              </CardTitle>
              <CardDescription>
                Basé en France, disponible pour projets remote
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-muted-foreground">
                📍 Worldwide 🌍 (Remote only)
              </div>
            </CardContent>
          </Card>

        </div>

        <Separator />

        {/* Réseaux sociaux */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-center">Retrouvez-moi sur les réseaux 🌐</h2>
          
          <div className="grid gap-4">
            
            {/* Instagram */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Instagram className="w-5 h-5 text-pink-500" />
                  Instagram
                </CardTitle>
                <CardDescription>
                  Mes différents comptes Instagram
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {profile.socialLinks.instagram.map((account, index) => (
                    <Button key={index} variant="outline" className="w-full justify-start" asChild>
                      <a href={account.url} target="_blank" rel="noopener noreferrer">
                        <Instagram className="w-4 h-4 mr-2" />
                        {account.name}
                        <ExternalLink className="w-3 h-3 ml-auto" />
                      </a>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* LinkedIn */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Linkedin className="w-5 h-5 text-blue-600" />
                  LinkedIn
                </CardTitle>
                <CardDescription>
                  Mon profil professionnel
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href={profile.socialLinks.linkedin.url} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-4 h-4 mr-2" />
                    {profile.socialLinks.linkedin.name}
                    <ExternalLink className="w-3 h-3 ml-auto" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* GitHub */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Github className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  GitHub
                </CardTitle>
                <CardDescription>
                  Mes différents comptes GitHub
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {profile.socialLinks.github.map((account, index) => (
                    <Button key={index} variant="outline" className="w-full justify-start" asChild>
                      <a href={account.url} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        {account.name}
                        <ExternalLink className="w-3 h-3 ml-auto" />
                      </a>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

          </div>
        </div>

        {/* Call to action */}
        <div className="text-center space-y-4 py-8">
          <h3 className="text-xl font-semibold">Prêt à collaborer ? 🚀</h3>
          <p className="text-muted-foreground">
            Je suis toujours ouvert aux nouveaux projets et collaborations intéressantes.
          </p>
          <Button size="lg" asChild>
            <a href="/about">
              <Briefcase className="w-4 h-4 mr-2" />
              Revoir mes projets
            </a>
          </Button>
        </div>

      </div>
    </div>
  );
};

export default Contact;
