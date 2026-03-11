import { useEffect, useMemo, useRef, useState, type TouchEvent } from "react";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  ExternalLink,
  FolderLock,
  Globe2,
  Github,
  Instagram,
  Linkedin,
  Mail,
  Menu,
  MapPin,
  Phone,
  RotateCcw,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

import { LanguageToggle } from "@/components/language-toggle";
import { SectionHeading } from "@/components/section-heading";
import { ThemeToggle } from "@/components/theme-toggle";
import { VisionToggle } from "@/components/vision-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { siteContent, type Language } from "@/data/site-content";
import { cn } from "@/lib/utils";

type Theme = "system" | "light" | "dark";
type VisionMode =
  | "default"
  | "deuteranopia"
  | "protanopia"
  | "tritanopia"
  | "monochromacy";

const languageStorageKey = "douglas-site-language";
const themeStorageKey = "douglas-site-theme";
const visionStorageKey = "douglas-site-vision";

function getInitialOpenExperienceItems(language: Language) {
  return siteContent[language].experience.items
    .map((item, index) => (("current" in item && item.current) ? `current-${index}` : null))
    .filter((item): item is string => item !== null);
}

function getPreferredLanguage(): Language {
  if (typeof window === "undefined") {
    return "pt-BR";
  }

  const saved = window.localStorage.getItem(languageStorageKey);
  if (saved === "pt-BR" || saved === "en") {
    return saved;
  }

  return window.navigator.language.toLowerCase().startsWith("pt") ? "pt-BR" : "en";
}

function getPreferredTheme(): Theme {
  if (typeof window === "undefined") {
    return "system";
  }

  const saved = window.localStorage.getItem(themeStorageKey);
  return saved === "light" || saved === "dark" || saved === "system" ? saved : "system";
}

function resolveSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function getPreferredVisionMode(): VisionMode {
  if (typeof window === "undefined") {
    return "default";
  }

  const saved = window.localStorage.getItem(visionStorageKey);
  return saved === "deuteranopia" ||
    saved === "protanopia" ||
    saved === "tritanopia" ||
    saved === "monochromacy"
    ? saved
    : "default";
}

