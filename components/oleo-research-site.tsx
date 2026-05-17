"use client"

import * as React from "react"
import katex from "katex"
import {
  ArrowUpRight,
  Beaker,
  Factory,
  FlaskConical,
  Microscope,
  Ship,
  Sparkles,
  Waves,
  Wind,
} from "lucide-react"

import { ThreeScene } from "@/components/three-scenes"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type TabId = "shape" | "path" | "fabrication"

type Source = {
  label: string
  href: string
}

type Stat = {
  label: string
  value: string
  note: string
}

type NavItem = {
  label: string
  deck: string
  href: string
  tab?: TabId
}

const sources: Source[] = [
  {
    label: "RSC, Advanced oil sorbents using sequential infiltration synthesis",
    href: "https://pubs.rsc.org/en/content/articlelanding/2017/ta/c6ta09014a",
  },
  {
    label: "Argonne, Oleo Sponge field and lab overview",
    href: "https://www.anl.gov/article/argonne-invents-reusable-sponge-that-soaks-up-oil-could-revolutionize-oil-spill-and-diesel-cleanup",
  },
  {
    label: "NOAA, spill containment methods",
    href: "https://response.restoration.noaa.gov/oil-and-chemical-spills/oil-spills/spill-containment-methods.html",
  },
  {
    label: "NOAA, GNOME oil spill modeling",
    href: "https://response.restoration.noaa.gov/oil-and-chemical-spills/oil-spills/response-tools/gnome-suite-oil-spill-modeling.html",
  },
  {
    label: "NASA Glenn, shape effects on drag",
    href: "https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/shape-effects-on-drag/",
  },
  {
    label: "ITOPF, use of booms in oil pollution response",
    href: "https://www.itopf.org/knowledge-resources/documents-guides/tip-03-use-of-booms-in-oil-pollution-response/",
  },
]

const shapeStats: Stat[] = [
  {
    label: "Lead puck aspect ratio",
    value: "c/a 0.1 to 0.3",
    note: "The lenticular puck is expected to beat a sphere under short contact time.",
  },
  {
    label: "One liter prototype",
    value: "250 x 25 mm",
    note: "At 85 percent usable pore volume, it holds about 1.04 L of oil.",
  },
  {
    label: "Conservative capacity",
    value: "20x to 30x",
    note: "Dry sponge weight target for a rugged towable module.",
  },
]

const pathSteps = [
  "Map thickness first, not just slick area.",
  "Build high-oil cells where h exceeds the recovery threshold.",
  "Sweep the thick cells with overlapping boustrophedon lanes.",
  "Use drift-frame coordinates, then convert back to earth coordinates.",
  "Recover and squeeze before the array reaches saturation.",
]

const fabricationRows = [
  {
    module: "Lenticular puck",
    route:
      "CNC contour cut, die cut plus edge rounding, or molded foam cavities.",
    why: "Best first-principles candidate when capillary distance is the limiter.",
  },
  {
    module: "Laminate strip",
    route: "Slabstock foam cut into ribbons, reinforced at edges, then coated.",
    why: "Fast uptake and easiest geometry for early experiments.",
  },
  {
    module: "Mesh sleeve sausage",
    route:
      "Rectangular strips loaded into a polymer mesh tube with tow webbing.",
    why: "Best towable form: continuous swath, low snag, easy swap.",
  },
]

const navItems: NavItem[] = [
  {
    label: "Overview",
    deck: "Kit premise and specimen basis",
    href: "#overview",
  },
  {
    label: "Shape",
    deck: "Puck geometry and squeezer",
    href: "#research-tabs",
    tab: "shape",
  },
  {
    label: "Traversal",
    deck: "Coverage path animation",
    href: "#research-tabs",
    tab: "path",
  },
  {
    label: "Fabrication",
    deck: "Foam, chemistry, and testing",
    href: "#research-tabs",
    tab: "fabrication",
  },
  {
    label: "Sources",
    deck: "External technical anchors",
    href: "#sources",
  },
]

