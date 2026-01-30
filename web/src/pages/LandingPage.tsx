import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Leaf,
  Users,
  LineChart,
  ShieldCheck,
  ArrowRight,
  Truck,
} from "lucide-react";
import Footer from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";

const features = [
  {
    icon: Leaf,
    title: "Farmer Dashboard",
    desc: "Crop recommendations, yield prediction, price suggestions, and buyer demand visibility.",
  },
  {
    icon: Users,
    title: "Buyer Marketplace",
    desc: "Access verified farmers, quality-graded produce, bulk buying, and transparent pricing.",
  },
  {
    icon: LineChart,
    title: "AI Intelligence Layer",
    desc: "Real-time market insights using crop prediction, price forecasting, and smart matching.",
  },
];

const stats = [
  { value: "1000+", label: "Farmers Onboarded" },
  { value: "500+", label: "Active Buyers" },
  { value: "95%", label: "Price Transparency" },
  { value: "24/7", label: "Market Intelligence" },
];

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* HERO */}
      <section className="pt-28 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-[420px] h-[420px] bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-[360px] h-[360px] bg-secondary/10 rounded-full blur-3xl" />
        </div>

        <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* LEFT */}
          <div className="space-y-8">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-medium">
              <ShieldCheck className="w-4 h-4" />
              AI-Powered Agricultural Marketplace
            </span>

            <h1 className="font-display text-5xl md:text-6xl font-bold leading-tight">
              Direct Market Access
              <br />
              <span className="text-gradient">for Farmers & Buyers</span>
            </h1>

            <p className="text-muted-foreground text-lg max-w-xl">
              A smart, AI-enabled platform providing real-time market intelligence,
              fair price discovery, and direct farmer–buyer connectivity without middlemen.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/login">
                <Button size="lg">
                  Get Started
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>

          {/* RIGHT */}
          <Card className="bg-card/80 backdrop-blur border-border/50 shadow-xl">
            <CardContent className="p-8 space-y-6">
              <h3 className="font-semibold text-lg">Platform Capabilities</h3>

              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center gap-4 p-4 rounded-lg bg-muted">
                  <Leaf className="w-6 h-6 text-primary" />
                  <div>
                    <p className="font-medium">For Farmers</p>
                    <p className="text-sm text-muted-foreground">
                      Crop prediction, pricing insights, and direct buyer access
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-lg bg-muted">
                  <Users className="w-6 h-6 text-primary" />
                  <div>
                    <p className="font-medium">For Buyers</p>
                    <p className="text-sm text-muted-foreground">
                      Verified produce, quality grading, and bulk purchasing
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-lg bg-muted">
                  <LineChart className="w-6 h-6 text-primary" />
                  <div>
                    <p className="font-medium">AI Intelligence</p>
                    <p className="text-sm text-muted-foreground">
                      Smart matching, demand–supply analysis, and price forecasting
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* STATS */}
      <section className="py-14 border-y border-border bg-secondary/30">
        <div className="container grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s, i) => (
            <div key={i}>
              <p className="text-3xl font-bold font-display">{s.value}</p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20">
        <div className="container space-y-14">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              Built for a Transparent Agricultural Market
            </h2>
            <p className="text-muted-foreground">
              Designed to empower farmers, buyers, and investors through data-driven decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <Card key={i} className="card-interactive">
                <CardContent className="p-6 space-y-4">
                  <f.icon className="w-8 h-8 text-primary" />
                  <h3 className="font-semibold text-lg">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 bg-muted/30 border-t border-border">
        <div className="container space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              How the Platform Works
            </h2>
            <p className="text-muted-foreground">
              A structured workflow powered by artificial intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <Card className="card-elevated">
              <CardContent className="p-8 space-y-4">
                <span className="text-sm font-medium text-primary">01</span>
                <h3 className="font-semibold text-lg">Data Collection</h3>
                <p className="text-sm text-muted-foreground">
                  Farmers and buyers submit crop details, demand, location, and pricing expectations.
                </p>
              </CardContent>
            </Card>

            <Card className="card-elevated">
              <CardContent className="p-8 space-y-4">
                <span className="text-sm font-medium text-primary">02</span>
                <h3 className="font-semibold text-lg">AI Processing</h3>
                <p className="text-sm text-muted-foreground">
                  The intelligence layer predicts crop value, price ranges, and optimal matches.
                </p>
              </CardContent>
            </Card>

            <Card className="card-elevated">
              <CardContent className="p-8 space-y-4">
                <span className="text-sm font-medium text-primary">03</span>
                <h3 className="font-semibold text-lg">Direct Trade</h3>
                <p className="text-sm text-muted-foreground">
                  Farmers choose the best deals, buyers confirm purchases, and delivery is initiated.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="py-24 border-t border-border bg-muted/20">
        <div className="container grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-6">
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              Get in Touch
            </h2>
            <p className="text-muted-foreground max-w-lg">
              Interested in deploying or collaborating on the platform?
              Reach out to explore partnerships and pilot implementations.
            </p>

            <div className="space-y-4 text-sm">
              <div>
                <p className="font-medium">Email</p>
                <p className="text-muted-foreground">support@agrimarket.ai</p>
              </div>
              <div>
                <p className="font-medium">Focus Area</p>
                <p className="text-muted-foreground">
                  Sustainable agriculture and digital marketplaces
                </p>
              </div>
            </div>
          </div>

          <Card className="bg-card/80 backdrop-blur border-border/50 shadow-lg">
            <CardContent className="p-8 space-y-6">
              <h3 className="font-semibold text-lg">Contact Form</h3>

              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input placeholder="Full Name" />
                  <Input type="email" placeholder="Email Address" />
                </div>

                <Input placeholder="Organization / Farm / Business Name" />

                <textarea
                  className="w-full min-h-[120px] rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Your message"
                />

                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
