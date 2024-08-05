export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Santo Domingo",
  description: "Sitio web para la inscripcion a la maraton de santo domingo",
  favicon:
    "https://www.santodomingo.gob.ec/wp-content/uploads/2020/05/favicon.png",
  navItems: [
    {
      label: "Preinscripciones",
      href: "/preinscripciones",
    },
    {
      label: "Aprobar Pagos",
      href: "/aprobarpagos",
    }
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Team",
      href: "/team",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui-docs-v2.vercel.app",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