function Formula({
  tex,
  block = false,
  className,
}: {
  tex: string
  block?: boolean
  className?: string
}) {
  const html = React.useMemo(
    () =>
      katex.renderToString(tex, {
        displayMode: block,
        throwOnError: false,
        strict: false,
      }),
    [block, tex]
  )

  if (block) {
    return (
      <div
        className={cn("formula-block text-sm md:text-base", className)}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    )
  }

  return (
    <span
      className={cn("formula-inline", className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

function ExternalSource({ source }: { source: Source }) {
  return (
    <a
      href={source.href}
      target="_blank"
      rel="noreferrer"
      className="group/source inline-flex items-center gap-2 border border-border bg-background/55 px-3 py-2 text-xs leading-tight text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
    >
      <span>{source.label}</span>
      <ArrowUpRight className="size-3 transition-transform group-hover/source:translate-x-0.5 group-hover/source:-translate-y-0.5" />
    </a>
  )
}

function ResearchThread({
  marker,
  title,
  children,
}: {
  marker: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="border border-border bg-background/58 p-5 md:p-6">
      <div className="mb-5 flex items-center justify-between gap-4">
        <p className="font-mono text-[0.68rem] font-medium tracking-[0.24em] text-muted-foreground uppercase">
          {marker}
        </p>
        <div className="h-px flex-1 bg-border" />
      </div>
      <h3 className="font-heading text-2xl font-semibold tracking-tight">
        {title}
      </h3>
      <div className="research-prose mt-4 space-y-4 text-sm leading-7 text-muted-foreground md:text-base">
        {children}
      </div>
    </section>
  )
}

function SectionIntro({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="max-w-4xl">
      <p className="font-mono text-xs font-medium tracking-[0.26em] text-muted-foreground uppercase">
        {eyebrow}
      </p>
      <h2 className="mt-3 font-heading text-4xl leading-[0.95] font-semibold tracking-tight md:text-6xl">
        {title}
      </h2>
      <div className="research-prose mt-5 text-base leading-8 text-muted-foreground md:text-lg">
        {children}
      </div>
    </div>
  )
}

function ScenePanel({
  kind,
  label,
  title,
  children,
}: {
  kind: "puck" | "boat" | "squeezer"
  label: string
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="scene-frame grid lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.65fr)]">
      <div className="relative min-h-[380px]">
        <ThreeScene kind={kind} label={label} />
        <div className="pointer-events-none absolute top-4 left-4 border border-border bg-background/80 px-3 py-2 font-mono text-[0.68rem] tracking-[0.18em] text-muted-foreground uppercase">
          Drag to rotate
        </div>
      </div>
      <div className="border-t border-border bg-background/70 p-5 lg:border-t-0 lg:border-l">
        <h3 className="font-heading text-2xl font-semibold tracking-tight">
          {title}
        </h3>
        <div className="research-prose mt-4 space-y-4 text-sm leading-7 text-muted-foreground">
          {children}
        </div>
      </div>
    </div>
  )
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <span
      aria-hidden="true"
      className="group relative block size-5 shrink-0"
      data-open={open ? "true" : "false"}
    >
      <span className="absolute top-[calc(50%-6px)] left-1/2 h-0.5 w-5 origin-center -translate-x-1/2 -translate-y-1/2 bg-current transition-[top,translate,rotate,width,opacity] duration-[250ms] ease-out group-data-[open=true]:top-1/2 group-data-[open=true]:w-[1.35rem] group-data-[open=true]:rotate-45" />
      <span className="absolute top-1/2 left-1/2 h-0.5 w-5 origin-center -translate-x-1/2 -translate-y-1/2 bg-current transition-[translate,rotate,width,opacity] duration-200 ease-out group-data-[open=true]:w-0 group-data-[open=true]:opacity-0" />
      <span className="absolute top-[calc(50%+6px)] left-1/2 h-0.5 w-5 origin-center -translate-x-1/2 -translate-y-1/2 bg-current transition-[top,translate,rotate,width,opacity] duration-[250ms] ease-out group-data-[open=true]:top-1/2 group-data-[open=true]:w-[1.35rem] group-data-[open=true]:-rotate-45" />
    </span>
  )
}

function SiteNav({
  activeTab,
  onActiveTabChange,
}: {
  activeTab: TabId
  onActiveTabChange: (tab: TabId) => void
}) {
  const [open, setOpen] = React.useState(false)
  const menuId = React.useId()

  function handleItemClick(
    event: React.MouseEvent<HTMLAnchorElement>,
    item: NavItem
  ) {
    event.preventDefault()
    setOpen(false)

    if (item.tab) {
      onActiveTabChange(item.tab)
    }

    window.requestAnimationFrame(() => {
      if (item.href === "#overview") {
        window.scrollTo({ top: 0, behavior: "smooth" })
        return
      }

      document.querySelector(item.href)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    })
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/92 backdrop-blur">
      <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-10">
        <a
          href="#overview"
          className="group inline-flex items-center gap-3 text-left"
          onClick={(event) => handleItemClick(event, navItems[0])}
        >
          <span className="relative size-8 overflow-hidden border border-border bg-primary">
            <span className="absolute inset-1 rounded-full border border-[oklch(0.48_0.086_61)] bg-[oklch(0.83_0.1_88)]" />
            <span className="absolute top-2 left-2 size-1.5 rounded-full bg-[oklch(0.24_0.045_58)]" />
            <span className="absolute right-2 bottom-2 size-2 rounded-full bg-[oklch(0.24_0.045_58)]" />
          </span>
          <span>
            <span className="block font-heading text-xl leading-none font-semibold tracking-tight">
              Oleo Kit
            </span>
            <span className="mt-1 block font-mono text-[0.62rem] leading-none tracking-[0.18em] text-muted-foreground uppercase">
              research deck
            </span>
          </span>
        </a>

        <button
          type="button"
          aria-controls={menuId}
          aria-expanded={open}
          className="group inline-flex items-center gap-3 border border-border bg-background/72 px-4 py-3 font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase transition-colors hover:bg-secondary hover:text-foreground data-[open=true]:bg-primary data-[open=true]:text-primary-foreground"
          data-open={open ? "true" : "false"}
          onClick={() => setOpen((value) => !value)}
        >
          <HamburgerIcon open={open} />
          Menu
        </button>
      </div>

      <div
        id={menuId}
        className={cn(
          "grid overflow-hidden transition-[grid-template-rows,opacity,translate] duration-300 ease-out",
          open
            ? "translate-y-0 grid-rows-[1fr] opacity-100"
            : "-translate-y-2 grid-rows-[0fr] opacity-0"
        )}
        inert={!open}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="mx-auto max-w-[1500px] px-4 pb-4 sm:px-6 lg:px-10">
            <div className="grid border border-border bg-card/82 md:grid-cols-5">
              {navItems.map((item) => {
                const active = item.tab === activeTab

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className={cn(
                      "group min-h-24 border-b border-border p-4 text-left transition-colors last:border-b-0 hover:bg-secondary md:border-r md:border-b-0 md:last:border-r-0",
                      active && "bg-primary text-primary-foreground"
                    )}
                    onClick={(event) => handleItemClick(event, item)}
                  >
                    <span className="block font-heading text-xl font-semibold tracking-tight">
                      {item.label}
                    </span>
                    <span
                      className={cn(
                        "mt-2 block text-sm leading-5 text-muted-foreground transition-colors group-hover:text-foreground",
                        active &&
                          "text-primary-foreground/76 group-hover:text-primary-foreground"
                      )}
                    >
                      {item.deck}
                    </span>
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <header
      id="overview"
      className="field-grid relative border-b border-border"
    >
      <div className="mx-auto grid min-h-[92svh] w-full max-w-[1500px] px-4 py-5 sm:px-6 lg:px-10">
        <div className="grid content-center gap-10 py-16 lg:grid-cols-[minmax(0,0.94fr)_minmax(420px,0.76fr)] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 border border-border bg-background/65 px-3 py-2 text-xs font-medium tracking-[0.22em] text-muted-foreground uppercase">
              <Sparkles className="size-3.5 text-primary" />
              RC boat oil-slick collector
            </div>
            <h1 className="mt-7 max-w-5xl font-heading text-[clamp(3.2rem,8.2vw,9rem)] leading-[0.85] font-semibold tracking-tight">
              Oleo Kit research deck
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-muted-foreground md:text-xl">
              A technical site for the oleophilic sponge kit: shape selection,
              traversal strategy, and fabrication routes for a small boat that
              drags a reusable sponge matrix through an oil slick.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <a href="#research-tabs">Open research tabs</a>
              </Button>
              <Button asChild variant="outline">
                <a href="#sources">View sources</a>
              </Button>
            </div>
          </div>

          <div className="specimen-paper border border-border p-4">
            <div className="grid gap-4 md:grid-cols-[0.86fr_1.14fr]">
              <div className="foam-swatch relative min-h-[320px] overflow-hidden border border-border">
                <div className="absolute top-4 left-4 border border-border bg-background/70 px-3 py-2 font-mono text-[0.65rem] tracking-[0.2em] text-muted-foreground uppercase">
                  open-cell foam
                </div>
                <div className="absolute right-5 bottom-5 left-5 border border-border bg-background/42 p-3 text-xs leading-5 text-muted-foreground">
                  Large connected pores are the working surface; shape controls
                  how quickly oil reaches them.
                </div>
              </div>
              <div className="flex min-h-[320px] flex-col justify-between gap-6 border border-border bg-background/72 p-5">
                <div>
                  <p className="font-mono text-xs tracking-[0.24em] text-muted-foreground uppercase">
                    prototype basis
                  </p>
                  <p className="mt-4 max-w-sm font-heading text-3xl leading-tight font-semibold">
                    Porous puck, oil-contact band, controlled tow spacing.
                  </p>
                </div>
                <div className="relative h-24 overflow-hidden border border-border bg-secondary/40">
                  <div className="absolute top-1/2 right-4 left-4 h-10 -translate-y-1/2 bg-[oklch(0.22_0.045_58_/_72%)]" />
                  <div className="absolute top-[calc(50%-2.25rem)] right-8 left-8 border-t border-primary" />
                  <div className="absolute top-[calc(50%+2.25rem)] right-8 left-8 border-t border-primary" />
                  <div className="absolute top-1/2 left-1/2 h-12 w-28 -translate-x-1/2 -translate-y-1/2 border border-[oklch(0.62_0.095_80)] bg-[oklch(0.83_0.1_88)]" />
                  <div className="absolute top-1/2 left-[calc(50%-4.6rem)] h-px w-12 -translate-y-1/2 bg-foreground/70" />
                  <div className="absolute top-1/2 left-[calc(50%+2.9rem)] h-px w-12 -translate-y-1/2 bg-foreground/70" />
                </div>
                <dl className="grid grid-cols-3 gap-3 text-xs">
                  <div>
                    <dt className="font-mono text-[0.62rem] tracking-[0.12em] text-muted-foreground uppercase">
                      Pores
                    </dt>
                    <dd className="mt-1 font-heading text-xl font-semibold">
                      85%
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[0.62rem] tracking-[0.12em] text-muted-foreground uppercase">
                      Spacing
                    </dt>
                    <dd className="mt-1 font-heading text-xl font-semibold">
                      0.5W
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[0.62rem] tracking-[0.12em] text-muted-foreground uppercase">
                      Reuse
                    </dt>
                    <dd className="mt-1 font-heading text-xl font-semibold">
                      100
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

function ShapeTab() {
  return (
    <div className="space-y-16 py-12">
      <SectionIntro
        eyebrow="Tab 01"
        title="The absorber should be a measured puck, not a ball."
      >
        <p>
          Spheres are mechanically tidy, but they minimize surface area for a
          fixed volume and put the core far from the slick. The lead prototype
          is a rounded oblate sponge puck, with the long axis setting contact
          area and the half-thickness setting capillary travel.
        </p>
      </SectionIntro>

      <ScenePanel
        kind="puck"
        label="Interactive three dimensional oblate oleo sponge puck at the oil-water interface"
        title="Interactive puck model"
      >
        <p>
          The model shows the puck as a flattened porous ellipsoid at the
          oil-water interface. Drag to inspect the capillary path, rim, and oil
          contact band. The dark ring around the rim represents the surface oil
          film contacted by the puck, not a cast shadow.
        </p>
        <p>
          The design target is{" "}
          <Formula tex={String.raw`c/a \approx 0.1\text{ to }0.3`} />. A sphere
          remains the control case at <Formula tex={String.raw`c/a=1`} />.
        </p>
      </ScenePanel>

      <div className="grid gap-5 lg:grid-cols-3">
        {shapeStats.map((stat) => (
          <div
            key={stat.label}
            className="border border-border bg-background/56 p-5"
          >
            <p className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
              {stat.label}
            </p>
            <p className="mt-3 font-heading text-3xl font-semibold">
              {stat.value}
            </p>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              {stat.note}
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ResearchThread
          marker="Sorption model"
          title="Lenticular puck as the first-principles optimum"
        >
          <p>
            The shape problem is sorption under finite contact time. The puck
            shortens the longest oil path to the half-thickness while keeping a
            rounded form that is less fragile than a sheet.
          </p>
          <Formula
            block
            tex={String.raw`L_c \le L_{\mathrm{cap}}(t_{\mathrm{contact}})`}
          />
          <Formula
            block
            tex={String.raw`\ell^2(t)=\frac{r_p\gamma_{ow}|\cos\theta_o|}{2\mu_o}t`}
          />
          <p>
            With the supplied example values, capillary travel is about 21 mm
            for <Formula tex={String.raw`\mu_o=0.1\,\mathrm{Pa\,s}`} /> and
            about 6.7 mm for{" "}
            <Formula tex={String.raw`\mu_o=1\,\mathrm{Pa\,s}`} />. That makes a
            large sphere waste interior volume during fast towing.
          </p>
        </ResearchThread>

        <ResearchThread
          marker="Tow geometry"
          title="Flattened sausage as the towable operating form"
        >
          <p>
            Swept area is the true bottleneck for thin slicks. A long rounded
            strip or sponge sausage gives a continuous contact line and avoids
            the gaps that loose spheres create.
          </p>
          <Formula
            block
            tex={String.raw`\dot m_{\mathrm{oil}}=\rho_{\mathrm{oil}}\,h\,W\,v\,\eta`}
          />
          <p>
            The synthesis for this kit is to test pucks as modular absorbing
            cells, then sleeve strips or puck rows when a continuous boom form
            becomes operationally better.
          </p>
        </ResearchThread>
      </div>

      <section className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="font-mono text-xs tracking-[0.26em] text-muted-foreground uppercase">
            Geometry equations
          </p>
          <h3 className="mt-3 font-heading text-3xl font-semibold tracking-tight">
            Puck dimensions connect directly to uptake, drag, and capacity.
          </h3>
          <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">
            The oblate spheroid equations explain why the lens stays in play: it
            gives more surface per frontal area than a sphere as
            <Formula tex={String.raw`c/a`} /> gets smaller, while the capacity
            calculator gives practical prototype sizes.
          </p>
        </div>
        <div className="grid gap-4">
          <Formula
            block
            tex={String.raw`S=2\pi a^2\left[1+\frac{1-e^2}{e}\tanh^{-1}(e)\right],\quad e=\sqrt{1-\frac{c^2}{a^2}}`}
          />
          <Formula
            block
            tex={String.raw`V=\frac{4}{3}\pi a^2c,\quad A_f\approx \pi ac`}
          />
          <Formula
            block
            tex={String.raw`Q_{\max}=\frac{m_{\mathrm{oil,max}}}{m_{\mathrm{dry}}}=\frac{\rho_o\epsilon_oR_r}{\rho_b}`}
          />
          <Formula
            block
            tex={String.raw`V_{\mathrm{oil}}=0.85\pi\left(\frac{D}{2}\right)^2t`}
          />
        </div>
      </section>

      <section className="overflow-hidden border border-border bg-background/58">
        <div className="grid border-b border-border px-5 py-4 text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase md:grid-cols-[0.9fr_1fr_1fr_1.1fr]">
          <div>Candidate</div>
          <div>Uptake distance</div>
          <div>Research value</div>
          <div>Verdict for the kit</div>
        </div>
        {[
          [
            "Sphere",
            "R",
            "Orientation-independent control",
            "Useful only if radius is within capillary travel.",
          ],
          [
            "Laminate strip",
            "t/2",
            "Fast uptake and high surface area",
            "Excellent for lab baselines, fragile in waves.",
          ],
          [
            "Lenticular puck",
            "c",
            "Rounded, modular, short travel",
            "Lead shape for the first RC kit prototypes.",
          ],
          [
            "Sponge sausage",
            "R or strip thickness",
            "Continuous swath coverage",
            "Best tow form when sleeved or arranged as a boom.",
          ],
        ].map((row) => (
          <div
            key={row[0]}
            className="grid gap-2 border-b border-border px-5 py-4 text-sm last:border-b-0 md:grid-cols-[0.9fr_1fr_1fr_1.1fr]"
          >
            <div className="font-heading text-lg font-semibold">{row[0]}</div>
            <div className="font-mono text-muted-foreground">{row[1]}</div>
            <div className="text-muted-foreground">{row[2]}</div>
            <div>{row[3]}</div>
          </div>
        ))}
      </section>

      <section className="space-y-6">
        <SectionIntro
          eyebrow="Future add-on"
          title="A squeezer and air knife finish the recovery cycle."
        >
          <p>
            This is a future kit requirement beyond the current sponge-shape
            study: design a squeezer that compresses the loaded puck or sleeve,
            then uses an air knife at the output to blow residual oil from the
            surface before redeployment.
          </p>
        </SectionIntro>
        <ScenePanel
          kind="squeezer"
          label="Three dimensional animation of an oleo sponge puck entering rollers and an air knife cleaning its surface"
          title="Rollers plus output air knife"
        >
          <p>
            A belt carries the puck through a supported pinch roller pair. The
            upper roller compresses the sponge against the lower roller, and an
            outlet air knife strips residual surface oil into the collection
            trough before redeployment.
          </p>
          <Formula
            block
            tex={String.raw`R_{\mathrm{recovered}}=\frac{m_{\mathrm{oil\ squeezed}}}{m_{\mathrm{oil\ absorbed}}}`}
          />
        </ScenePanel>
      </section>
    </div>
  )
}

function PathTab() {
  return (
    <div className="space-y-16 py-12">
      <SectionIntro
        eyebrow="Tab 02"
        title="The boat should mow the thick oil, not circle the edge."
      >
        <p>
          Random circles are not the main mode. The traversal strategy is
          drift-compensated weighted boustrophedon coverage, translated into a
          practical RC procedure: slow overlapping lawnmower lanes, with an
          inward spiral reserved for compact circular slicks.
        </p>
      </SectionIntro>

      <ScenePanel
        kind="boat"
        label="Three dimensional animation of an RC boat towing a V shaped sponge array through an oil slick"
        title="Animated V sweep through the slick"
      >
        <p>
          The boat follows parallel lanes through the slick while a shallow
          herringbone sponge array trails behind. The yellow path indicates
          planned coverage in the slick frame.
        </p>
        <p>
          Wider usually beats deeper: add swath width before adding more rows,
          because capture efficiency has diminishing returns.
        </p>
      </ScenePanel>

      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <ResearchThread
          marker="Coverage model"
          title="Weighted boustrophedon in the slick frame"
        >
          <p>
            Treat the sponge array as a moving collector footprint. The plan is
            generated against oil thickness
            <Formula tex={String.raw`h(x,y,t)`} />, then corrected for current,
            wind drift, Stokes drift, and diffusion.
          </p>
          <Formula
            block
            tex={String.raw`M_{\mathrm{pass}}=\rho_o\int_0^T U(t)\int_{-W/2}^{W/2} h(\mathbf{r}(t)+y\mathbf{n}(t),t)\eta(y,U,t)\,dy\,dt`}
          />
          <Formula block tex={String.raw`\eta_n=1-\prod_{j=1}^{n}(1-\eta_j)`} />
          <Formula
            block
            tex={String.raw`\mathbf{x}'=\mathbf{x}-\int_0^t \mathbf{u}_d(\tau)\,d\tau`}
          />
        </ResearchThread>

        <ResearchThread
          marker="RC operating model"
          title="Overlapping lanes and a U or V sponge boom"
        >
          <p>
            RC handling matters: keep the propeller out of the oil when
            possible, tow slowly, turn outside the slick, and use a U or V
            absorber if two boats, outriggers, or side floats are available.
          </p>
          <Formula
            block
            tex={String.raw`r(\theta)=R-\frac{s}{2\pi}\theta,\quad s\approx0.5W\text{ to }0.7W`}
          />
          <p>
            A spiral is useful for a compact circular slick. For long or patchy
            slicks, the overlapping lawnmower path is easier to control and
            produces cleaner coverage.
          </p>
        </ResearchThread>
      </div>

      <section className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
        <div>
          <p className="font-mono text-xs tracking-[0.26em] text-muted-foreground uppercase">
            Controller sequence
          </p>
          <h3 className="mt-3 font-heading text-3xl font-semibold tracking-tight">
            Recover in passes, update after each pass.
          </h3>
        </div>
        <ol className="grid gap-3">
          {pathSteps.map((step, index) => (
            <li
              key={step}
              className="grid grid-cols-[3rem_1fr] items-start border border-border bg-background/56"
            >
              <span className="flex h-full items-center justify-center border-r border-border font-heading text-xl font-semibold text-muted-foreground">
                {index + 1}
              </span>
              <span className="p-4 text-sm leading-7">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <Formula
          block
          tex={String.raw`\Delta y=W_{\mathrm{eff}}(1-\omega)=W_{\mathrm{eff}}-2z_q\sigma_\perp`}
        />
        <Formula
          block
          tex={String.raw`N_\ell(\theta)=\left\lceil\frac{w_\perp(P,\theta)}{\Delta y}\right\rceil`}
        />
        <Formula
          block
          tex={String.raw`L(\theta)\approx\frac{A(P)}{\Delta y}+\big(N_\ell(\theta)-1\big)L_{\mathrm{turn}}+L_{\mathrm{connect}}`}
        />
        <Formula block tex={String.raw`U\sin\alpha\le0.35\,\mathrm{m/s}`} />
      </section>

      <section className="border border-border bg-background/56 p-6 md:p-8">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="font-mono text-xs tracking-[0.26em] text-muted-foreground uppercase">
              Path design verdict
            </p>
            <h3 className="mt-3 font-heading text-3xl font-semibold tracking-tight">
              The best path is a coverage strategy plus a tow geometry.
            </h3>
          </div>
          <div className="research-prose space-y-4 text-sm leading-7 text-muted-foreground md:text-base">
            <p>
              Use long-axis boustrophedon passes when the slick is elongated or
              windrowed. Use the inward Archimedean spiral only for a compact
              circular slick in calm water. For highest capture, hold the sponge
              array open as a shallow U or V, then keep normal flow low enough
              that oil does not escape under or around the sponge line.
            </p>
            <Formula
              block
              tex={String.raw`B_p=\rho_o\int_{\mathrm{pass}\ p}\int_{-W/2}^{W/2}h(\mathbf{x})\eta(\mathbf{x})\,dy\,ds`}
            />
            <Formula
              block
              tex={String.raw`h_{k+1}(\mathbf{x})=h_k(\mathbf{x})\left[1-\eta_k(\mathbf{x})\right]`}
            />
          </div>
        </div>
      </section>
    </div>
  )
}

function FabricationTab() {
  return (
    <div className="space-y-16 py-12">
      <SectionIntro
        eyebrow="Tab 03"
        title="Fabricate simple foam stock first, then create operational geometry."
      >
        <p>
          The material stack is open-cell foam, hydrophobic and oleophilic
          surface treatment, then mechanical forms that can be towed, wrung, and
          redeployed. Shape becomes a test matrix: pucks, strips, cylinders, and
          sleeved boom modules.
        </p>
      </SectionIntro>

      <section className="grid gap-6 lg:grid-cols-3">
        {fabricationRows.map((row) => (
          <div
            key={row.module}
            className="border border-border bg-background/56 p-5"
          >
            <p className="font-mono text-xs tracking-[0.22em] text-muted-foreground uppercase">
              {row.module}
            </p>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              {row.route}
            </p>
            <p className="mt-5 border-t border-border pt-4 text-sm leading-7">
              {row.why}
            </p>
          </div>
        ))}
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <ResearchThread
          marker="Foam shaping route"
          title="Reticulated foam, then puck, sheet, and cylinder controls"
        >
          <p>
            Use reticulated polyurethane or polyimide foam, cut before coating
            so fresh internal surfaces receive the same oleophilic treatment.
            The test set includes oblate pucks, a sphere control, laminate
            sheets, and rope-mop cylinders.
          </p>
          <Formula
            block
            tex={String.raw`\Delta x\approx 2a+g,\quad \Delta y\approx\sqrt{3}a+g`}
          />
          <Formula
            block
            tex={String.raw`c^\star\approx\min\left[L_{\mathrm{cap}}(t_{\mathrm{contact}}),L_{\mathrm{cap}}(T_{\mathrm{cycle}})\right]`}
          />
        </ResearchThread>

        <ResearchThread
          marker="Sleeved module route"
          title="Rectangular strips inside mesh sleeves for massing"
        >
          <p>
            Separate fabrication shape from operating shape. Make strips or pads
            because they are cheap and repeatable, then load them into mesh
            sleeves so the module behaves like a rounded boom.
          </p>
          <Formula block tex={String.raw`g\ge0.1d`} />
          <p>
            This also makes recovery practical: quick-release a saturated
            module, squeeze it, and redeploy or swap it without rebuilding the
            RC frame.
          </p>
        </ResearchThread>
      </div>

      <section className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
        <div>
          <p className="font-mono text-xs tracking-[0.26em] text-muted-foreground uppercase">
            Chemistry backbone
          </p>
          <h3 className="mt-3 font-heading text-3xl font-semibold tracking-tight">
            SIS or silanization creates the oil-loving internal surface.
          </h3>
          <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">
            Argonne&apos;s published Oleo Sponge work uses sequential
            infiltration synthesis on commercial foam, then grafts oil-loving
            molecules. A simpler prototype route is direct silanization, but
            that should be described as Oleo-Sponge-like unless it follows the
            licensed Argonne process.
          </p>
        </div>
        <div className="grid gap-4">
          <Formula
            block
            tex={String.raw`\mathrm{M{-}OH+Al(CH_3)_3\rightarrow M{-}O{-}Al(CH_3)_2+CH_4}`}
          />
          <Formula
            block
            tex={String.raw`\mathrm{M{-}O{-}Al(CH_3)_2+2H_2O\rightarrow M{-}O{-}Al(OH)_2+2CH_4}`}
          />
          <Formula
            block
            tex={String.raw`\mathrm{PU{-}OH+RSi(OR')_3+H_2O\rightarrow PU{-}O{-}SiR(OR')_2+R'OH}`}
          />
        </div>
      </section>

      <section className="border border-border bg-background/56 p-6 md:p-8">
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="font-mono text-xs tracking-[0.26em] text-muted-foreground uppercase">
              Experimental program
            </p>
            <h3 className="mt-3 font-heading text-3xl font-semibold tracking-tight">
              Decide by recovered oil per energy, with durability gates.
            </h3>
          </div>
          <div className="grid gap-4">
            <Formula block tex={String.raw`c/a=1.0,\ 0.5,\ 0.3,\ 0.15`} />
            <Formula
              block
              tex={String.raw`\mu_o=0.01,\ 0.1,\ 1,\ 10\,\mathrm{Pa\,s}`}
            />
            <Formula
              block
              tex={String.raw`U=0.1\text{ to }0.8\,\mathrm{m/s},\quad \alpha=10^\circ\text{ to }45^\circ`}
            />
            <Formula
              block
              tex={String.raw`J=\frac{M_o(1-\chi_w)R_r}{\int(D_{\mathrm{array}}U+P_{\mathrm{boat}})\,dt}`}
            />
          </div>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        {[
          {
            icon: Microscope,
            title: "Prototype",
            text: "Build 150 x 20 mm, 200 x 25 mm, and 250 x 25 mm pucks, plus strip and sausage controls.",
          },
          {
            icon: Beaker,
            title: "Measure",
            text: "Record oil recovery rate, water pickup ratio, tow drag, retention after lift, and reuse cycles.",
          },
          {
            icon: FlaskConical,
            title: "Select",
            text: "Choose the module that maximizes J while meeting no tearing, low water pickup, and reuse thresholds.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="border border-border bg-background/56 p-5"
          >
            <item.icon className="size-5 text-accent" />
            <h3 className="mt-5 font-heading text-2xl font-semibold">
              {item.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              {item.text}
            </p>
          </div>
        ))}
      </section>
    </div>
  )
}

function ResearchTabs({ activeTab }: { activeTab: TabId }) {
  return (
    <main
      id="research-tabs"
      className="mx-auto max-w-[1500px] scroll-mt-24 px-4 sm:px-6 lg:px-10"
    >
      {activeTab === "shape" && <ShapeTab />}
      {activeTab === "path" && <PathTab />}
      {activeTab === "fabrication" && <FabricationTab />}
    </main>
  )
}

function SourceFooter() {
  return (
    <footer id="sources" className="border-t border-border bg-card/76">
      <div className="mx-auto grid max-w-[1500px] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.75fr_1.25fr] lg:px-10">
        <div>
          <p className="font-mono text-xs tracking-[0.26em] text-muted-foreground uppercase">
            Research anchors
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight">
            Sources used to ground the technical claims.
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {sources.map((source) => (
            <ExternalSource key={source.href} source={source} />
          ))}
        </div>
      </div>
    </footer>
  )
}

export function OleoResearchSite() {
  const [activeTab, setActiveTab] = React.useState<TabId>("shape")

  return (
    <div className="oleo-shell text-foreground">
      <SiteNav activeTab={activeTab} onActiveTabChange={setActiveTab} />
      <Hero />
      <ResearchTabs activeTab={activeTab} />
      <section className="mx-auto max-w-[1500px] px-4 pb-14 sm:px-6 lg:px-10">
        <div className="grid gap-4 border border-border bg-background/58 p-5 md:grid-cols-4 md:p-6">
          {[
            {
              icon: Waves,
              label: "Oil-water interface",
              text: "Design for contact with thin slicks and weathered patches.",
            },
            {
              icon: Wind,
              label: "Drift aware",
              text: "Plan in a moving slick frame, then command earth-frame lanes.",
            },
            {
              icon: Ship,
              label: "RC compatible",
              text: "Keep tow load and normal flow low enough for small boats.",
            },
            {
              icon: Factory,
              label: "Reusable module",
              text: "Cut, coat, sleeve, squeeze, inspect, and redeploy.",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="border border-border bg-card/50 p-4"
            >
              <item.icon className="size-5 text-accent" />
              <h3 className="mt-4 font-heading text-xl font-semibold">
                {item.label}
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>
      <SourceFooter />
    </div>
  )
}
