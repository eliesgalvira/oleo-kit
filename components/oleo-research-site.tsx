"use client"

import * as React from "react"
import { Tabs } from "radix-ui"
import katex from "katex"
import {
  ArrowUpRight,
  Beaker,
  Factory,
  FlaskConical,
  Microscope,
  Route,
  Ruler,
  Ship,
  Sparkles,
  Waves,
  Wind,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

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

const tabs: Array<{
  id: TabId
  label: string
  deck: string
  icon: LucideIcon
}> = [
  {
    id: "shape",
    label: "Oleo sponge shape",
    deck: "Puck geometry, uptake limits, and post-run squeezing",
    icon: Ruler,
  },
  {
    id: "path",
    label: "Path traversal",
    deck: "Weighted coverage paths for a moving slick",
    icon: Route,
  },
  {
    id: "fabrication",
    label: "Fabrication research",
    deck: "Foam, coating chemistry, cutting, and test matrices",
    icon: Factory,
  },
]

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
    note: "Researcher 1 predicts the lenticular puck beats a sphere under short contact time.",
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
    why: "Researcher 2's best towable form: continuous swath, low snag, easy swap.",
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

function Hero() {
  return (
    <header className="field-grid relative border-b border-border">
      <div className="mx-auto grid min-h-[92svh] w-full max-w-[1500px] grid-rows-[1fr_auto] px-4 py-5 sm:px-6 lg:px-10">
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
              <div className="foam-swatch min-h-[320px] border border-border" />
              <div className="flex min-h-[320px] flex-col justify-between gap-6 border border-border bg-background/72 p-5">
                <div>
                  <p className="font-mono text-xs tracking-[0.24em] text-muted-foreground uppercase">
                    visual specimen
                  </p>
                  <p className="mt-4 max-w-sm font-heading text-3xl leading-tight font-semibold">
                    Reticulated foam, dark oil film, measured tow geometry.
                  </p>
                </div>
                <div className="oil-sheen h-20 border border-border" />
                <dl className="grid grid-cols-3 gap-3 text-xs">
                  <div>
                    <dt className="font-mono tracking-[0.18em] text-muted-foreground uppercase">
                      Pore use
                    </dt>
                    <dd className="mt-1 font-heading text-xl font-semibold">
                      85%
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono tracking-[0.18em] text-muted-foreground uppercase">
                      Sweep
                    </dt>
                    <dd className="mt-1 font-heading text-xl font-semibold">
                      Wv
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono tracking-[0.18em] text-muted-foreground uppercase">
                      Reuse
                    </dt>
                    <dd className="mt-1 font-heading text-xl font-semibold">
                      wring
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-3 border-t border-border pt-4 text-xs text-muted-foreground md:grid-cols-3">
          <p>
            Thread A favors a lenticular puck matrix because short capillary
            travel and rounded hydrodynamics can coexist.
          </p>
          <p>
            Thread B favors long sponge sausage modules because a continuous
            swath beats loose spheres in real towing.
          </p>
          <p>
            The kit synthesis below treats pucks as the experimental cell and
            mesh sleeves as the scalable array form.
          </p>
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
          contact band.
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
          marker="Research thread A"
          title="Lenticular puck as the first-principles optimum"
        >
          <p>
            Thread A frames the problem as sorption under finite contact time.
            The puck shortens the longest oil path to the half-thickness while
            keeping a rounded form that is less fragile than a sheet.
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
          marker="Research thread B"
          title="Flattened sausage as the towable operating form"
        >
          <p>
            Thread B argues that swept area is the true bottleneck for thin
            slicks. A long rounded strip or sponge sausage gives a continuous
            contact line and avoids the gaps that loose spheres create.
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
            This was not part of the two researchers&apos; original research. It
            is an added kit requirement: design a squeezer that compresses the
            loaded puck or sleeve, then uses an air knife at the output to blow
            residual oil from the surface before redeployment.
          </p>
        </SectionIntro>
        <ScenePanel
          kind="squeezer"
          label="Three dimensional animation of an oleo sponge puck entering rollers and an air knife cleaning its surface"
          title="Rollers plus output air knife"
        >
          <p>
            The roller gap recovers bulk oil. The air knife is placed after the
            squeeze point so a thin sheet of air strips remaining oil from the
            puck surface into the collection tray.
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
          Both researchers reject random circles as the main mode. Thread A
          specifies drift-compensated weighted boustrophedon passes. Thread B
          translates that into a practical RC procedure: slow overlapping
          lawnmower lanes, with an inward spiral reserved for compact circular
          slicks.
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
          marker="Research thread A"
          title="Weighted boustrophedon in the slick frame"
        >
          <p>
            Thread A treats the sponge array as a moving collector footprint.
            The plan is generated against oil thickness
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
          marker="Research thread B"
          title="Overlapping lanes and a U or V sponge boom"
        >
          <p>
            Thread B emphasizes RC handling: keep the propeller out of the oil
            when possible, tow slowly, turn outside the slick, and use a U or V
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
          The two research threads agree on the material stack: open-cell foam,
          hydrophobic and oleophilic surface treatment, then mechanical forms
          that can be towed, wrung, and redeployed. They diverge on shape, which
          becomes a test matrix instead of a debate.
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
          marker="Research thread A"
          title="Reticulated foam, then puck, sheet, and cylinder controls"
        >
          <p>
            Thread A proposes reticulated polyurethane or polyimide foam, cut
            before coating so fresh internal surfaces receive the same
            oleophilic treatment. The test set includes oblate pucks, a sphere
            control, laminate sheets, and rope-mop cylinders.
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
          marker="Research thread B"
          title="Rectangular strips inside mesh sleeves for massing"
        >
          <p>
            Thread B separates fabrication shape from operating shape. Make
            strips or pads because they are cheap and repeatable, then load them
            into mesh sleeves so the module behaves like a rounded boom.
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

function ResearchTabs() {
  return (
    <Tabs.Root defaultValue="shape" className="block" id="research-tabs">
      <div className="sticky top-0 z-20 border-b border-border bg-background/88 backdrop-blur">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-3 px-4 py-3 sm:px-6 lg:px-10">
          <Tabs.List
            aria-label="Oleo Kit research sections"
            className="grid gap-2 md:grid-cols-3"
          >
            {tabs.map((tab) => (
              <Tabs.Trigger
                key={tab.id}
                value={tab.id}
                className="group flex min-h-20 items-start gap-3 border border-border bg-background/58 p-4 text-left transition-colors hover:bg-secondary data-[state=active]:border-foreground data-[state=active]:bg-primary"
              >
                <tab.icon className="mt-1 size-5 text-muted-foreground group-data-[state=active]:text-primary-foreground" />
                <span>
                  <span className="block font-heading text-lg font-semibold tracking-tight text-foreground group-data-[state=active]:text-primary-foreground">
                    {tab.label}
                  </span>
                  <span className="mt-1 block text-xs leading-5 text-muted-foreground group-data-[state=active]:text-primary-foreground/75">
                    {tab.deck}
                  </span>
                </span>
              </Tabs.Trigger>
            ))}
          </Tabs.List>
        </div>
      </div>

      <main className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-10">
        <Tabs.Content value="shape" className="outline-none">
          <ShapeTab />
        </Tabs.Content>
        <Tabs.Content value="path" className="outline-none">
          <PathTab />
        </Tabs.Content>
        <Tabs.Content value="fabrication" className="outline-none">
          <FabricationTab />
        </Tabs.Content>
      </main>
    </Tabs.Root>
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
          <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">
            The page also integrates the two independent research reports you
            supplied. External links are kept here so the tab content stays
            readable while retaining traceability.
          </p>
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
  return (
    <div className="oleo-shell text-foreground">
      <Hero />
      <ResearchTabs />
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
