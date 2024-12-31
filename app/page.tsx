import {ArrowRight, BarChart3, Check, Search, Users} from "lucide-react";
import Header from "@/app/dashboard/components/header";

export default function Home() {
  return (
      <div className="flex flex-col">
        <Header />
        <section className="relative flex flex-col items-center justify-center px-4 py-32 text-center lg:py-40">
          <div className="relative z-10 mx-auto max-w-5xl">
            <h1 className="animate-fade-up text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
              Connect and Grow Your
              <span className="bg-gradient-to-r from-[#4F46E5] to-[#469ADC] bg-clip-text text-transparent"> Logistics Business</span>
            </h1>
            <p className="mx-auto mt-6 max-w-3xl animate-fade-up text-lg text-muted-foreground/80 [--animation-delay:200ms]">
              Find delivery opportunities, manage your fleet, and scale your logistics business with our all-in-one platform. Connect with leading marketplaces and optimize your operations.
            </p>
            <div className="mt-8 flex animate-fade-up items-center justify-center gap-4 [--animation-delay:400ms]">
              <a
                  className="inline-flex h-11 items-center justify-center rounded-md bg-nana-200 px-8 text-sm font-medium text-white transition-colors hover:bg-nana-200/90"
                  href="/create-account"
              >
                Start Growing Today
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <a
                  className="inline-flex h-11 items-center justify-center rounded-md border px-8 text-sm font-medium transition-colors hover:bg-muted"
                  href="#features"
              >
                Watch Demo
              </a>
            </div>
          </div>
        </section>
        <section id="features" className="relative w-full bg-slate-50/50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-center text-3xl font-bold">Everything You Need to Scale</h2>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              <div className="animate-fade-up rounded-lg border bg-white p-6 [--animation-delay:200ms]">
                <Search className="h-12 w-12 text-primary" />
                <h3 className="mt-4 text-xl font-semibold">Find Delivery Tasks</h3>
                <p className="mt-2 text-muted-foreground">
                  Access delivery opportunities from multiple marketplaces in one dashboard. Filter by location, type, and payment.
                </p>
              </div>
              <div className="animate-fade-up rounded-lg border bg-white p-6 [--animation-delay:400ms]">
                <Users className="h-12 w-12 text-primary" />
                <h3 className="mt-4 text-xl font-semibold">Driver Management</h3>
                <p className="mt-2 text-muted-foreground">
                  Track driver performance, manage schedules, and handle payroll all in one place. Keep your team organized and efficient.
                </p>
              </div>
              <div className="animate-fade-up rounded-lg border bg-white p-6 [--animation-delay:600ms]">
                <BarChart3 className="h-12 w-12 text-primary" />
                <h3 className="mt-4 text-xl font-semibold">Analytics Dashboard</h3>
                <p className="mt-2 text-muted-foreground">
                  Get real-time insights into your operations. Track earnings, driver performance, and delivery metrics.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* Pricing Section */}
        <section id="pricing" className="container mx-auto px-4 py-16">
          <h2 className="text-center text-3xl font-bold">Simple, usage-based pricing</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="animate-fade-up rounded-lg border p-8  [--animation-delay:200ms]">
              <h3 className="text-2xl font-bold">Starter</h3>
              <p className="mt-4 text-muted-foreground">Perfect for small fleets</p>
              <div className="mt-4 text-4xl font-bold">₦0</div>
              <p className="text-sm text-muted-foreground">forever</p>
              <ul className="mt-8 space-y-4">
                {[
                  'Up to 5 drivers',
                  'Marketplace integration',
                  'Basic analytics',
                  'Track drivers'
                ].map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      {feature}
                    </li>
                ))}
              </ul>
              <a
                  className="mt-8 block w-full rounded-md border p-2 text-center transition-colors hover:bg-muted"
                  href="/create-account"
              >
                Get Started
              </a>
            </div>
            <div className="animate-fade-up rounded-lg border border-primary p-8  [--animation-delay:400ms]">
              <h3 className="text-2xl font-bold">Growth</h3>
              <p className="mt-4 text-muted-foreground">For growing fleets</p>
              <div className="mt-4 text-4xl font-bold">₦25,000</div>
              <p className="text-sm text-muted-foreground">per month</p>
              <ul className="mt-8 space-y-4">
                {[
                  'Up to 20 drivers',
                  'All marketplace integrations',
                  'Advanced analytics',
                  'Locate and track driver',
                  'Heatmap feature',
                  'Priority support'
                ].map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      {feature}
                    </li>
                ))}
              </ul>
              <a
                  className="mt-8 block w-full rounded-md bg-nana-200 p-2 text-center text-white transition-colors hover:bg-nana-200/90"
                  href="/signup"
              >
                Start Free Trial
              </a>
            </div>
            <div className="animate-fade-up rounded-lg border p-8  [--animation-delay:600ms]">
              <h3 className="text-2xl font-bold">Enterprise</h3>
              <p className="mt-4 text-muted-foreground">For large operations</p>
              <div className="mt-4 text-4xl font-bold">₦45,000</div>
              <p className="text-sm text-muted-foreground">per month</p>
              <ul className="mt-8 space-y-4">
                {[
                  'Unlimited drivers',
                  'Custom integrations',
                  'Advanced reporting',
                  'API access',
                  'Heat map',
                  'Dedicated account manager',
                  'Custom features'
                ].map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      {feature}
                    </li>
                ))}
              </ul>
              <a
                  className="mt-8 block w-full rounded-md border p-2 text-center transition-colors hover:bg-muted"
                  href="/contact"
              >
                Contact Sales
              </a>
            </div>
          </div>
        </section>


        {/* Footer */}
        <footer className="border-t">
          <div className="container mx-auto px-4 py-8">
            <div className="grid gap-8 md:grid-cols-4">
              <div>
                <h4 className="text-sm font-semibold">Product</h4>
                <ul className="mt-4 space-y-2">
                  {['Features', 'Pricing', 'Solutions', 'Customers'].map((item) => (
                      <li key={item}>
                        <a className="text-sm text-muted-foreground hover:text-primary" href="#">
                          {item}
                        </a>
                      </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold">Company</h4>
                <ul className="mt-4 space-y-2">
                  {['About', 'Blog', 'Careers', 'Contact'].map((item) => (
                      <li key={item}>
                        <a className="text-sm text-muted-foreground hover:text-primary" href="#">
                          {item}
                        </a>
                      </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold">Resources</h4>
                <ul className="mt-4 space-y-2">
                  {['Documentation', 'Help Center', 'API', 'Status'].map((item) => (
                      <li key={item}>
                        <a className="text-sm text-muted-foreground hover:text-primary" href="#">
                          {item}
                        </a>
                      </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold">Legal</h4>
                <ul className="mt-4 space-y-2">
                  {['Privacy', 'Terms', 'Security', 'Cookies'].map((item) => (
                      <li key={item}>
                        <a className="text-sm text-muted-foreground hover:text-primary" href="#">
                          {item}
                        </a>
                      </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-8 flex flex-col items-center justify-between border-t pt-8 md:flex-row">
              <p className="text-sm text-muted-foreground">
                © 2024 Fleets. All rights reserved.
              </p>
              <div className="mt-4 flex space-x-6 md:mt-0">
                {['Twitter', 'GitHub', 'LinkedIn'].map((social) => (
                    <a
                        key={social}
                        className="text-sm text-muted-foreground hover:text-primary"
                        href="#"
                    >
                      {social}
                    </a>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </div>
  );
}
