"use client";

import React, { useState } from "react";
import { ScratchToReveal } from "@/components/ui/scratch-to-reveal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Instagram, Linkedin, Github, ExternalLink, ChevronDown } from "lucide-react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import data from "@/data/index.json";

// Types pour les données
type ProjectType = "student" | "personal" | "professional" | "freelance";

const badgeVariants = {
  student: "secondary",
  personal: "default",
  professional: "outline",
  freelance: "destructive"
} as const;

const About = () => {
  const { profile, projects, hobbies } = data;
  const [selectedFilter, setSelectedFilter] = useState<ProjectType | "all">("all");

  const filteredProjects = selectedFilter === "all" 
    ? projects.items 
    : projects.items.filter(project => project.type === selectedFilter);

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Section Profil */}
        <div className="border rounded-lg p-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            
            {/* Photo de profil avec Scratch to Reveal */}
            <div className="flex-shrink-0">
              <ScratchToReveal
                width={150}
                height={150}
                minScratchPercentage={30}
                onComplete={() => {}}
                className="rounded-full overflow-hidden"
                gradientColors={["#6B7280", "#9CA3AF", "#D1D5DB"]}
              >
                <div className="w-[150px] h-[150px] rounded-full overflow-hidden bg-muted">
                                <Image
                src={profile.image}
                alt="Photo de profil"
                width={150}
                height={150}
                className="w-full h-full object-cover"
              />
                </div>
              </ScratchToReveal>
              <span className="text-sm text-muted-foreground mt-6">
                Scratch up to Reveal me
              </span>
            </div>

            {/* Informations profil */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold mb-2">
                {profile.name}
              </h1>
              <p className="text-muted-foreground mb-6 max-w-md">
                {profile.bio}
              </p>

              {/* Boutons sociaux */}
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                
                {/* Instagram avec sous-menus */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Instagram className="w-4 h-4 mr-2" />
                      Instagram
                      <ChevronDown className="w-3 h-3 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {profile.socialLinks.instagram.map((account, index) => (
                      <DropdownMenuItem key={index} asChild>
                        <a href={account.url} target="_blank" rel="noopener noreferrer" className="cursor-pointer">
                          <ExternalLink className="w-3 h-3 mr-2" />
                          {account.name}
                        </a>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* LinkedIn */}
                <Button variant="outline" size="sm" asChild>
                  <a href={profile.socialLinks.linkedin.url} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-4 h-4 mr-2" />
                    {profile.socialLinks.linkedin.name}
                  </a>
                </Button>

                {/* GitHub avec sous-menus */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Github className="w-4 h-4 mr-2" />
                      GitHub
                      <ChevronDown className="w-3 h-3 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {profile.socialLinks.github.map((account, index) => (
                      <DropdownMenuItem key={index} asChild>
                        <a href={account.url} target="_blank" rel="noopener noreferrer" className="cursor-pointer">
                          <ExternalLink className="w-3 h-3 mr-2" />
                          {account.name}
                        </a>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

              </div>
            </div>
          </div>
        </div>

        {/* Section Projets */}
        <div className="border rounded-lg p-8">
          <h1 className="text-4xl font-bold mb-4">{projects.title}</h1>
          <p className="text-muted-foreground mb-8">
            {projects.description}
          </p>

          <Separator className="mb-8" />

          {/* Filtres */}
          <div className="flex flex-wrap gap-2 mb-8">
            <Button
              variant={selectedFilter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter("all")}
            >
              {projects.filters.all}
            </Button>
            {Object.entries(projects.filters).filter(([key]) => key !== "all").map(([type, label]) => (
              <Button
                key={type}
                variant={selectedFilter === type ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter(type as ProjectType)}
              >
                {label}
              </Button>
            ))}
          </div>

          {/* Liste des projets */}
          <div className="space-y-6">
            {filteredProjects.map((project) => (
              <div key={project.id} className="border-l-4 border-border pl-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mb-2">
                      {project.company}
                    </p>
                    <p className="text-muted-foreground text-sm mb-3">
                      {project.description}
                    </p>
                  </div>
                  <Badge variant={badgeVariants[project.type as ProjectType]}>
                    {projects.filters[project.type as keyof typeof projects.filters]}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Section Hobbies */}
        <div className="border rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-8">{hobbies.title}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hobbies.items.map((hobby) => (
              <Dialog key={hobby.id}>
                <DialogTrigger asChild>
                  <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle>{hobby.name}</CardTitle>
                      <CardDescription>
                        Depuis {hobby.since}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm">
                        {hobby.shortDescription}
                      </p>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>{hobby.name}</DialogTitle>
                    <DialogDescription>
                      Depuis {hobby.since}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <ReactMarkdown
                      components={{
                        h1: ({ children }) => <h1 className="text-xl font-bold mb-4 text-foreground">{children}</h1>,
                        h2: ({ children }) => <h2 className="text-lg font-semibold mb-3 text-foreground">{children}</h2>,
                        h3: ({ children }) => <h3 className="text-md font-medium mb-2 text-foreground">{children}</h3>,
                        p: ({ children }) => <p className="mb-3 text-muted-foreground">{children}</p>,
                        ul: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-1">{children}</ul>,
                        li: ({ children }) => <li className="text-muted-foreground">{children}</li>,
                        strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
                        em: ({ children }) => <em className="italic">{children}</em>,
                        blockquote: ({ children }) => (
                          <blockquote className="border-l-4 border-border pl-4 italic my-4 text-muted-foreground">
                            {children}
                          </blockquote>
                        ),
                      }}
                    >
                      {hobby.longDescription}
                    </ReactMarkdown>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
