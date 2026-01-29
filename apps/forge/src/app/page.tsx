import Link from 'next/link';
import { Button } from '@tributaries/ui';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-forge-50 to-white">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Construction Billing</span>
              <span className="block text-forge-600">Automated</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
              Stop losing money on manual billing processes. Forge automates AIA
              progress billing, change orders, and subcontractor pay applications
              so you can focus on building.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Link href="/signup">
                <Button size="lg">Start Free Trial</Button>
              </Link>
              <Link href="/demo">
                <Button variant="outline" size="lg">
                  Request Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Sound Familiar?
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <div className="text-4xl">📊</div>
              <h3 className="mt-4 text-lg font-semibold">Billing Takes Forever</h3>
              <p className="mt-2 text-gray-600">
                Month-end close stretches for weeks. Your team manually updates
                spreadsheets, chases documents, and reconciles numbers.
              </p>
            </div>
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <div className="text-4xl">💸</div>
              <h3 className="mt-4 text-lg font-semibold">Change Order Chaos</h3>
              <p className="mt-2 text-gray-600">
                Approved changes don't make it to invoices. Unapproved work gets
                billed. The back-and-forth never ends.
              </p>
            </div>
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <div className="text-4xl">📋</div>
              <h3 className="mt-4 text-lg font-semibold">Pay App Nightmare</h3>
              <p className="mt-2 text-gray-600">
                Collecting and processing subcontractor pay applications is a
                full-time job. Errors mean delayed payments and disputes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-gray-900">
            How Forge Works
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-forge-500 text-white">
                1
              </div>
              <div>
                <h3 className="text-lg font-semibold">Connect Your Systems</h3>
                <p className="mt-2 text-gray-600">
                  Forge integrates with Procore, Buildertrend, QuickBooks, and
                  Sage. Your data flows automatically.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-forge-500 text-white">
                2
              </div>
              <div>
                <h3 className="text-lg font-semibold">Upload Subcontractor Docs</h3>
                <p className="mt-2 text-gray-600">
                  Subs upload pay apps through a branded portal. Our AI extracts
                  data and validates against contracts.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-forge-500 text-white">
                3
              </div>
              <div>
                <h3 className="text-lg font-semibold">Auto-Generate AIA Forms</h3>
                <p className="mt-2 text-gray-600">
                  G702 and G703 forms populate automatically from your project
                  data. Change orders are tracked and included.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-forge-500 text-white">
                4
              </div>
              <div>
                <h3 className="text-lg font-semibold">Review and Send</h3>
                <p className="mt-2 text-gray-600">
                  Review everything in one dashboard. Approve, adjust, and submit
                  to your client with a click.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-forge-600 py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white">
            Ready to Fix Your Billing?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-forge-100">
            Join contractors who've cut their billing time by 70% and eliminated
            payment delays.
          </p>
          <div className="mt-8">
            <Link href="/signup">
              <Button size="lg" variant="secondary">
                Start Free Trial
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500">
            © 2026 Forge. A Project Tributaries vertical.
          </p>
        </div>
      </footer>
    </main>
  );
}