export default function App() {
  const [language, setLanguage] = useState<Language>(() => getPreferredLanguage());
  const [theme, setTheme] = useState<Theme>(() => getPreferredTheme());
  const [visionMode, setVisionMode] = useState<VisionMode>(() => getPreferredVisionMode());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);
  const [expandedProject, setExpandedProject] = useState<null | { title: string; images: string[]; index: number }>(null);
  const [isLightboxClosing, setIsLightboxClosing] = useState(false);
  const [lightboxZoom, setLightboxZoom] = useState(1);
  const [openExperienceItems, setOpenExperienceItems] = useState<string[]>(() =>
    getInitialOpenExperienceItems(getPreferredLanguage()),
  );
  const [previousExperienceOpen, setPreviousExperienceOpen] = useState(false);
  const pinchDistanceRef = useRef<number | null>(null);
  const pinchZoomRef = useRef(1);
  const swipeStartXRef = useRef<number | null>(null);
  const heroPhotoClickCountRef = useRef(0);
  const heroPhotoClickTimeoutRef = useRef<number | null>(null);
  const copy = siteContent[language];

  useEffect(() => {
    window.localStorage.setItem(languageStorageKey, language);
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    const root = document.documentElement;
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const syncTheme = () => {
      const activeTheme = theme === "system" ? resolveSystemTheme() : theme;
      root.classList.toggle("dark", activeTheme === "dark");
    };

    syncTheme();
    window.localStorage.setItem(themeStorageKey, theme);
    media.addEventListener("change", syncTheme);

    return () => media.removeEventListener("change", syncTheme);
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove(
      "vision-deuteranopia",
      "vision-protanopia",
      "vision-tritanopia",
      "vision-monochromacy",
    );
    if (visionMode !== "default") {
      root.classList.add(`vision-${visionMode}`);
    }
    window.localStorage.setItem(visionStorageKey, visionMode);
  }, [visionMode]);

  useEffect(() => {
    if (!mobileMenuOpen && !expandedProject) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [expandedProject, mobileMenuOpen]);

  useEffect(() => {
    return () => {
      if (heroPhotoClickTimeoutRef.current) {
        window.clearTimeout(heroPhotoClickTimeoutRef.current);
      }
    };
  }, []);

  const openProjectImage = (title: string, images: readonly string[], index = 0) => {
    setIsLightboxClosing(false);
    setLightboxZoom(1);
    setExpandedProject({ title, images: [...images], index });
  };

  const handleHeroPhotoClick = () => {
    heroPhotoClickCountRef.current += 1;

    if (heroPhotoClickTimeoutRef.current) {
      window.clearTimeout(heroPhotoClickTimeoutRef.current);
    }

    if (heroPhotoClickCountRef.current === 3) {
      heroPhotoClickCountRef.current = 0;
      openProjectImage("Galo", ["/img/galo.jpeg"]);
      return;
    }

    heroPhotoClickTimeoutRef.current = window.setTimeout(() => {
      heroPhotoClickCountRef.current = 0;
      heroPhotoClickTimeoutRef.current = null;
    }, 320);
  };

  const closeProjectImage = () => {
    setIsLightboxClosing(true);
    window.setTimeout(() => {
      setExpandedProject(null);
      setIsLightboxClosing(false);
    }, 220);
  };

  const changeExpandedImage = (direction: "prev" | "next") => {
    setExpandedProject((current) => {
      if (!current) {
        return current;
      }

      const total = current.images.length;
      const index =
        direction === "next"
          ? (current.index + 1) % total
          : (current.index - 1 + total) % total;

      setLightboxZoom(1);
      return { ...current, index };
    });
  };

  useEffect(() => {
    if (!expandedProject) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeProjectImage();
        return;
      }

      if (event.key === "ArrowLeft" && expandedProject.images.length > 1) {
        changeExpandedImage("prev");
      }

      if (event.key === "ArrowRight" && expandedProject.images.length > 1) {
        changeExpandedImage("next");
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [expandedProject]);

  const zoomIn = () => {
    setLightboxZoom((current) => Math.min(current + 0.25, 3));
  };

  const zoomOut = () => {
    setLightboxZoom((current) => Math.max(current - 0.25, 1));
  };

  const resetZoom = () => {
    setLightboxZoom(1);
  };

  const openMobileMenu = () => {
    setMobileMenuOpen(true);
    setIsMobileMenuVisible(false);
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setIsMobileMenuVisible(true);
      });
    });
  };

  const closeMobileMenu = () => {
    setIsMobileMenuVisible(false);
    window.setTimeout(() => {
      setMobileMenuOpen(false);
      setIsMobileMenuVisible(false);
    }, 220);
  };

  const handleLightboxTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    if (event.touches.length === 2) {
      const touchA = event.touches.item(0);
      const touchB = event.touches.item(1);
      if (!touchA || !touchB) {
        return;
      }
      pinchDistanceRef.current = Math.hypot(
        touchA.clientX - touchB.clientX,
        touchA.clientY - touchB.clientY,
      );
      pinchZoomRef.current = lightboxZoom;
      swipeStartXRef.current = null;
      return;
    }

    if (event.touches.length === 1) {
      swipeStartXRef.current = event.touches[0].clientX;
      pinchDistanceRef.current = null;
    }
  };

  const handleLightboxTouchMove = (event: TouchEvent<HTMLDivElement>) => {
    if (event.touches.length === 2 && pinchDistanceRef.current) {
      event.preventDefault();
      const touchA = event.touches.item(0);
      const touchB = event.touches.item(1);
      if (!touchA || !touchB) {
        return;
      }
      const nextDistance = Math.hypot(
        touchA.clientX - touchB.clientX,
        touchA.clientY - touchB.clientY,
      );
      const zoomFactor = nextDistance / pinchDistanceRef.current;
      const nextZoom = Math.min(Math.max(pinchZoomRef.current * zoomFactor, 1), 3);
      setLightboxZoom(nextZoom);
    }
  };

  const handleLightboxTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (event.touches.length === 0 && swipeStartXRef.current !== null && expandedProject?.images.length && lightboxZoom === 1) {
      const changedTouch = event.changedTouches[0];
      const deltaX = changedTouch.clientX - swipeStartXRef.current;

      if (Math.abs(deltaX) > 56 && expandedProject.images.length > 1) {
        changeExpandedImage(deltaX < 0 ? "next" : "prev");
      }
    }

    if (event.touches.length < 2) {
      pinchDistanceRef.current = null;
      pinchZoomRef.current = lightboxZoom;
    }

    if (event.touches.length === 0) {
      swipeStartXRef.current = null;
    }
  };

  const navigation = useMemo(
    () => [
      { href: "#about", label: copy.nav.about },
      { href: "#experience", label: copy.nav.experience },
      { href: "#education", label: copy.nav.education },
      { href: "#projects", label: copy.nav.projects },
      { href: "#stack", label: copy.nav.stack },
      { href: "#contact", label: copy.nav.contact },
    ],
    [copy.nav],
  );

  const visionLabels = copy.accessibility;
  const experienceActionLabel = language === "pt-BR"
    ? { open: "Detalhes", close: "Recolher" }
    : { open: "Details", close: "Collapse" };
  const previousExperienceLabel = language === "pt-BR"
    ? { title: "Cargos anteriores", description: "Abra para ver o histórico completo." }
    : { title: "Previous roles", description: "Open to view the full history." };
  const currentExperienceItems = copy.experience.items.filter((item) => "current" in item && item.current);
  const previousExperienceItems = copy.experience.items.filter((item) => !("current" in item && item.current));

  const toggleExperienceItem = (itemKey: string) => {
    setOpenExperienceItems((current) =>
      current.includes(itemKey)
        ? current.filter((key) => key !== itemKey)
        : [...current, itemKey],
    );
  };

  const renderExperienceCard = (item: (typeof copy.experience.items)[number], itemKey: string) => {
    const isCurrent = "current" in item && item.current;
    const isOpen = openExperienceItems.includes(itemKey);

    return (
      <Card
        key={itemKey}
        className={cn("group", isCurrent && "border-primary/35 bg-[linear-gradient(180deg,hsl(var(--card))/0.88,transparent),linear-gradient(135deg,hsl(var(--primary))/0.08,transparent_55%)]")}
      >
        <CardContent className="p-5 sm:p-7">
          <div className="flex items-start gap-4">
            <div className="rounded-full border border-border/70 bg-background/80 p-3 text-primary">
              <BriefcaseBusiness className="size-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant={isCurrent ? "default" : "secondary"}>{item.period}</Badge>
                {isCurrent ? (
                  <Badge variant="outline" className="gap-1.5">
                    <CheckCircle2 className="size-3.5" />
                    {copy.accessibility.currentLabel}
                  </Badge>
                ) : null}
              </div>
              <div className="mt-3 space-y-1">
                <h3 className="font-display text-xl tracking-tight text-foreground sm:text-2xl">
                  {item.title}
                </h3>
                <p className="text-sm font-medium uppercase tracking-[0.16em] text-primary">
                  {item.company}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-end gap-3 border-t border-border/50 pt-4">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="shrink-0 rounded-full px-3"
              onClick={() => toggleExperienceItem(itemKey)}
              aria-expanded={isOpen}
              aria-controls={`experience-panel-${itemKey}`}
            >
              {isOpen ? experienceActionLabel.close : experienceActionLabel.open}
              <ChevronDown
                className={cn(
                  "size-4 transition-transform duration-200",
                  isOpen && "rotate-180",
                )}
              />
            </Button>
          </div>

          <div
            id={`experience-panel-${itemKey}`}
            className={cn(
              "grid transition-all duration-300 ease-out",
              isOpen ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
            )}
          >
            <div className="overflow-hidden">
              <div className="rounded-3xl border border-border/60 bg-background/45 p-4">
                <p className="text-sm leading-6 text-muted-foreground sm:leading-7">
                  {item.summary}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-[-12rem] h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,hsl(var(--accent))/0.28,transparent_62%)] blur-3xl" />
        <div className="absolute right-[-8rem] top-[18rem] h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle_at_center,hsl(var(--primary))/0.18,transparent_64%)] blur-3xl" />
        <div className="absolute left-[-10rem] top-[42rem] h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle_at_center,hsl(var(--muted))/0.85,transparent_70%)] blur-3xl" />
        <div className="grid-pattern absolute inset-0 opacity-60" />
      </div>

      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/72 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 lg:px-10">
          <a href="#top" className="font-display text-xl tracking-tight text-foreground">
            Douglas<span className="text-primary">.</span>
          </a>

          <nav className="hidden items-center gap-6 text-sm text-muted-foreground xl:flex">
            {navigation.map((item) => (
              <a key={item.href} href={item.href} className="transition-colors hover:text-foreground">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-3 xl:flex">
              <VisionToggle value={visionMode} onChange={setVisionMode} labels={visionLabels} />
              <LanguageToggle value={language} onChange={setLanguage} />
              <ThemeToggle value={theme} onChange={setTheme} />
            </div>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="xl:hidden"
              onClick={openMobileMenu}
              aria-label="Abrir menu"
            >
              <Menu className="size-4" />
            </Button>
          </div>
        </div>
      </header>

      {mobileMenuOpen ? (
        <div
          className={cn(
            "fixed inset-0 z-[90] transition-all duration-200 xl:hidden",
            isMobileMenuVisible
              ? "bg-background/86 opacity-100 backdrop-blur-xl"
              : "bg-background/0 opacity-0 backdrop-blur-none",
          )}
          onClick={closeMobileMenu}
        >
          <div
            className={cn(
              "ml-auto flex h-full w-[min(90vw,23rem)] flex-col overflow-y-auto border-l border-white/10 bg-[linear-gradient(180deg,hsl(var(--card))/0.98,transparent),linear-gradient(155deg,hsl(var(--primary))/0.1,transparent_52%),linear-gradient(180deg,hsl(var(--accent))/0.12,transparent_68%)] px-6 py-6 shadow-2xl transition-all duration-300 ease-out",
              isMobileMenuVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-8 opacity-0",
            )}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-display text-lg tracking-tight text-foreground">
                  Douglas<span className="text-primary">.</span>
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  Navegação rápida
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={closeMobileMenu}
                aria-label="Fechar menu"
              >
                <X className="size-4" />
              </Button>
            </div>

            <nav className="mt-8 grid gap-3">
              {navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-[1.35rem] border border-white/10 bg-background/70 px-4 py-4 text-base font-medium text-foreground transition-all hover:border-primary/40 hover:bg-background/88"
                  onClick={closeMobileMenu}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="mt-7 rounded-[1.6rem] border border-white/10 bg-background/72 p-5">
              <div className="grid gap-5">
                <div className="space-y-2.5">
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  {visionLabels.title}
                </p>
                <VisionToggle value={visionMode} onChange={setVisionMode} labels={visionLabels} />
              </div>
                <div className="grid gap-4">
                  <div className="space-y-2.5">
                    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      Idioma
                    </p>
                    <LanguageToggle value={language} onChange={setLanguage} />
                  </div>
                  <div className="space-y-2.5">
                    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      Tema
                    </p>
                    <ThemeToggle value={theme} onChange={setTheme} />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 border-t border-white/10 pt-8">
              <Button asChild size="lg" className="w-full" onClick={closeMobileMenu}>
                <a href="#contact">
                  {copy.hero.primaryCta}
                  <ArrowRight className="size-4" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="mt-3 w-full" onClick={closeMobileMenu}>
                <a
                  href="https://www.linkedin.com/in/douglas-strey/"
                  target="_blank"
                  rel="noreferrer"
                >
                  {copy.hero.secondaryCta}
                  <ExternalLink className="size-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      ) : null}

      <main id="top">
        <section className="mx-auto grid max-w-7xl gap-8 px-6 pb-12 pt-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 lg:px-10 lg:pb-24 lg:pt-20">
          <div className="space-y-6 sm:space-y-8">
            <Badge>{copy.hero.badge}</Badge>
            <div className="space-y-4 sm:space-y-6">
              <h1 className="max-w-4xl font-display text-4xl leading-[0.94] tracking-[-0.05em] text-balance text-foreground sm:text-6xl lg:text-7xl">
                {copy.hero.title}
              </h1>
              <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                {copy.hero.description}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <a href="#contact">
                  {copy.hero.primaryCta}
                  <ArrowRight className="size-4" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a
                  href="https://www.linkedin.com/in/douglas-strey/"
                  target="_blank"
                  rel="noreferrer"
                >
                  {copy.hero.secondaryCta}
                  <ExternalLink className="size-4" />
                </a>
              </Button>
            </div>

            <div className="flex flex-wrap gap-3">
              {copy.hero.strip.map((item) => (
                <Badge key={item} variant="outline" className="rounded-full">
                  {item}
                </Badge>
              ))}
            </div>
          </div>

          <Card className="relative overflow-hidden border-white/10 bg-[linear-gradient(180deg,hsl(var(--card))/0.92,transparent),linear-gradient(135deg,hsl(var(--primary))/0.14,transparent_45%),linear-gradient(160deg,hsl(var(--accent))/0.18,transparent_52%)]">
            <div className="absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_top,hsl(var(--primary))/0.22,transparent_70%)]" />
            <CardContent className="relative p-6 sm:p-8">
              <div className="grid gap-6">
                <button
                  type="button"
                  className="overflow-hidden rounded-[28px] border border-white/10 bg-black/10 text-left"
                  onClick={handleHeroPhotoClick}
                  aria-label="Foto de Douglas Strey"
                >
                  <img
                    src="/img/perfil-2.jpg"
                    alt="Douglas Strey"
                    className="aspect-[4/4.7] w-full object-cover object-top"
                  />
                </button>

                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    {
                      label: copy.hero.currentRoleLabel,
                      value: copy.hero.currentRole,
                    },
                    {
                      label: copy.hero.currentCompanyLabel,
                      value: copy.hero.currentCompany,
                    },
                    {
                      label: copy.hero.experienceLabel,
                      value: copy.hero.experienceValue,
                    },
                    {
                      label: copy.hero.locationLabel,
                      value: copy.hero.locationValue,
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-3xl border border-border/60 bg-background/72 p-4 backdrop-blur"
                    >
                      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        {item.label}
                      </p>
                      <p className="mt-2 text-sm font-semibold leading-6 text-foreground">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-3 text-muted-foreground">
                  {[
                    {
                      href: "https://www.linkedin.com/in/douglas-strey/",
                      icon: Linkedin,
                      label: "LinkedIn",
                    },
                    {
                      href: "https://github.com/Douglas-Strey",
                      icon: Github,
                      label: "GitHub",
                    },
                    {
                      href: "https://www.instagram.com/douglas_strey/",
                      icon: Instagram,
                      label: "Instagram",
                    },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-background/70 transition-transform hover:-translate-y-0.5 hover:text-foreground"
                        aria-label={item.label}
                      >
                        <Icon className="size-4" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section id="about" className="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-16">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8">
            <SectionHeading
              eyebrow={copy.about.eyebrow}
              title={copy.about.title}
              description={copy.about.description}
            />

            <Card className="bg-card/70">
              <CardContent className="grid gap-5 p-5 sm:p-8">
                {copy.about.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                    {paragraph}
                  </p>
                ))}

                <div className="grid gap-3 sm:grid-cols-2">
                  {copy.about.highlights.map((highlight) => (
                    <div
                      key={highlight}
                      className="rounded-3xl border border-border/60 bg-background/65 px-4 py-4 text-sm font-medium text-foreground"
                    >
                      {highlight}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="experience" className="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-16">
          <SectionHeading
            eyebrow={copy.experience.eyebrow}
            title={copy.experience.title}
            description={copy.experience.description}
          />

          <div className="mt-8 space-y-5 lg:mt-10">
            <div className="grid gap-4 lg:gap-5 lg:grid-cols-2">
              {currentExperienceItems.map((item, index) =>
                renderExperienceCard(item, `current-${index}`),
              )}
            </div>

            <Card className="overflow-hidden">
              <CardContent className="p-5 sm:p-6">
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 text-left"
                  onClick={() => setPreviousExperienceOpen((current) => !current)}
                  aria-expanded={previousExperienceOpen}
                  aria-controls="previous-experience-panel"
                >
                  <div className="space-y-1">
                    <p className="font-display text-xl tracking-tight text-foreground">
                      {previousExperienceLabel.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {previousExperienceLabel.description}
                    </p>
                  </div>
                  <div className="rounded-full border border-border/70 bg-background/70 p-3 text-primary">
                    <ChevronDown
                      className={cn(
                        "size-5 transition-transform duration-200",
                        previousExperienceOpen && "rotate-180",
                      )}
                    />
                  </div>
                </button>

                <div
                  id="previous-experience-panel"
                  className={cn(
                    "grid transition-all duration-300 ease-out",
                    previousExperienceOpen ? "mt-5 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="grid gap-4 lg:gap-5 lg:grid-cols-2">
                      {previousExperienceItems.map((item, index) =>
                        renderExperienceCard(item, `previous-${index}`),
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="education" className="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-16">
          <SectionHeading
            eyebrow={copy.education.eyebrow}
            title={copy.education.title}
            description={copy.education.description}
          />

          <div className="mt-8 grid gap-4 lg:mt-10 lg:gap-5 lg:grid-cols-[1.15fr_0.85fr]">
            <Card>
              <CardHeader>
                <CardDescription>{copy.education.academicTitle}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {copy.education.studies.map((study) => (
                  <div
                    key={`${study.title}-${study.period}`}
                    className="flex gap-4 rounded-3xl border border-border/60 bg-background/55 p-4 sm:p-5"
                  >
                    <div className="mt-1 rounded-2xl bg-primary/10 p-3 text-primary">
                      <GraduationCap className="size-5" />
                    </div>
                    <div className="space-y-2">
                      <Badge variant="secondary" className="w-fit">
                        {study.period}
                      </Badge>
                      <div className="space-y-1">
                        <h3 className="font-display text-lg tracking-tight text-foreground sm:text-xl">
                          {study.title}
                        </h3>
                        <p className="text-sm font-medium uppercase tracking-[0.14em] text-primary">
                          {study.institution}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardDescription>{copy.education.certificationTitle}</CardDescription>
                <CardTitle>{copy.education.certificationTitle}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-3">
                {copy.education.certifications.map((certification) => (
                  <Badge
                    key={certification}
                    variant="outline"
                    className="rounded-full px-4 py-2 text-[0.7rem]"
                  >
                    {certification}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="projects" className="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-16">
          <SectionHeading
            eyebrow={copy.projects.eyebrow}
            title={copy.projects.title}
            description={copy.projects.description}
          />

          <div className="mt-8 grid gap-4 lg:mt-10 lg:gap-5 lg:grid-cols-2 xl:grid-cols-3">
            {copy.projects.items.map((project) => (
              <Card key={project.title} className="overflow-hidden">
                <button
                  type="button"
                  className="group/image aspect-[16/10] w-full overflow-hidden border-b border-border/60 bg-muted/60 text-left"
                  onClick={() =>
                    openProjectImage(
                      project.title,
                      "gallery" in project && project.gallery?.length
                        ? project.gallery
                        : [project.image],
                    )
                  }
                  aria-label={`Ampliar imagem do projeto ${project.title}`}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover/image:scale-105"
                  />
                </button>
                <CardHeader className="p-5 pb-2 sm:p-6 sm:pb-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="outline" className="gap-1.5">
                      {project.href ? <Globe2 className="size-3.5" /> : <FolderLock className="size-3.5" />}
                      {project.href ? copy.accessibility.publicProjectLabel : copy.accessibility.privateProjectLabel}
                    </Badge>
                    <CardDescription>{project.status}</CardDescription>
                  </div>
                  <CardTitle>{project.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-5 pt-0 sm:space-y-5 sm:p-6 sm:pt-0">
                  <p className="text-sm leading-6 text-muted-foreground sm:leading-7">{project.description}</p>
                  {project.href ? (
                    <div className="flex flex-wrap gap-3">
                      <Button asChild variant="outline">
                        <a href={project.href} target="_blank" rel="noreferrer">
                          {copy.projects.viewProject}
                          <ExternalLink className="size-4" />
                        </a>
                      </Button>
                      {"repo" in project && project.repo ? (
                        <Button asChild variant="ghost">
                          <a href={project.repo} target="_blank" rel="noreferrer">
                            {copy.projects.viewCode}
                            <Github className="size-4" />
                          </a>
                        </Button>
                      ) : null}
                    </div>
                  ) : (
                    <Badge variant="secondary" className="w-fit">
                      {copy.projects.privateLabel}
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="stack" className="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-16">
          <SectionHeading
            eyebrow={copy.stack.eyebrow}
            title={copy.stack.title}
            description={copy.stack.description}
          />

          <div className="mt-8 grid gap-4 lg:mt-10 lg:gap-5 lg:grid-cols-3">
            {copy.stack.groups.map((group) => (
              <Card key={group.title}>
                <CardHeader>
                  <CardTitle>{group.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <Badge key={item} variant="outline" className="rounded-full text-[0.68rem]">
                      {item}
                    </Badge>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-16">
          <div className="grid gap-6 lg:grid-cols-[0.84fr_1.16fr] lg:gap-8">
            <div className="space-y-5 sm:space-y-6">
              <SectionHeading
                eyebrow={copy.contact.eyebrow}
                title={copy.contact.title}
                description={copy.contact.description}
              />

              <Card className="bg-card/70">
                <CardHeader>
                  <CardTitle>{copy.contact.cardTitle}</CardTitle>
                  <CardDescription>{copy.contact.cardDescription}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-5">
                  {[
                    {
                      icon: Phone,
                      label: copy.contact.call,
                      value: "(47) 99783-8550",
                      href: "tel:+5547997838550",
                    },
                    {
                      icon: Mail,
                      label: copy.contact.email,
                      value: "douglas.strey@outlook.com",
                      href: "mailto:douglas.strey@outlook.com",
                    },
                    {
                      icon: MapPin,
                      label: copy.contact.location,
                      value: "Joinville - SC, Brasil",
                      href: "https://www.google.com/maps/place/Joinville",
                    },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                        className="flex items-start gap-4 rounded-3xl border border-border/60 bg-background/70 p-3.5 sm:p-4 transition-colors hover:border-primary/40"
                      >
                        <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                          <Icon className="size-5" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                            {item.label}
                          </p>
                          <p className="text-sm font-medium text-foreground">{item.value}</p>
                        </div>
                      </a>
                    );
                  })}
                </CardContent>
              </Card>
            </div>

            <Card className="bg-card/70">
              <CardContent className="p-5 sm:p-8">
                <form
                  action="https://formspree.io/f/xzbygydl"
                  method="POST"
                  className="grid gap-4"
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        {copy.contact.form.name}
                      </label>
                      <Input name="Name" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        {copy.contact.form.email}
                      </label>
                      <Input name="E-mail" type="email" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      {copy.contact.form.project}
                    </label>
                    <Input name="Project" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      {copy.contact.form.message}
                    </label>
                    <Textarea name="Message" required />
                  </div>
                  <Button type="submit" size="lg" className="mt-2 w-full sm:w-fit">
                    {copy.contact.form.submit}
                    <ArrowRight className="size-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="mx-auto max-w-7xl px-6 pb-8 pt-4 lg:px-10 lg:pb-10 lg:pt-6">
        <div className="flex flex-col gap-4 rounded-[32px] border border-border/60 bg-card/70 px-6 py-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>{copy.footer}</p>
          <p className="text-xs uppercase tracking-[0.18em]">
            Douglas Strey · {new Date().getFullYear()}
          </p>
        </div>
      </footer>

      {expandedProject ? (
        <div
          className={cn(
            "fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-md transition-all duration-200",
            isLightboxClosing
              ? "bg-background/0 opacity-0"
              : "bg-background/88 opacity-100",
          )}
          role="dialog"
          aria-modal="true"
          aria-label={expandedProject.title}
          onClick={closeProjectImage}
        >
          <div
            className={cn(
                "relative w-full max-w-5xl transition-all duration-200 ease-out",
                isLightboxClosing
                  ? "translate-y-4 scale-[0.97] opacity-0"
                : "translate-y-0 scale-100 opacity-100",
            )}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="absolute left-3 top-3 z-10 flex items-center gap-2">
              <Button
                type="button"
                size="icon"
                variant="outline"
                className="bg-background/85"
                onClick={zoomOut}
                aria-label="Diminuir zoom"
              >
                <ZoomOut className="size-4" />
              </Button>
              <Button
                type="button"
                size="icon"
                variant="outline"
                className="bg-background/85"
                onClick={zoomIn}
                aria-label="Aumentar zoom"
              >
                <ZoomIn className="size-4" />
              </Button>
              <Button
                type="button"
                size="icon"
                variant="outline"
                className="bg-background/85"
                onClick={resetZoom}
                aria-label="Resetar zoom"
              >
                <RotateCcw className="size-4" />
              </Button>
            </div>
            {expandedProject.images.length > 1 ? (
              <>
                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  className="absolute left-3 top-1/2 z-10 -translate-y-1/2 bg-background/85"
                  onClick={() => changeExpandedImage("prev")}
                  aria-label="Imagem anterior"
                >
                  <ChevronLeft className="size-4" />
                </Button>
                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  className="absolute right-3 top-1/2 z-10 -translate-y-1/2 bg-background/85"
                  onClick={() => changeExpandedImage("next")}
                  aria-label="Próxima imagem"
                >
                  <ChevronRight className="size-4" />
                </Button>
              </>
            ) : null}
            <Button
              type="button"
              size="icon"
              variant="outline"
              className="absolute right-3 top-3 z-10 bg-background/85"
              onClick={closeProjectImage}
              aria-label="Fechar imagem"
            >
              <X className="size-4" />
            </Button>
            <div className="overflow-hidden rounded-[28px] border border-border/60 bg-card shadow-2xl">
              <div
                className="max-h-[85vh] overflow-auto bg-[#050b12] touch-pan-y"
                onTouchStart={handleLightboxTouchStart}
                onTouchMove={handleLightboxTouchMove}
                onTouchEnd={handleLightboxTouchEnd}
              >
              <img
                src={expandedProject.images[expandedProject.index]}
                alt={expandedProject.title}
                className="max-h-[85vh] w-full origin-center object-contain transition-transform duration-200 ease-out"
                style={{ transform: `scale(${lightboxZoom})` }}
                onDoubleClick={() =>
                  setLightboxZoom((current) => (current === 1 ? 2 : 1))
                }
              />
              </div>
            </div>
            <div className="mt-3 text-center text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Zoom {Math.round(lightboxZoom * 100)}%
            </div>
            <div className="mt-2 text-center text-[11px] uppercase tracking-[0.18em] text-muted-foreground md:hidden">
              Arraste para navegar e use pinça para zoom
            </div>
            {expandedProject.images.length > 1 ? (
              <div className="mt-4 flex justify-center gap-2">
                {expandedProject.images.map((image, imageIndex) => (
                  <button
                    key={image}
                    type="button"
                    className={cn(
                      "h-2.5 w-2.5 rounded-full transition-all",
                      expandedProject.index === imageIndex
                        ? "w-8 bg-primary"
                        : "bg-white/30 hover:bg-white/50",
                    )}
                    onClick={() =>
                      (setLightboxZoom(1),
                      setExpandedProject((current) =>
                        current
                          ? {
                              ...current,
                              index: imageIndex,
                            }
                          : current,
                      ))
                    }
                    aria-label={`Abrir imagem ${imageIndex + 1}`}
                  />
                ))}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
